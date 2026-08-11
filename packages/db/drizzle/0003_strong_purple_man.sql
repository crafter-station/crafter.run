CREATE TYPE "public"."ship_link_type" AS ENUM('repository', 'website', 'demo', 'package', 'social');--> statement-breakpoint
CREATE TYPE "public"."ship_source" AS ENUM('web', 'cli', 'mcp', 'import');--> statement-breakpoint
CREATE TYPE "public"."ship_status" AS ENUM('draft', 'published', 'hidden');--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"handle" text NOT NULL,
	"display_name" text NOT NULL,
	"bio" text,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "members_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "members_handle_check" CHECK ("members"."handle" ~ '^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$'),
	CONSTRAINT "members_display_name_check" CHECK (char_length(trim("members"."display_name")) between 1 and 80),
	CONSTRAINT "members_bio_check" CHECK ("members"."bio" is null or char_length(trim("members"."bio")) between 1 and 280),
	CONSTRAINT "members_avatar_url_check" CHECK ("members"."avatar_url" is null or "members"."avatar_url" ~ '^https?://')
);
--> statement-breakpoint
CREATE TABLE "ship_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ship_id" uuid NOT NULL,
	"type" "ship_link_type" NOT NULL,
	"url" text NOT NULL,
	"verified_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ship_links_url_check" CHECK (char_length("ship_links"."url") between 8 and 2048 and "ship_links"."url" ~ '^https?://')
);
--> statement-breakpoint
CREATE TABLE "ships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_member_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"status" "ship_status" DEFAULT 'draft' NOT NULL,
	"source" "ship_source" DEFAULT 'web' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ships_slug_unique" UNIQUE("slug"),
	CONSTRAINT "ships_slug_check" CHECK ("ships"."slug" ~ '^[a-z0-9][a-z0-9-]{1,78}[a-z0-9]$'),
	CONSTRAINT "ships_name_check" CHECK (char_length(trim("ships"."name")) between 1 and 100),
	CONSTRAINT "ships_tagline_check" CHECK (char_length(trim("ships"."tagline")) between 4 and 180),
	CONSTRAINT "ships_description_check" CHECK (char_length(trim("ships"."description")) between 20 and 5000),
	CONSTRAINT "ships_published_at_check" CHECK (("ships"."status" = 'published' and "ships"."published_at" is not null) or ("ships"."status" <> 'published'))
);
--> statement-breakpoint
ALTER TABLE "ship_links" ADD CONSTRAINT "ship_links_ship_id_ships_id_fk" FOREIGN KEY ("ship_id") REFERENCES "public"."ships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ships" ADD CONSTRAINT "ships_owner_member_id_members_id_fk" FOREIGN KEY ("owner_member_id") REFERENCES "public"."members"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "members_handle_lower_idx" ON "members" USING btree (lower("handle"));--> statement-breakpoint
CREATE INDEX "ship_links_ship_idx" ON "ship_links" USING btree ("ship_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ship_links_ship_type_url_idx" ON "ship_links" USING btree ("ship_id","type","url");--> statement-breakpoint
CREATE INDEX "ships_owner_created_idx" ON "ships" USING btree ("owner_member_id","created_at" DESC NULLS LAST);--> statement-breakpoint
CREATE INDEX "ships_status_published_idx" ON "ships" USING btree ("status","published_at" DESC NULLS LAST);