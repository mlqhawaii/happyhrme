Changes:
1. Map pins are now real <a href> links with a venue query parameter.
   JavaScript enhances them, but the link still works if event handling fails.
2. Old fallback geocode cache was invalidated (v3).
3. The site will NOT geocode from just name/neighborhood anymore.
   Missing coordinates + missing street address = no map pin until enriched.
4. New venue submissions include a Street Address field, required for new venues.
5. Run HappyHrMe_SUBMISSIONS_ADD_ADDRESS.sql once before using the updated form.
6. Existing submissions are reviewed in Supabase > Table Editor > happy_hour_submissions.
