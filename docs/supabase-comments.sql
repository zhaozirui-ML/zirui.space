-- Portfolio section feedback MVP.
-- Run this in the Supabase SQL Editor for the target project.

create table if not exists public.portfolio_comments (
  id uuid primary key default gen_random_uuid(),
  work_slug text not null,
  section_id text not null,
  section_label text not null,
  comment text not null check (char_length(comment) between 3 and 1000),
  visitor_name text check (visitor_name is null or char_length(visitor_name) <= 40),
  language text not null check (language in ('zh', 'en')),
  status text not null default 'open' check (status in ('open', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.portfolio_comments enable row level security;

revoke all on table public.portfolio_comments from anon, authenticated;
grant select, insert, update on table public.portfolio_comments to service_role;

create index if not exists portfolio_comments_created_at_idx
  on public.portfolio_comments (created_at desc);

create index if not exists portfolio_comments_work_section_idx
  on public.portfolio_comments (work_slug, section_id);
