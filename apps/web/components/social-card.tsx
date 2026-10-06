import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { socialPalettes, socialText } from "@/lib/og"
import type { SocialCardData } from "@/lib/og-data"
import type { socialAssets } from "@/lib/og-assets"

type Assets = Awaited<ReturnType<typeof socialAssets>>

function Contours({ color }: { color: string }) {
  return <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
    {Array.from({ length: 12 }, (_, i) => <path key={i}
      d={`M${650 + i * 20} -80 C ${1030 + i * 10} 125, ${480 + i * 28} 395, ${860 + i * 30} 710`}
      stroke={color} strokeWidth=".8" opacity=".15" />)}
  </svg>
}

export function SocialCard({ data, assets }: { data: SocialCardData; assets: Assets }) {
  const p = socialPalettes[data.kind]
  const home = data.kind === "home"
  const profile = Boolean(data.portrait)
  const eventPoster = data.kind === "hot-reload"
  const cjk = data.locale === "zh" || data.locale === "ja"
  const title = socialText(data.title, cjk ? 100 : 170)
  const titleSize = home ? 94 : profile ? (title.length > 25 ? 62 : 76)
    : cjk ? (title.length > 30 ? 46 : 60)
    : title.length > 110 ? 44 : title.length > 70 ? 50 : title.length > 38 ? 60 : 76
  const titleWidth = 640
  return <div style={{
    width: "100%", height: "100%", display: "flex", flexDirection: "column",
    background: p.paper, color: p.ink, padding: "44px 64px 36px",
    fontFamily: "Crafter Text, Noto", position: "relative",
  }}>
    <div style={{ position: "absolute", right: -110, top: -90, width: 650, height: 710,
      borderRadius: "50%", background: `radial-gradient(ellipse at center, ${p.wash}, ${p.paper})`, opacity: .85 }} />
    <Contours color={p.ink} />
    <div style={{ display: "flex", alignItems: "center", gap: 15, height: 44, flexShrink: 0 }}>
      <CrafterStationLogo decorative width={42} height={42} style={{ color: p.ink }} />
      <div style={{ fontFamily: "Crafter Display", fontWeight: 500, fontSize: 29, letterSpacing: -.7 }}>crafter station</div>
    </div>
    <div style={{ display: "flex", flex: 1, alignItems: "center", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", width: titleWidth, flexShrink: 0, paddingBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div style={{ display: "block", lineClamp: 1, fontSize: 20, letterSpacing: cjk ? 1 : 1.7, color: p.muted, textTransform: "uppercase" }}>{data.eyebrow}</div>
          {data.status && <div style={{ padding: "5px 13px", borderRadius: 18, background: p.wash, fontSize: 18 }}>{data.status}</div>}
        </div>
        <div style={{
          display: home ? "flex" : "block", fontFamily: "Crafter Display, Noto", fontWeight: 500,
          fontSize: titleSize, lineHeight: 1.07, letterSpacing: cjk ? -.8 : -2.3,
          width: titleWidth, textWrap: title.length > (cjk ? 30 : 80) ? "wrap" : "balance", wordBreak: "break-word", lineClamp: 4,
        }}>
          {home ? <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Craft. Ship.</span><span style={{ color: "#8b7134" }}>Repeat.</span>
          </div> : title}
        </div>
        {data.description && <div style={{
          display: "block", marginTop: home ? 24 : 22, fontSize: home ? 29 : 25, lineHeight: 1.38,
          color: p.muted, width: home ? 575 : 600, lineClamp: home ? 2 : 3,
        }}>{socialText(data.description, home ? 120 : 175)}</div>}
      </div>
      <div style={{ display: "flex", position: "absolute", width: 400, height: 370,
        right: -16, alignItems: "center", justifyContent: "center" }}>
        {home ? <div style={{ display: "flex", width: 310, height: 310, borderRadius: "49% 44% 46% 42%",
          background: "#efe3ad", alignItems: "center", justifyContent: "center", transform: "rotate(-8deg)" }}>
          <CrafterStationLogo decorative width={242} height={242} style={{ color: "#786634" }} />
        </div> : assets.portrait ? <div style={{ display: "flex", width: 360, height: 380, position: "relative", alignItems: "flex-end", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 330, height: 295, bottom: 0, borderRadius: "48% 45% 24% 26%", background: p.wash }} />
          <img src={assets.portrait} alt="" width={350} height={380} style={{ objectFit: "contain", objectPosition: "bottom" }} />
        </div> : assets.portraits.length ? <div style={{ display: "flex", flexWrap: "wrap", width: 370, height: 390, gap: 12 }}>
          {assets.portraits.map((image, i) => <div key={image.slice(-50)} style={{ display: "flex", width: 172, height: 178,
            borderRadius: i % 2 ? "40% 40% 20% 20%" : "40% 40% 24% 24%", background: i % 2 ? "#e0e5cb" : "#eee1a9",
            overflow: "hidden", alignItems: "flex-end", justifyContent: "center", transform: `rotate(${i % 2 ? 4 : -4}deg)` }}>
            <img src={image} alt="" width={169} height={178} style={{ objectFit: "contain", objectPosition: "bottom" }} />
          </div>)}
        </div> : assets.poster ? <div style={{ display: "flex", width: 390, height: 350, position: "relative", alignItems: "center" }}>
          <div style={{ position: "absolute", width: eventPoster ? 310 : 355, height: eventPoster ? 310 : 250, left: 10, top: eventPoster ? 20 : 65,
            borderRadius: 15, background: p.accent, opacity: .35, transform: "rotate(8deg)" }} />
          <img src={assets.poster} alt="" width={eventPoster ? 340 : 390} height={eventPoster ? 340 : 240} style={{ objectFit: "contain", borderRadius: 12, transform: "rotate(-5deg)" }} />
          {data.kind === "bounties" && <img src={assets.art} alt="" width={175} height={130} style={{ position: "absolute", right: -5, bottom: -2 }} />}
        </div> : <img src={assets.art} alt="" width={415} height={350} style={{ objectFit: "contain" }} />}
      </div>
    </div>
    <div style={{ display: "flex", height: 35, flexShrink: 0, alignItems: "center", justifyContent: "space-between", fontSize: 20, color: p.muted }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 7, height: 7, borderRadius: 9, background: p.accent }} />
        <span>crafter.run</span>
      </div>
      <div style={{ display: "block", maxWidth: 820, lineClamp: 1, textAlign: "right", fontSize: 19 }}>{socialText(data.detail || (home ? "Craft. Ship. Repeat." : data.path), 100)}</div>
    </div>
  </div>
}
