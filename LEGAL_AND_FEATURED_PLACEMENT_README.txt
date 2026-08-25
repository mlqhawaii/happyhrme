HappyHr.Me — Legal pages + Featured placement upgrade

ADDED
1. /terms
2. /privacy
3. /cancellation-refunds
4. Footer links to all three policies and Contact
5. Featured-plan sponsored placement logic

FEATURED PLACEMENT RULE
A venue is boosted only when ALL of these are true:
- submission_type = claim
- requested plan = featured
- Stripe plan_status = active
- HappyHr admin status = reviewed OR applied

Payment never changes the venue's HappyHr verification state.

WHAT FEATURED DOES
- Shows a clearly labeled "Sponsored" badge
- Moves Featured venues higher within their relevant area when Sort = Recommended
- Gives the map pin a subtle sponsored star/ring and higher map stacking priority
- Adds "Sponsored" to the venue map popup
- Does not change the normal Verified/Checking/No happy hour status

HOW TO ACTIVATE A REAL FEATURED VENUE
1. Owner claims the venue and completes Featured checkout.
2. Stripe webhook changes plan_status to active.
3. In /admin, verify the owner and click "Approve / reviewed" (or Mark applied).
4. Refresh the public HappyHr page. The venue should appear as Sponsored.

NO NEW SQL MIGRATION IS REQUIRED for this upgrade.
No new Vercel environment variables are required.

Legal copy is general operational language for the current HappyHr.Me product and is
not a substitute for advice from a lawyer about your specific business.
