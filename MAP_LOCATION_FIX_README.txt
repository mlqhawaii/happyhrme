HappyHr.Me exact pin-anchor + Mai Tai's Ala Moana location fix

Changes:
- Leaflet icon anchor moved from [21,43] to [21,50].
  The exact venue coordinate now lands on the sharp TIP of the rotated CSS pin.
- Popup anchor adjusted accordingly.
- Mai Tai's Ala Moana explicitly tied to 1450 Ala Moana Blvd Suite 3247.
- Mai Tai's Ala Moana gets a curated Ala Moana Center coordinate so stale or
  ambiguous data cannot map it to the separate Aqua Palms / Waikiki location.
- Browser geocode cache bumped from v10 to v11.

Note:
Overlap handling can still fan multiple venues that share exactly the same
coordinate by a few dozen meters so each marker remains clickable. Those
markers retain a connector line back to the true coordinate.
