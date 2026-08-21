begin;

alter table public.happy_hours add column if not exists island text;
alter table public.happy_hours add column if not exists city text;
alter table public.happy_hours add column if not exists slug text;
alter table public.happy_hours add column if not exists state text default 'HI';
alter table public.happy_hours add column if not exists country text default 'US';

update public.happy_hours set island='Oahu' where island is null or btrim(island)='';
update public.happy_hours set city='Honolulu' where island='Oahu' and (city is null or btrim(city)='');
update public.happy_hours set state='HI' where state is null;
update public.happy_hours set country='US' where country is null;

create index if not exists happy_hours_island_idx on public.happy_hours(island);
create index if not exists happy_hours_city_idx on public.happy_hours(city);
create index if not exists happy_hours_island_area_idx on public.happy_hours(island, neighborhood, area);

-- Seed currently verified statewide listings. ON CONFLICT is handled with a name/island existence check.
with seed(venue_name,island,city,neighborhood,area,address,days,early_display,late_display,cheapest_beer,drink_highlight,food_highlight,source_url,tags,schedule,verification) as (values
('Gather on Maui','Maui','Wailea','Wailea','Wailea','100 Wailea Golf Club Dr, Wailea, HI 96753','Daily','3:00–5:00 PM','—',null,'Daily happy-hour drinks','Discounted small bites','https://gatheronmaui.com/wailea-kihei-happy-hour/',array['food','views']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('OAO Sushi Bar & Grill','Maui','Kihei','Wailea','Wailea','34 Wailea Gateway Pl Unit A-101, Kihei, HI 96753','Daily','3:00–5:00 PM','—',null,'Happy-hour beverage specials','Happy-hour sushi and bites','https://www.oaowailea.com/best-happy-hour',array['sushi','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('Tommy Bahama Wailea','Maui','Kihei','Wailea','Wailea','3750 Wailea Alanui Dr, Kihei, HI 96753','Daily','3:00–5:00 PM','—',8,'Specialty cocktails & wine $5 off; select drafts $8','Selected happy-hour bites','https://www.tommybahama.com/en/restaurants-and-marlin-bars/locations/wailea',array['cocktails','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('The Pint & Cork','Maui','Kihei','Wailea','Wailea','3750 Wailea Alanui Dr, Kihei, HI 96753','Daily','2:00–5:00 PM','—',null,'Discounted drafts, cocktails & wine','Happy-hour sliders and pub bites','https://mauihappyhours.net/2026/01/05/pint-and-cork-wailea-maui-happy-hour/',array['beer','food']::text[],'{"0":[[14,17]],"1":[[14,17]],"2":[[14,17]],"3":[[14,17]],"4":[[14,17]],"5":[[14,17]],"6":[[14,17]]}'::jsonb,'curated_current_2026-08-21'),
('Three''s Bar & Grill','Maui','Kihei','Kihei','Kīhei','1945 S Kihei Rd, Kihei, HI 96753','Daily','3:00–6:00 PM','—',null,'Daily drink specials','Sushi, oysters and small-plate specials','https://threesbarandgrill.com/',array['food','sushi']::text[],'{"0":[[15,18]],"1":[[15,18]],"2":[[15,18]],"3":[[15,18]],"4":[[15,18]],"5":[[15,18]],"6":[[15,18]]}'::jsonb,'official_verified_2026-08-21'),
('Isana Brave Fish Kitchen','Maui','Kihei','Kihei','Kīhei','515 S Kihei Rd #C3, Kihei, HI 96753','Daily','3:00–5:00 PM','9:00–10:00 PM',null,'Discounts on select beverages','Discounted sushi and food','https://www.isanarestaurant.net/happy-hour-menu',array['sushi','late']::text[],'{"0":[[15,17],[21,22]],"1":[[15,17],[21,22]],"2":[[15,17],[21,22]],"3":[[15,17],[21,22]],"4":[[15,17],[21,22]],"5":[[15,17],[21,22]],"6":[[15,17],[21,22]]}'::jsonb,'official_verified_2026-08-21'),
('Table at Poipu','Kauai','Koloa','Poipu','Poʻipū / Kōloa','2829 Ala Kalanikaumaka St F207A, Koloa, HI 96756','Mon–Sat','4:00–5:30 PM','—',5,'$5 draft/local beer; $8 Mai Tai; $10 select wine','Happy-hour dining menu','https://tableatpoipu.com/',array['beer','food']::text[],'{"1":[[16,17.5]],"2":[[16,17.5]],"3":[[16,17.5]],"4":[[16,17.5]],"5":[[16,17.5]],"6":[[16,17.5]]}'::jsonb,'official_verified_2026-08-21'),
('RumFire Poipu Beach','Kauai','Koloa','Poipu','Poʻipū','2440 Hoonani Rd, Koloa, HI 96756','Thu–Sun','5:00–6:00 PM','9:00–10:00 PM',6,'$11 craft cocktails; $9 wine; $6 draft beer','Select happy-hour pupus','https://www.rumfirekauai.com/our-menus',array['views','late','food']::text[],'{"0":[[17,18],[21,22]],"4":[[17,18],[21,22]],"5":[[17,18],[21,22]],"6":[[17,18],[21,22]]}'::jsonb,'official_verified_2026-08-21'),
('Kauai Island Brewing Company','Kauai','Eleele','Port Allen','Port Allen / ʻEleʻele',null,'Daily','3:00–5:00 PM','—',null,'$2 off house beer & house seltzer','$2 off pupus','https://kauaiislandbrewing.com/',array['brewery','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('Brennecke''s Beach Broiler','Kauai','Koloa','Poipu','Poʻipū','2100 Hoone Rd, Koloa, HI 96756','Daily','3:00–5:00 PM','—',null,'Happy-hour drink specials','Happy-hour pupu specials','https://brenneckes.com/',array['views','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'curated_verified_2026-08-21'),
('Lava Lava Beach Club Kauai','Kauai','Kapaa','Kapaa','Kapaʻa',null,'Daily','3:00–5:00 PM','Drinks to 6:00 PM',null,'$2 off draught beer; happy-hour cocktails','Happy-hour pupus','https://lavalavabeachclub.com/kauai/',array['beach','food']::text[],'{"0":[[15,18]],"1":[[15,18]],"2":[[15,18]],"3":[[15,18]],"4":[[15,18]],"5":[[15,18]],"6":[[15,18]]}'::jsonb,'official_menu_verified_2026-08-21'),
('Jackie Rey''s Ohana Grill Hilo','Hawaii','Hilo','Hilo','Hilo',null,'Daily','3:00–5:00 PM','—',6,'$6 draft beer; $7 classics; $9 wine','Happy-hour pupu picks','https://www.jackiereyshilo.com/happy-hour-menu',array['food','local']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('On The Rocks','Hawaii','Kailua-Kona','Kona','Kailua-Kona','75-5824 Kahakai Rd, Kailua-Kona, HI 96740','Daily','3:00–5:00 PM','—',null,'Happy-hour cocktails and beer','Happy-hour pupus','https://www.huggosontherocks.com/menu/',array['beach','music','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_verified_2026-08-21'),
('Don''s Mai Tai Bar & Restaurant','Hawaii','Kailua-Kona','Kona','Kailua-Kona','75-5852 Alii Dr, Kailua-Kona, HI 96740','Daily','4:00–6:00 PM','—',null,'Happy-hour cocktails and drink specials','Happy-hour pupus','https://www.royalkona.com/dining',array['views','cocktails']::text[],'{"0":[[16,18]],"1":[[16,18]],"2":[[16,18]],"3":[[16,18]],"4":[[16,18]],"5":[[16,18]],"6":[[16,18]]}'::jsonb,'official_verified_2026-08-21'),
('Lava Lava Beach Club Waikoloa','Hawaii','Waikoloa','Waikoloa','Waikōloa',null,'Daily','3:00–5:00 PM','—',null,'Happy-hour tropical drinks and beer','Happy-hour pupus','https://lavalavabeachclub.com/bigisland/',array['beach','food']::text[],'{"0":[[15,17]],"1":[[15,17]],"2":[[15,17]],"3":[[15,17]],"4":[[15,17]],"5":[[15,17]],"6":[[15,17]]}'::jsonb,'official_menu_verified_2026-08-21')
)
insert into public.happy_hours(venue_name,island,city,neighborhood,area,address,days,early_display,late_display,cheapest_beer,drink_highlight,food_highlight,source_url,tags,schedule,verification,active,last_checked)
select s.venue_name,s.island,s.city,s.neighborhood,s.area,s.address,s.days,s.early_display,s.late_display,s.cheapest_beer,s.drink_highlight,s.food_highlight,s.source_url,s.tags,s.schedule,s.verification,true,now()
from seed s
where not exists (select 1 from public.happy_hours h where lower(h.venue_name)=lower(s.venue_name) and h.island=s.island);

commit;

select island, count(*) as active_venues from public.happy_hours where active=true group by island order by island;
