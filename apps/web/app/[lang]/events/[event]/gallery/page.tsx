import Link from "next/link";
import { notFound } from "next/navigation";
import { EventBadgeTheme } from "@/components/event-badge-theme";
import { PhotoGallery } from "@/components/photo-gallery";
import { findAccessEvent } from "@/lib/access-events";
import { eventsGalleryCopy } from "@/lib/event-albums";
import { eventGalleryItems, findEventRecap } from "@/lib/event-recap";
import { recapCopy } from "@/lib/hot-reload-recap";
import { isLocale, withLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import "@/app/station-event-access.css";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; event: string }>;
}) {
	const { lang, event: slug } = await params;
	const event = findAccessEvent(slug);
	const recap = event && findEventRecap(event.slug);
	if (!isLocale(lang) || !event || !recap) return { robots: { index: false } };
	const t = recapCopy[lang];
	const title = `${event.title} · ${t.gallery}`;
	const cover = recap.bento[0] ?? recap.photos[0]?.id;
	return buildMetadata({
		locale: lang,
		path: `/events/${event.slug}/gallery`,
		title,
		description: `${event.title}. ${t.photos.replace("{count}", String(recap.photos.length))}.`,
		image: cover
			? { url: `/events/${event.slug}/recap/${cover}.webp`, alt: title }
			: undefined,
	});
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string; event: string }>;
}) {
	const { lang, event: slug } = await params;
	const event = findAccessEvent(slug);
	const recap = event && findEventRecap(event.slug);
	if (!isLocale(lang) || !event || !recap) notFound();
	const t = recapCopy[lang];

	return (
		<EventBadgeTheme locale={lang} event={event}>
			<section className="hr-gallery-page">
				<header className="hr-gallery-head">
					<nav
						aria-label={event.title}
						className="hot-reload-caps hot-reload-crumbs"
					>
						<Link href={`/${lang}/events/${event.slug}`}>{event.title}</Link> /{" "}
						<span aria-current="page">{t.gallery}</span>
					</nav>
					<h1>{t.gallery}</h1>
					<p className="hot-reload-caps hr-recap-links">
						<span>
							{t.photos.replace("{count}", String(recap.photos.length))}
						</span>
						<Link href={`/${lang}/blog/${recap.journalSlug}`}>
							{t.journal} ↗
						</Link>
						<a
							href={recap.personalUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							{t.personal} ↗
						</a>
						<Link href={withLocale("/events/gallery", lang)}>
							{eventsGalleryCopy(lang).breadcrumb} ↗
						</Link>
					</p>
				</header>
				<PhotoGallery
					items={eventGalleryItems(event.slug, recap, lang)}
					locale={lang}
				/>
			</section>
		</EventBadgeTheme>
	);
}
