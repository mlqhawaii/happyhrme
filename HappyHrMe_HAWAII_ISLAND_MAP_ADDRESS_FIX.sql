-- Persist verified Hawaiʻi Island venue addresses so every listed venue can be geocoded and pinned.
update public.happy_hours set address='64 Keawe St, Hilo, HI 96720' where lower(venue_name)=lower('Jackie Rey''s Ohana Grill Hilo');
update public.happy_hours set address='75-5852 Alii Dr, Kailua-Kona, HI 96740' where lower(venue_name)=lower('Don''s Mai Tai Bar & Restaurant');
update public.happy_hours set address='75-5824 Kahakai Rd, Kailua-Kona, HI 96740' where lower(venue_name)=lower('On The Rocks');
update public.happy_hours set address='69-1081 Kuualii Pl, Waikoloa, HI 96738' where lower(venue_name)=lower('Lava Lava Beach Club Waikoloa');
