HappyHr.Me claim Content-Type fix

Fixes:
- Supabase admin requests with JSON bodies now send Content-Type: application/json.
- Prevents Supabase error: "Content-Type not acceptable: text/plain".
- Stripe checkout CTA remains hidden if claim submission fails.

No additional SQL migration is required.
