import Link from "next/link";

import { EventStamp } from "@/components/event-stamp";
import { RecapImage } from "@/components/hot-reload-recap-image";
import { eventsGalleryCopy } from "@/lib/event-albums";
import {
	type HotReloadRecap,
	recapCopy,
	recapItems,
	toGalleryItems,
} from "@/lib/hot-reload-recap";
import { type Locale, withLocale } from "@/lib/i18n";
import type { GalleryItem } from "@/lib/photo-gallery";

/** Five tiles: one large, four around it; the last one carries the count of photos not shown. */
export function RecapBento({
	items,
	total,
	galleryHref,
	locale,
}: {
	items: GalleryItem[];
	total: number;
	galleryHref: string;
	locale: Locale;
}) {
	const t = recapCopy[locale];
	const tiles = items.slice(0, 5);
	const rest = total - tiles.length;
	return (
		<div className="hr-bento">
			{tiles.map((item, index) => {
				const last = index === tiles.length - 1 && rest > 0;
				return (
					<Link
						key={item.key}
						href={`${galleryHref}#${item.key}`}
						className="hr-bento-tile"
						data-lead={index === 0 ? "" : undefined}
						aria-label={
							last
								? `${t.viewGallery}, ${t.photos.replace("{count}", String(total))}`
								: item.alt
						}
					>
						<RecapImage
							src={index === 0 ? item.src : item.thumb}
							blur={item.blur}
							alt={item.alt}
							width={item.width}
							height={item.height}
							sizes={
								index === 0
									? "(min-width: 900px) 50vw, 100vw"
									: "(min-width: 900px) 25vw, 50vw"
							}
						/>
						{item.stamp && !last ? <EventStamp src={item.stamp.src} /> : null}
						{last ? (
							<span className="hr-bento-more">
								<span className="hot-reload-display">+{rest}</span>
								<span className="hot-reload-caps">{t.viewGallery}</span>
							</span>
						) : null}
					</Link>
				);
			})}
		</div>
	);
}

/** Recap block: headline, links to the posts, bento, and the gallery button. */
export function RecapBlock({
	picks,
	total,
	galleryHref,
	journalHref,
	personalUrl,
	locale,
	allHref,
}: {
	picks: GalleryItem[];
	total: number;
	galleryHref: string;
	journalHref: string;
	personalUrl: string;
	locale: Locale;
	allHref?: string;
}) {
	const t = recapCopy[locale];
	return (
		<section className="hr-recap" id="recap" aria-labelledby="hr-recap-title">
			<header className="hr-recap-head">
				<h2 id="hr-recap-title">{t.recap}</h2>
				<nav className="hr-recap-links hot-reload-caps" aria-label={t.recap}>
					<Link href={journalHref}>{t.journal} ↗</Link>
					<a href={personalUrl} target="_blank" rel="noopener noreferrer">
						{t.personal} ↗
					</a>
				</nav>
			</header>
			<RecapBento
				items={picks}
				total={total}
				galleryHref={galleryHref}
				locale={locale}
			/>
			<div className="hr-recap-foot">
				<Link href={galleryHref} className="hot-reload-display hot-reload-cta">
					{t.viewGallery} · {t.photos.replace("{count}", String(total))}
				</Link>
				{allHref ? (
					<Link href={allHref} className="hot-reload-caps hr-recap-all">
						{eventsGalleryCopy(locale).viewAll} ↗
					</Link>
				) : null}
			</div>
		</section>
	);
}

export function HotReloadRecapSection({
	edition,
	recap,
	locale,
}: {
	edition: number;
	recap: HotReloadRecap;
	locale: Locale;
}) {
	const items = recapItems(edition);
	const picks = recap.bento.flatMap((id) =>
		items.filter((item) => item.photo.id === id),
	);
	return (
		<RecapBlock
			picks={toGalleryItems(picks, locale)}
			total={items.length}
			galleryHref={withLocale(`/events/hot-reload/${edition}/gallery`, locale)}
			journalHref={withLocale(`/blog/${recap.journalSlug}`, locale)}
			personalUrl={recap.personalUrl}
			locale={locale}
			allHref={withLocale("/events/gallery", locale)}
		/>
	);
}
