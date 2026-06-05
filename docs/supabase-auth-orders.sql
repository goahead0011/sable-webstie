-- sable auth/profile/order setup
-- Apply once in Supabase SQL editor, then run the verification queries at the end.
-- In Supabase Auth settings, disable email confirmations so signup returns a session immediately.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null default '',
  phone text not null default '',
  postal_code text not null default '',
  address_line1 text not null default '',
  address_line2 text not null default '',
  address_label text not null default 'home',
  points integer not null default 3000000 check (points >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total integer not null check (total >= 0),
  items jsonb not null,
  shipping_address jsonb not null,
  payment_method text not null default 'points',
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.orders enable row level security;

drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "orders select own" on public.orders;
create policy "orders select own"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "orders insert own" on public.orders;
create policy "orders insert own"
on public.orders
for insert
to authenticated
with check (auth.uid() = user_id);

grant usage on schema public to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert on public.orders to authenticated;

select pg_notify('pgrst', 'reload schema');

-- Verification queries:
-- select table_name from information_schema.tables where table_schema = 'public' and table_name in ('profiles', 'orders');
-- select tablename, rowsecurity from pg_tables where schemaname = 'public' and tablename in ('profiles', 'orders');
-- select schemaname, tablename, policyname from pg_policies where schemaname = 'public' and tablename in ('profiles', 'orders') order by tablename, policyname;
