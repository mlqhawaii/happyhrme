HappyHr.Me Map Pins Recovery Fix

Root cause fixed:
- The previous build referenced hasCuratedVenueAddress() without defining it.
- That JavaScript exception stopped renderMapMarkers(), so all venue pins vanished.

This build:
- Defines the missing helper.
- Makes cached coordinate handling fail-safe.
- Makes marker rendering resilient venue-by-venue.
- A single malformed listing can no longer blank an entire city's map.
- Keeps the market + neighborhood coordinate sanity checks.
- Keeps Dixie Grill and Lost + Found verified coordinate overrides.
- Bumps browser geocode cache to v9.

No SQL migration required.
No Vercel environment-variable changes required.
