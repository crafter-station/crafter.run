CREATE TYPE "public"."member_source" AS ENUM('web', 'cli');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "source" "member_source" DEFAULT 'web' NOT NULL;