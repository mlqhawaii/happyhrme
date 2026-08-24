HappyHr.Me map + Search indexing build

MAP
- Venue DOM markers are visual only.
- Leaflet map itself catches clicks/taps.
- It computes the nearest visible venue marker within 30px.
- Clicking/tapping opens that venue, updates the URL, and moves it to the top
  of the list.
- Hovering within 30px shows a pointer and enlarges the nearest pin.
- This works identically for cached, database, and asynchronously geocoded pins.

SEO
- sitemap.xml now contains only the homepage + 12 real standalone Hawaii guide
  pages. Parameter/rewritten mainland URLs that canonicalize to the homepage
  are no longer submitted as if they were independent indexable pages.
- Removed Vercel rewrites that could shadow the actual static Oahu/Maui/Kauai/
  Hawaii-Island guide HTML files.
- Admin remains noindex.

Search Console next steps are described in the accompanying ChatGPT response.
