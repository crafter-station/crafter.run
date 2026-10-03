CREATE TABLE "bounty_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bounty_slug" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"whatsapp_phone" text NOT NULL,
	"post_url" text NOT NULL,
	"attends_in_person" boolean NOT NULL,
	"contact_consent" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "bounty_submissions_phone_check" CHECK ("bounty_submissions"."whatsapp_phone" ~ '^\+[1-9][0-9]{7,14}$'),
	CONSTRAINT "bounty_submissions_post_url_check" CHECK ("bounty_submissions"."post_url" ~ '^https://')
);
--> statement-breakpoint
CREATE UNIQUE INDEX "bounty_submissions_bounty_user_idx" ON "bounty_submissions" USING btree ("bounty_slug","clerk_user_id");