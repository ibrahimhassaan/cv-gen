-- Create a table for public profiles
create table profiles (
  id text primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  preferred_language text,
  email text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid())::text = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid())::text = id);

-- Create a table for resumes
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  title text,
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for resumes
alter table resumes enable row level security;

create policy "Users can view own resumes." on resumes
  for select using ((select auth.uid())::text = user_id);

create policy "Users can insert own resumes." on resumes
  for insert with check ((select auth.uid())::text = user_id);

create policy "Users can update own resumes." on resumes
  for update using ((select auth.uid())::text = user_id);

create policy "Users can delete own resumes." on resumes
  for delete using ((select auth.uid())::text = user_id);


-- Note: Row Level Security (RLS) is enabled, but policies using auth.uid() 
-- will not work with Clerk unless you follow the Clerk-Supabase integration guide
-- for JWT verification. For now, the API uses the Service Role to bypass RLS.
