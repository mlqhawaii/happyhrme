-- HappyHr.Me venue-owner claims + subscription funnel
-- Run ONCE in Supabase SQL Editor before deploying this build.

alter table public.happy_hour_submissions
  add column if not exists venue_key text,
  add column if not exists owner_name text,
  add column if not exists owner_role text,
  add column if not exists owner_phone text,
  add column if not exists plan_requested text default 'free',
  add column if not exists plan_status text default 'lead';

alter table public.happy_hour_submissions
  drop constraint if exists happy_hour_submissions_submission_type_check;
alter table public.happy_hour_submissions
  add constraint happy_hour_submissions_submission_type_check
  check (submission_type in ('correction','new_venue','contact','claim'));

alter table public.happy_hour_submissions
  drop constraint if exists happy_hour_submissions_plan_requested_check;
alter table public.happy_hour_submissions
  add constraint happy_hour_submissions_plan_requested_check
  check (plan_requested is null or plan_requested in ('free','pro','featured'));

alter table public.happy_hour_submissions
  drop constraint if exists happy_hour_submissions_plan_status_check;
alter table public.happy_hour_submissions
  add constraint happy_hour_submissions_plan_status_check
  check (plan_status is null or plan_status in ('lead','approved','checkout_started','active','past_due','canceled'));

drop policy if exists "allow public happy hour submissions" on public.happy_hour_submissions;
create policy "allow public happy hour submissions"
on public.happy_hour_submissions
for insert
to anon, authenticated
with check (
  status = 'pending'
  and submission_type in ('correction','new_venue','contact','claim')
  and char_length(venue_name) between 1 and 200
  and char_length(market) between 1 and 120
  and char_length(details) between 5 and 5000
  and (submission_type <> 'claim' or plan_requested in ('free','pro','featured'))
);

create index if not exists happy_hour_submissions_claim_idx
  on public.happy_hour_submissions(submission_type, plan_status, created_at desc);
