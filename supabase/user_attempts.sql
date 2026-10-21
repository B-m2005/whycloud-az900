-- Run this in your Supabase SQL editor.
create table if not exists public.user_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  domain text not null,
  selected_index int not null,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);
grant select, insert, delete on public.user_attempts to authenticated;
grant all on public.user_attempts to service_role;
alter table public.user_attempts enable row level security;
create policy "read own attempts" on public.user_attempts for select to authenticated using (auth.uid() = user_id);
create policy "insert own attempts" on public.user_attempts for insert to authenticated with check (auth.uid() = user_id);
create policy "delete own attempts" on public.user_attempts for delete to authenticated using (auth.uid() = user_id);
