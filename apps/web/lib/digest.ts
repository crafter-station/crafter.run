import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { z } from "zod"
import { type Locale, locales } from "@/lib/i18n"
import { getTeamMember } from "@/lib/team"

/**
 * Monthly digest: reads changelog entries, renders an email, creates a Resend broadcast as a draft.
 * Nothing in here sends an email. Sending stays a manual step in the Resend dashboard.
 */

export const SITE = "https://crafter.run"
export const PULSE = "https://pulse.crafter.run"
export const UNSUBSCRIBE = "{{{RESEND_UNSUBSCRIBE_URL}}}"

const entrySchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.coerce.date(),
  area: z.enum(["research", "lab", "games", "station"]),
  kind: z.enum(["ship", "update", "event", "roundup"]),
  crafters: z.array(z.string()).default([]),
  image: z.string().optional(),
  evidence: z.array(z.unknown()).default([]),
})

export type DigestEntry = {
  slug: string
  locale: string
  title: string
  summary: string
  date: string
  area: string
  kind: string
  crafters: string[]
  image?: string
}

export type DigestMetrics = {
  monthCommits: number
  monthAdditions: number
  monthDeletions: number
  totalCommits: number
  teamStreak: number
  weekTop: { name: string; commits: number }[]
  asOf: string
}

const FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.([a-z]{2})\.mdx$/

/** Entries of one month. A missing directory is an empty month. Falls back to English, then any locale. */
export function readEntries(dir: string, month: string, locale: Locale): DigestEntry[] {
  if (!fs.existsSync(dir)) return []
  const bySlug = new Map<string, DigestEntry[]>()
  for (const file of fs.readdirSync(dir)) {
    const match = FILE.exec(file)
    if (!match || !match[1].startsWith(month)) continue
    const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"))
    const parsed = entrySchema.safeParse(data)
    if (!parsed.success) throw new Error(`${file}: ${parsed.error.issues.map(i => `${i.path.join(".")} ${i.message}`).join(", ")}`)
    const entry: DigestEntry = {
      slug: match[2], locale: match[3], title: parsed.data.title, summary: parsed.data.summary,
      date: parsed.data.date.toISOString().slice(0, 10), area: parsed.data.area, kind: parsed.data.kind,
      crafters: parsed.data.crafters, image: parsed.data.image,
    }
    bySlug.set(match[2], [...(bySlug.get(match[2]) ?? []), entry])
  }
  return [...bySlug.values()]
    .map(variants => variants.find(v => v.locale === locale) ?? variants.find(v => v.locale === "en") ?? variants[0])
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

/** Public read-only Pulse endpoints: /api/stats (last 30 days) and /api/leaderboard (current week). */
export async function fetchMetrics(now = new Date()): Promise<DigestMetrics | null> {
  try {
    const [stats, board] = await Promise.all([
      fetch(`${PULSE}/api/stats`).then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))))),
      fetch(`${PULSE}/api/leaderboard`).then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status))))),
    ])
    return {
      monthCommits: stats.monthStats.commits, monthAdditions: stats.monthStats.additions, monthDeletions: stats.monthStats.deletions,
      totalCommits: stats.totalCommits, teamStreak: stats.teamStreak,
      weekTop: (board as { displayName: string; commits: number }[]).slice(0, 3).map(m => ({ name: m.displayName, commits: m.commits })),
      asOf: now.toISOString().slice(0, 10),
    }
  } catch {
    return null
  }
}

const copy: Record<Locale, {
  subject: (month: string) => string; kicker: string; intro: string; empty: string; builtBy: string; all: string
  metrics: string; metricsNote: (asOf: string) => string; commits: string; lines: string; streak: string; total: string; top: string
  perks: string; footer: string; unsubscribe: string
}> = {
  en: { subject: m => `Crafter Station, ${m}`, kicker: "Monthly digest", intro: "What Crafter Station shipped this month.", empty: "No entries for this month yet.",
    builtBy: "Built by", all: "See everything on the changelog", metrics: "The numbers", metricsNote: d => `From Pulse, last 30 days up to ${d}.`,
    commits: "commits", lines: "lines added", streak: "day team streak", total: "commits all time", top: "Most commits this week",
    perks: "You will get first access to Crafter Perks when it opens.", footer: "You get this because you signed up at crafter.run.", unsubscribe: "Unsubscribe" },
  es: { subject: m => `Crafter Station, ${m}`, kicker: "Resumen mensual", intro: "Lo que Crafter Station lanzó este mes.", empty: "Todavía no hay entradas de este mes.",
    builtBy: "Construido por", all: "Mira todo en el changelog", metrics: "Los números", metricsNote: d => `Desde Pulse, últimos 30 días hasta el ${d}.`,
    commits: "commits", lines: "líneas añadidas", streak: "días de racha del equipo", total: "commits en total", top: "Más commits esta semana",
    perks: "Tendrás acceso anticipado a Crafter Perks cuando abra.", footer: "Recibes esto porque te suscribiste en crafter.run.", unsubscribe: "Darme de baja" },
  pt: { subject: m => `Crafter Station, ${m}`, kicker: "Resumo mensal", intro: "O que a Crafter Station lançou neste mês.", empty: "Ainda não há entradas deste mês.",
    builtBy: "Construído por", all: "Veja tudo no changelog", metrics: "Os números", metricsNote: d => `Do Pulse, últimos 30 dias até ${d}.`,
    commits: "commits", lines: "linhas adicionadas", streak: "dias de sequência do time", total: "commits no total", top: "Mais commits nesta semana",
    perks: "Você terá acesso antecipado ao Crafter Perks quando ele abrir.", footer: "Você recebe isto porque se inscreveu em crafter.run.", unsubscribe: "Cancelar inscrição" },
  zh: { subject: m => `Crafter Station，${m}`, kicker: "每月摘要", intro: "Crafter Station 本月发布了什么。", empty: "本月暂无条目。",
    builtBy: "作者", all: "在更新日志查看全部", metrics: "数据", metricsNote: d => `来自 Pulse，截至 ${d} 的最近 30 天。`,
    commits: "次提交", lines: "行新增代码", streak: "天团队连续提交", total: "累计提交", top: "本周提交最多",
    perks: "Crafter Perks 开放时，你将优先使用。", footer: "你收到这封邮件，是因为你在 crafter.run 订阅了。", unsubscribe: "退订" },
  ja: { subject: m => `Crafter Station、${m}`, kicker: "月次ダイジェスト", intro: "今月 Crafter Station が公開したもの。", empty: "今月のエントリはまだありません。",
    builtBy: "作成", all: "変更履歴ですべて見る", metrics: "数字", metricsNote: d => `Pulse より、${d} までの直近30日。`,
    commits: "コミット", lines: "追加行数", streak: "日連続コミット", total: "累計コミット", top: "今週のコミット上位",
    perks: "Crafter Perks が始まったら、先行アクセスをお届けします。", footer: "crafter.run で登録したためこのメールをお送りしています。", unsubscribe: "配信停止" },
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
const num = (n: number, locale: Locale) => new Intl.NumberFormat(locale).format(n)

export function absoluteUrl(url: string) {
  return /^https?:\/\//.test(url) ? url : `${SITE}${url.startsWith("/") ? "" : "/"}${url}`
}

export function monthLabel(month: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T00:00:00Z`))
}

const defaultName = (username: string) => getTeamMember(username)?.name ?? username

export function renderDigest(input: {
  month: string; locale: Locale; entries: DigestEntry[]; metrics: DigestMetrics | null; nameFor?: (username: string) => string
}) {
  const { month, locale, entries, metrics, nameFor = defaultName } = input
  const t = copy[locale]
  const label = monthLabel(month, locale)
  const changelog = `${SITE}/${locale}/changelog`
  const ink = "#1f1b24"
  const muted = "#5c5666"
  const accent = "#76618f"
  const sans = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"

  const entryHtml = entries.map(entry => {
    const credit = entry.crafters.length ? `${t.builtBy} ${entry.crafters.map(c => esc(nameFor(c))).join(", ")}` : ""
    return `<tr><td style="padding:0 0 28px 0;">
${entry.image ? `<a href="${changelog}"><img src="${esc(absoluteUrl(entry.image))}" alt="" width="552" style="display:block;width:100%;max-width:552px;height:auto;border:0;border-radius:6px;margin-bottom:14px;"></a>` : ""}
<p style="margin:0 0 6px 0;font:13px/1.4 ${sans};letter-spacing:.08em;text-transform:uppercase;color:${accent};">${esc(entry.area)} / ${esc(entry.kind)} / ${esc(entry.date)}</p>
<h2 style="margin:0 0 8px 0;font:600 22px/1.25 ${sans};color:${ink};"><a href="${changelog}" style="color:${ink};text-decoration:none;">${esc(entry.title)}</a></h2>
<p style="margin:0 0 6px 0;font:16px/1.6 ${sans};color:${muted};">${esc(entry.summary)}</p>
${credit ? `<p style="margin:0;font:14px/1.5 ${sans};color:${muted};">${credit}</p>` : ""}
</td></tr>`
  }).join("\n")

  const metricsHtml = metrics ? `<tr><td style="padding:8px 0 28px 0;">
<h2 style="margin:0 0 6px 0;font:600 22px/1.25 ${sans};color:${ink};">${t.metrics}</h2>
<p style="margin:0 0 14px 0;font:14px/1.5 ${sans};color:${muted};">${esc(t.metricsNote(metrics.asOf))}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
${[[metrics.monthCommits, t.commits], [metrics.monthAdditions, t.lines], [metrics.teamStreak, t.streak]].map(([n, l]) =>
  `<td style="padding:14px;background:#ffffff;border-radius:6px;"><p style="margin:0;font:600 26px/1.1 ${sans};color:${ink};">${num(n as number, locale)}</p><p style="margin:4px 0 0 0;font:13px/1.4 ${sans};color:${muted};">${esc(l as string)}</p></td>`).join('<td width="8"></td>')}
</tr></table>
${metrics.weekTop.length ? `<p style="margin:14px 0 0 0;font:14px/1.6 ${sans};color:${muted};">${t.top}: ${metrics.weekTop.map(m => `${esc(m.name)} (${num(m.commits, locale)})`).join(", ")}</p>` : ""}
</td></tr>` : ""

  const html = `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(t.subject(label))}</title></head>
<body style="margin:0;padding:0;background:#eeeaf3;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#eeeaf3;"><tr><td align="center" style="padding:32px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#faf8fc;border-radius:8px;"><tr><td style="padding:32px 24px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr><td style="padding:0 0 24px 0;">
<p style="margin:0 0 18px 0;font:600 15px/1 ${sans};letter-spacing:.02em;color:${ink};"><a href="${SITE}" style="color:${ink};text-decoration:none;">crafter station</a></p>
<p style="margin:0 0 8px 0;font:13px/1.4 ${sans};letter-spacing:.08em;text-transform:uppercase;color:${accent};">${t.kicker} / ${esc(label)}</p>
<h1 style="margin:0 0 10px 0;font:600 34px/1.1 ${sans};letter-spacing:-.02em;color:${ink};">${esc(t.intro)}</h1>
</td></tr>
${entries.length ? entryHtml : `<tr><td style="padding:0 0 28px 0;font:16px/1.6 ${sans};color:${muted};">${t.empty}</td></tr>`}
<tr><td style="padding:0 0 28px 0;"><a href="${changelog}" style="font:600 16px/1.4 ${sans};color:${accent};">${t.all} &rarr;</a></td></tr>
${metricsHtml}
<tr><td style="padding:20px;background:#eeeaf3;border-radius:6px;font:15px/1.6 ${sans};color:${ink};">${t.perks}</td></tr>
<tr><td style="padding:24px 0 0 0;font:13px/1.6 ${sans};color:${muted};">${t.footer} <a href="${UNSUBSCRIBE}" style="color:${muted};">${t.unsubscribe}</a></td></tr>
</table>
</td></tr></table>
</td></tr></table>
</body></html>`

  const text = [
    `${t.kicker.toUpperCase()} / ${label}`, t.intro, "",
    ...(entries.length ? entries.flatMap(e => [
      `${e.title} (${e.area} / ${e.kind} / ${e.date})`, e.summary,
      ...(e.crafters.length ? [`${t.builtBy} ${e.crafters.map(nameFor).join(", ")}`] : []),
      ...(e.image ? [absoluteUrl(e.image)] : []), ""]) : [t.empty, ""]),
    `${t.all}: ${changelog}`, "",
    ...(metrics ? [t.metrics, t.metricsNote(metrics.asOf),
      `${num(metrics.monthCommits, locale)} ${t.commits}, ${num(metrics.monthAdditions, locale)} ${t.lines}, ${num(metrics.teamStreak, locale)} ${t.streak}`,
      ...(metrics.weekTop.length ? [`${t.top}: ${metrics.weekTop.map(m => `${m.name} (${num(m.commits, locale)})`).join(", ")}`] : []), ""] : []),
    t.perks, "", `${t.footer} ${t.unsubscribe}: ${UNSUBSCRIBE}`,
  ].join("\n")

  return { subject: t.subject(label), html, text }
}

/**
 * Create Broadcast: https://resend.com/docs/api-reference/broadcasts/create-broadcast
 * `send` is omitted, which leaves the broadcast as a draft. There is deliberately no send function.
 */
export async function createDraftBroadcast(
  input: { name: string; from: string; subject: string; html: string; text: string },
  config: { apiKey: string; segmentId: string },
) {
  const response = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ segment_id: config.segmentId, ...input }),
  })
  const body = (await response.json().catch(() => null)) as { id?: string; message?: string } | null
  if (!response.ok || !body?.id) throw new Error(`Resend ${response.status}: ${body?.message ?? "no broadcast id"}`)
  return body.id
}

export { locales }
