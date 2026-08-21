HappyHr.Me Statewide + Analytics + SEO

WHAT CHANGED
- GA4 tag G-LSM7WTCQ9D added to the home page and SEO landing pages.
- Vercel Web Analytics script added. In Vercel, enable Web Analytics once, then redeploy.
- Island selector and maps for Oahu, Maui, Kauai and Hawaii Island.
- Supabase frontend reads island/city fields when present and still defaults old records to Oahu.
- 12 crawlable SEO landing pages, sitemap.xml, robots.txt, canonical/meta tags and internal links.
- GA4 events for island, area, open-now, view changes and source-link clicks.
- Bundled statewide fallback venues so the site remains useful if Supabase is temporarily unreachable.

IMPORTANT
Run HappyHrMe_STATEWIDE_DATABASE.sql in Supabase before expecting new island listings from the live database.
After deploy, enable Vercel Analytics in the Vercel dashboard and submit https://happyhr.me/sitemap.xml in Google Search Console.
