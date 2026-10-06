# Social image fonts

The social renderer uses the same **Crafter Display Medium 0.200** and
**Crafter Text Regular 0.309** as the website. The TTF display file is copied
from the preserved distribution of 0.200; no outlines were redrawn.
`next/og` needs TTF/WOFF rather than the site's WOFF2 files.

Chinese and Japanese social cards load local **Noto Sans SC / JP Medium**
WOFF files, only when their text needs these glyphs. This also covers CJK
names on an English page. Rendering doesn't fetch fonts from Google.
The site continues to use its existing `next/font` configuration.

## Noto provenance

Retrieved October 6, 2026 from the official `google/fonts` repository:

- `ofl/notosanssc/NotoSansSC[wght].ttf`
- `ofl/notosansjp/NotoSansJP[wght].ttf`

Each font's SIL Open Font License is stored alongside it.
The sources are variable TrueType fonts. The checked-in files are instances
at weight 500, retaining the complete Unicode cmap and all shaping features.
They use WOFF compression, which is supported by the social renderer.

Reproduce with fontTools (no font tooling is needed at runtime):

```python
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset

font = TTFont("NotoSansSC.ttf")  # Repeat for NotoSansJP.
instantiateVariableFont(font, {"wght": 500}, inplace=True)
options = subset.Options()
options.layout_features = ["*"]
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=font.getBestCmap().keys())
subsetter.subset(font)
font.flavor = "woff"
font.save("NotoSansSC-Medium.woff")
```

Font and source SHA-256 digests are recorded in `social-fonts.sha256`.
These are server assets traced into `/og`, not public font downloads.
