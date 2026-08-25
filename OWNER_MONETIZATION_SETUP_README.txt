HappyHr.Me Venue Claim + Subscription Funnel

WHAT THIS BUILD ADDS
- Claim button on every venue list row and map popup.
- Free venue-owner claims routed into the existing HappyHr.Me admin queue.
- New public /owners page with three plans:
    Claimed: $0/month
    Pro: $49/month
    Featured: $99/month
- Admin claim controls for requested plan + plan status.
- Stripe subscription Checkout support for Pro/Featured.
- Sponsored/Featured positioning is explicitly separated from HappyHr.Me verification.

ONE-TIME SUPABASE STEP (REQUIRED BEFORE CLAIMS CAN SUBMIT)
Run HappyHrMe_OWNER_CLAIMS_SUBSCRIPTION_MIGRATION.sql in Supabase SQL Editor.

STRIPE SETUP (OPTIONAL UNTIL YOU WANT TO CHARGE)
In Stripe, create two recurring monthly Prices:
- HappyHr.Me Pro: $49/month
- HappyHr.Me Featured: $99/month

Then in Vercel > HappyHr.Me > Settings > Environment Variables add for Production:
- STRIPE_SECRET_KEY = your Stripe secret key
- STRIPE_PRO_PRICE_ID = the recurring Price ID for $49/month
- STRIPE_FEATURED_PRICE_ID = the recurring Price ID for $99/month
Redeploy after adding/changing environment variables.

Until Stripe is configured, claims still work. Pro/Featured claimants are saved in the admin queue and see a friendly message that checkout will be activated after verification.

ADMIN WORKFLOW
- /admin > Type = Venue claim
- Review owner identity/contact and venue website.
- Change requested plan if needed.
- Plan status options: Lead, Approved, Checkout started, Active, Past due, Canceled.
- Claim moderation status remains separate: Pending, Reviewed, Applied, Rejected.

IMPORTANT INTEGRITY RULE
Payment does not change a venue's HappyHr.Me verification status. Featured placement should always be visibly labeled sponsored/featured.
