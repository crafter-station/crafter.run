import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLink } from "@/components/arrow-link"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"

export const dynamicParams = false

const copy = {
  en: {
    eyebrow: "Impact · Petdex · Q2 2026",
    title: "The project behind 96.72% of Crafter Station's Q2 star growth.",
    description: "Petdex generated 28,875 npm downloads and 3,218 net new stars during OSSCAR's published Q2 measurement window.",
    githubEyebrow: "GitHub attribution",
    githubTitle: "Nearly all of the organization's star growth came from Petdex.",
    githubBody: "Petdex grew from 70 to 3,288 stars while Crafter Station grew from 870 to 4,197. The calculation is (3,288 - 70) / (4,197 - 870) = 96.72%.",
    packageEyebrow: "Package signal",
    packageTitle: "From 380 to 28,875 downloads in ten weekly buckets.",
    packageBody: "The public npm API matches OSSCAR's cumulative series. The actual ratio is 75.99x. OSSCAR displays 28.9x because its methodology pads a new project's baseline to 1,000 downloads.",
    sources: "Primary sources",
    profile: "Founder profile",
    metrics: [["28,875", "npm downloads"], ["3,218", "net new stars"], ["612", "founder contributions"], ["#86", "OSSCAR Emerging"]],
  },
  es: {
    eyebrow: "Impacto · Petdex · Q2 2026",
    title: "El proyecto detras del 96.72% del crecimiento de estrellas de Crafter Station en Q2.",
    description: "Petdex genero 28,875 descargas npm y 3,218 nuevas estrellas netas durante la ventana Q2 publicada por OSSCAR.",
    githubEyebrow: "Atribucion en GitHub",
    githubTitle: "Casi todo el crecimiento de estrellas de la organizacion vino de Petdex.",
    githubBody: "Petdex crecio de 70 a 3,288 estrellas mientras Crafter Station paso de 870 a 4,197. El calculo es (3,288 - 70) / (4,197 - 870) = 96.72%.",
    packageEyebrow: "Senal del paquete",
    packageTitle: "De 380 a 28,875 descargas en diez periodos semanales.",
    packageBody: "La API publica de npm coincide con la serie acumulada de OSSCAR. El crecimiento real es 75.99x. OSSCAR muestra 28.9x porque normaliza el baseline de proyectos nuevos a 1,000 descargas.",
    sources: "Fuentes primarias",
    profile: "Perfil del fundador",
    metrics: [["28,875", "descargas npm"], ["3,218", "nuevas estrellas netas"], ["612", "contribuciones del fundador"], ["#86", "OSSCAR Emerging"]],
  },
  pt: {
    eyebrow: "Impacto · Petdex · Q2 2026",
    title: "O projeto por tras de 96.72% do crescimento de estrelas da Crafter Station no Q2.",
    description: "O Petdex gerou 28,875 downloads npm e 3,218 novas estrelas liquidas durante a janela Q2 publicada pela OSSCAR.",
    githubEyebrow: "Atribuicao no GitHub",
    githubTitle: "Quase todo o crescimento de estrelas da organizacao veio do Petdex.",
    githubBody: "O Petdex cresceu de 70 para 3,288 estrelas enquanto a Crafter Station passou de 870 para 4,197. O calculo e (3,288 - 70) / (4,197 - 870) = 96.72%.",
    packageEyebrow: "Sinal do pacote",
    packageTitle: "De 380 para 28,875 downloads em dez periodos semanais.",
    packageBody: "A API publica do npm corresponde a serie acumulada da OSSCAR. O crescimento real e 75.99x. A OSSCAR mostra 28.9x porque normaliza o baseline de novos projetos para 1,000 downloads.",
    sources: "Fontes primarias",
    profile: "Perfil do fundador",
    metrics: [["28,875", "downloads npm"], ["3,218", "novas estrelas liquidas"], ["612", "contribuicoes do fundador"], ["#86", "OSSCAR Emerging"]],
  },
  zh: {
    eyebrow: "影响力 · Petdex · 2026 年 Q2",
    title: "贡献了 Crafter Station Q2 star 增长 96.72% 的项目。",
    description: "在 OSSCAR 公布的 Q2 统计窗口内，Petdex 带来了 28,875 次 npm 下载和 3,218 颗净新增 star。",
    githubEyebrow: "GitHub 归因",
    githubTitle: "组织几乎所有的 star 增长都来自 Petdex。",
    githubBody: "Petdex 从 70 颗 star 增长到 3,288 颗，而 Crafter Station 从 870 颗增长到 4,197 颗。计算方式为 (3,288 - 70) / (4,197 - 870) = 96.72%。",
    packageEyebrow: "包信号",
    packageTitle: "十个每周区间内，从 380 次下载增长到 28,875 次。",
    packageBody: "npm 公开 API 与 OSSCAR 的累计序列一致。实际增长为 75.99 倍。OSSCAR 显示 28.9 倍，是因为其方法论会把新项目的基线填充到 1,000 次下载。",
    sources: "原始来源",
    profile: "创始人档案",
    metrics: [["28,875", "npm 下载量"], ["3,218", "净新增 star"], ["612", "创始人贡献"], ["#86", "OSSCAR Emerging"]],
  },
  ja: {
    eyebrow: "インパクト · Petdex · 2026年Q2",
    title: "Crafter Station の Q2 スター成長の96.72%を生んだプロジェクト。",
    description: "OSSCAR が公表した Q2 の計測期間中、Petdex は28,875件の npm ダウンロードと3,218の純増スターを生み出しました。",
    githubEyebrow: "GitHub での寄与",
    githubTitle: "オーガニゼーションのスター成長のほぼすべては Petdex によるものでした。",
    githubBody: "Petdex は70から3,288スターに成長し、Crafter Station は870から4,197に成長しました。計算は (3,288 - 70) / (4,197 - 870) = 96.72% です。",
    packageEyebrow: "パッケージのシグナル",
    packageTitle: "週次の10バケットで、380から28,875ダウンロードへ。",
    packageBody: "npm の公開 API は OSSCAR の累積系列と一致しています。実際の倍率は75.99倍です。OSSCAR は、新しいプロジェクトのベースラインを1,000ダウンロードに補正する方法論のため、28.9倍と表示しています。",
    sources: "一次情報",
    profile: "ファウンダープロフィール",
    metrics: [["28,875", "npm ダウンロード"], ["3,218", "純増スター"], ["612", "ファウンダーのコントリビューション"], ["#86", "OSSCAR Emerging"]],
  },
} as const

const sources = [
  ["OSSCAR organization profile", "https://osscar.dev/org/crafter-station"],
  ["OSSCAR methodology", "https://osscar.dev/methodology"],
  ["Petdex npm range API", "https://api.npmjs.org/downloads/range/2026-04-26:2026-07-04/petdex"],
  ["Petdex contributors API", "https://api.github.com/repos/crafter-station/petdex/contributors?per_page=100"],
  ["Hermes Petdex integration", "https://github.com/NousResearch/hermes-agent/blob/main/agent/pet/manifest.py"],
  ["Decrypt coverage", "https://decrypt.co/es/372082/tu-agente-hermes-ahora-tiene-una-mascota-que-no-hace-absolutamente-nada-y-ese-es-el-punto"],
] as const

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  const t = copy[lang]
  return buildMetadata({ locale: lang, path: "/impact/petdex", title: "Petdex Impact Report, Q2 2026", description: t.description })
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = copy[lang]

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t.eyebrow}</p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">{t.title}</h1>
            <p className="mt-6 max-w-3xl text-balance text-lg leading-8 text-muted-foreground">{t.description}</p>
          </div>
        </Container>
        <SectionGap />
        <Container>
          <section className="grid grid-cols-2 border-b border-line md:grid-cols-4">
            {t.metrics.map(([value, label], index) => (
              <div key={label} className={`${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t md:border-t-0" : ""} ${index > 0 ? "md:border-l" : ""} border-line px-6 py-8 md:px-8 md:py-10`}>
                <p className="text-3xl font-semibold tracking-tight md:text-4xl">{value}</p>
                <p className="mt-2 font-mono text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </section>
        </Container>
        <SectionGap />
        <Container>
          <section className="grid grid-cols-1 border-b border-line lg:grid-cols-2">
            <div className="border-b border-line p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.githubEyebrow}</p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{t.githubTitle}</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.githubBody}</p>
            </div>
            <div className="p-8 lg:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.packageEyebrow}</p>
              <h2 className="mt-4 text-3xl tracking-tight md:text-4xl">{t.packageTitle}</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.packageBody}</p>
            </div>
          </section>
        </Container>
        <SectionGap />
        <Container innerClassName="grid grid-cols-1 border-b border-line lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-line p-8 lg:border-b-0 lg:border-r lg:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t.sources}</p>
            <Link href={withLocale("/team/railly", lang)} className="group mt-8 inline-flex">
              <ArrowLink>{t.profile}</ArrowLink>
            </Link>
          </div>
          <div className="divide-y divide-line p-8 lg:p-10">
            {sources.map(([label, href]) => (
              <Link key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 py-4 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
                <span>{label}</span>
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}
