import Link from "next/link";
import { notFound } from "next/navigation";
import { HotReloadTheme } from "@/components/hot-reload-theme";
import { PhotoGallery } from "@/components/photo-gallery";
import { eventsGalleryCopy } from "@/lib/event-albums";
import { hotReloadCopy } from "@/lib/hot-reload-copy";
import {
	allRecapItems,
	recapCopy,
	recapSrc,
	toGalleryItems,
} from "@/lib/hot-reload-recap";
import { isLocale, withLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const items = allRecapItems();
	const first = items[0];
	if (!isLocale(lang) || !first) return {};
	const t = recapCopy[lang];
	const title = `Hot Reload · ${t.gallery}`;
	return buildMetadata({
		locale: lang,
		path: "/events/hot-reload/gallery",
		title,
		description: `Hot Reload. ${t.photos.replace("{count}", String(items.length))}.`,
		image: { url: recapSrc(first.edition, first.photo.id), alt: title },
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	const items = allRecapItems();
	if (!isLocale(lang) || !items.length) notFound();
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
						/ <span aria-current="page">{r.gallery}</span>
					</nav>
					<h1>{r.gallery}</h1>
					<p className="hot-reload-caps hr-recap-links">
						<span>{r.photos.replace("{count}", String(items.length))}</span>
						<Link href={withLocale("/events/gallery", lang)}>
							{eventsGalleryCopy(lang).breadcrumb} ↗
						</Link>
					</p>
				</header>
				<PhotoGallery
					items={toGalleryItems(
						items,
						lang,
						new Set(items.map((item) => item.edition)).size > 1,
					)}
					locale={lang}
				/>
			</section>
		</HotReloadTheme>
	);
}
