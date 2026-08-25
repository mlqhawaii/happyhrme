HappyHr.Me claim submission server fix

What changed
- Venue claims now POST to /api/submit-owner-claim.
- The Vercel server function writes to Supabase using the existing SUPABASE_SERVICE_ROLE_KEY.
- This avoids fragile anonymous-browser RLS/schema behavior.
- The UI now shows the actual returned error message if a claim fails.
- Stripe checkout behavior is unchanged: successful Pro/Featured claims continue into /api/create-owner-checkout.

No additional Supabase migration is required if HappyHrMe_OWNER_CLAIMS_SUBSCRIPTION_MIGRATION.sql was already run.
