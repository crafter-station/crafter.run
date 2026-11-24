import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/lib/photo-gallery";

export type RecapPhoto = {
	id: string;
	width: number;
	height: number;
	blur: string;
	alt: { es: string; en: string };
};

export type HotReloadRecap = {
	journalSlug: string;
	personalUrl: string;
	/** Photo ids for the edition page bento, in layout order; the first one is the large tile. */
	bento: string[];
	photos: RecapPhoto[];
};

export const hotReloadRecaps: Partial<Record<number, HotReloadRecap>> = {
	1: {
		journalSlug: "hot-reload-01-recap",
		personalUrl: "https://www.railly.dev/blog/hot-reload-01",
		bento: ["14", "07", "09", "11", "16"],
		photos: [
			{
				id: "01",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoMABAAAsBMJYwCdADdtn/WYAAA/q02cwcvPWks/7608PVkfH26+C63XkO2HqfeEsf1K5WOjMmH3pDjRTBhCHk65IJnjO1L45svyAaNXBlKe2Ulljw7xoAA",
				alt: {
					es: "Don Salazar Specialty Coffee antes de que llegaran los invitados",
					en: "Don Salazar Specialty Coffee before the guests arrived",
				},
			},
			{
				id: "02",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoMABAAAsBMJZQAAlbX0pcjgAD++GxX50e4N0LXfNUYlGFPY9qSVHOGKt61hZzTbFAQ/XqPY79hY7gOnKfb75W8S4DgAA==",
				alt: {
					es: "La barra de café de Don Salazar con la pared de plantas",
					en: "The Don Salazar coffee bar with the plant wall",
				},
			},
			{
				id: "03",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoMABAAAsBMJQBOgMX6tsJScIdEAP72lAHwqeGUBTEPhz7zU8euHQfXseNy03f80zUZ55gh6CF5sSr0Mq17rJanL3NEcxagIykpscynmgl9+fJXejeszyEKtKcikBa3UZtvKoIAAAA=",
				alt: {
					es: "Invitados conversando en una mesa junto a la pared de plantas",
					en: "Guests talking at a table by the plant wall",
				},
			},
			{
				id: "04",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoMABAAAsBMJYwCdAEO0I4+09FmgAD+93oOq7aFCYOCI0qut1CPCKb05QlTWd+24sjyfMShFeLjkKcnEkzjBCETP2WxjsTeWhTk7fNB6U10SGzubSAAAA==",
				alt: {
					es: "Vista amplia del café con los invitados en las mesas",
					en: "Wide view of the café with guests at the tables",
				},
			},
			{
				id: "05",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAACQAgCdASoMABAAAsBMJYwCdAYtB2lrUerTmCeDAAD+3e813lgLZya99Yatpr7+z+k6rImnnthfGOegs5JxRWK/kKXMGWfyjj+9YeVPFf2QDgnPbtwdS5tnLseLoFYg65nAAqoh+CwAAA==",
				alt: {
					es: "Mesa larga con invitados trabajando en sus laptops",
					en: "Long table with guests working on their laptops",
				},
			},
			{
				id: "06",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAQCdASoMABAAAsBMJYwCdAD5arQ9YaAA/tKQpiFllhLprzZQW8/auP88BkprrFutrynZGJBTBey+uSGXZ+Be5Dy/cbMziHjbWiRkUZ3ihRT5BMxmAhg/nnhr5CUQgAA=",
				alt: {
					es: "Invitados conversando alrededor de una mesa",
					en: "Guests talking around a table",
				},
			},
			{
				id: "07",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAwAgCdASoMABAAAsBMJYgCdAYvXbZhsk6owAD+2iEGgmsQsvVR9u4wI2ENkhnVe9CKDbHuImxr7+NOL/af17Xei5cEgBSXb7jO34p/xQgki3CNLONJ9eV6kMff9/RRqV7NouCrhGiMOoBF/vQAAA==",
				alt: {
					es: "Conversación cercana entre invitados",
					en: "A close conversation between guests",
				},
			},
			{
				id: "08",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAABQAgCdASoMABAAAsBMJZQCdAYvNgX1Wpolu4AA/q06+WVs7ScP/pmi+Vihzh5PvjJD8atVyHjp5L36hyS58IuRTVff82iyxigreuJAeaexxoDvl4TH8WbWm809NR+N29EqZNaTnhqqkEAA",
				alt: {
					es: "La sala de Don Salazar llena de invitados",
					en: "The Don Salazar room full of guests",
				},
			},
			{
				id: "09",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAABQAgCdASoMABAAAsBMJQBOgMXS7eJWdkw1o6AA/vG7QpY9l15SGTGAAfcy7uTGHQoXiSWLe9MJ5mH3y0MyixZoEBKINJKkDQRR1ZzoOBTYsFNcr5iEdDgYdxt66Pa1lwFw9N6AAAA=",
				alt: {
					es: "Un latte junto a laptops abiertas en la barra",
					en: "A latte next to open laptops on the bar",
				},
			},
			{
				id: "10",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAwAgCdASoMABAAAsBMJQBOgMWM1ZUAmoIGEAD+8OuzoGsCv+i1t44F20KhESmBoAIgsySNMa/XZuetPJtPFzYi9jlrVa4Lzd3ik8Mlo7YVIZeq118rS0/Rq8tyMvzBvXAAAA==",
				alt: {
					es: "Fila de laptops abiertas a lo largo de la barra",
					en: "A row of open laptops along the bar",
				},
			},
			{
				id: "11",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoMABAAAsBMJQBOgBuLcNdTJpjAAP7s4OU2Sa+/ZmSBaQ638+ZAQTFoh1Sa4r2RJL9/JAmL0Ez9i1m3kjEwBwZXisWK3wP4rPZDcgWLEe33PRVAcHTGFr49IZ/n2V8IYi5YBggAAAA=",
				alt: {
					es: "El badge de Hot Reload en la pantalla de una laptop",
					en: "The Hot Reload badge on a laptop screen",
				},
			},
			{
				id: "12",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAABQAgCdASoMABAAAsBMJYwCdAYwxkhsH6Wl9QAA/tq7ivNmEEk8Vrbg2qKxKDMWfYPeik7c5E2EErydPYvWsLJosqtCIyuoyqQa63fNyHd5ICO/jeBhskLpgOdlFcNA1ifOFPhHXAQAAA==",
				alt: {
					es: "Waffles con fruta en la mesa",
					en: "Waffles with fruit on the table",
				},
			},
			{
				id: "13",
				width: 1920,
				height: 1440,
				blur: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQAgCdASoQAAwAAsBMJYwCdAYul2yKO3JdUwAA/vSwJjI8+sbtfvEzpd7RQAOWydePPAbj3E8Nj+Dmn2Bsl9iGHydW/yt3cEjq/WI31sgNlVmOj7g47gdlPBKD3sFflhggAA==",
				alt: {
					es: "Los invitados acomodándose para la foto grupal",
					en: "Guests lining up for the group photo",
				},
			},
			{
				id: "14",
				width: 1920,
				height: 1440,
				blur: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwAgCdASoQAAwAAsBMJYwCdAYubjDTzt10qAD+72kUCk9bGsYfpryVbgo2o++SxvulgxaV2NC0dNWZ1o916hAuQfPpNkhPoF+HbMwqV/h7rqDKH5lZ4kPPdywiGBOtAN/2mF4GRdWNAAAA",
				alt: {
					es: "Foto grupal de Hot Reload 01 frente al mural La historia de Don Salazar",
					en: "Hot Reload 01 group photo in front of the La historia de Don Salazar mural",
				},
			},
			{
				id: "15",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQAgCdASoMABAAAsBMJQBOgMWM1bYzXwTBIgAA/u+RXGZnkvBISJQxhz+/9qQjZQKdCPOuUcvZ3XWR0AB02qnz6R0h0/yRsw2DAotTJSfxKhJdjyO6ctZRW2nSDd7gKRzQcKXa2oK343dhYAA=",
				alt: {
					es: "Laptop con la página de Crafter Station abierta",
					en: "Laptop with the Crafter Station page open",
				},
			},
			{
				id: "16",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoMABAAAsBMJQBOgCPcFMNPUTLAAP7BpAozHsIYl9UDCpHdUcYCLqENLub2ynODHTmPTtcHphbHSOLvUIfnHWCRBg9lPxDokeTSlluIZS5uVFXFVMAAAA==",
				alt: {
					es: "Cristian Olivera y Railly Hugo en la mesa de Hot Reload",
					en: "Cristian Olivera and Railly Hugo at the Hot Reload table",
				},
			},
		],
	},
};

export function findRecap(edition: number) {
	return hotReloadRecaps[edition];
}

export type RecapItem = { edition: number; photo: RecapPhoto };

export function photoKey(item: RecapItem) {
	return `${String(item.edition).padStart(2, "0")}-${item.photo.id}`;
}

export function recapItems(edition: number): RecapItem[] {
	return (hotReloadRecaps[edition]?.photos ?? []).map((photo) => ({
		edition,
		photo,
	}));
}

/** Every recap photo across editions, newest edition first. */
export function allRecapItems(): RecapItem[] {
	return Object.keys(hotReloadRecaps)
		.map(Number)
		.sort((a, b) => b - a)
		.flatMap((edition) => recapItems(edition));
}

/** Bento picks across editions: each edition's picks, newest first. */
export function allBentoItems(): RecapItem[] {
	return Object.keys(hotReloadRecaps)
		.map(Number)
		.sort((a, b) => b - a)
		.flatMap((edition) => {
			const recap = hotReloadRecaps[edition];
			return (recap?.bento ?? []).flatMap((id) => {
				const photo = recap?.photos.find((p) => p.id === id);
				return photo ? [{ edition, photo }] : [];
			});
		});
}

export function recapSrc(
	edition: number,
	id: string,
	size: "full" | "sm" = "full",
) {
	return `/events/hot-reload/${String(edition).padStart(2, "0")}/recap/${id}${size === "sm" ? "-sm" : ""}.webp`;
}

export function recapAlt(photo: RecapPhoto, locale: Locale) {
	return locale === "es" ? photo.alt.es : photo.alt.en;
}

export const recapCopy: Record<
	Locale,
	{
		recap: string;
		recapAvailable: string;
		journal: string;
		personal: string;
		gallery: string;
		viewGallery: string;
		photos: string;
		close: string;
		previous: string;
		next: string;
		download: string;
	}
> = {
	es: {
		recap: "Recap",
		recapAvailable: "Recap disponible",
		journal: "Leer en el Crafter Journal",
		personal: "Leer en railly.dev",
		gallery: "Galería",
		viewGallery: "Ver galería",
		photos: "{count} fotos",
		close: "Cerrar",
		previous: "Anterior",
		next: "Siguiente",
		download: "Abrir en Full HD",
	},
	en: {
		recap: "Recap",
		recapAvailable: "Recap available",
		journal: "Read on the Crafter Journal",
		personal: "Read on railly.dev",
		gallery: "Gallery",
		viewGallery: "View gallery",
		photos: "{count} photos",
		close: "Close",
		previous: "Previous",
		next: "Next",
		download: "Open in Full HD",
	},
	pt: {
		recap: "Recap",
		recapAvailable: "Recap disponível",
		journal: "Ler no Crafter Journal",
		personal: "Ler no railly.dev",
		gallery: "Galeria",
		viewGallery: "Ver galeria",
		photos: "{count} fotos",
		close: "Fechar",
		previous: "Anterior",
		next: "Próxima",
		download: "Abrir em Full HD",
	},
	zh: {
		recap: "回顾",
		recapAvailable: "回顾已上线",
		journal: "在 Crafter Journal 阅读",
		personal: "在 railly.dev 阅读",
		gallery: "相册",
		viewGallery: "查看相册",
		photos: "{count} 张照片",
		close: "关闭",
		previous: "上一张",
		next: "下一张",
		download: "查看全高清",
	},
	ja: {
		recap: "振り返り",
		recapAvailable: "振り返り公開中",
		journal: "Crafter Journalで読む",
		personal: "railly.devで読む",
		gallery: "ギャラリー",
		viewGallery: "ギャラリーを見る",
		photos: "{count}枚の写真",
		close: "閉じる",
		previous: "前へ",
		next: "次へ",
		download: "フルHDで開く",
	},
};

export function toGalleryItems(
	items: RecapItem[],
	locale: Locale,
	tagEdition = false,
): GalleryItem[] {
	return items.map((item) => ({
		key: photoKey(item),
		src: recapSrc(item.edition, item.photo.id),
		thumb: recapSrc(item.edition, item.photo.id, "sm"),
		blur: item.photo.blur,
		width: item.photo.width,
		height: item.photo.height,
		alt: recapAlt(item.photo, locale),
		tag: tagEdition ? `#${String(item.edition).padStart(2, "0")}` : undefined,
	}));
}
