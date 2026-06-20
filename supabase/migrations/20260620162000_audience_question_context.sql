alter table public.audience_questions
  add column if not exists context text;

alter table public.audience_questions
  alter column participant_name drop not null;

alter table public.audience_questions
  drop constraint if exists audience_questions_participant_name_check;

alter table public.audience_questions
  add constraint audience_questions_participant_name_check
  check (participant_name is null or char_length(trim(participant_name)) between 2 and 80);

alter table public.audience_questions
  drop constraint if exists audience_questions_context_check;

alter table public.audience_questions
  add constraint audience_questions_context_check
  check (context is null or char_length(trim(context)) between 1 and 1200);
