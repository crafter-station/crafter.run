import { notFound } from "next/navigation";

import { Container } from "@/components/grid-container";
import { StationPageHero } from "@/components/station-page-hero";
import { isLocale, locales } from "@/lib/i18n";
import { privacyCopy } from "@/lib/privacy-copy";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
	return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	const t = privacyCopy(lang);
	return buildMetadata({
		locale: lang,
		path: "/privacy",
		title: t.title,
		description: t.description,
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = privacyCopy(lang);
	return (
		<main className="flex-1">
			<StationPageHero
				eyebrow={t.eyebrow}
				title={t.title}
				description={t.description}
			/>
			<Container innerClassName="privacy-body">
				<p className="station-label privacy-updated">{t.updated}</p>
				{t.sections.map((section) => (
					<section key={section.title} className="privacy-section">
						<h2>{section.title}</h2>
						{section.body.map((paragraph) => (
							<p key={paragraph.slice(0, 40)}>{paragraph}</p>
						))}
					</section>
				))}
			</Container>
		</main>
	);
}
