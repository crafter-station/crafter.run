CREATE TABLE "event_credit_code" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_slug" text NOT NULL,
	"code" text NOT NULL,
	"reserve" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'free' NOT NULL,
	"assigned_to" text,
	"assigned_at" timestamp with time zone,
	CONSTRAINT "event_credit_code_status_check" CHECK ("event_credit_code"."status" in ('free', 'assigned', 'burned'))
);
--> statement-breakpoint
CREATE TABLE "event_credit_entry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_slug" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"kind" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"present_at" timestamp with time zone,
	"attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"reported_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_credit_entry_kind_check" CHECK ("event_credit_entry"."kind" in ('luma', 'waitlist')),
	CONSTRAINT "event_credit_entry_name_check" CHECK (char_length(trim("event_credit_entry"."name")) between 2 and 120)
);
--> statement-breakpoint
CREATE TABLE "event_credit_round" (
	"event_slug" text PRIMARY KEY NOT NULL,
	"state" text DEFAULT 'idle' NOT NULL,
	"code" text,
	"opened_at" timestamp with time zone,
	"closed_at" timestamp with time zone,
	CONSTRAINT "event_credit_round_state_check" CHECK ("event_credit_round"."state" in ('idle', 'open', 'closed'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_credit_code_event_code_idx" ON "event_credit_code" USING btree ("event_slug","code");--> statement-breakpoint
CREATE UNIQUE INDEX "event_credit_code_assigned_idx" ON "event_credit_code" USING btree ("event_slug","assigned_to") WHERE "event_credit_code"."status" = 'assigned';--> statement-breakpoint
CREATE UNIQUE INDEX "event_credit_entry_event_user_idx" ON "event_credit_entry" USING btree ("event_slug","clerk_user_id");