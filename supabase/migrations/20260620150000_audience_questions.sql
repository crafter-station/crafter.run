create extension if not exists pgcrypto;

create table if not exists public.audience_questions (
  id uuid primary key default gen_random_uuid(),
  board_slug text not null check (board_slug ~ '^[a-z0-9][a-z0-9-]*[a-z0-9]$' and char_length(board_slug) between 2 and 80),
  title text not null check (char_length(trim(title)) between 4 and 120),
  question text not null check (char_length(trim(question)) between 10 and 900),
  participant_name text not null check (char_length(trim(participant_name)) between 2 and 80),
  created_at timestamptz not null default now()
);

create index if not exists audience_questions_board_created_idx
  on public.audience_questions (board_slug, created_at desc);

create table if not exists public.audience_question_votes (
  question_id uuid not null references public.audience_questions(id) on delete cascade,
  voter_id text not null check (char_length(voter_id) between 16 and 120),
  created_at timestamptz not null default now(),
  primary key (question_id, voter_id)
);

alter table public.audience_questions enable row level security;
alter table public.audience_question_votes enable row level security;

drop policy if exists "Audience questions are public" on public.audience_questions;
create policy "Audience questions are public"
  on public.audience_questions for select
  using (true);

drop policy if exists "Audience question votes are public" on public.audience_question_votes;
create policy "Audience question votes are public"
  on public.audience_question_votes for select
  using (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'audience_questions'
  ) then
    alter publication supabase_realtime add table public.audience_questions;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'audience_question_votes'
  ) then
    alter publication supabase_realtime add table public.audience_question_votes;
  end if;
end $$;
