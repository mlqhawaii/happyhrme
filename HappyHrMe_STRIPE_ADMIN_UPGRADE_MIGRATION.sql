alter table public.happy_hour_submissions
  add column if not exists stripe_current_period_end timestamptz;

notify pgrst, 'reload schema';
