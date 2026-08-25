HappyHr.Me global overlapping pin click fix

Fixes the remaining issue where two venues could be visibly separated but still share the same nearest-pin click target.

Changes:
- every Leaflet venue marker is now genuinely interactive
- each 42x46 marker owns its own click/tap target
- overlapping venues are fanned out ~18m instead of ~7m
- nearest-pin map hit testing remains only as a background fallback
- applies globally to all cities and islands
