alter table public.audience_questions
  alter column title drop not null;

alter table public.audience_questions
  drop constraint if exists audience_questions_title_check;

alter table public.audience_questions
  add constraint audience_questions_title_check
  check (title is null or char_length(trim(title)) between 4 and 120);
