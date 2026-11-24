import Link from "next/link";
import { notFound } from "next/navigation";
import { HotReloadTheme } from "@/components/hot-reload-theme";
import { PhotoGallery } from "@/components/photo-gallery";
import { eventsGalleryCopy } from "@/lib/event-albums";
import { findEdition } from "@/lib/hot-reload";
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy";
import {
	findRecap,
	recapCopy,
	recapItems,
	recapSrc,
	toGalleryItems,
} from "@/lib/hot-reload-recap";
import { isLocale, withLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; edition: string }>;
}) {
	const { lang, edition: number } = await params;
	const edition = findEdition(number);
	const recap = edition && findRecap(edition.number);
	if (!isLocale(lang) || !edition || !recap) return {};
	const t = recapCopy[lang];
	const title = `${hotReloadText(hotReloadCopy[lang].edition, { number: String(edition.number).padStart(2, "0") })} · ${t.gallery}`;
	return buildMetadata({
		locale: lang,
		path: `/events/hot-reload/${edition.number}/gallery`,
		title,
		description: `Hot Reload ${String(edition.number).padStart(2, "0")}, ${edition.city}. ${t.photos.replace("{count}", String(recap.photos.length))}.`,
		image: {
			url: recapSrc(
				edition.number,
				recap.bento[0] ?? recap.photos[0]?.id ?? "01",
			),
			alt: title,
		},
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string; edition: string }>;
}) {
	const { lang, edition: number } = await params;
	const edition = findEdition(number);
	const recap = edition && findRecap(edition.number);
	if (!isLocale(lang) || !edition || !recap) notFound();
	const t = hotReloadCopy[lang];
	const r = recapCopy[lang];

	return (
		<HotReloadTheme locale={lang}>
			<section className="hr-gallery-page">
				<header className="hr-gallery-head">
					<nav
						aria-label={t.agenda}
						className="hot-reload-caps hot-reload-crumbs"
					>
						<Link href={withLocale("/events", lang)}>{t.agenda}</Link> /{" "}
						<Link href={withLocale("/events/hot-reload", lang)}>
							Hot Reload
						</Link>{" "}
						/{" "}
						<Link
							href={withLocale(`/events/hot-reload/${edition.number}`, lang)}
						>
							#{edition.number}
						</Link>{" "}
						/ <span aria-current="page">{r.gallery}</span>
					</nav>
					<h1>
						{hotReloadText(t.edition, {
							number: String(edition.number).padStart(2, "0"),
						})}
					</h1>
					<p className="hot-reload-caps hr-recap-links">
						<span>
							{r.photos.replace("{count}", String(recap.photos.length))}
						</span>
						<Link href={withLocale(`/blog/${recap.journalSlug}`, lang)}>
							{r.journal} ↗
						</Link>
						<a
							href={recap.personalUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{r.personal} ↗
						</a>
						<Link href={withLocale("/events/gallery", lang)}>
							{eventsGalleryCopy(lang).breadcrumb} ↗
						</Link>
					</p>
				</header>
				<PhotoGallery
					items={toGalleryItems(recapItems(edition.number), lang)}
					locale={lang}
				/>
			</section>
		</HotReloadTheme>
	);
}
