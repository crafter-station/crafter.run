CREATE TABLE "event_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_slug" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"drink_id" text NOT NULL,
	"food_id" text NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_orders_name_check" CHECK (char_length(trim("event_orders"."name")) between 2 and 80),
	CONSTRAINT "event_orders_total_check" CHECK ("event_orders"."total" between 1 and 100)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_orders_event_user_idx" ON "event_orders" USING btree ("event_slug","clerk_user_id");