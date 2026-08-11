CREATE TABLE "next_project_votes" (
	"project_id" uuid NOT NULL,
	"voter_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "next_project_votes_project_id_voter_id_pk" PRIMARY KEY("project_id","voter_id"),
	CONSTRAINT "next_project_votes_voter_id_length" CHECK (char_length("next_project_votes"."voter_id") between 16 and 120)
);
--> statement-breakpoint
CREATE TABLE "next_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"idea" text NOT NULL,
	"alias" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "next_projects_idea_length" CHECK (char_length(trim("next_projects"."idea")) between 4 and 600),
	CONSTRAINT "next_projects_alias_length" CHECK ("next_projects"."alias" is null or char_length(trim("next_projects"."alias")) between 1 and 80)
);
--> statement-breakpoint
ALTER TABLE "next_project_votes" ADD CONSTRAINT "next_project_votes_project_id_next_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."next_projects"("id") ON DELETE cascade ON UPDATE no action;