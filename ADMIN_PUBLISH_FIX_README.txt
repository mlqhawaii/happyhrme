Admin publish schema fix

- Publish payload now mirrors the proven n8n Upsert Verified Venue field set.
- Removed tags, schedule, and no_happy_hour from the admin insert because those
  optional/legacy columns can differ between schema versions.
- Added updated_at to match the national n8n upsert.
- Supabase/PostgREST errors are now returned to the admin UI verbatim enough to
  identify a missing column, constraint, type, or other schema problem.
- No SQL migration is required for this patch.

Test:
Admin -> The Surfing Pig -> Verify & enrich -> Publish venue.
If Supabase still rejects the row, the popup will now show the actual reason.
