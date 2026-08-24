Map pin audit fix

All map venue pins now use one createVenueMarker() factory.
- verified, verified-no-happy-hour and checking markers use the same click wiring
- 56x56 invisible click target surrounds each visible pin
- visible marker size remains unchanged
- click/tap opens popup and focuses venue at top of list
- stored-coordinate and async-geocoded markers go through the same factory
