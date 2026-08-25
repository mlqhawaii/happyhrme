HappyHr.Me – Hawaiʻi Island 4-pin map fix

Problem:
Four verified happy hours appeared in the list, but older Supabase records did not all contain street addresses. The map intentionally refuses weak name-only geocoding, so venues without addresses were omitted from the map.

Fix:
- Added verified street addresses for all four Hawaiʻi Island happy-hour listings.
- Added a curated address fallback in app.js so the live map works even before the database migration is applied.
- Added HappyHrMe_HAWAII_ISLAND_MAP_ADDRESS_FIX.sql to persist the addresses in Supabase.
- Preserves all existing map-pin click behavior, admin features, SEO pages and current design.

Expected result:
Hawaiʻi Island list = 4 verified happy hours and map = 4 corresponding pins (Kona pins may be close together but remain separate locations).
