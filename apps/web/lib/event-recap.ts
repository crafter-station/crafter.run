import { findAccessEvent } from "@/lib/access-events";
import type { RecapPhoto } from "@/lib/hot-reload-recap";
import type { Locale } from "@/lib/i18n";
import { type GalleryItem, photoShareText } from "@/lib/photo-gallery";

export type EventRecap = {
	journalSlug: string;
	personalUrl: string;
	bento: string[];
	photos: RecapPhoto[];
};

/** Recaps for one-off events at /events/[slug]; photos live in /public/events/[slug]/recap. */
export const eventRecaps: Partial<Record<string, EventRecap>> = {
	"devday-lima": {
		journalSlug: "devday-exchange-lima-recap",
		personalUrl: "https://www.railly.dev/blog/devday-exchange-lima",
		bento: ["21", "14", "08", "10", "20"],
		photos: [
			{
				id: "01",
				width: 1440,
				height: 1920,
				blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAABQAgCdASoMABAAAsBMJZQCdAEUVfQndwjCyAAA99/lWMusjZRhSn9Kd1nN+djQhMhTPoilmBEPqzqj21/0FCej7Ghm+lbw2pk3XfoRJlW8NS6M3NDFOmGijbrqvOEydKkiCAAA",
				alt: {
					es: "El tótem de DevDay Exchange Community: Lima en la entrada de la FISI",
					en: "The DevDay Exchange Community: Lima totem at the FISI entrance",
				},
			},
			{
				id: "02",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAwAgCdASoQAAsAAsBMJYwC7AYv1D2wcD7vOAD+m/EelUr8aEI9x1z1F2wYqLhGvHV9p9Icvj85/H0se/F+a4zC3S81paLdYvCPlOfZp4E6wrTfryw71UYYp/x+0wZjkRDUkAAA",
				alt: {
					es: "La mesa de honor durante la apertura en el auditorio de la FISI",
					en: "The head table during the opening at the FISI auditorium",
				},
			},
			{
				id: "03",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAADwAQCdASoQAAsAAsBMJZQC7AYtU1680gAA/pEjJ6ViW+7Jcof0MAWw4BKZib5ueJZm38JgT51ydB4qx2lYXiHlpwDZlU+aQUcjytAC2fP1R2pnHP/dVc4Fh9ypyz1hGr5kbLUSKLTwQAAA",
				alt: {
					es: "Palabras de apertura en el auditorio de la FISI",
					en: "Opening remarks at the FISI auditorium",
				},
			},
			{
				id: "04",
				width: 1920,
				height: 1440,
				blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAQAgCdASoQAAwAAsBMJZQCdAEfUrbsc1yoAOJvgnKpl2i/ZEELIafUDwpnAR8dyEbFplncMlX5TcNo8OhCBDVdCRxY1ViT2JTPofZuwS4IYlPg2giNo9QeLsaLIAAA",
				alt: {
					es: "Railly Hugo en el atril frente a la portada del evento",
					en: "Railly Hugo at the podium in front of the event title slide",
				},
			},
			{
				id: "05",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADwAQCdASoQAAsAAsBMJZwAApFq8tTLlwAA/U9H3nKDSq+t4rByw/2IVh9pNsgDV7Cp13/DAiSbVC/K34T5jme4/4BHf0t0oH8qqt+NygoAAA==",
				alt: {
					es: "Railly Hugo presentando Crafter Station",
					en: "Railly Hugo presenting Crafter Station",
				},
			},
			{
				id: "06",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsAAsBMJaQAAp2a2GP0OAAA/tBycPt6saZkXltvPT1KZN3CK3saqgbOzBf04aqoLhOfdz2NDmzGVsybQZhk9CQjYLs9R+L5RYAA",
				alt: {
					es: "El auditorio durante la presentación de Crafter Station",
					en: "The auditorium during the Crafter Station talk",
				},
			},
			{
				id: "07",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoQAAsAAsBMJaQAAsRDH+VO8nAA/u+HPtOpf8T/vLRPR2ilUCCtCTjEdPzFf7rc6I5vMT/88K5o8B3qV2bDFGELGPtZ0233QoGcZtTC3qS6gAAA",
				alt: {
					es: "Vista amplia del auditorio de la FISI con el público",
					en: "Wide view of the FISI auditorium and the audience",
				},
			},
			{
				id: "08",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAwAgCdASoQAAsAAsBMJZwC7AEe0BuqBjXnAAD8jJvzIcq31r66VT6H2pkVogiFLhXOT7y9Ztpfb1KX46eJ4PQ4r/aDT3+XaSoPcYbUQvTpk0hipHrb+gURh7xkqjNvymgbcCoN4gA=",
				alt: {
					es: "Railly Hugo en el escenario junto a las banderas de la UNMSM y del Perú",
					en: "Railly Hugo on stage next to the UNMSM and Peruvian flags",
				},
			},
			{
				id: "09",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAwAgCdASoQAAsAAsBMJaQAD45QykvLrvusWAD+9fkKVy6b+0rGwnpZv47kKEajm1epXPvTA4QRhaliD9u2i1A8lABcuUOiu5T5PMqnrLwPIV/q7vRE4AAA",
				alt: {
					es: "Slide de Crafter Station sobre eventos que juntan a los que construyen",
					en: "Crafter Station slide about events that bring builders together",
				},
			},
			{
				id: "10",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACwAQCdASoQAAsAAsBMJZwAAlvMbp2gAP40LN3MAS6l+VETnW8can8uI9HuA1VskqnWTR5C9Ad8jeZvJsB90KfHtQLIMs/rn3ufv0yCLPRBkgLkRIYAAA==",
				alt: {
					es: "Edward Ramos presentando Dots, el lanzamiento de DevDay 2026",
					en: "Edward Ramos presenting Dots from DevDay 2026",
				},
			},
			{
				id: "11",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAQCdASoQAAsAAsBMJZwAAmh+pXVXlAD+zdwmznBw2eVBJLxOD7GV/cK5b9WSAa+vRM42JXNlg87VBFOpgWmBnLkFRc7gU394cE9thkOHkro4AAA=",
				alt: {
					es: "Edward Ramos con la slide de Dots en pantalla",
					en: "Edward Ramos with the Dots slide on screen",
				},
			},
			{
				id: "12",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAACQAQCdASoQAAsAAsBMJaQAAppyWgAA/vWjHIf0X4Wglk1m1BxN+0CHwiaenP3oe9cpOo2hv2cZxtncW/k+rO3C6tQXrvM1UGBstZPUuJkq9xlp2hyjWQoqgAA=",
				alt: {
					es: "El público del auditorio durante el recap de DevDay",
					en: "The audience during the DevDay recap",
				},
			},
			{
				id: "13",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoQAAsAAsBMJaQAD5FPLfCCkwAAAP7YOrhd68Ltr/ow2OYpE4Hqf1qPDTrxZ7Jf4jiUbbdKz94HGacDWaoS5+/Fuj0K2EqXFFeLKTy1QbC/2PTWHEJXhn4kgAA=",
				alt: {
					es: "Asistentes atentos en las primeras filas",
					en: "Attendees paying attention in the front rows",
				},
			},
			{
				id: "14",
				width: 1280,
				height: 720,
				blur: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADQAQCdASoQAAkAAsBMJYwAD4zP6N+aAAD+wlEBGylBxuFMw6/YSu4FblE6hcSTD/Wqpx+g3+JmmI+iIrq4CV+FGpeAUSbwGnMuKERJVgTDDueXwZoFjUJQEIbJ6sAA",
				alt: {
					es: "La demo en vivo de Codex con el auditorio lleno",
					en: "The live Codex demo with a full auditorium",
				},
			},
			{
				id: "15",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQAAsAAsBMJZwAD45QyH//LtTbZAD+AbPdS+X/8J1/EX5dcz2DSnZL8ac3VylMq37qpC2WUmiDZsCRuwwpaMQFgESLQ/z+on4MTXc1BwMy3/2rgvL83d4zvGHE3iZrYBwAAA==",
				alt: {
					es: "Railly Hugo de espaldas con el polo CREW frente al público",
					en: "Railly Hugo from behind in a CREW shirt facing the audience",
				},
			},
			{
				id: "16",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAAAwAgCdASoQAAsAAsBMJZQAEP58bTWpluBFIAD+66hcpBTdfM5hBE4VD77/G64RXnA7Wjq5baq4yKdXuhsjCDvsaotoAzCuEcNJOvinI/0wvg3kcPuQMCFxIedTHNF2F+AAAA==",
				alt: {
					es: "Los ponentes en la mesa del escenario",
					en: "The speakers at the stage table",
				},
			},
			{
				id: "17",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAADwAQCdASoQAAsAAsBMJaQAD5AsjAXhYyAA/uzSnAUpOl9kFNiiJH4rMy4J5ivsfl9BjbEpx+6scIwfagq8kfd3uLAtnP+eE/ev/gO6g/q2TpD62aCVIptEuJkx90U79POYByAA",
				alt: {
					es: "Asistentes sirviéndose en el refrigerio",
					en: "Attendees serving themselves at the reception",
				},
			},
			{
				id: "18",
				width: 900,
				height: 1600,
				blur: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABQAgCdASoJABAAAsBMJZQC7AYuRkx7N/YmCAAA+X4LzXt4Gbc8pR+Xs258jB1ZAbEtbeS82mDpGTYaWF8sd5jQ4wRJwdwLPc2pd7AqfFW6l6Ew7QAAAA==",
				alt: {
					es: "La mesa del buffet del refrigerio",
					en: "The reception buffet table",
				},
			},
			{
				id: "19",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoQAAsAAsBMJaQAAerXS4zMkAD+2+uVccIWbHahw3+dxfRJzVEBSOjaHesu/77UENrhhSQpfeMolrItUeHBTFGsdcH5pmKoDrzu74QfI6AS96ngAAA=",
				alt: {
					es: "La fila del refrigerio en el hall de la FISI",
					en: "The reception line in the FISI hall",
				},
			},
			{
				id: "20",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAACwAQCdASoQAAsAAsBMJZwAD4xuZgkAAP6YD9fp9pmtMwj6Vl+UNkALBPqUThiPQXCrJGUvgVK9K+F2LFB+b6gRUQpDKWn1PP4URm9l+RH1mhFkXT1mee9QOpAeAA==",
				alt: {
					es: "Ganadores con botellas y bolsas de OpenAI en el escenario",
					en: "Winners on stage with OpenAI bottles and tote bags",
				},
			},
			{
				id: "21",
				width: 1920,
				height: 1280,
				blur: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADwAQCdASoQAAsAAsBMJaQAAugz2neB0AAA/vS4M47J62pE5R2t9Vc14QhWf8VUHU7kTvuL7wNTGqa2JvOHyRPmseRYubFPc1JNH0EzFTAEAAAA",
				alt: {
					es: "Foto grupal de los asistentes en el escenario de la FISI",
					en: "Group photo of attendees on the FISI stage",
				},
			},
			{
				id: "22",
				width: 1920,
				height: 1440,
				blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQAgCdASoQAAwAAsBMJZQAAvgNs5AM7awAAP7yPgf1HPLJAtCzzjr7ey4DaftMXZEeEQcVqDYD6CELy0ty3fMfNGS470exj/HE9rnaX5FmH9xOjsJCtRiJ5aindpAszoFL/H1IvwAAAA==",
				alt: {
					es: "Foto grupal de cerca con el equipo de Crafter Station",
					en: "Close group photo with the Crafter Station team",
				},
			},
		],
	},
};

export function findEventRecap(slug: string) {
	return eventRecaps[slug];
}

export function eventGalleryItems(
	slug: string,
	recap: EventRecap,
	locale: Locale,
	ids?: string[],
): GalleryItem[] {
	const photos = ids
		? ids.flatMap((id) => recap.photos.filter((photo) => photo.id === id))
		: recap.photos;
	return photos.map((photo) => ({
		key: photo.id,
		src: `/events/${slug}/recap/${photo.id}.webp`,
		thumb: `/events/${slug}/recap/${photo.id}-sm.webp`,
		blur: photo.blur,
		width: photo.width,
		height: photo.height,
		alt: locale === "es" ? photo.alt.es : photo.alt.en,
		share: photoShareText(
			locale,
			findAccessEvent(slug)?.title ?? slug,
			`/events/${slug}/gallery#${photo.id}`,
		),
	}));
}
