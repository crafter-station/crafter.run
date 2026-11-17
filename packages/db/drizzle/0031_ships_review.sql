CREATE TYPE "public"."member_trust" AS ENUM('new', 'trusted', 'blocked');--> statement-breakpoint
ALTER TYPE "public"."ship_status" ADD VALUE 'pending' BEFORE 'published';--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "trust" "member_trust" DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "ships" ADD COLUMN "review_note" text;--> statement-breakpoint
-- Everyone who already has a published Ship keeps publishing directly.
UPDATE "members" SET "trust" = 'trusted' WHERE "id" IN (SELECT "owner_member_id" FROM "ships" WHERE "status" = 'published');--> statement-breakpoint
-- Core and Crew at the time of this migration, by GitHub handle; /admin/ships keeps them in sync after this.
UPDATE "members" SET "trust" = 'trusted' WHERE lower(substring("github_url" from 'github\.com/([^/?#]+)')) IN ('railly', 'cristianolivera1', 'camilocbarrera', 'mruprizing', 'theveller', 'jibaru', 'lizethriveros', 'carlosdtn', 'edwardr0507', 'henryjing96', 'bdiazc90');
