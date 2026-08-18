import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    API_URL: z.string().url().optional(),
    CAL_API_KEY: z.string().startsWith("cal_live_").optional(),
    CAL_WEBHOOK_SECRET: z.string().min(16).optional(),
    CLERK_SECRET_KEY: z.string().startsWith("sk_").optional(),
    CRON_SECRET: z.string().min(16).optional(),
    DATABASE_URL: z.string().url().optional(),
    GITHUB_TOKEN: z.string().min(1).optional(),
    LUMA_API_KEY: z.string().min(1).optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    OSS_RADAR_INGEST_TOKEN: z.string().min(32).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    PORTAL_SECRET: z.string().startsWith("sk_").optional(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url().optional(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().startsWith("pk_").optional(),
    NEXT_PUBLIC_PORTAL_KEY: z.string().startsWith("pk_").optional(),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    CAL_API_KEY: process.env.CAL_API_KEY,
    CAL_WEBHOOK_SECRET: process.env.CAL_WEBHOOK_SECRET,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    LUMA_API_KEY: process.env.LUMA_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PORTAL_KEY: process.env.NEXT_PUBLIC_PORTAL_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OSS_RADAR_INGEST_TOKEN: process.env.OSS_RADAR_INGEST_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PORTAL_SECRET: process.env.PORTAL_SECRET,
  },
  emptyStringAsUndefined: true,
})
