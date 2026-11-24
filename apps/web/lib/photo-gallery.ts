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
};
