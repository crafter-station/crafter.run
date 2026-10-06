CREATE TABLE "event_access" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_slug" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"document_type" text NOT NULL,
	"document_number" text NOT NULL,
	"vehicle_plate" text,
	"equipment" jsonb NOT NULL,
	"consented_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_access_name_check" CHECK (char_length(trim("event_access"."full_name")) between 2 and 120),
	CONSTRAINT "event_access_document_type_check" CHECK ("event_access"."document_type" in ('dni', 'foreign', 'passport')),
	CONSTRAINT "event_access_document_check" CHECK ("event_access"."document_number" ~ '^[A-Z0-9-]{6,20}$'),
	CONSTRAINT "event_access_equipment_check" CHECK (jsonb_typeof("event_access"."equipment") = 'array' and jsonb_array_length("event_access"."equipment") <= 10)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_access_event_user_idx" ON "event_access" USING btree ("event_slug","clerk_user_id");