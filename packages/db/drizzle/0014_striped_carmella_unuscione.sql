ALTER TABLE "ship_updates" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "ships" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "ship_updates" ADD CONSTRAINT "ship_updates_image_url_check" CHECK ("ship_updates"."image_url" is null or "ship_updates"."image_url" ~ '^https?://');--> statement-breakpoint
ALTER TABLE "ships" ADD CONSTRAINT "ships_image_url_check" CHECK ("ships"."image_url" is null or "ships"."image_url" ~ '^https?://');