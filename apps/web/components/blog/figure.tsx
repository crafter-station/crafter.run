import Image from "next/image"

/**
 * Image with a caption inside a post. `size` is the intrinsic `WIDTHxHEIGHT`
 * as a string, since posts cannot use JSX expressions like `{1440}`. `wide`
 * breaks out to the full body width; the default sits at reading width.
 */
export function Figure({
  src,
  alt,
  caption,
  size,
  wide = false,
}: {
  src: string
  alt: string
  caption?: string
  size: string
  wide?: boolean
}) {
  const [width, height] = size.split("x").map(Number)
  if (!width || !height) throw new Error(`Figure ${src}: size must be WIDTHxHEIGHT, got "${size}"`)
  return (
    <figure className={wide ? "journal-figure journal-figure-wide" : "journal-figure"}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 860px, 100vw" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
