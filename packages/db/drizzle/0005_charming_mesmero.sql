CREATE TABLE "api_rate_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"operation" text NOT NULL,
	"window_started_at" timestamp with time zone NOT NULL,
	"count" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "api_idempotency_keys" ADD COLUMN "request_hash" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "api_rate_limits" ADD CONSTRAINT "api_rate_limits_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "api_rate_limits_member_operation_window_idx" ON "api_rate_limits" USING btree ("member_id","operation","window_started_at");--> statement-breakpoint
CREATE UNIQUE INDEX "ship_links_public_url_idx" ON "ship_links" USING btree ("type","url") WHERE "ship_links"."type" in ('repository', 'website');