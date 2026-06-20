alter table public.audience_questions
  rename column participant_name to alias;

alter table public.audience_questions
  drop constraint if exists audience_questions_participant_name_check;

alter table public.audience_questions
  add constraint audience_questions_alias_check
  check (alias is null or char_length(trim(alias)) between 2 and 80);
