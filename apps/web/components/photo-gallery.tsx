"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { EventStamp } from "@/components/event-stamp";
import { RecapImage } from "@/components/hot-reload-recap-image";
import { LinkedInShare } from "@/components/linkedin-share";
import { recapCopy } from "@/lib/hot-reload-recap";
import type { Locale } from "@/lib/i18n";
import type { GalleryItem } from "@/lib/photo-gallery";

export function PhotoGallery({
	items,
	locale,
}: {
	items: GalleryItem[];
	locale: Locale;
}) {
	const landscape =
		items.filter((item) => item.width > item.height).length > items.length / 2;
	const t = recapCopy[locale];
	const dialog = useRef<HTMLDialogElement>(null);
	const [index, setIndex] = useState<number | null>(null);

	const mark = useCallback(
		(next: number) => {
			const item = items[next];
			if (item) history.replaceState(null, "", `#${item.key}`);
		},
		[items],
	);

	const open = useCallback(
		(next: number) => {
			setIndex(next);
			if (!dialog.current?.open) dialog.current?.showModal();
			mark(next);
		},
		[mark],
	);

	const close = useCallback(() => {
		dialog.current?.close();
	}, []);

	const step = useCallback(
		(delta: number) => {
			setIndex((current) => {
				if (current === null) return current;
				const next = (current + delta + items.length) % items.length;
				mark(next);
				return next;
			});
		},
		[items.length, mark],
	);

	useEffect(() => {
		const key = window.location.hash.slice(1);
		if (key)
			document
				.getElementById(`photo-${key}`)
				?.scrollIntoView({ block: "center" });
	}, []);

	useEffect(() => {
		if (index === null) return;
		for (const offset of [1, -1]) {
			const neighbour = items[(index + offset + items.length) % items.length];
			if (neighbour) new window.Image().src = neighbour.src;
		}
	}, [index, items]);

	useEffect(() => {
		const node = dialog.current;
		if (!node) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") step(1);
			if (event.key === "ArrowLeft") step(-1);
		};
		const onClose = () => {
			setIndex(null);
			history.replaceState(null, "", window.location.pathname);
		};
		node.addEventListener("keydown", onKey);
		node.addEventListener("close", onClose);
		return () => {
			node.removeEventListener("keydown", onKey);
			node.removeEventListener("close", onClose);
		};
	}, [step]);

	const current = index === null ? null : items[index];

	return (
		<>
			<ul
				className="hr-gallery"
				data-layout={landscape ? "landscape" : undefined}
			>
				{items.map((item, i) => {
					const wide = item.width > item.height;
					return (
						<li
							key={item.key}
							id={`photo-${item.key}`}
							data-wide={wide ? "" : undefined}
						>
							<button
								type="button"
								className="hr-gallery-item"
								onClick={() => open(i)}
								aria-label={item.alt}
							>
								<RecapImage
									src={item.src}
									blur={item.blur}
									alt={item.alt}
									width={item.width}
									height={item.height}
									sizes={
										wide
											? "(min-width: 900px) 66vw, 100vw"
											: "(min-width: 900px) 33vw, 100vw"
									}
									priority={i < 3}
								/>
								{item.tag ? (
									<span className="hr-gallery-tag hot-reload-caps">
										{item.tag}
									</span>
								) : null}
								{item.stamp ? <EventStamp src={item.stamp.src} /> : null}
							</button>
						</li>
					);
				})}
			</ul>
			<dialog
				ref={dialog}
				className="hr-lightbox"
				aria-label={current ? current.alt : t.gallery}
				onClick={(event) => {
					if (event.target === event.currentTarget) close();
				}}
				onKeyDown={() => undefined}
			>
				{current ? (
					<figure className="hr-lightbox-frame">
						<RecapImage
							key={current.key}
							src={current.src}
							blur={current.blur}
							alt={current.alt}
							width={current.width}
							height={current.height}
							sizes="100vw"
							priority
							className="hr-lightbox-image"
						/>
						<figcaption className="hot-reload-caps">
							<span>
								{String((index ?? 0) + 1).padStart(2, "0")} /{" "}
								{String(items.length).padStart(2, "0")}
								{current.tag ? ` · ${current.tag}` : ""}
							</span>
							<span className="hr-lightbox-alt">{current.alt}</span>
							<a href={current.src} target="_blank" rel="noopener noreferrer">
								{t.download} ↗
							</a>
							{current.share ? (
								<LinkedInShare
									id={`photo-${current.key}`}
									locale={locale}
									text={current.share}
									image={{ path: current.src, alt: current.alt }}
									className="hr-lightbox-share"
								/>
							) : null}
						</figcaption>
					</figure>
				) : null}
				<button
					type="button"
					className="hr-lightbox-nav hot-reload-caps"
					data-side="prev"
					onClick={() => step(-1)}
					aria-label={t.previous}
				>
					←
				</button>
				<button
					type="button"
					className="hr-lightbox-nav hot-reload-caps"
					data-side="next"
					onClick={() => step(1)}
					aria-label={t.next}
				>
					→
				</button>
				<button
					type="button"
					className="hr-lightbox-close hot-reload-caps"
					onClick={close}
				>
					{t.close} ✕
				</button>
			</dialog>
		</>
	);
}
