import { writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { fetchProjectTimeline } from "../lib/project-timeline"

async function main() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    throw new Error("GITHUB_TOKEN is required to generate the project timeline")
  }

  const timeline = await fetchProjectTimeline(token)
  const scriptDirectory = dirname(fileURLToPath(import.meta.url))
  const output = join(scriptDirectory, "../data/project-timeline.json")

  await writeFile(
    output,
    `${JSON.stringify({ ...timeline, source: "snapshot" }, null, 2)}\n`,
    "utf8",
  )

  console.log(
    `Wrote ${timeline.projects.length} repositories to data/project-timeline.json`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
