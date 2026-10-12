CREATE TABLE "event_guest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"luma_event_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"approval_status" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_guest_email_check" CHECK ("event_guest"."email" = lower("event_guest"."email"))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_guest_event_email_idx" ON "event_guest" USING btree ("luma_event_id","email");