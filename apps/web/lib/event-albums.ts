import { findAccessEvent } from "@/lib/access-events";
import { eventGalleryItems, eventRecaps } from "@/lib/event-recap";
import { findEdition } from "@/lib/hot-reload";
import {
	hotReloadRecaps,
	recapItems,
	toGalleryItems,
} from "@/lib/hot-reload-recap";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/lib/photo-gallery";

export type AlbumSeries = "hot-reload" | "devday";

/** One event's photos, with everything the universal gallery needs to link back to it. */
export type EventAlbum = {
	id: string;
	series: AlbumSeries;
	title: string;
	startsAt: string;
	timeZone: string;
	city: string;
	eventPath: string;
	galleryPath: string;
	journalSlug: string;
	personalUrl: string;
	items: (locale: Locale) => GalleryItem[];
	bento: (locale: Locale) => GalleryItem[];
};

export const seriesLabel: Record<AlbumSeries, string> = {
	"hot-reload": "Hot Reload",
	devday: "DevDay Exchange",
};

export const seriesStamp: Record<AlbumSeries, string> = {
	"hot-reload": "/events/stamps/hot-reload.webp",
	devday: "/events/stamps/devday.webp",
};

function stamp(album: EventAlbum) {
	return { src: seriesStamp[album.series], label: album.title };
}

function hotReloadAlbums(): EventAlbum[] {
	return Object.entries(hotReloadRecaps).flatMap(([key, recap]) => {
		const edition = findEdition(key);
		if (!recap || !edition?.startsAt) return [];
		const number = String(edition.number).padStart(2, "0");
		return [
			{
				id: `hot-reload-${number}`,
				series: "hot-reload",
				title: `Hot Reload #${number}`,
				startsAt: edition.startsAt,
				timeZone: edition.timeZone,
				city: edition.city,
				eventPath: `/events/hot-reload/${edition.number}`,
				galleryPath: `/events/hot-reload/${edition.number}/gallery`,
				journalSlug: recap.journalSlug,
				personalUrl: recap.personalUrl,
				items: (locale) => toGalleryItems(recapItems(edition.number), locale),
				bento: (locale) =>
					toGalleryItems(
						recap.bento.flatMap((id) =>
							recapItems(edition.number).filter((item) => item.photo.id === id),
						),
						locale,
					),
			},
		];
	});
}

function accessEventAlbums(): EventAlbum[] {
	return Object.entries(eventRecaps).flatMap(([slug, recap]) => {
		const event = findAccessEvent(slug);
		if (!recap || !event) return [];
		return [
			{
				id: slug,
				series: "devday",
				title: event.title,
				startsAt: event.startsAt,
				timeZone: event.timeZone,
				city: "Lima",
				eventPath: `/events/${slug}`,
				galleryPath: `/events/${slug}/gallery`,
				journalSlug: recap.journalSlug,
				personalUrl: recap.personalUrl,
				items: (locale) => eventGalleryItems(slug, recap, locale),
				bento: (locale) => eventGalleryItems(slug, recap, locale, recap.bento),
			},
		];
	});
}

/** Every album, newest event first. */
export function eventAlbums(): EventAlbum[] {
	return [...hotReloadAlbums(), ...accessEventAlbums()].sort(
		(a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt),
	);
}

export function albumDate(album: EventAlbum, locale: Locale) {
	return new Intl.DateTimeFormat(locale, {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: album.timeZone,
	}).format(new Date(album.startsAt));
}

/** All photos across albums, each tagged with its album so the lightbox can say where it is from. */
export function albumPhotos(
	locale: Locale,
): (GalleryItem & { album: string; series: AlbumSeries })[] {
	return eventAlbums().flatMap((album) =>
		album.items(locale).map((item) => ({
			...item,
			key: `${album.id}-${item.key}`,
			tag: album.title,
			stamp: stamp(album),
			album: album.id,
			series: album.series,
		})),
	);
}

export function eventsGalleryCopy(locale: Locale) {
	return galleryCopy[locale];
}

const galleryCopy: Record<
	Locale,
	{
		title: string;
		eyebrow: string;
		lede: string;
		all: string;
		albums: string;
		events: string;
		viewAll: string;
		viewAlbum: string;
		breadcrumb: string;
		filter: string;
	}
> = {
	es: {
		title: "Galería",
		eyebrow: "Eventos",
		lede: "Las fotos de cada evento de Crafter Station: cafés, charlas y demos en vivo.",
		all: "Todas",
		albums: "Álbumes",
		events: "{count} eventos",
		viewAll: "Ver toda la galería",
		viewAlbum: "Ver álbum",
		breadcrumb: "Galería de eventos",
		filter: "Filtrar por evento",
	},
	en: {
		title: "Gallery",
		eyebrow: "Events",
		lede: "Photos from every Crafter Station event: coffees, talks and live demos.",
		all: "All",
		albums: "Albums",
		events: "{count} events",
		viewAll: "View the full gallery",
		viewAlbum: "View album",
		breadcrumb: "Events gallery",
		filter: "Filter by event",
	},
	pt: {
		title: "Galeria",
		eyebrow: "Eventos",
		lede: "As fotos de cada evento da Crafter Station: cafés, palestras e demos ao vivo.",
		all: "Todas",
		albums: "Álbuns",
		events: "{count} eventos",
		viewAll: "Ver toda a galeria",
		viewAlbum: "Ver álbum",
		breadcrumb: "Galeria de eventos",
		filter: "Filtrar por evento",
	},
	zh: {
		title: "相册",
		eyebrow: "活动",
		lede: "Crafter Station 每场活动的照片：咖啡聚会、分享和现场演示。",
		all: "全部",
		albums: "相册集",
		events: "{count} 场活动",
		viewAll: "查看全部相册",
		viewAlbum: "查看相册",
		breadcrumb: "活动相册",
		filter: "按活动筛选",
	},
	ja: {
		title: "ギャラリー",
		eyebrow: "イベント",
		lede: "Crafter Stationの各イベントの写真。コーヒー、トーク、ライブデモ。",
		all: "すべて",
		albums: "アルバム",
		events: "{count}件のイベント",
		viewAll: "ギャラリーをすべて見る",
		viewAlbum: "アルバムを見る",
		breadcrumb: "イベントギャラリー",
		filter: "イベントで絞り込む",
	},
};

/** Bento picks across albums, alternating so every event shows up near the top. */
export function mixedBento(locale: Locale, size = 5): GalleryItem[] {
	const lists = eventAlbums().map((album) =>
		album.bento(locale).map((item) => ({
			...item,
			key: `${album.id}-${item.key}`,
			stamp: stamp(album),
		})),
	);
	const mixed: GalleryItem[] = [];
	for (
		let i = 0;
		mixed.length < size && lists.some((list) => i < list.length);
		i++
	) {
		for (const list of lists) {
			const item = list[i];
			if (item && mixed.length < size) mixed.push(item);
		}
	}
	return mixed;
}
