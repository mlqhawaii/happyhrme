HappyHr.Me Stripe Admin Upgrade

Adds:
- Stripe customer ID in admin
- Stripe subscription ID in admin
- Next renewal date
- Open subscription in Stripe
- Open customer in Stripe
- Automatic test/live Stripe dashboard URLs
- Venue claims filter in admin
- Webhook storage of Stripe current_period_end

IMPORTANT ORDER
1. Run HappyHrMe_STRIPE_ADMIN_UPGRADE_MIGRATION.sql in Supabase SQL Editor.
2. Deploy this build.
3. In Stripe Sandbox, resend customer.subscription.updated (or perform another
   test subscription event) so existing test claims receive the renewal date.

No new Vercel environment variable is required.
