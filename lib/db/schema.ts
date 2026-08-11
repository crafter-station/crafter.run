import { sql } from "drizzle-orm"
import { check, index, primaryKey, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const nextProjects = pgTable(
  "next_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    idea: text("idea").notNull(),
    alias: text("alias"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    check("next_projects_idea_length", sql`char_length(trim(${table.idea})) between 4 and 600`),
    check(
      "next_projects_alias_length",
      sql`${table.alias} is null or char_length(trim(${table.alias})) between 1 and 80`,
    ),
  ],
)

export const nextProjectVotes = pgTable(
  "next_project_votes",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => nextProjects.id, { onDelete: "cascade" }),
    voterId: text("voter_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.projectId, table.voterId] }),
    check("next_project_votes_voter_id_length", sql`char_length(${table.voterId}) between 16 and 120`),
  ],
)

export const audienceQuestions = pgTable(
  "audience_questions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    boardSlug: text("board_slug").notNull(),
    question: text("question").notNull(),
    context: text("context"),
    alias: text("alias"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    index("audience_questions_board_created_idx").on(table.boardSlug, table.createdAt.desc()),
    check(
      "audience_questions_board_slug_check",
      sql`${table.boardSlug} ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' and char_length(${table.boardSlug}) between 2 and 80`,
    ),
    check("audience_questions_question_check", sql`char_length(trim(${table.question})) between 4 and 900`),
    check(
      "audience_questions_context_check",
      sql`${table.context} is null or char_length(trim(${table.context})) between 1 and 1200`,
    ),
    check(
      "audience_questions_alias_check",
      sql`${table.alias} is null or char_length(trim(${table.alias})) between 2 and 80`,
    ),
  ],
)

export const audienceQuestionVotes = pgTable(
  "audience_question_votes",
  {
    questionId: uuid("question_id")
      .notNull()
      .references(() => audienceQuestions.id, { onDelete: "cascade" }),
    voterId: text("voter_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.questionId, table.voterId] }),
    check("audience_question_votes_voter_id_check", sql`char_length(${table.voterId}) between 16 and 120`),
  ],
)
