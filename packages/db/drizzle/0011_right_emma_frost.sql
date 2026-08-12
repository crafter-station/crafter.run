ALTER TABLE "members" ADD COLUMN "github_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "linkedin_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "instagram_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "x_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "primary_website_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "secondary_website_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "current_role" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "roles_open_to" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "is_job_seeking" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_github_url_check" CHECK ("members"."github_url" is null or "members"."github_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_linkedin_url_check" CHECK ("members"."linkedin_url" is null or "members"."linkedin_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_instagram_url_check" CHECK ("members"."instagram_url" is null or "members"."instagram_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_x_url_check" CHECK ("members"."x_url" is null or "members"."x_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_primary_website_url_check" CHECK ("members"."primary_website_url" is null or "members"."primary_website_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_secondary_website_url_check" CHECK ("members"."secondary_website_url" is null or "members"."secondary_website_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_current_role_check" CHECK ("members"."current_role" is null or char_length(trim("members"."current_role")) between 1 and 120);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_roles_open_to_check" CHECK (cardinality("members"."roles_open_to") <= 10);