"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RecapImageProps = {
	src: string;
	blur: string;
	alt: string;
	width: number;
	height: number;
	sizes: string;
	priority?: boolean;
	className?: string;
};

/**
 * The blurred preview sits under the photo and the photo fades in once it has
 * decoded, so a slow connection shows a soft version of the right picture
 * instead of an empty box.
 */
export function RecapImage({
	src,
	blur,
	alt,
	width,
	height,
	sizes,
	priority,
	className,
}: RecapImageProps) {
	const ref = useRef<HTMLImageElement>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
	}, []);

	return (
		<span
			className={`hr-recap-image ${className ?? ""}`}
			style={{ backgroundImage: `url(${blur})` }}
			data-loaded={loaded ? "" : undefined}
		>
			<Image
				ref={ref}
				src={src}
				alt={alt}
				width={width}
				height={height}
				sizes={sizes}
				priority={priority}
				loading={priority ? undefined : "lazy"}
				decoding="async"
				onLoad={() => setLoaded(true)}
			/>
		</span>
	);
}
