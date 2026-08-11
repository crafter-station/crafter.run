CREATE TABLE "api_idempotency_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"member_id" uuid NOT NULL,
	"key" text NOT NULL,
	"route" text NOT NULL,
	"response_status" text,
	"response_body" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "api_idempotency_key_check" CHECK (char_length("api_idempotency_keys"."key") between 8 and 200)
);
--> statement-breakpoint
CREATE TABLE "ship_provenance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ship_id" uuid NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ship_provenance_value_check" CHECK (char_length(trim("ship_provenance"."value")) between 1 and 200)
);
--> statement-breakpoint
ALTER TABLE "api_idempotency_keys" ADD CONSTRAINT "api_idempotency_keys_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ship_provenance" ADD CONSTRAINT "ship_provenance_ship_id_ships_id_fk" FOREIGN KEY ("ship_id") REFERENCES "public"."ships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "api_idempotency_member_key_route_idx" ON "api_idempotency_keys" USING btree ("member_id","key","route");--> statement-breakpoint
CREATE INDEX "ship_provenance_ship_idx" ON "ship_provenance" USING btree ("ship_id");--> statement-breakpoint
CREATE UNIQUE INDEX "ship_provenance_ship_value_idx" ON "ship_provenance" USING btree ("ship_id","value");