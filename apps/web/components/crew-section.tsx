import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { HomeHead } from "@/components/home-head"
import { crewByArea, crewOrgs, initials } from "@/lib/crew"
import { type Locale, withLocale } from "@/lib/i18n"

export async function CrewSection({ locale, heading = true, index = 2 }: { locale: Locale; heading?: boolean; index?: number }) {
  const t = await getTranslations({ locale, namespace: "pages.team" })
  const copy = {
    areas: { hack0: t("crewAreaHack0"), research: t("crewAreaResearch") },
    lead: (name: string) => t("crewLead", { name }),
  }
  return (
    <section id="crew" className="station-crew" aria-label={heading ? undefined : t("crewEyebrow")} aria-labelledby={heading ? "crew-title" : undefined}>
      {heading && (
        <HomeHead id="crew-title" index={index} label={t("crewEyebrow")} title={t("crewTitle")} lede={t("crewBody")}>
          <Link href={withLocale("/team/crew", locale)} className="home-secondary-link">{t("crewMore")}</Link>
        </HomeHead>
      )}
      <div className="station-crew-areas">
        {crewByArea().map(({ area, lead, members }) => (
          <div key={area} className="station-crew-area home-frame">
            <div className="station-crew-area-head">
              <h3>{copy.areas[area]}</h3>
              <p className="home-label-sm">{copy.lead(lead.name)}</p>
            </div>
            <ul className="station-tiles station-crew-list">
              {members.map((member) => (
                <li key={member.username}>
                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="station-crew-person" data-area={area}>
                    <span className="station-crew-portrait">
                      {member.image ? (
                        <Image src={member.image} alt="" fill sizes="(max-width: 767px) 50vw, 20vw" />
                      ) : (
                        <span className="station-crew-mono" aria-hidden="true">{initials(member.name)}</span>
                      )}
                    </span>
                    <span className="station-crew-name">{member.name}</span>
                    <span className="station-crew-role">{member.role[locale]}</span>
                    {member.org && <span className="station-crew-org home-label-sm">{crewOrgs[member.org].name}</span>}
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
