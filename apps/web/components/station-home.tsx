import Link from "next/link"
import { type Locale, withLocale } from "@/lib/i18n"
import { homeCopy } from "@/lib/home-copy"
import { featuredTeamMembers, teamMembers } from "@/lib/team"
import { getIndexPosts } from "@/lib/blog"

// Original decorative drawings for Station's editorial spread.
function NotebookArt() {
  return (
    <svg className="home-notebook-art" viewBox="0 0 440 240" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="m44 114 160-29 172 34-142 86Z" fill="#c3b6d4" />
        <path d="m48 103 159-37 170 38-143 89Z" fill="#f5f0e8" />
        <path d="m207 66 27 127M48 103l4 11 180 93 145-89v-14" />
        <path d="m81 104 94-22m-76 35 82-20m-63 34 64-16m-39 32 41-11M241 86l91 21m-86-7 67 16m-61-3 44 11" opacity=".4" />
        <path d="M209 47c-54-70-115 20-53 34 38 9 47-40 9-30-20 6-11 36 33 41" />
        <path d="m174 81 24 11-20 15" />
        <path d="m294 17-11 30m-17-29 26 27m-34-8 37-9m-30 28 28-35" strokeWidth="3" />
        <path d="m369 54 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" fill="currentColor" />
      </g>
    </svg>
  )
}

function ConversationArt() {
  return (
    <svg className="home-conversation-art" viewBox="0 0 350 230" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M44 51c-30 51-18 96 29 108l-13 41 55-34c66 6 107-12 115-59 9-49-61-88-129-78" />
        <path d="M133 120c21 49 73 65 113 53l44 22-5-40c32-29 27-81-4-108-30-28-76-30-109-15" />
        <path d="m106 83-21 21 21 18m54-40 22 17-20 23m-24-54-15 72" strokeWidth="4" />
        <path d="m228 67-3 44m-20-24 44 4m-38-17 31 29m-4-33-29 34" />
        <path d="M36 22 20 7m30 1-3 16m-22 9-18-1M315 152l20 5m-24 11 7 19" />
      </g>
    </svg>
  )
}

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
      <div className="home-people-heading"><h2 id="home-people-title">{t.people}</h2><span className="home-handwritten" aria-hidden="true">hello, world :)</span></div>
      <div className="home-portraits">
        {featuredTeamMembers.map((person,i) => <Link href={withLocale(`/team/${person.username}`,locale)} key={person.username} className="home-portrait">
          <div className="home-portrait-image">
            <div className="home-portrait-cutout" style={{ clipPath: `url(#portrait-crop-${i})` }}>
              <span className="home-portrait-plate" style={{ clipPath: `url(#portrait-shape-${i})` }} aria-hidden="true" />
              <img src={person.image} alt="" width="768" height="768" loading="lazy" />
            </div>
          </div>
          <div className="home-portrait-caption"><span>{person.name}</span><span className="station-label">0{i+1}</span></div>
        </Link>)}
      </div>
      <div className="home-people-footer">
        <p>{t.peopleBody}</p>
        <div>
          <a className="station-button" href="https://crafters.chat" target="_blank" rel="noopener noreferrer">{t.join}</a>
          <Link href={withLocale("/team",locale)} className="home-secondary-link">{t.meetTeam}</Link>
        </div>
      </div>
    </section>
  )
}

export function StationJournal({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  const [featured, ...posts] = getIndexPosts(locale).slice(0,3)
  if (!featured) return null
  const date = (value: string) => new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`))
  const authors = (ids: string[]) => ids.map(id => teamMembers.find(p => p.username === id)?.name).filter(Boolean).join(" · ")
  return (
    <section className="home-journal" aria-labelledby="home-journal-title">
      <div className="home-journal-intro">
        <h2 id="home-journal-title">{t.journal}</h2>
        <Link href={withLocale("/blog",locale)} className="home-action-link">{t.allPosts}</Link>
      </div>
      <div className="home-journal-spread">
        <article className="home-journal-feature">
          <Link href={withLocale(`/blog/${featured.slug}`,featured.locale)} lang={featured.locale}>
            <div className="home-journal-meta station-label"><span>01 / {featured.kind}</span><time dateTime={featured.date}>{date(featured.date)}</time></div>
            <NotebookArt />
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>
            <div className="home-journal-feature-bottom">
              <span className="home-journal-author">{authors(featured.authors)}{featured.locale !== locale ? ` / ${featured.locale.toUpperCase()}` : ""}</span>
            </div>
          </Link>
        </article>
        <div className="home-journal-posts">
          {posts.map((post,i) => <article key={post.slug}>
            <Link href={withLocale(`/blog/${post.slug}`,post.locale)} lang={post.locale}>
              <div className="home-journal-meta station-label"><span>0{i+2} / {post.kind}</span><time dateTime={post.date}>{date(post.date)}</time></div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className="home-journal-author">{authors(post.authors)}{post.locale !== locale ? ` / ${post.locale.toUpperCase()}` : ""}</span>
            </Link>
          </article>)}
          <div className="home-journal-note"><p>{t.journalNote}</p></div>
        </div>
      </div>
    </section>
  )
}

export function StationContact({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  return (
    <section id="contact" className="home-contact" aria-labelledby="home-contact-title">
      <p className="station-label">{t.contactLabel}</p>
      <div className="home-contact-layout">
        <div className="home-contact-invitation">
          <div className="home-contact-heading">
            <h2 id="home-contact-title">{t.contactTitle.replaceAll("\n", " ")}</h2>
            <ConversationArt />
          </div>
          <p>{t.contactBody}</p>
          <div className="home-contact-links">
            <a href="https://crafters.chat" target="_blank" rel="noopener noreferrer" className="home-secondary-link">{t.join}</a>
            <Link href={withLocale("/contact#collaborate",locale)} className="home-secondary-link">{t.workWithUs}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StationExplore({ locale }: { locale: Locale }) {
  const t = homeCopy[locale]
  return (
    <nav className="home-explore" aria-label={t.explore}>
      <p className="station-label">{t.explore}</p>
      {[[t.community,"/community"],[t.ships,"/ships"],[t.docs,"/docs"],[t.workWithUs,"/contact#collaborate"]].map(([label,path]) =>
        <Link key={path} href={withLocale(path,locale)}><span>{label}</span></Link>
      )}
    </nav>
  )
}
