/** A photo ready to render: every URL and label already resolved, so client components get plain data. */
export type GalleryItem = {
	key: string;
	src: string;
	thumb: string;
	blur: string;
	width: number;
	height: number;
	alt: string;
	tag?: string;
	/** Event stamp shown on the tile when photos from different events sit together. */
	stamp?: { src: string; label: string };
	/** Suggested text for posting this photo on LinkedIn. */
	share?: string;
};

import type { Locale } from "@/lib/i18n";

const photoShare: Record<Locale, string> = {
	en: "I was at {event} with Crafter Station. Here is one of the photos.",
	es: "Estuve en {event} con Crafter Station. Aquí una de las fotos.",
	pt: "Estive no {event} com a Crafter Station. Aqui uma das fotos.",
	zh: "我参加了 Crafter Station 的 {event}，这是其中一张照片。",
	ja: "Crafter Stationの{event}に参加しました。写真の一枚です。",
};

export function photoShareText(locale: Locale, event: string, path: string) {
	return `${photoShare[locale].replace("{event}", event)}\n\nhttps://crafter.run/${locale}${path}`;
}
