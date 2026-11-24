import Link from "next/link";

import { EventStamp } from "@/components/event-stamp";
import { RecapImage } from "@/components/hot-reload-recap-image";
import {
	albumDate,
	type EventAlbum,
	eventsGalleryCopy,
	seriesLabel,
	seriesStamp,
} from "@/lib/event-albums";
import { recapCopy } from "@/lib/hot-reload-recap";
import { type Locale, withLocale } from "@/lib/i18n";

export function AlbumCards({
	albums,
	locale,
}: {
	albums: EventAlbum[];
	locale: Locale;
}) {
	const r = recapCopy[locale];
	const t = eventsGalleryCopy(locale);
	return (
		<ul className="ev-albums">
			{albums.map((album) => {
				const cover = album.bento(locale)[0] ?? album.items(locale)[0];
				const count = album.items(locale).length;
				return (
					<li key={album.id}>
						<Link
							href={withLocale(album.galleryPath, locale)}
							className="ev-album"
							aria-label={`${t.viewAlbum}: ${album.title}`}
						>
							{cover ? (
								<RecapImage
									src={cover.thumb}
									blur={cover.blur}
									alt={cover.alt}
									width={cover.width}
									height={cover.height}
									sizes="(min-width: 900px) 33vw, 100vw"
									className="ev-album-cover"
								/>
							) : null}
							<EventStamp
								src={seriesStamp[album.series]}
								className="ev-album-stamp"
							/>
							<span className="ev-album-body">
								<span className="ev-album-series station-label">
									{seriesLabel[album.series]}
								</span>
								<span className="ev-album-title">{album.title}</span>
								<span className="ev-album-meta">
									{albumDate(album, locale)} · {album.city} ·{" "}
									{r.photos.replace("{count}", String(count))}
								</span>
							</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
