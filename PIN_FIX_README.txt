All map marker event handlers are registered before the marker is added to Leaflet. DOM click/touch/keyboard handlers are attached to every marker, including asynchronously geocoded pins.
