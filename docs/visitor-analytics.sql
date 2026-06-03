create schema if not exists private;

revoke all on schema private from public;

create table if not exists public.visitors (
  id bigint generated always as identity primary key,
  visitor_id text not null unique,
  first_seen_at timestamptz not null default timezone('utc', now()),
  landing_path text not null,
  referrer_source text not null,
  user_agent_hash text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_stats (
  key text primary key,
  total_unique_visitors integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now())
);

insert into public.site_stats (key, total_unique_visitors)
values ('global', 0)
on conflict (key) do nothing;

alter table public.visitors enable row level security;
alter table public.site_stats enable row level security;

revoke all on table public.visitors from anon, authenticated;
revoke all on table public.site_stats from anon, authenticated;

grant select, insert on table public.visitors to service_role;
grant select, update on table public.site_stats to service_role;
grant usage, select on sequence public.visitors_id_seq to service_role;

create or replace function private.bump_site_stats_from_visitor_insert()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
begin
  insert into public.site_stats (key, total_unique_visitors, updated_at)
  values ('global', 1, timezone('utc', now()))
  on conflict (key)
  do update
    set total_unique_visitors = public.site_stats.total_unique_visitors + 1,
        updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists visitors_after_insert_bump_site_stats on public.visitors;

create trigger visitors_after_insert_bump_site_stats
after insert on public.visitors
for each row
execute function private.bump_site_stats_from_visitor_insert();
