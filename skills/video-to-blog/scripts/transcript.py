#!/usr/bin/env python3
"""Pull a YouTube recording down to a timestamped transcript plus the metadata
the VideoObject needs.

Captions are enough. Downloading the video itself usually returns HTTP 403
without an impersonation target, and the frames are not what the writing needs
anyway. Slides are worth grabbing only when a claim is unreadable from audio.

Usage:
    transcript.py <youtube-url> [--out DIR] [--lang CODE] [--whisper-model PATH]

Writes DIR/transcript.txt and DIR/meta.json.
"""
import argparse
import json
import re
import subprocess
import sys
from collections import deque
from pathlib import Path

CUE = re.compile(r"^(\d{2}):(\d{2}):(\d{2})\.\d{3}\s+-->")
TAG = re.compile(r"<[^>]+>")
HEADER = ("WEBVTT", "Kind:", "Language:", "NOTE", "STYLE", "REGION")
# Rolling auto-captions repeat a line across consecutive cues as it scrolls up.
# Dedupe against a short window so a genuine repeat later in the talk survives.
WINDOW = 8


def run(args: list[str]) -> str:
    proc = subprocess.run(args, capture_output=True, text=True)
    if proc.returncode != 0:
        sys.exit(f"command failed: {' '.join(args[:3])}...\n{proc.stderr.strip()}")
    return proc.stdout


def probe(url: str) -> dict:
    fields = ["id", "title", "channel", "duration", "upload_date", "webpage_url"]
    raw = run(["yt-dlp", "--skip-download", "--print", "|".join(f"%({f})s" for f in fields), url])
    vid, title, channel, duration, upload, page = raw.strip().split("\n")[-1].split("|")
    seconds = int(duration)
    hours, minutes, rest = seconds // 3600, (seconds % 3600) // 60, seconds % 60
    iso = f"PT{hours}H" if hours else "PT"
    iso += f"{minutes}M" if minutes else ""
    iso += f"{rest}S" if rest else ""
    return {
        "id": vid,
        "title": title,
        "channel": channel,
        "url": page,
        "uploadDate": f"{upload[:4]}-{upload[4:6]}-{upload[6:]}",
        "durationSeconds": seconds,
        "durationIso": iso if iso != "PT" else "PT0S",
    }


def caption_langs(url: str) -> tuple[list[str], list[str]]:
    """Return (manual, automatic) language codes advertised for the video."""
    out = run(["yt-dlp", "--list-subs", url])
    manual, auto, bucket = [], [], None
    for line in out.splitlines():
        if "Available automatic captions" in line:
            bucket = auto
            continue
        if "Available subtitles" in line:
            bucket = manual
            continue
        m = re.match(r"^([a-zA-Z-]+)\s+\S", line)
        if bucket is not None and m and m.group(1) != "Language":
            bucket.append(m.group(1))
    return manual, auto


def fetch_vtt(url: str, lang: str, out: Path, automatic: bool) -> Path | None:
    flag = "--write-auto-subs" if automatic else "--write-subs"
    run(["yt-dlp", "--skip-download", flag, "--sub-langs", lang,
         "--sub-format", "vtt", "-o", str(out / "cap.%(ext)s"), url])
    found = sorted(out.glob("cap*.vtt"))
    return found[0] if found else None


def parse_vtt(path: Path) -> list[tuple[str, str]]:
    lines: list[tuple[str, str]] = []
    recent: deque[str] = deque(maxlen=WINDOW)
    stamp = "00:00:00"
    for raw in path.read_text(encoding="utf-8").splitlines():
        cue = CUE.match(raw)
        if cue:
            stamp = f"{cue.group(1)}:{cue.group(2)}:{cue.group(3)}"
            continue
        if not raw.strip() or raw.startswith(HEADER):
            continue
        text = TAG.sub("", raw).strip()
        if not text or text in recent:
            continue
        recent.append(text)
        lines.append((stamp, text))
    return lines


def whisper(url: str, out: Path, model: str) -> list[tuple[str, str]]:
    """Fallback for a video with no captions at all."""
    if not Path(model).exists():
        sys.exit(f"no captions available and whisper model not found at {model}.\n"
                 "Pass --whisper-model PATH to a whisper.cpp .bin model.")
    run(["yt-dlp", "-x", "--audio-format", "wav", "--postprocessor-args",
         "-ar 16000 -ac 1", "-o", str(out / "audio.%(ext)s"), url])
    audio = out / "audio.wav"
    run(["whisper-cli", "-m", model, "-f", str(audio), "-ovtt", "-of", str(out / "cap")])
    return parse_vtt(out / "cap.vtt")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--out", default="transcript")
    ap.add_argument("--lang", help="caption language code; defaults to the original audio track")
    ap.add_argument("--whisper-model", default="", help="whisper.cpp model, used only if no captions exist")
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    meta = probe(args.url)
    manual, auto = caption_langs(args.url)

    # Manual captions beat automatic ones. Within automatic, "<lang>-orig" is the
    # spoken track; every other code is a machine translation of it, which
    # compounds transcription error with translation error.
    chosen, automatic = None, False
    if args.lang and args.lang in manual:
        chosen = args.lang
    elif args.lang and args.lang in auto:
        chosen, automatic = args.lang, True
    elif manual:
        chosen = manual[0]
    elif auto:
        chosen = next((c for c in auto if c.endswith("-orig")), auto[0])
        automatic = True

    if chosen:
        vtt = fetch_vtt(args.url, chosen, out, automatic)
        lines = parse_vtt(vtt) if vtt else []
        meta["captionSource"] = f"{chosen} ({'auto' if automatic else 'manual'})"
    else:
        lines = whisper(args.url, out, args.whisper_model)
        meta["captionSource"] = "whisper"

    if not lines:
        sys.exit("no transcript lines produced")

    meta["language"] = (chosen or "").replace("-orig", "") or "unknown"
    meta["words"] = sum(len(t.split()) for _, t in lines)
    meta["segments"] = len(lines)

    (out / "transcript.txt").write_text(
        "\n".join(f"[{s}] {t}" for s, t in lines) + "\n", encoding="utf-8")
    (out / "meta.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False) + "\n",
                                   encoding="utf-8")

    print(json.dumps(meta, indent=2, ensure_ascii=False))
    print(f"\n-> {out/'transcript.txt'}  ({meta['segments']} segments, {meta['words']} words)")
    if meta["captionSource"] != "whisper" and "auto" in meta["captionSource"]:
        print("\nAuto-captions: every product name in this transcript is suspect. "
              "Verify each one before writing.")


if __name__ == "__main__":
    main()
