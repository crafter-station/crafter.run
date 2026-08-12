ALTER TABLE "members" ADD COLUMN "origin_city" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_region" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_country" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_country_code" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_latitude" double precision;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_longitude" double precision;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_place_id" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_geocode_provider" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "origin_geocode_confidence" double precision;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_city" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_region" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_country" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_country_code" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_latitude" double precision;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_longitude" double precision;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_place_id" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_geocode_provider" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "based_geocode_confidence" double precision;--> statement-breakpoint
CREATE INDEX "members_origin_country_city_idx" ON "members" USING btree ("origin_country_code","origin_city");--> statement-breakpoint
CREATE INDEX "members_based_country_city_idx" ON "members" USING btree ("based_country_code","based_city");--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_city_check" CHECK ("members"."origin_city" is null or char_length(trim("members"."origin_city")) between 1 and 80);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_region_check" CHECK ("members"."origin_region" is null or char_length(trim("members"."origin_region")) between 1 and 120);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_country_check" CHECK ("members"."origin_country" is null or char_length(trim("members"."origin_country")) between 1 and 80);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_country_code_check" CHECK ("members"."origin_country_code" is null or "members"."origin_country_code" ~ '^[A-Z]{2}$');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_coordinates_check" CHECK (("members"."origin_latitude" is null and "members"."origin_longitude" is null) or ("members"."origin_latitude" is not null and "members"."origin_longitude" is not null and "members"."origin_latitude" between -90 and 90 and "members"."origin_longitude" between -180 and 180));--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_place_id_check" CHECK ("members"."origin_place_id" is null or char_length(trim("members"."origin_place_id")) between 1 and 200);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_geocode_provider_check" CHECK ("members"."origin_geocode_provider" is null or char_length(trim("members"."origin_geocode_provider")) between 1 and 40);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_origin_geocode_confidence_check" CHECK ("members"."origin_geocode_confidence" is null or ("members"."origin_geocode_confidence" >= 0 and "members"."origin_geocode_confidence" <= 1));--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_city_check" CHECK ("members"."based_city" is null or char_length(trim("members"."based_city")) between 1 and 80);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_region_check" CHECK ("members"."based_region" is null or char_length(trim("members"."based_region")) between 1 and 120);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_country_check" CHECK ("members"."based_country" is null or char_length(trim("members"."based_country")) between 1 and 80);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_country_code_check" CHECK ("members"."based_country_code" is null or "members"."based_country_code" ~ '^[A-Z]{2}$');--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_coordinates_check" CHECK (("members"."based_latitude" is null and "members"."based_longitude" is null) or ("members"."based_latitude" is not null and "members"."based_longitude" is not null and "members"."based_latitude" between -90 and 90 and "members"."based_longitude" between -180 and 180));--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_place_id_check" CHECK ("members"."based_place_id" is null or char_length(trim("members"."based_place_id")) between 1 and 200);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_geocode_provider_check" CHECK ("members"."based_geocode_provider" is null or char_length(trim("members"."based_geocode_provider")) between 1 and 40);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_based_geocode_confidence_check" CHECK ("members"."based_geocode_confidence" is null or ("members"."based_geocode_confidence" >= 0 and "members"."based_geocode_confidence" <= 1));