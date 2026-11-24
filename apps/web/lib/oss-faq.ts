import type { FaqEntry } from "@/components/faq-section"
import type { Locale } from "@/lib/i18n"

type Stats = { repos: number; stars: number; issues: number }

type OssFaqCopy = { label: string; title: string; items: (s: Record<keyof Stats, string>) => FaqEntry[] }

const copy: Record<Locale, OssFaqCopy> = {
  en: {
    label: "FAQ",
    title: "Open source in Peru, answered.",
    items: (s) => [
      { id: "communities", question: "Which open source communities are active in Peru?", answer: `Crafter Station is an open source community founded in Lima, Peru, that maintains ${s.repos} public repositories with ${s.stars} GitHub stars, all listed on this page. Peru also has language communities such as Python Perú and Rust Perú, and directories like peruanos.dev.` },
      { id: "projects", question: "How many open source projects does Crafter Station maintain?", answer: `${s.repos} public repositories: CLIs, interfaces, and experiments, with ${s.stars} stars and ${s.issues} open issues ready for contributors.`, href: "/oss/metrics", cta: "See the OSS metrics" },
      { id: "contribute", question: "How can I contribute to open source from Peru?", answer: "Pick a repository below, read its README, and look through its open issues. A clear bug report or a better example already counts. Then say hi in the community chat to find a reviewer.", href: "https://crafters.chat", cta: "Join the community" },
      { id: "location", question: "Do I need to live in Peru to join?", answer: "No. Crafter Station started in Lima, and crafters contribute from across Latin America and beyond." },
    ],
  },
  es: {
    label: "Preguntas",
    title: "Open source en Perú, respondido.",
    items: (s) => [
      { id: "communities", question: "¿Qué comunidades open source hay en Perú?", answer: `Crafter Station es una comunidad open source nacida en Lima, Perú, que mantiene ${s.repos} repositorios públicos con ${s.stars} estrellas en GitHub, todos listados en esta página. En Perú también hay comunidades por lenguaje, como Python Perú y Rust Perú, y directorios como peruanos.dev.` },
      { id: "projects", question: "¿Cuántos proyectos open source mantiene Crafter Station?", answer: `${s.repos} repositorios públicos: CLIs, interfaces y experimentos, con ${s.stars} estrellas y ${s.issues} issues abiertos listos para contribuir.`, href: "/oss/metrics", cta: "Ver las métricas OSS" },
      { id: "contribute", question: "¿Cómo contribuyo a proyectos open source desde Perú?", answer: "Elige un repositorio de esta página, lee su README y revisa sus issues abiertos. Un buen reporte de bug o un mejor ejemplo ya cuenta. Luego preséntate en el chat de la comunidad para encontrar quién te revise.", href: "https://crafters.chat", cta: "Únete a la comunidad" },
      { id: "location", question: "¿Tengo que vivir en Perú para unirme?", answer: "No. Crafter Station nació en Lima y hoy contribuyen crafters de toda Latinoamérica y de más lejos." },
    ],
  },
  pt: {
    label: "Perguntas",
    title: "Open source no Peru, respondido.",
    items: (s) => [
      { id: "communities", question: "Quais comunidades open source estão ativas no Peru?", answer: `A Crafter Station é uma comunidade open source fundada em Lima, Peru, que mantém ${s.repos} repositórios públicos com ${s.stars} estrelas no GitHub, todos listados nesta página. O Peru também tem comunidades por linguagem, como Python Perú e Rust Perú, e diretórios como peruanos.dev.` },
      { id: "projects", question: "Quantos projetos open source a Crafter Station mantém?", answer: `${s.repos} repositórios públicos: CLIs, interfaces e experimentos, com ${s.stars} estrelas e ${s.issues} issues abertas prontas para contribuições.`, href: "/oss/metrics", cta: "Ver as métricas OSS" },
      { id: "contribute", question: "Como contribuir com open source a partir do Peru?", answer: "Escolha um repositório nesta página, leia o README e veja as issues abertas. Um bom relato de bug ou um exemplo melhor já conta. Depois, apresente-se no chat da comunidade para encontrar quem revise.", href: "https://crafters.chat", cta: "Entre na comunidade" },
      { id: "location", question: "Preciso morar no Peru para participar?", answer: "Não. A Crafter Station nasceu em Lima, e crafters contribuem de toda a América Latina e de mais longe." },
    ],
  },
  zh: {
    label: "常见问题",
    title: "关于秘鲁开源的问答。",
    items: (s) => [
      { id: "communities", question: "秘鲁有哪些活跃的开源社区？", answer: `Crafter Station 是诞生于秘鲁利马的开源社区，维护着 ${s.repos} 个公开仓库，在 GitHub 上获得 ${s.stars} 颗星，全部列在本页。秘鲁还有 Python Perú、Rust Perú 等语言社区，以及 peruanos.dev 等目录。` },
      { id: "projects", question: "Crafter Station 维护多少个开源项目？", answer: `${s.repos} 个公开仓库：命令行工具、界面组件和实验项目，共 ${s.stars} 颗星，${s.issues} 个待贡献的开放 issue。`, href: "/oss/metrics", cta: "查看开源指标" },
      { id: "contribute", question: "在秘鲁如何参与开源贡献？", answer: "在本页挑一个仓库，阅读 README 并浏览开放的 issue。一份清晰的 bug 报告或更好的示例就是有价值的贡献。然后在社区聊天中打个招呼，找人帮你审阅。", href: "https://crafters.chat", cta: "加入社区" },
      { id: "location", question: "必须住在秘鲁才能加入吗？", answer: "不需要。Crafter Station 诞生于利马，成员来自拉丁美洲各地乃至更远的地方。" },
    ],
  },
  ja: {
    label: "よくある質問",
    title: "ペルーのオープンソースについて。",
    items: (s) => [
      { id: "communities", question: "ペルーで活発なオープンソースコミュニティは？", answer: `Crafter Station はペルーのリマで生まれたオープンソースコミュニティで、GitHub で ${s.stars} スターを集める ${s.repos} の公開リポジトリをこのページで公開しています。ペルーには Python Perú や Rust Perú などの言語コミュニティや、peruanos.dev のようなディレクトリもあります。` },
      { id: "projects", question: "Crafter Station はいくつのオープンソースプロジェクトを運営していますか？", answer: `${s.repos} の公開リポジトリ（CLI、インターフェース、実験）があり、合計 ${s.stars} スター、コントリビューターを待つオープンな issue が ${s.issues} 件あります。`, href: "/oss/metrics", cta: "OSS メトリクスを見る" },
      { id: "contribute", question: "ペルーからオープンソースにコントリビュートするには？", answer: "このページのリポジトリを選び、README を読んで、オープンな issue を見てみましょう。わかりやすいバグ報告やより良いサンプルも立派な貢献です。そのあとコミュニティのチャットで声をかけて、レビュアーを見つけてください。", href: "https://crafters.chat", cta: "コミュニティに参加" },
      { id: "location", question: "参加するにはペルーに住んでいる必要がありますか？", answer: "いいえ。Crafter Station はリマで始まり、ラテンアメリカ各地やその先からメンバーが参加しています。" },
    ],
  },
}

/** The /oss questions, with live repository counts formatted for the locale. */
export function ossFaq(locale: Locale, stats: Stats) {
  const fmt = (n: number) => n.toLocaleString(locale)
  const c = copy[locale]
  return { label: c.label, title: c.title, items: c.items({ repos: fmt(stats.repos), stars: fmt(stats.stars), issues: fmt(stats.issues) }) }
}
