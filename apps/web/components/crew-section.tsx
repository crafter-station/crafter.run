import Image from "next/image"
import { crewByArea, crewOrgs, initials } from "@/lib/crew"
import type { Locale } from "@/lib/i18n"

export function CrewSection({
  locale,
  copy,
}: {
  locale: Locale
  copy: { eyebrow: string; title: string; body: string; areas: Record<"hack0" | "research", string>; lead: (name: string) => string }
}) {
  return (
    <section id="crew" className="station-crew" aria-labelledby="crew-title">
      <p className="station-label text-accent">{copy.eyebrow}</p>
      <h2 id="crew-title" className="mt-3">{copy.title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{copy.body}</p>
      <div className="station-crew-areas">
        {crewByArea().map(({ area, lead, members }) => (
          <div key={area} className="station-crew-area">
            <div className="station-crew-area-head">
              <h3>{copy.areas[area]}</h3>
              <p className="station-label text-muted-foreground">{copy.lead(lead.name)}</p>
            </div>
            <ul>
              {members.map((member) => (
                <li key={member.username}>
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="station-crew-person" data-area={area}>
                    <span className="station-crew-portrait">
                      {member.image ? (
                        <Image src={member.image} alt="" fill sizes="(max-width: 399px) 100vw, (max-width: 767px) 50vw, 25vw" />
                      ) : (
                        <span className="station-crew-mono" aria-hidden="true">{initials(member.name)}</span>
                      )}
                    </span>
                    <span className="station-crew-name">{member.name}</span>
                    <span className="station-crew-role">{member.role[locale]}</span>
                    {member.org && <span className="station-crew-org">{crewOrgs[member.org].name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
