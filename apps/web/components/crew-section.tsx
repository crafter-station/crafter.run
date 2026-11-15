import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { crewByArea, crewOrgs, initials } from "@/lib/crew"
import { type Locale, withLocale } from "@/lib/i18n"

export async function CrewSection({ locale, heading = true }: { locale: Locale; heading?: boolean }) {
  const t = await getTranslations({ locale, namespace: "pages.team" })
  const copy = {
    areas: { hack0: t("crewAreaHack0"), research: t("crewAreaResearch") },
    lead: (name: string) => t("crewLead", { name }),
  }
  return (
    <section id="crew" className="station-crew" aria-label={heading ? undefined : t("crewEyebrow")} aria-labelledby={heading ? "crew-title" : undefined}>
      {heading && (
        <>
          <p className="station-label text-accent">{t("crewEyebrow")}</p>
          <h2 id="crew-title" className="mt-3">{t("crewTitle")}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t("crewBody")}</p>
          <Link href={withLocale("/team/crew", locale)} className="mt-5 inline-flex"><ArrowLink>{t("crewMore")}</ArrowLink></Link>
        </>
      )}
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
