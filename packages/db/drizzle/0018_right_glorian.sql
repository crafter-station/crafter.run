CREATE TABLE "oss_radar_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generated_at" timestamp with time zone NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "oss_radar_snapshots_generated_at_unique" UNIQUE("generated_at")
);
--> statement-breakpoint
CREATE INDEX "oss_radar_snapshots_generated_idx" ON "oss_radar_snapshots" USING btree ("generated_at" DESC NULLS LAST);