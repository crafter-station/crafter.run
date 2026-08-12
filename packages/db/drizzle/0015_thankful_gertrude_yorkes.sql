ALTER TABLE "ship_updates" ADD COLUMN "social_post_url" text;--> statement-breakpoint
ALTER TABLE "ships" ADD COLUMN "social_post_url" text;--> statement-breakpoint
ALTER TABLE "ship_updates" ADD CONSTRAINT "ship_updates_social_post_url_check" CHECK ("ship_updates"."social_post_url" is null or "ship_updates"."social_post_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "ships" ADD CONSTRAINT "ships_social_post_url_check" CHECK ("ships"."social_post_url" is null or "ships"."social_post_url" ~ '^https?://');