create extension if not exists pgcrypto;

create table if not exists public.next_projects (
  id uuid primary key default gen_random_uuid(),
  idea text not null check (char_length(trim(idea)) between 4 and 600),
  alias text check (alias is null or char_length(trim(alias)) between 1 and 80),
  created_at timestamptz not null default now()
);

create table if not exists public.next_project_votes (
  project_id uuid not null references public.next_projects(id) on delete cascade,
  voter_id text not null check (char_length(voter_id) between 16 and 120),
  created_at timestamptz not null default now(),
  primary key (project_id, voter_id)
);

alter table public.next_projects enable row level security;
alter table public.next_project_votes enable row level security;

drop policy if exists "Next projects are public" on public.next_projects;
create policy "Next projects are public"
  on public.next_projects for select
  using (true);

drop policy if exists "Next project votes are public" on public.next_project_votes;
create policy "Next project votes are public"
  on public.next_project_votes for select
  using (true);

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'next_projects'
  ) then
    alter publication supabase_realtime add table public.next_projects;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'next_project_votes'
  ) then
    alter publication supabase_realtime add table public.next_project_votes;
  end if;
end $$;
