-- HappyHr.Me admin/contact migration
-- Run once in Supabase SQL Editor BEFORE deploying this build.

-- Add admin notes for moderation.
alter table public.happy_hour_submissions
  add column if not exists admin_notes text;

-- Allow general website contact messages in the same moderation queue.
alter table public.happy_hour_submissions
  drop constraint if exists happy_hour_submissions_submission_type_check;

alter table public.happy_hour_submissions
  add constraint happy_hour_submissions_submission_type_check
  check (submission_type in ('correction','new_venue','contact'));

-- Recreate public INSERT policy with contact support.
drop policy if exists "allow public happy hour submissions"
  on public.happy_hour_submissions;

create policy "allow public happy hour submissions"
on public.happy_hour_submissions
for insert
to anon, authenticated
with check (
  status = 'pending'
  and submission_type in ('correction','new_venue','contact')
  and char_length(venue_name) between 1 and 200
  and char_length(market) between 1 and 120
  and char_length(details) between 5 and 5000
);

create index if not exists happy_hour_submissions_type_status_created_idx
  on public.happy_hour_submissions(submission_type, status, created_at desc);
