import { ossRepoNames } from "@/lib/oss"

export const revalidate = 86400

export async function GET() {
  return Response.json({
    schemaVersion: 1,
    source: "crafter.run/oss",
    repos: ossRepoNames,
  })
}
