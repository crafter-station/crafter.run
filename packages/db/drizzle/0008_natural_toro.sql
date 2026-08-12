ALTER TABLE "ships" ALTER COLUMN "updated_at" SET DATA TYPE timestamp(3) with time zone USING date_trunc('milliseconds', "updated_at");--> statement-breakpoint
ALTER TABLE "ships" ALTER COLUMN "updated_at" SET DEFAULT now();
