HappyHr.Me global map-pin coverage fix

Problem
- A venue could appear in the list but be omitted from the map when its database row lacked latitude/longitude and street address.
- This was not unique to Hawaiʻi Island; it could affect any city or island.

Global fix
1. Use stored latitude/longitude when available.
2. Otherwise geocode the stored street address.
3. If no address exists, perform a strict named-venue lookup using venue name + area/neighborhood + city/market + state.
4. Named-venue fallback requires ArcGIS geocoder score >= 90.
5. Every result must fall inside the selected market's configured geographic bounds.
6. Successful coordinates are cached (geo cache v4) for fast future loads.
7. The rule applies to verified happy-hour, verified-no-happy-hour, and checking pins in every supported market.

The four Hawaiʻi Island curated addresses remain as extra high-confidence fallbacks, but the map no longer depends on city-by-city manual address patches.
