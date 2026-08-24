HappyHr.Me pin/ride update

1. Corrected marker click overlap:
   - Leaflet marker box reduced from 56x56 to 42x46.
   - This prevents one invisible marker box from covering a neighboring visible pin.
   - All verified/no-happy-hour/checking markers still use the same marker factory.

2. Enlarged the happy face/smile while preserving the adult teal/ivory style.

3. Added "Get a ride" to map popups.
   - Currently opens Uber.
   - UBER_CLIENT_ID is intentionally blank in app.js.
   - Once HappyHr.Me receives an Uber developer/affiliate client ID, add it there.
   - With a client ID, the existing code generates a destination-prefilled Uber universal link.
   - ride_uber_click analytics event is already tracked for monetization measurement.
