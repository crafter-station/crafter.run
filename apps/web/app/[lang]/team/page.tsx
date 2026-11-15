import { StationPageHero } from "@/components/station-page-hero"
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container, SectionGap } from "@/components/grid-container";
import { CrewSection } from "@/components/crew-section";
import { JoinCallout } from "@/components/join-callout";
import { TeamGrid } from "@/components/team-grid";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { alumniTeam, team } from "@/lib/site";
import { countryCount, primaryLink } from "@/lib/team";
import { crewMembers } from "@/lib/crew";

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
        <CrewSection locale={lang} />
      </Container>
      <SectionGap />
      <JoinCallout locale={lang} />
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
