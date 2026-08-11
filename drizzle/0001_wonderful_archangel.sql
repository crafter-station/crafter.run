CREATE TABLE "audience_question_votes" (
	"question_id" uuid NOT NULL,
	"voter_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "audience_question_votes_question_id_voter_id_pk" PRIMARY KEY("question_id","voter_id"),
	CONSTRAINT "audience_question_votes_voter_id_check" CHECK (char_length("audience_question_votes"."voter_id") between 16 and 120)
);
--> statement-breakpoint
CREATE TABLE "audience_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"board_slug" text NOT NULL,
	"question" text NOT NULL,
	"context" text,
	"alias" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "audience_questions_board_slug_check" CHECK ("audience_questions"."board_slug" ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' and char_length("audience_questions"."board_slug") between 2 and 80),
	CONSTRAINT "audience_questions_question_check" CHECK (char_length(trim("audience_questions"."question")) between 10 and 900),
	CONSTRAINT "audience_questions_context_check" CHECK ("audience_questions"."context" is null or char_length(trim("audience_questions"."context")) between 1 and 1200),
	CONSTRAINT "audience_questions_alias_check" CHECK ("audience_questions"."alias" is null or char_length(trim("audience_questions"."alias")) between 2 and 80)
);
--> statement-breakpoint
ALTER TABLE "audience_question_votes" ADD CONSTRAINT "audience_question_votes_question_id_audience_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."audience_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audience_questions_board_created_idx" ON "audience_questions" USING btree ("board_slug","created_at" DESC NULLS LAST);