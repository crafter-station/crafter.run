CREATE TABLE "event_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_slug" text NOT NULL,
	"number" integer NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"checked_in" boolean NOT NULL,
	"variant" text DEFAULT 'a' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_badges_variant_check" CHECK ("event_badges"."variant" in ('a', 'b', 'c')),
	CONSTRAINT "event_badges_name_check" CHECK (char_length(trim("event_badges"."name")) between 2 and 80)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_badges_event_user_idx" ON "event_badges" USING btree ("event_slug","clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "event_badges_event_number_idx" ON "event_badges" USING btree ("event_slug","number");