CREATE TABLE "ship_updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ship_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ship_updates_title_check" CHECK (char_length(trim("ship_updates"."title")) between 1 and 100),
	CONSTRAINT "ship_updates_description_check" CHECK (char_length(trim("ship_updates"."description")) between 4 and 5000)
);
--> statement-breakpoint
ALTER TABLE "ship_updates" ADD CONSTRAINT "ship_updates_ship_id_ships_id_fk" FOREIGN KEY ("ship_id") REFERENCES "public"."ships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ship_updates_ship_published_idx" ON "ship_updates" USING btree ("ship_id","published_at" DESC NULLS LAST);