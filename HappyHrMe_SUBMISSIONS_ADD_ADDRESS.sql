-- Run once in Supabase SQL Editor.
alter table public.happy_hour_submissions
  add column if not exists address text;

-- Optional but helpful index for moderation.
create index if not exists happy_hour_submissions_status_created_idx
  on public.happy_hour_submissions(status, created_at desc);
