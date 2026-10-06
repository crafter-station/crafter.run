/**
 * Export the site's own editorial drawings for the social renderer.
 * Run with Bun from apps/web. No image generation or external assets.
 */
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { BountyArtwork } from "../components/bounty-artwork"
import { JournalArtwork } from "../components/blog/artwork"
import { OpenSourceAssembly, OssProjectArt } from "../components/oss-art"
import { StationPageArt, type PageArtwork } from "../components/station-page-art"

const destination = join(import.meta.dir, "../public/og/art")
const drawings: Array<[string, React.ReactElement, string]> = [
  ["oss", <OpenSourceAssembly />, "#294135"],
  ["bounties", <BountyArtwork />, "#76532c"],
  ["petdex", <OssProjectArt name="petdex" />, "#324b3e"],
  ...(["people", "conversation", "research", "workshop", "ships", "brand", "events"] as PageArtwork[])
    .map((kind): [string, React.ReactElement, string] => [kind, <StationPageArt kind={kind} />, "#4b5543"]),
  ...["magic", "free-tier", "whatsapp", "coding-agent", "agents-can-read", "signal"]
    .map((slug): [string, React.ReactElement, string] => [`journal-${slug}`, <JournalArtwork slug={slug} />, "#665277"]),
]
const colors: Record<string, string> = {
  "--page-art-paper": "#faf8ef", "--page-art-lilac": "#dcd2e8",
  "--page-art-green": "#d7e2c5", "--page-art-yellow": "#f0e0a1",
  "--cover-paper": "#f9f4fc", "--cover-accent": "#d4c3e2",
}
async function main() {
  await mkdir(destination, { recursive: true })
  for (const [name, element, ink] of drawings) {
    const markup = renderToStaticMarkup(element)
    let svg = markup.slice(markup.indexOf("<svg"), markup.lastIndexOf("</svg>") + 6)
      .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
      .replaceAll("currentColor", ink)
      .replace(/var\((--[\w-]+)\)/g, (_, token: string) => colors[token] ?? ink)
      .replace('class="oss-art-grid"', 'opacity=".09"')
      .replaceAll('class="oss-art-base"', 'fill="#dae6ca"')
    // A data-URI image needs intrinsic dimensions; CSS from the page isn't present.
    const viewBox = svg.match(/viewBox="0 0 (\d+) (\d+)"/)!
    svg = svg.replace("<svg ", `<svg width="${viewBox[1]}" height="${viewBox[2]}" `)
    await writeFile(join(destination, `${name}.svg`), svg)
    console.log(`${name}.svg`)
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
