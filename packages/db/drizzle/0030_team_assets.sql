CREATE TABLE "team_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"kind" text NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"status" text DEFAULT 'unknown' NOT NULL,
	"visibility" text DEFAULT 'core' NOT NULL,
	"owner" text,
	"access" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"perk" text,
	"notes" text,
	"secret_ref" text,
	"verified_at" timestamp with time zone,
	"verified_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "team_assets_slug_check" CHECK ("team_assets"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "team_assets_kind_check" CHECK ("team_assets"."kind" in ('tool', 'account', 'social')),
	CONSTRAINT "team_assets_status_check" CHECK ("team_assets"."status" in ('alive', 'dead', 'unknown')),
	CONSTRAINT "team_assets_visibility_check" CHECK ("team_assets"."visibility" in ('public', 'crew', 'core')),
	CONSTRAINT "team_assets_access_check" CHECK (jsonb_typeof("team_assets"."access") = 'array')
);
--> statement-breakpoint
CREATE UNIQUE INDEX "team_assets_slug_idx" ON "team_assets" USING btree ("slug");