import Link from "next/link"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { featuredTeamMembers, teamMembers } from "@/lib/team"
import { getIndexPosts } from "@/lib/blog"

export function StationPeople({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  return (
    <section className="home-people" aria-labelledby="home-people-title">
      <svg className="home-portrait-defs" aria-hidden="true" focusable="false" width="0" height="0">
        <defs>
          <clipPath id="portrait-shape-0" clipPathUnits="objectBoundingBox">
            <path d="M.09,.19 C.18,.01 .48,-.03 .65,.04 C.88,.01 1,.23 .97,.44 C1,.66 .91,.89 .73,.96 C.50,1.04 .17,.99 .06,.83 C-.05,.65 .01,.36 .09,.19Z" />
          </clipPath>
          <clipPath id="portrait-shape-1" clipPathUnits="objectBoundingBox">
            <path d="M.50,0 C.67,0 .69,.10 .79,.11 C.94,.10 1,.26 .96,.38 C1,.49 1,.59 .95,.68 C.99,.86 .84,1 .69,.96 C.55,1.02 .41,1.02 .30,.96 C.13,1 .01,.86 .06,.69 C-.02,.54 0,.43 .05,.34 C0,.20 .15,.07 .28,.10 C.34,.04 .39,0 .50,0Z" />
          </clipPath>
          <clipPath id="portrait-shape-2" clipPathUnits="objectBoundingBox">
            <path d="M.03,.36 C.03,.12 .24,-.03 .48,.02 C.70,-.03 .96,.13 .97,.36 L1,.83 C.90,.95 .70,1 .52,.96 C.31,1.02 .08,.97 0,.86Z" />
          </clipPath>
          <clipPath id="portrait-shape-3" clipPathUnits="objectBoundingBox">
            <path d="M.16,.07 L.78,0 Q.94,0 .98,.18 L.94,.40 L1,.69 Q1,.89 .81,.93 L.57,1 L.31,.94 Q.07,1 .04,.78 L0,.50 L.06,.26 Q.03,.11 .16,.07Z" />
          </clipPath>
          <clipPath id="portrait-crop-0" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V.84 C1,.96 .78,1 .51,.99 C.28,1 .03,.96 0,.84Z" />
          </clipPath>
          <clipPath id="portrait-crop-1" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V.88 C.90,1 .76,1 .64,.96 C.51,1.03 .37,1 .29,.97 C.10,1 .01,.96 0,.85Z" />
          </clipPath>
          <clipPath id="portrait-crop-2" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V.85 C.88,.98 .68,1 .52,.96 C.30,1.02 .08,.98 0,.86Z" />
          </clipPath>
          <clipPath id="portrait-crop-3" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V.86 Q1,.94 .80,.95 L.56,1 L.30,.95 Q.07,1 0,.86Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="home-people-heading"><p className="station-label">05 / {t.people}</p><span className="home-handwritten" aria-hidden="true">hello, world :)</span></div>
      <h2 id="home-people-title">{t.peopleTitle}</h2>
      <div className="home-portraits">
        {featuredTeamMembers.map((person,i) => <Link href={withLocale(`/team/${person.username}`,locale)} key={person.username} className="home-portrait">
          <div className="home-portrait-image">
            <div className="home-portrait-cutout" style={{ clipPath: `url(#portrait-crop-${i})` }}>
              <span className="home-portrait-plate" style={{ clipPath: `url(#portrait-shape-${i})` }} aria-hidden="true" />
              <img src={person.image} alt="" width="768" height="768" loading="lazy" />
            </div>
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
