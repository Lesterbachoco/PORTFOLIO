-- Run in Supabase: SQL Editor > New query

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null check (category in ('Web Apps','UI/UX','Full-Stack','Mobile')),
  tags text[] not null default '{}',
  image_url text,
  demo_url text,
  repo_url text,
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text not null,
  tag text not null default 'Insights',
  url text,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;
alter table projects enable row level security;
alter table posts enable row level security;

-- Visitors can send a message but never read others.
create policy "anyone can send a message" on contact_messages for insert to anon with check (true);
-- Visitors can read projects and posts; you edit them from the Supabase dashboard.
create policy "public read projects" on projects for select to anon using (true);
create policy "public read posts" on posts for select to anon using (true);
