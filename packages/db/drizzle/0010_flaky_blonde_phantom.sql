CREATE TABLE "ship_votes" (
	"ship_id" uuid NOT NULL,
	"voter_clerk_user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ship_votes_ship_id_voter_clerk_user_id_pk" PRIMARY KEY("ship_id","voter_clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "ship_votes" ADD CONSTRAINT "ship_votes_ship_id_ships_id_fk" FOREIGN KEY ("ship_id") REFERENCES "public"."ships"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "ship_votes_voter_clerk_user_idx" ON "ship_votes" USING btree ("voter_clerk_user_id");