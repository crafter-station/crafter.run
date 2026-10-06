"""Copy approved runtime binaries and derive private specimen data.

Run with the font workspace's pinned Python environment:
  .venv/bin/python /path/to/apps/web/scripts/sync-font-specimen.py --source .
Never reads credentials or copies dependencies/private source archives.
The specimen remains in ignored local storage until the family is released.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

parser = argparse.ArgumentParser()
parser.add_argument("--source", type=Path, required=True)
parser.add_argument("--text-source", type=Path,
                    help="Validated complete Text preview; Display stays in --source.")
args = parser.parse_args()
web = Path(__file__).resolve().parents[1]
out = web / ".work/font-preview/assets"
# Check every input before replacing website assets. A subset pilot must never
# replace the complete interface font, and a failed preview must not be synced.
if args.text_source:
    validation = json.loads((args.text_source / "validation.json").read_text())
    if validation["status"] not in ("pass", "pass-with-known-anchor-limits"):
        raise ValueError("Text preview has not passed validation")
    for filename, digest in validation["files"].items():
        if hashlib.sha256((args.text_source / filename).read_bytes()).hexdigest() != digest:
            raise ValueError(f"Validated Text preview changed: {filename}")
text_source = args.text_source or args.source
for style in ("Regular", "Medium", "SemiBold", "Bold"):
    expected = TTFont(args.source / "fonts" / f"CrafterSansTextPreview-{style}.otf").getBestCmap()
    for ext in ("otf", "ttf", "woff2"):
        candidate = TTFont(text_source / "fonts" / f"CrafterSansTextPreview-{style}.{ext}")
        if candidate.getBestCmap() != expected:
            raise ValueError(f"Incomplete Text repertoire: {style}.{ext}")
(out / "files").mkdir(parents=True, exist_ok=True)
(out / "outlines").mkdir(exist_ok=True)
cuts = [("display", "CrafterSansPreview-Medium")] + [
    (str(w), f"CrafterSansTextPreview-{name}")
    for w, name in [(400, "Regular"), (500, "Medium"), (600, "SemiBold"), (700, "Bold")]
]
manifest = []
versions = {}
for variant, stem in cuts:
    source = args.source if variant == "display" else text_source
    font = TTFont(source / "fonts" / f"{stem}.otf")
    version = font["name"].getDebugName(5).removeprefix("Version ").split()[0].rstrip(";")
    family = "display" if variant == "display" else "text"
    if family in versions and versions[family] != version:
        raise ValueError(f"Mismatched {family} versions: {versions[family]} and {version}")
    versions[family] = version
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    data = {
        "unitsPerEm": font["head"].unitsPerEm,
        "ascent": font["hhea"].ascent, "descent": font["hhea"].descent,
        "xHeight": font["OS/2"].sxHeight, "capHeight": font["OS/2"].sCapHeight,
        "glyphs": {},
    }
    inventory = []
    for code, name in sorted(cmap.items()):
        pen, bounds = SVGPathPen(glyphs), BoundsPen(glyphs)
        glyphs[name].draw(pen)
        glyphs[name].draw(bounds)
        data["glyphs"][chr(code)] = {
            "path": pen.getCommands(), "advance": font["hmtx"][name][0],
            "bounds": bounds.bounds, "name": name,
        }
        inventory.append({"sample": chr(code), "unicode": f"U+{code:04X}", "name": name})
    (out / "outlines" / f"{variant}.json").write_text(json.dumps(data, separators=(",", ":")))
    if variant == "display":
        (web / "lib/font-glyphs.json").write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + "\n")
    for ext in ("otf", "ttf", "woff2"):
        src, dest = source / "fonts" / f"{stem}.{ext}", out / "files" / f"{stem}.{ext}"
        shutil.copy2(src, dest)
        if (variant != "display" and ext in ("ttf", "woff2")) or (variant == "display" and ext == "woff2"):
            shutil.copy2(src, web / "app/fonts" / src.name)
        manifest.append({"file": dest.relative_to(out).as_posix(), "sha256": hashlib.sha256(dest.read_bytes()).hexdigest()})
shutil.copy2(args.source / "reference/CrafterSansPreview-Medium-v0101.woff2", out / "files/CrafterSansPreview-Medium-v0101.woff2")
(out / "manifest.json").write_text(json.dumps({
    **versions, "mappedCharacters": len(inventory), "files": manifest,
}, indent=2) + "\n")
(web / "lib/font-versions.json").write_text(json.dumps(versions, indent=2) + "\n")
preview_note = """Text 0.305 integrates 19 compatible bases and ten n/u accents from the AGFT
pilot into the complete local preview. Other glyphs and public combining
marks retain 0.304. Some intermediate advances change by one font unit.
""" if versions["text"] in ("0.305", "0.306", "0.307", "0.308", "0.309") else ""
if versions["text"] == "0.305":
    preview_note += "Inherited mark-anchor limits, including f/t, remain pending.\n"
elif versions["text"] in ("0.306", "0.307", "0.308", "0.309"):
    preview_note += """Text 0.306 raises the f/t top anchors, clearing their supported upper
marks without changing outlines, advances or kerning. Other inherited anchor
limits remain; stacked accents are not supported.
"""
if versions["text"] in ("0.307", "0.308", "0.309"):
    preview_note += """Text 0.307 adds compatible i/j/l masters, preserving the corrected f/t
anchors and all other glyphs, including precomposed i accents. SemiBold i/j/l
advances increase by one font unit. Public combining marks and inherited
i/j/l top-anchor limits remain. The compatible pilot now covers 22 bases.
"""
if versions["text"] in ("0.308", "0.309"):
    preview_note += """Text 0.308 adds compatible k/v/w masters, bringing the pilot to 25 bases.
v/w retain their endpoint cubic geometry; four Bold k corners are simplified.
The k top anchor is raised to clear supported upper marks, resolving 23 old
collisions. Other glyphs, precomposed accents and public marks stay unchanged.
SemiBold v/w advances increase by one unit; Medium k left sidebearing does too.
Inherited i/j/l mark limits remain.
"""
if versions["text"] == "0.309":
    preview_note += """Text 0.309 adds compatible x/y/z masters, completing all 26 lowercase
letters in the 28-base pilot. x/y preserve both endpoint cubic geometries;
six Bold z corners are simplified within 0.377432 font units. Other outlines,
public marks, precomposed accents and f/t/k anchor corrections stay unchanged.
Medium x/y/z advances and the SemiBold y advance increase by one unit.
Inherited i/j/l mark limits remain; uppercase and family-wide work are pending.
"""
(out / "README.txt").write_text(f"""Crafter Sans — development preview
Display Bucle Medium {versions["display"]}. Text Regular/Medium/SemiBold/Bold {versions["text"]}.

Original Crafter outlines. The Text cuts are computational derivatives of the
approved cubic master, with calibrated scale, weights and spacing. Text 0.302
refined acute/grave marks on i/I. Text 0.303 opens interior joins in n/h/m/u
and b/d/p/q, including their accented variants. Letter advances are preserved.
Text 0.304 aligns minus, multiplication and division with plus/equal.
{preview_note}Further optical refinement, hinting and cross-platform review remain.
No italics or variable axes. 233 Unicode mappings; Latin repertoire.

No public distribution license has been selected. The licenses of neighboring
third-party fonts do not apply to Crafter Sans.
""")
print(f"Synced {len(cuts)} cuts, {len(inventory)} mapped characters and real outline data.")
