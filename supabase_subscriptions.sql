-- Create a table for subscriptions
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS for subscriptions
alter table subscriptions enable row level security;

-- Allow anyone to insert (public subscription)
create policy "Anyone can insert subscriptions." on subscriptions
  for insert with check (true);

-- Only admins/service role can view (in practice, this denies select for public)
-- No select policy for public means they can't see the list
