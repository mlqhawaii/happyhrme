HappyHr.Me Global Location Sanity Fix

What changed:
- Venue coordinates are no longer trusted merely because they fall somewhere in a city/island.
- Every coordinate must also be plausible for the venue's stated area/neighborhood.
- Bad imported coordinates and bad browser-cache coordinates are discarded automatically.
- Geocoding is biased and constrained to the correct local area.
- If HappyHr cannot obtain a trustworthy location, it suppresses the pin rather than showing it in the wrong place.
- Geocoding cache bumped to v8, so old bad browser coordinates are automatically abandoned.
- Dixie Grill BBQ & Crab Shack is hard-locked to verified Aiea coordinates.
- Lost + Found at Wayfinder is hard-locked to verified Waikiki coordinates.
- Sponsored pin rotation is corrected while retaining the premium Sponsored appearance.

No SQL migration required.
No Vercel environment variable changes required.
