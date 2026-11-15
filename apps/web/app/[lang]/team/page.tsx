import { StationPageHero } from "@/components/station-page-hero"
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLink } from "@/components/arrow-link";
import { Container, SectionGap } from "@/components/grid-container";
import { CrewSection } from "@/components/crew-section";
import { TeamGrid } from "@/components/team-grid";
import { isLocale, withLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { alumniTeam, team } from "@/lib/site";
import { countryCount, primaryLink } from "@/lib/team";
import { crewMembers } from "@/lib/crew";
import { participationCopy } from "@/lib/participation-copy";

const JOIN_EMAIL = "railly@crafterstation.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/team", namespace: "pages.team" });
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = await getTranslations({ locale: lang, namespace: "pages.team" });
  const participation = participationCopy[lang].team;

  return (
    <main className="flex-1">
      <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="people">
        <p className="station-team-count">
          <span>{t("teamCount", { members: team.length, countries: countryCount(team) })}</span>
          <span>{t("crewCount", { count: crewMembers.length })}</span>
        </p>
      </StationPageHero>
      <Container>
        <p className="station-label text-accent station-team-core-label">Core</p>
        <TeamGrid id="team-calendars" members={team} locale={lang} filters={{
          all: t("filterAll"),
          areas: { engineering: t("areaEngineering"), design: t("areaDesign"), growth: t("areaGrowth"), community: t("areaCommunity") },
        }} />
      </Container>
      <SectionGap />
      <Container>
        <CrewSection
          locale={lang}
          copy={{
            eyebrow: t("crewEyebrow"),
            title: t("crewTitle"),
            body: t("crewBody"),
            areas: { hack0: t("crewAreaHack0"), research: t("crewAreaResearch") },
            lead: (name) => t("crewLead", { name }),
          }}
        />
      </Container>
      <SectionGap />
      <Container innerClassName="station-callout station-team-note">
        <div id="join" className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <p className="station-label text-accent">{t("joinEyebrow")}</p>
            <h2 className="mt-3">{t("joinTitle")}</h2>
          </div>
          <div>
            <p className="leading-relaxed text-muted-foreground">{t("joinBody")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${JOIN_EMAIL}?subject=${encodeURIComponent(t("joinSubject"))}`}><ArrowLink>{t("joinAction")}</ArrowLink></a>
              <Link href={withLocale("/oss#contribute", lang)}><ArrowLink>{participation.contribute}</ArrowLink></Link>
            </div>
          </div>
        </div>
      </Container>
      {alumniTeam.length > 0 && (
        <Container innerClassName="py-12">
          <p className="station-label">{t("alumniEyebrow")}</p>
          <p className="mt-3 text-muted-foreground">{t("alumniTitle")}</p>
          <ul className="station-team-alumni mt-6">
            {alumniTeam.map((member) => (
              <li key={member.username}>
                <a href={primaryLink(member)} target="_blank" rel="noopener noreferrer">
                  {member.name}<span className="station-label text-muted-foreground">{member.role}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </main>
  );
}
