alter table public.happy_hour_submissions
 add column if not exists automation_state text not null default 'queued',
 add column if not exists automation_attempts integer not null default 0,
 add column if not exists automation_checked_at timestamptz,
 add column if not exists automation_next_at timestamptz default now(),
 add column if not exists automation_error text,
 add column if not exists automation_evidence jsonb;
create or replace function public.happyhr_claim_automatic_submissions(p_limit integer default 8)
returns setof public.happy_hour_submissions language sql security invoker set search_path=public as $$
 update public.happy_hour_submissions s set automation_state='processing',automation_attempts=automation_attempts+1,automation_next_at=now()+interval '10 minutes'
 where s.id in (
 select id from public.happy_hour_submissions where submission_type in ('new_venue','venue','correction') and status='pending'
 and (automation_next_at is null or automation_next_at<=now())
 order by automation_attempts asc,id asc for update skip locked limit greatest(1,least(p_limit,8))) returning s.*;
$$;
revoke all on function public.happyhr_claim_automatic_submissions(integer) from public,anon,authenticated;
grant execute on function public.happyhr_claim_automatic_submissions(integer) to service_role;
create or replace function public.happyhr_automatic_submission_summary()
returns jsonb language sql stable security invoker set search_path=public as $$
 select jsonb_build_object('queued',count(*) filter(where status='pending' and automation_state='queued'),
 'processing',count(*) filter(where status='pending' and automation_state='processing'),
 'retry',count(*) filter(where status='pending' and automation_state='retry'),
 'published',count(*) filter(where automation_state='published'),
 'last_check',max(automation_checked_at)) from public.happy_hour_submissions where submission_type in ('new_venue','venue','correction');
$$;
revoke all on function public.happyhr_automatic_submission_summary() from public,anon,authenticated;
grant execute on function public.happyhr_automatic_submission_summary() to service_role;
