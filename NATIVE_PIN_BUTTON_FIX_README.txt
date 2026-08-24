HappyHr.Me native pin interaction rebuild

- Every venue marker now renders a real HTML <button>.
- A single capture-phase click handler on #map handles all pins.
- Per-marker DOM binding is no longer required.
- Works identically for markers present immediately and markers added later by geocoding.
- Leaflet marker click remains only as a fallback.
- Ride links and the adult teal/ivory pin design are preserved.
