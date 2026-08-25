HappyHr.Me Complete Pin Coverage Fix

Goal:
- Every visible venue listing gets a map pin immediately.
- Exact coordinates remain preferred.
- Bad mountain / wrong-neighborhood coordinates remain rejected.

Behavior:
1. Curated exact coordinates win.
2. Trusted database/browser coordinates are rendered immediately.
3. Listings without trusted coordinates receive a deterministic temporary pin
   inside the correct neighborhood (or city center for mainland markets).
4. ArcGIS geocoding runs in the background with two attempts:
   neighborhood-biased first, broader market lookup second.
5. When an exact result succeeds, the temporary pin is removed and replaced at
   the exact location.
6. If geocoding fails, the venue remains visible in its correct general area
   instead of disappearing.
7. One bad venue can never blank the whole map.

Cache namespace: v10

No SQL migration required.
No Vercel environment-variable changes required.
