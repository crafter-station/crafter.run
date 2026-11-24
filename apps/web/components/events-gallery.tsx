"use client";

import { useEffect, useMemo, useState } from "react";

import { PhotoGallery } from "@/components/photo-gallery";
import type { AlbumSeries } from "@/lib/event-albums";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/lib/photo-gallery";

type Photo = GalleryItem & { album: string; series: AlbumSeries };

export function EventsGalleryBrowser({
	photos,
	series,
	locale,
	allLabel,
	filterLabel,
}: {
	photos: Photo[];
	series: { id: AlbumSeries; label: string; count: number }[];
	locale: Locale;
	allLabel: string;
	filterLabel: string;
}) {
	const [active, setActive] = useState<AlbumSeries | null>(null);

	useEffect(() => {
		const value = new URLSearchParams(window.location.search).get("event");
		if (series.some((item) => item.id === value))
			setActive(value as AlbumSeries);
	}, [series]);

	const choose = (next: AlbumSeries | null) => {
		setActive(next);
		const url = new URL(window.location.href);
		if (next) url.searchParams.set("event", next);
		else url.searchParams.delete("event");
		url.hash = "";
		history.replaceState(null, "", url);
	};

	const visible = useMemo(
		() => (active ? photos.filter((photo) => photo.series === active) : photos),
		[active, photos],
	);

	return (
		<>
			<fieldset className="ev-gallery-chips">
				<legend className="sr-only">{filterLabel}</legend>
				<button
					type="button"
					aria-pressed={active === null}
					onClick={() => choose(null)}
				>
					{allLabel} <span>{photos.length}</span>
				</button>
				{series.map((item) => (
					<button
						key={item.id}
						type="button"
						aria-pressed={active === item.id}
						onClick={() => choose(item.id)}
					>
						{item.label} <span>{item.count}</span>
					</button>
				))}
			</fieldset>
			<PhotoGallery key={active ?? "all"} items={visible} locale={locale} />
		</>
	);
}
