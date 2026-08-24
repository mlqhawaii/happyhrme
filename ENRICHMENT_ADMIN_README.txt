HappyHr.Me automatic enrichment admin update

New admin flow:
1. Open a pending venue/correction.
2. Click Verify & enrich.
3. Server fetches the submitted official source URL.
4. It extracts structured address/name/geo where available.
5. It looks for Happy Hour / Pau Hana / Power Hour evidence and time ranges.
6. If coordinates are not embedded, it geocodes the real street address via OpenStreetMap Nominatim.
7. Admin sees an editable preview.
8. Publish venue creates or updates public.happy_hours and marks the submission applied.

Safety/accuracy:
- It does not invent an address from neighborhood text.
- Publishing requires venue name + street address + valid lat/long.
- Official-source evidence is shown in the preview when found.
- Submitted happy-hour details are used as fallback if the source has no machine-readable time.
