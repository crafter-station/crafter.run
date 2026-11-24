/** A small rotated event logo, like a postage stamp, so mixed photos say which event they are from. */
export function EventStamp({
	src,
	className,
}: {
	src: string;
	className?: string;
}) {
	return (
		// biome-ignore lint/performance/noImgElement: images are unoptimized site-wide
		<img
			className={`ev-stamp ${className ?? ""}`}
			src={src}
			alt=""
			width={64}
			height={64}
			loading="lazy"
			decoding="async"
		/>
	);
}
