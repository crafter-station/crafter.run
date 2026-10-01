import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { teamMembers } from "@/lib/team"
import { getIndexPosts } from "@/lib/blog"

export function StationPeople({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  const people = ["shiara","railly","cuevaio","emmy"].flatMap(username => {
    const person = teamMembers.find(member => member.username === username)
    return person ? [person] : []
  })
  return (
    <section className="home-people" aria-labelledby="home-people-title">
      <div className="home-people-heading"><p className="station-label">05 / {t.people}</p><span className="home-handwritten" aria-hidden="true">hello, world :)</span></div>
      <h2 id="home-people-title">{t.peopleTitle}</h2>
      <div className="home-portraits">
        {people.map((person,i) => <Link href={withLocale(`/team/${person.username}`,locale)} key={person.username} className="home-portrait">
          <div className="home-portrait-image">
            <img src={person.image} alt="" width="360" height="420" loading="lazy" />
            <ArrowUpRight size={24} aria-hidden="true" />
          </div>
          <div className="home-portrait-caption"><span>{person.name}</span><span className="station-label">0{i+1}</span></div>
        </Link>)}
      </div>
      <div className="home-people-footer">
        <p>{t.peopleBody}</p>
        <div>
          <a className="station-button" href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.join}<ArrowUpRight size={18} aria-hidden="true" /></a>
          <Link href={withLocale("/team",locale)} className="station-text-link">{t.meetTeam}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="home-people-social"><span className="station-label">{t.peopleNote}</span><div><a href="https://instagram.com/crafter.station/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.youtube.com/@crafterstation" target="_blank" rel="noopener noreferrer">YouTube ↗</a></div></div>
    </section>
  )
}

export function StationJournal({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  const posts = getIndexPosts(locale).slice(0,3)
  if (!posts.length) return null
  return (
    <section className="home-journal" aria-labelledby="home-journal-title">
      <div className="home-journal-intro">
        <p className="station-label">07 / {t.journal}</p>
        <h2 id="home-journal-title">{t.journalTitle}</h2>
        <Link href={withLocale("/blog",locale)} className="station-editorial-link">{t.allPosts}<ArrowUpRight size={18} aria-hidden="true" /></Link>
        <span className="home-journal-asterisk" aria-hidden="true">✳</span>
      </div>
      <div className="home-journal-posts">
        {posts.map((post,i) => <article key={post.slug}>
          <Link href={withLocale(`/blog/${post.slug}`,post.locale)} lang={post.locale}>
            <div className="station-label"><span>0{i+1} / {post.kind}</span><time dateTime={post.date}>{new Intl.DateTimeFormat(locale,{year:"numeric",month:"short",day:"numeric",timeZone:"UTC"}).format(new Date(`${post.date}T00:00:00Z`))}</time></div>
            <h3>{post.title}<ArrowUpRight size={23} aria-hidden="true" /></h3>
            <p>{post.summary}</p>
            <span className="home-journal-author">{post.authors.map(id=>teamMembers.find(p=>p.username===id)?.name).filter(Boolean).join(" · ")}{post.locale !== locale ? ` / ${post.locale.toUpperCase()}` : ""}</span>
          </Link>
        </article>)}
      </div>
    </section>
  )
}

export function StationExplore({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  return (
    <nav className="home-explore" aria-label={t.explore}>
      <p className="station-label">{t.explore}</p>
      {[[t.community,"/community"],[t.ships,"/ships"],[t.docs,"/docs"],[t.workWithUs,"/team/work-with-us"]].map(([label,path]) =>
        <Link key={path} href={withLocale(path,locale)}>{label}<ArrowRight size={18} aria-hidden="true" /></Link>
      )}
    </nav>
  )
}
