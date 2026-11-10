CREATE TABLE "core_meetings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"held_at" timestamp with time zone NOT NULL,
	"duration_minutes" integer,
	"summary" text NOT NULL,
	"attendees" jsonb NOT NULL,
	"body" text NOT NULL,
	"transcript" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "core_meetings_slug_check" CHECK ("core_meetings"."slug" ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
	CONSTRAINT "core_meetings_attendees_check" CHECK (jsonb_typeof("core_meetings"."attendees") = 'array')
);
--> statement-breakpoint
CREATE UNIQUE INDEX "core_meetings_slug_idx" ON "core_meetings" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "core_meetings_held_at_idx" ON "core_meetings" USING btree ("held_at");