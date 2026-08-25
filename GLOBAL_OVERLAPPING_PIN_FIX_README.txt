HappyHr.Me global overlapping-pin fix

Problem:
Multiple venues can legitimately share the same geocoded coordinates (shopping centers,
hotels, resorts, food halls). Leaflet rendered those markers exactly on top of one another,
which made the visible pin count appear smaller than the venue count and hid clickable pins.

Fix:
- Applies to every market and island globally.
- Coordinates within roughly 8–10 meters are treated as an overlap group.
- First venue remains at the true coordinate.
- Additional venues fan out in a compact ring around the true location.
- Ride links still use the real venue coordinates, not the visual offset.
- Pin click/list-selection behavior remains unchanged.
- Overlap layout resets deterministically on each map render.
