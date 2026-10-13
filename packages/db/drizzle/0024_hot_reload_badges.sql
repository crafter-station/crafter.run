CREATE TABLE "hot_reload_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"edition" integer NOT NULL,
	"number" integer NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"checked_in" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "hot_reload_badges_name_check" CHECK (char_length(trim("hot_reload_badges"."name")) between 2 and 80)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "hot_reload_badges_edition_user_idx" ON "hot_reload_badges" USING btree ("edition","clerk_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "hot_reload_badges_edition_number_idx" ON "hot_reload_badges" USING btree ("edition","number");