import { ImageResponse } from "next/og"

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

const BACKGROUND = "#0d0d0d"
const FOREGROUND = "#f5f5f5"
const MUTED = "#a3a3a3"
const LINE = "#262626"
const ACCENT = "#f1ede4"

const TAGLINE = "The LatAm network of shippers"
const DOMAIN = "crafter.run"

/**
 * Fetch a glyph-subsetted font from Google Fonts (css2 `text=` trick).
 * Without a browser UA, Google serves TTF, which satori can parse.
 */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const chars = [...new Set(text)].join("")
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(chars)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!resource) throw new Error(`No font resource for ${family}`)
  const response = await fetch(resource[1])
  if (!response.ok) throw new Error(`Font fetch failed for ${family}`)
  return response.arrayBuffer()
}

function titleFontFamily(lang: Locale) {
  if (lang === "zh") return { family: "Noto Sans SC", weight: 700 as const }
  if (lang === "ja") return { family: "Noto Sans JP", weight: 700 as const }
  return { family: "Space Grotesk", weight: 600 as const }
}

function titleFontSize(title: string, lang: Locale) {
  const cjk = lang === "zh" || lang === "ja"
  const length = title.length
  if (cjk) {
    if (length > 36) return 48
    if (length > 22) return 58
    return 68
  }
  if (length > 70) return 48
  if (length > 40) return 58
  return 68
}

function profileNameFontSize(name: string) {
  if (name.length > 32) return 52
  if (name.length > 22) return 62
  return 74
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const langParam = searchParams.get("lang") ?? defaultLocale
  const lang: Locale = isLocale(langParam) ? langParam : defaultLocale
  const title = (searchParams.get("title") ?? TAGLINE).slice(0, 140)
  const eyebrow = (searchParams.get("eyebrow") ?? "Crafter Station · LatAm").slice(0, 60)
  const handle = searchParams.get("handle")?.slice(0, 40)
  const avatarUrl = searchParams.get("avatar")?.slice(0, 500)
  const role = searchParams.get("role")?.slice(0, 120)
  const isProfile = Boolean(handle)

  const monoText = `${eyebrow.toUpperCase()}${lang.toUpperCase()}${DOMAIN}${TAGLINE}${handle ?? ""}${role ?? ""}CRAFTER PROFILEMEMBER…`
  const titleFont = titleFontFamily(lang)

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 500 | 600 | 700; style: "normal" }[] = []
  try {
    const [titleData, monoData] = await Promise.all([
      loadGoogleFont(titleFont.family, titleFont.weight, title),
      loadGoogleFont("JetBrains Mono", 500, monoText),
    ])
    fonts.push(
      { name: "title", data: titleData, weight: titleFont.weight, style: "normal" },
      { name: "mono", data: monoData, weight: 500, style: "normal" },
    )
  } catch {
    // Fall back to the bundled default font (Latin coverage only).
  }

  const hasCustomFonts = fonts.length > 0
  const titleFamily = hasCustomFonts ? "title" : undefined
  const monoFamily = hasCustomFonts ? "mono" : undefined

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          padding: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `1px solid ${LINE}`,
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "28px 48px",
              borderBottom: `1px solid ${LINE}`,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 22,
                letterSpacing: 7,
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {isProfile ? "CRAFTER PROFILE" : eyebrow.toUpperCase()}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: monoFamily,
                fontSize: 20,
                letterSpacing: 4,
                color: MUTED,
                border: `1px solid ${LINE}`,
                padding: "10px 18px",
              }}
            >
              {lang.toUpperCase()}
            </div>
          </div>

          {isProfile ? (
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                padding: "36px 48px",
                gap: 44,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 226,
                  height: 226,
                  flexShrink: 0,
                  border: `1px solid ${LINE}`,
                  borderRadius: 999,
                  backgroundColor: LINE,
                  overflow: "hidden",
                  fontFamily: titleFamily,
                  fontSize: 78,
                  fontWeight: 600,
                  color: MUTED,
                }}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" width="226" height="226" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  title.charAt(0).toUpperCase()
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: monoFamily,
                    fontSize: 18,
                    letterSpacing: 3,
                    color: ACCENT,
                    textTransform: "uppercase",
                  }}
                >
                  MEMBER // @{handle}
                </div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 16,
                    fontFamily: titleFamily,
                    fontSize: profileNameFontSize(title),
                    fontWeight: titleFont.weight,
                    letterSpacing: lang === "zh" || lang === "ja" ? 0 : -3,
                    lineHeight: 1,
                    textWrap: "balance",
                  }}
                >
                  {title}
                </div>
                {role ? (
                  <div style={{ display: "flex", marginTop: 20, fontSize: 24, lineHeight: 1.25, color: MUTED }}>
                    {role}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                padding: "0 48px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontFamily: titleFamily,
                  fontSize: titleFontSize(title, lang),
                  fontWeight: titleFont.weight,
                  letterSpacing: lang === "zh" || lang === "ja" ? 0 : -2.5,
                  lineHeight: 1.12,
                  maxWidth: 1000,
                  textWrap: "balance",
                }}
              >
                {title}
              </div>
            </div>
          )}

          {/* Footer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "28px 48px",
              borderTop: `1px solid ${LINE}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: monoFamily,
                fontSize: 22,
                letterSpacing: 2,
                color: FOREGROUND,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 12,
                  height: 12,
                  backgroundColor: ACCENT,
                }}
              />
              {DOMAIN}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: monoFamily,
                fontSize: 20,
                letterSpacing: 2,
                color: MUTED,
              }}
            >
              {TAGLINE}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: hasCustomFonts ? fonts : undefined,
      headers: {
        "Cache-Control":
          "public, immutable, no-transform, max-age=86400, s-maxage=31536000",
      },
    },
  )
}
