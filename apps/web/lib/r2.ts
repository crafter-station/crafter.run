import { AwsClient } from "aws4fetch"

import { env } from "@/env"

/* Private R2 bucket accessed over its S3 API: https://developers.cloudflare.com/r2/examples/aws/aws4fetch/ */
function bucket() {
  const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = env
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) return null
  const client = new AwsClient({ accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY, service: "s3", region: "auto" })
  return { client, base: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET}` }
}

export function r2Configured() {
  return bucket() !== null
}

export async function r2Put(key: string, body: Uint8Array, contentType: string) {
  const r2 = bucket()
  if (!r2) throw new Error("R2 is not configured")
  const response = await r2.client.fetch(`${r2.base}/${key}`, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body,
  })
  if (!response.ok) throw new Error(`R2 put failed with ${response.status}`)
}

export async function r2Get(key: string) {
  const r2 = bucket()
  if (!r2) return null
  const response = await r2.client.fetch(`${r2.base}/${key}`)
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`R2 get failed with ${response.status}`)
  return response
}
