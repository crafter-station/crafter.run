ALTER TABLE "members" ADD COLUMN "salary_min" integer;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "salary_max" integer;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "salary_currency" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "work_arrangements" text[] DEFAULT '{}'::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "onsite_city" text;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "resume_url" text;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_salary_range_check" CHECK (("members"."salary_min" is null and "members"."salary_max" is null and "members"."salary_currency" is null) or ("members"."salary_min" is not null and "members"."salary_max" is not null and "members"."salary_currency" is not null and "members"."salary_min" >= 0 and "members"."salary_min" <= "members"."salary_max" and "members"."salary_max" <= 10000000 and "members"."salary_currency" ~ '^[A-Z]{3}$'));--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_work_arrangements_check" CHECK (cardinality("members"."work_arrangements") <= 3 and "members"."work_arrangements" <@ array['remote', 'onsite', 'hybrid']::text[]);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_onsite_city_check" CHECK ("members"."onsite_city" is null or char_length(trim("members"."onsite_city")) between 1 and 120);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_onsite_preference_check" CHECK ((("members"."work_arrangements" && array['onsite', 'hybrid']::text[]) and "members"."onsite_city" is not null) or (not ("members"."work_arrangements" && array['onsite', 'hybrid']::text[]) and "members"."onsite_city" is null));--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_resume_url_check" CHECK ("members"."resume_url" is null or "members"."resume_url" ~ '^https?://');