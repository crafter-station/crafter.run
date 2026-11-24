import Link from "next/link";
import { notFound } from "next/navigation";

import { AlbumCards } from "@/components/event-albums";
import { EventsGalleryBrowser } from "@/components/events-gallery";
import { JsonLd } from "@/components/json-ld";
import {
	albumPhotos,
	eventAlbums,
	eventsGalleryCopy,
	seriesLabel,
} from "@/lib/event-albums";
import { recapCopy } from "@/lib/hot-reload-recap";
import { isLocale, withLocale } from "@/lib/i18n";
import { absoluteUrl, buildMetadata, localizedUrl } from "@/lib/seo";
import { breadcrumbList } from "@/lib/structured-data";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) return {};
	const t = eventsGalleryCopy(lang);
	const photos = albumPhotos(lang);
	const cover = photos[0];
	return buildMetadata({
		locale: lang,
		path: "/events/gallery",
		title: `${t.title} · Crafter Station`,
		description: `${t.lede} ${recapCopy[lang].photos.replace("{count}", String(photos.length))}.`,
		image: cover ? { url: cover.src, alt: cover.alt } : undefined,
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string }>;
}) {
	const { lang } = await params;
	if (!isLocale(lang)) notFound();
	const t = eventsGalleryCopy(lang);
	const r = recapCopy[lang];
	const albums = eventAlbums();
	const photos = albumPhotos(lang);
	const series = (Object.keys(seriesLabel) as (keyof typeof seriesLabel)[])
		.map((id) => ({
			id,
			label: seriesLabel[id],
			count: photos.filter((photo) => photo.series === id).length,
		}))
		.filter((item) => item.count > 0);
	const schema = {
		"@context": "https://schema.org",
		"@type": "ImageGallery",
		name: `${t.title} · Crafter Station`,
		url: localizedUrl("/events/gallery", lang),
		description: t.lede,
		image: photos.slice(0, 12).map((photo) => ({
			"@type": "ImageObject",
			contentUrl: absoluteUrl(photo.src),
			caption: photo.alt,
		})),
	};

	return (
		<main className="ev-gallery">
			<JsonLd data={schema} />
			<JsonLd
				data={breadcrumbList(lang, [
					{ name: "Crafter Station", path: "/" },
					{ name: t.eyebrow, path: "/events" },
					{ name: t.title, path: "/events/gallery" },
				])}
			/>
			<header className="ev-gallery-head">
				<nav className="station-label ev-gallery-crumbs" aria-label={t.eyebrow}>
					<Link href={withLocale("/events", lang)}>{t.eyebrow}</Link> /{" "}
					<span aria-current="page">{t.title}</span>
				</nav>
				<h1>{t.title}</h1>
				<p className="ev-gallery-lede">{t.lede}</p>
				<p className="station-label ev-gallery-count">
					{r.photos.replace("{count}", String(photos.length))} ·{" "}
					{t.events.replace("{count}", String(albums.length))}
				</p>
			</header>
			<section className="ev-gallery-section" aria-labelledby="ev-albums-title">
				<h2 id="ev-albums-title" className="station-label">
					{t.albums}
				</h2>
				<AlbumCards albums={albums} locale={lang} />
			</section>
			<section className="ev-gallery-section" aria-label={t.title}>
				<EventsGalleryBrowser
					photos={photos}
					series={series}
					locale={lang}
					allLabel={t.all}
					filterLabel={t.filter}
				/>
			</section>
		</main>
	);
}
