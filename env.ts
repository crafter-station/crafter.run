import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    CRON_SECRET: z.string().min(16).optional(),
    DATABASE_URL: z.string().url().optional(),
    GITHUB_TOKEN: z.string().min(1).optional(),
    LUMA_API_KEY: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    PORTAL_SECRET: z.string().startsWith("sk_").optional(),
  },
  client: {
    NEXT_PUBLIC_PORTAL_KEY: z.string().startsWith("pk_").optional(),
  },
  runtimeEnv: {
    CRON_SECRET: process.env.CRON_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    LUMA_API_KEY: process.env.LUMA_API_KEY,
    NEXT_PUBLIC_PORTAL_KEY: process.env.NEXT_PUBLIC_PORTAL_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PORTAL_SECRET: process.env.PORTAL_SECRET,
  },
  emptyStringAsUndefined: true,
})
