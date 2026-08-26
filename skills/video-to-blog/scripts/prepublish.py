#!/usr/bin/env python3
"""Check blog posts before they ship.

Covers the failure modes the Next build does not: house style, dead links,
cross-locale drift in the fields that decide ordering, and authors who are not
on the team. The build still has to pass; this runs first because it is fast.

Usage:
    prepublish.py [slug ...] [--links]

With no slugs, checks every post git reports as added or modified.
"""
import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path

BLOG = Path("apps/web/content/blog")
TEAM = Path("apps/web/lib/team.ts")
FILENAME = re.compile(r"^([a-z0-9][a-z0-9-]*)\.([a-z]{2})\.mdx$")
ISO_DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
KINDS = {"engineering", "community", "product", "research"}
RESERVED = {"page", "md", "sitemap", "rss", "feed", "atom"}
# House style. Em and en dashes are rewritten with commas, colons or a split.
BANNED = {"—": "em dash", "–": "en dash"}
EMOJI = re.compile(
    "[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF\U0000FE0F]"
)
MD_LINK = re.compile(r"\[[^\]]*\]\((/[^)\s]+|https?://[^)\s]+)\)")
UA = {"User-Agent": "Mozilla/5.0 (compatible; crafter-prepublish/1.0)"}


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---\n"):
        return {}, text
    _, block, body = text.split("---\n", 2)
    data: dict = {}
    for line in block.splitlines():
        if not line.strip() or line.startswith((" ", "#")):
            continue
        key, _, raw = line.partition(":")
        raw = raw.strip()
        if raw.startswith("[") and raw.endswith("]"):
            data[key.strip()] = [v.strip().strip('"') for v in raw[1:-1].split(",") if v.strip()]
        else:
            data[key.strip()] = raw.strip('"')
    return data, body


def changed_slugs() -> list[str]:
    out = subprocess.run(
        ["git", "status", "--porcelain", "--", str(BLOG)],
        capture_output=True, text=True,
    ).stdout
    slugs = set()
    for line in out.splitlines():
        name = Path(line[3:].strip().strip('"')).name
        m = FILENAME.match(name)
        if m:
            slugs.add(m.group(1))
    return sorted(slugs)


def check_url(url: str) -> str | None:
    try:
        req = urllib.request.Request(url, headers=UA, method="GET")
        with urllib.request.urlopen(req, timeout=15) as resp:
            return None if resp.status < 400 else f"HTTP {resp.status}"
    except urllib.error.HTTPError as e:
        # Bot walls are not dead links; they need a human eye, not a failed build.
        return None if e.code in (403, 405, 429) else f"HTTP {e.code}"
    except Exception as e:  # noqa: BLE001
        return f"{type(e).__name__}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="*")
    ap.add_argument("--links", action="store_true", help="also resolve external links over the network")
    args = ap.parse_args()

    if not BLOG.is_dir():
        sys.exit(f"run from the repo root; {BLOG} not found")

    usernames = set(re.findall(r'username:\s*"([^"]+)"', TEAM.read_text(encoding="utf-8")))
    known = {m.group(1) for m in (FILENAME.match(p.name) for p in BLOG.glob("*.mdx")) if m}
    slugs = args.slugs or changed_slugs()
    if not slugs:
        print("no added or modified posts")
        return 0

    problems: list[str] = []
    across: dict[str, dict[str, set]] = defaultdict(lambda: defaultdict(set))
    external: set[str] = set()

    for slug in slugs:
        files = sorted(BLOG.glob(f"{slug}.*.mdx"))
        if not files:
            problems.append(f"{slug}: no files")
            continue
        if slug in RESERVED:
            problems.append(f"{slug}: reserved slug, would be shadowed by a route")

        for path in files:
            where = path.name
            if not FILENAME.match(where):
                problems.append(f"{where}: filename must be <slug>.<locale>.mdx")
                continue
            data, body = split_frontmatter(path.read_text(encoding="utf-8"))

            for field in ("title", "summary", "date", "kind", "authors"):
                if not data.get(field):
                    problems.append(f"{where}: missing {field}")
            if data.get("date") and not ISO_DATE.match(data["date"]):
                problems.append(f"{where}: date must be YYYY-MM-DD")
            if data.get("kind") and data["kind"] not in KINDS:
                problems.append(f"{where}: kind '{data['kind']}' not in {sorted(KINDS)}")
            for author in data.get("authors", []):
                if author not in usernames:
                    problems.append(f"{where}: author '{author}' is not a username in lib/team.ts")
            if "order" in data and not re.fullmatch(r"-?\d+", str(data["order"])):
                problems.append(f"{where}: order must be an integer")

            # These decide sort position, so a mismatch reorders one language only.
            across[slug]["date"].add(data.get("date"))
            across[slug]["order"].add(str(data.get("order", "")))

            for char, label in BANNED.items():
                if char in body:
                    line = body[: body.index(char)].count("\n") + 1
                    problems.append(f"{where}:{line}: {label}, rewrite it")
            if hit := EMOJI.search(body):
                line = body[: hit.start()].count("\n") + 1
                problems.append(f"{where}:{line}: emoji {hit.group()!r}")

            for link in MD_LINK.findall(body):
                if link.startswith("/blog/"):
                    target = link[len("/blog/"):].split("#")[0].strip("/")
                    if target and target not in known:
                        problems.append(f"{where}: internal link /blog/{target} has no post")
                elif link.startswith("http"):
                    external.add(link)

        for field, values in across[slug].items():
            if len(values) > 1:
                problems.append(f"{slug}: {field} differs across locales {sorted(values)}; ordering will diverge")

    if args.links and external:
        print(f"resolving {len(external)} external links...")
        for url in sorted(external):
            if err := check_url(url):
                problems.append(f"link {url}: {err}")

    print(f"\nchecked {len(slugs)} post(s): {', '.join(slugs)}")
    if problems:
        print(f"\n{len(problems)} problem(s):")
        for p in problems:
            print(f"  {p}")
        return 1
    print("clean")
    return 0


if __name__ == "__main__":
    sys.exit(main())
