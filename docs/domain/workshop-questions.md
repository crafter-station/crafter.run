# Workshop Questions Board

## Grilled Decisions

- Attendees need direct presentation links: `/opencode` for Anthony's OpenCode presentation and `/claude-code` for Shiara's Claude Code presentation.
- Future workshops can use `/workshops/questions/{board-slug}` immediately; vanity routes can be added later if needed.
- A question has one required moderated field: the question.
- Name or alias is optional and can be left blank for anonymous questions.
- Context is an optional textarea for background, constraints, or details that help presenters answer better.
- Voting stays anonymous per browser with a local `voterId`, matching the existing next-projects board.
- The board is realtime and ranked by vote count first, newest submission second.
- Supabase service-role route handlers own writes; public RLS only exposes reads, matching the current project ideas board.

## Validation Model

- Cheap deterministic checks run before database writes: required question length, optional context length, and optional alias checks for URL/email/spam-keyword patterns, repeated characters, and excessive digits.
- AI moderation runs when `OPENAI_API_KEY` is configured and receives all submitted fields together so it can reject spammy names that are only suspicious in context.
- The existing project ideas board now validates optional aliases through the same public-name validator and includes aliases in AI moderation.

## Tables

- `audience_questions`: `id`, `board_slug`, `question`, `context`, `alias`, `created_at`.
- `board_slug` scopes each queue and is intentionally not an enum, so future events and presentations can reuse the same tables without another migration.
- `audience_question_votes`: `question_id`, `voter_id`, `created_at`, with one vote per browser identity per question.
