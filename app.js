const fallbackVenues = [
  {name:"Aloha Beer Kakaʻako", neighborhood:"Kakaako", area:"Kakaʻako", days:"Daily", early:"2:00–6:00 PM", late:"—", beer:null, drinks:"$2 off draft pints", food:"$15-and-under happy-hour food menu", tags:["brewery","food"], source:"https://alohabeer.com/pages/locations", slots:{0:[[14,18]],1:[[14,18]],2:[[14,18]],3:[[14,18]],4:[[14,18]],5:[[14,18]],6:[[14,18]]}},
  {name:"Moku Kitchen", neighborhood:"Kakaako", area:"Kakaʻako", days:"Daily", early:"2:00–5:30 PM", late:"Late-night varies", beer:null, drinks:"Discounted drinks", food:"50% off small plates; $12 pizzas reported", tags:["food","groups"], source:"https://honolulutravels.com/honolulu-happy-hour-guide/", slots:{0:[[14,17.5]],1:[[14,17.5]],2:[[14,17.5]],3:[[14,17.5]],4:[[14,17.5]],5:[[14,17.5]],6:[[14,17.5]]}},
  {name:"PITCH Sports Bar", neighborhood:"Kakaako", area:"Kakaʻako", days:"Daily", early:"2:30–6:30 PM", late:"—", beer:null, drinks:"Beer bucket specials reported", food:"$3 hand rolls reported", tags:["sports","sushi"], source:"https://pitchsportsbar.com/about", slots:{0:[[14.5,18.5]],1:[[14.5,18.5]],2:[[14.5,18.5]],3:[[14.5,18.5]],4:[[14.5,18.5]],5:[[14.5,18.5]],6:[[14.5,18.5]]}},
  {name:"Bevy", neighborhood:"Kakaako", area:"Kakaʻako", days:"Tue all night; Wed–Sat", early:"5:00–7:00 PM Wed–Sat", late:"All night Tue", beer:5, drinks:"$5 Corona / Modelo / Kirin", food:"Seasonal / pop-up food", tags:["cocktails","late"], source:"https://bevyhawaii.com/happy-hour/", slots:{2:[[17,24]],3:[[17,19]],4:[[17,19]],5:[[17,19]],6:[[17,19]]}},
  {name:"Hana Koa Brewing Co.", neighborhood:"Kakaako", area:"Kakaʻako", days:"Tue–Fri", early:"3:00–6:00 PM", late:"—", beer:null, drinks:"Brewery happy-hour specials", food:"Happy-hour menu available", tags:["brewery"], source:"https://www.hanakoabrewing.com/", slots:{2:[[15,18]],3:[[15,18]],4:[[15,18]],5:[[15,18]]}},
  {name:"The Row Kakaʻako", neighborhood:"Kakaako", area:"Kakaʻako", days:"Daily", early:"Daily specials — confirm hours", late:"—", beer:4, drinks:"$4 High Life / Coors Banquet; $4 wells", food:"—", tags:["cheap"], source:"https://www.therowkakaako.bar/menu", slots:{}},
  {name:"ELEVEN", neighborhood:"Ala Moana", area:"Ala Moana", days:"Wed–Sun", early:"Open–6:30 PM", late:"—", beer:null, drinks:"Discounted classic cocktails", food:"$2 oysters reported", tags:["oysters","date"], source:"https://www.elevenhnl.com/", slots:{}},
  {name:"Mai Tai’s Ala Moana", neighborhood:"Ala Moana", area:"Ala Moana", days:"Daily", early:"3:00–7:00 PM", late:"8:00–11:00 PM Sun–Thu", beer:5, drinks:"$5 domestic beers", food:"1/2 off pupus", tags:["music","late","food"], source:"https://www.maitaishawaii.com/happy-hour/", slots:{0:[[15,19],[20,23]],1:[[15,19],[20,23]],2:[[15,19],[20,23]],3:[[15,19],[20,23]],4:[[15,19],[20,23]],5:[[15,19]],6:[[15,19]]}},
  {name:"Lucky Strike Honolulu", neighborhood:"Ala Moana", area:"Ala Moana", days:"Mon–Fri", early:"1:00–5:00 PM", late:"—", beer:6, drinks:"$6 drafts / wells / house wine", food:"Select $6 food items", tags:["games","groups"], source:"https://www.bowlero.com/", slots:{1:[[13,17]],2:[[13,17]],3:[[13,17]],4:[[13,17]],5:[[13,17]]}},
  {name:"Morton’s The Steakhouse", neighborhood:"Ala Moana", area:"Ala Moana", days:"Sun–Fri", early:"4:00–6:30 PM", late:"—", beer:null, drinks:"Power Hour bar specials", food:"Steakhouse bar bites", tags:["upscale","date"], source:"https://www.mortons.com/", slots:{0:[[16,18.5]],1:[[16,18.5]],2:[[16,18.5]],3:[[16,18.5]],4:[[16,18.5]],5:[[16,18.5]]}},
  {name:"Doraku Sushi Kakaʻako", neighborhood:"Ala Moana", area:"Kapiʻolani / Ala Moana", days:"Mon–Fri", early:"4:00–6:00 PM", late:"9:00 PM–close", beer:null, drinks:"Happy-hour drinks", food:"Sushi / izakaya specials", tags:["sushi","late"], source:"https://dorakusushi.com/kakaako/menu/drink", slots:{1:[[16,18],[21,24]],2:[[16,18],[21,24]],3:[[16,18],[21,24]],4:[[16,18],[21,24]],5:[[16,18],[21,24]]}},
  {name:"DECK. Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"Drinks 2:00–6:00 PM", late:"—", beer:6, drinks:"$6 bottles/cans; $8 local drafts", food:"Fries $6; sliders $15; other plates", tags:["view","food"], source:"https://www.deckwaikiki.com/qr/", slots:{0:[[14,18]],1:[[14,18]],2:[[14,18]],3:[[14,18]],4:[[14,18]],5:[[14,18]],6:[[14,18]]}},
  {name:"Lost + Found at Wayfinder", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"2:00–5:00 PM", late:"—", beer:5, drinks:"$5 draft beers", food:"—", tags:["poolside","cheap"], source:"https://www.wayfinderwaikiki.com/eat-drink/lost-found/", slots:{0:[[14,17]],1:[[14,17]],2:[[14,17]],3:[[14,17]],4:[[14,17]],5:[[14,17]],6:[[14,17]]}},
  {name:"The Seaside", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"Open–6:00 PM", late:"—", beer:4, drinks:"$4 Heineken / Kirin Light / Corona", food:"Oysters / seafood happy-hour menu", tags:["seafood","cheap"], source:"https://www.seasidewaikiki.com/menu/happy-hour", slots:{}},
  {name:"The Butcher Bar", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"4:00–6:00 PM", late:"—", beer:6, drinks:"$6 happy-hour draft", food:"$5 jerky; $7 fries; $25 butcher’s cut", tags:["steak","food"], source:"https://www.thebutcherbarwaikiki.com/happyhour", slots:{0:[[16,18]],1:[[16,18]],2:[[16,18]],3:[[16,18]],4:[[16,18]],5:[[16,18]],6:[[16,18]]}},
  {name:"SKY Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"4:00–6:00 PM", late:"—", beer:5, drinks:"$5 Modelo; $10 bubbly", food:"$4 oysters", tags:["rooftop","view","oysters"], source:"https://skywaikiki.com/", slots:{0:[[16,18]],1:[[16,18]],2:[[16,18]],3:[[16,18]],4:[[16,18]],5:[[16,18]],6:[[16,18]]}},
  {name:"Earls Kitchen + Bar Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"2:00–5:00 PM", late:"10:00 PM–close daily", beer:null, drinks:"Many cocktails 1/2 price; $3 off beer/wine", food:"$10 fish taco; $17 steak frites", tags:["late","food"], source:"https://earls.ca/locations/earls-waikiki/menu", slots:{0:[[14,17],[22,24]],1:[[14,17],[22,24]],2:[[14,17],[22,24]],3:[[14,17],[22,24]],4:[[14,17],[22,24]],5:[[14,17],[22,24]],6:[[14,17],[22,24]]}},
  {name:"Chart House Waikiki", neighborhood:"Waikiki", area:"Waikīkī / Harbor", days:"Daily", early:"3:30–6:00 PM", late:"9:00–10:30 PM", beer:6, drinks:"$6 domestic bottles / wells; $7 drafts", food:"$10 and $13 pupus", tags:["late","harbor"], source:"https://charthousewaikiki.com/menus/happy-hour-waikiki-menu/", slots:{0:[[15.5,18],[21,22.5]],1:[[15.5,18],[21,22.5]],2:[[15.5,18],[21,22.5]],3:[[15.5,18],[21,22.5]],4:[[15.5,18],[21,22.5]],5:[[15.5,18],[21,22.5]],6:[[15.5,18],[21,22.5]]}},
  {name:"Tommy Bahama Restaurant & Bar", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"3:00–5:00 PM", late:"—", beer:8, drinks:"$8 select draft beer; $10 wells", food:"All starters $5 off; sliders/tacos deals", tags:["rooftop","relaxed"], source:"https://content.tommybahama.com/content/dam/tommy/restaurants/waikiki/Waikiki_Dinner_Menu.pdf", slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Hy’s Steak House", neighborhood:"Waikiki", area:"Waikīkī", days:"Nightly", early:"5:00–6:30 PM", late:"—", beer:null, drinks:"Happy-hour cocktails / wine", food:"Oysters, shrimp cocktail & bar bites", tags:["upscale","date"], source:"https://hyswaikiki.com/happy-hour/", slots:{0:[[17,18.5]],1:[[17,18.5]],2:[[17,18.5]],3:[[17,18.5]],4:[[17,18.5]],5:[[17,18.5]],6:[[17,18.5]]}},
  {name:"Splash Bar Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"3:00–5:00 PM", late:"—", beer:null, drinks:"$2 off draft beers; $12 cocktails", food:"$7 fries / dip / edamame", tags:["casual","hotel"], source:"https://www.splashbarwaikiki.com/specials", slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Aloha Table Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"Confirm current hours", late:"—", beer:5, drinks:"$5 Bud Light; $6.50 Aloha Blonde", food:"Under-$10 dishes", tags:["cheap","casual"], source:"https://www.waikiki.alohatable.com/happy-hour", slots:{}},

  {name:"808 Craft House", neighborhood:"West Oahu", area:"Ko Olina", days:"Daily", early:"3:00–5:00 PM", late:"9:00 PM–close", beer:7, drinks:"$7 select drafts; $7 wells; $9 Mai Tais", food:"25% off select apps; $15 smashburger", tags:["late","food","resort"], source:"https://www.808craft.com/happy-hour/", slots:{0:[[15,17],[21,23]],1:[[15,17],[21,23]],2:[[15,17],[21,23]],3:[[15,17],[21,23]],4:[[15,17],[21,23]],5:[[15,17],[21,23]],6:[[15,17],[21,23]]}},
  {name:"Monkeypod Kitchen Ko Olina", neighborhood:"West Oahu", area:"Ko Olina", days:"Daily", early:"3:30–5:00 PM", late:"—", beer:null, drinks:"Happy-hour craft beer & cocktail specials", food:"Selected happy-hour food", tags:["food","resort","music"], source:"https://koolinashops.com/dining/monkeypod-kitchen-by-merriman", slots:{0:[[15.5,17]],1:[[15.5,17]],2:[[15.5,17]],3:[[15.5,17]],4:[[15.5,17]],5:[[15.5,17]],6:[[15.5,17]]}},
  {name:"Mekiko Cantina", neighborhood:"West Oahu", area:"Ko Olina", days:"Daily", early:"3:00–5:00 PM", late:"—", beer:null, drinks:"Select drink & cocktail specials", food:"Happy-hour appetizers", tags:["mexican","resort","food"], source:"https://koolinashops.com/offers", slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Moani Island Bistro & Bar", neighborhood:"West Oahu", area:"Kapolei", days:"Daily", early:"3:00–5:00 PM", late:"—", beer:null, drinks:"Daily happy-hour drink specials", food:"Happy-hour food menu", tags:["music","food","local"], source:"https://www.moanikapolei.com/", slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Maui Brewing Co. Kailua", neighborhood:"Windward", area:"Kailua", days:"Mon–Fri", early:"3:30–5:30 PM", late:"—", beer:null, drinks:"$2 off beers; $3 off craft cocktails", food:"$14 pizzas; 50% off select apps", tags:["brewery","food","groups"], source:"https://www.mbcrestaurants.com/kailua/", slots:{1:[[15.5,17.5]],2:[[15.5,17.5]],3:[[15.5,17.5]],4:[[15.5,17.5]],5:[[15.5,17.5]]}},
  {name:"The Boardroom Kailua", neighborhood:"Windward", area:"Kailua", days:"Wed–Sun", early:"5:00–6:00 PM", late:"9:00–11:30 PM Fri–Sat", beer:null, drinks:"$15 signatures; $8 oyster shooters", food:"$5 off select apps", tags:["cocktails","date","late"], source:"https://www.theboardroomkailua.com/", slots:{3:[[17,18]],4:[[17,18]],5:[[17,18],[21,23.5]],6:[[17,18],[21,23.5]],0:[[17,18]]}},
  {name:"The Garden Kailua", neighborhood:"Windward", area:"Kailua", days:"Mon–Fri", early:"3:00–6:00 PM", late:"—", beer:null, drinks:"Pau Hana beer, wine & cocktail specials", food:"Daily pizza specials", tags:["outdoor","music","food"], source:"https://www.thegardenkailua.com/", slots:{1:[[15,18]],2:[[15,18]],3:[[15,18]],4:[[15,18]],5:[[15,18]]}},
  {name:"Gyu-Kaku Windward Mall", neighborhood:"Windward", area:"Kāneʻohe", days:"Daily", early:"Mon/Thu all day; others 11 AM–6 PM", late:"Late window most days", beer:null, drinks:"Happy-hour drink pricing", food:"Happy-hour yakiniku pricing", tags:["food","late","groups"], source:"https://www.gyu-kaku.com/windward-mall/", slots:{0:[[11,18],[20,20.25]],1:[[11,20.25]],2:[[11,18],[20,20.25]],3:[[11,18],[20,20.25]],4:[[11,20.25]],5:[[11,18],[20,20.75]],6:[[11,18],[20,20.75]]}},
  {name:"BREW'd Craft Pub", neighborhood:"East Honolulu", area:"Kaimukī", days:"Daily", early:"4:00–6:00 PM", late:"—", beer:null, drinks:"$2 off full drafts; $6 wells & house wine", food:"$3 off appetizers & pub fare", tags:["brewery","food","dogs"], source:"https://www.brewdcraftpub.com/", slots:{0:[[16,18]],1:[[16,18]],2:[[16,18]],3:[[16,18]],4:[[16,18]],5:[[16,18]],6:[[16,18]]}},
  {name:"et al.", neighborhood:"East Honolulu", area:"Kāhala", days:"Daily", early:"Happy hour — verify current time", late:"—", beer:null, drinks:"Pau hana cocktail specials", food:"Sliders, arancini & snackable specials", tags:["upscale","date","food"], source:"https://etalhawaii.com/", slots:{}},
  {name:"Restaurant 604", neighborhood:"Central", area:"Pearl Harbor", days:"Mon–Fri", early:"3:00–5:00 PM", late:"—", beer:null, drinks:"Aloha Hour cocktails & drink specials", food:"Appetizer specials", tags:["waterfront","music","food"], source:"https://jbphh.greatlifehawaii.com/dining-retail/restaurants/restaurant-604", slots:{1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]]}},
  {name:"Dixie Grill BBQ & Crab Shack", neighborhood:"Central", area:"Aiea", days:"Daily", early:"3:00–6:00 PM; Mon all day", late:"—", beer:9, drinks:"32oz draft $9; wells $7; Jameson/Jack $6", food:"$7 onion rings; $11 calamari; HH bites", tags:["bbq","sports","food"], source:"https://dixiegrill.com/aiea-near-aloha-stadium-dixie-grill-bbq-and-crab-shack-happy-hours-specials", slots:{0:[[15,18]],1:[[11,21]],2:[[15,18]],3:[[15,18]],4:[[15,18]],5:[[15,18]],6:[[15,18]]}},
  {name:"Little Joe's Steakhouse Pearl City", neighborhood:"Central", area:"Pearl City", days:"Nightly", early:"4:30–7:00 PM", late:"—", beer:4.95, drinks:"Beers from $4.95; wine from $8.95", food:"Discounted steakhouse menu until 6:30", tags:["steak","food","date","cheap"], source:"https://www.littlejoessteakhouse.com/happyhour", slots:{0:[[16.5,19]],1:[[16.5,19]],2:[[16.5,19]],3:[[16.5,19]],4:[[16.5,19]],5:[[16.5,19]],6:[[16.5,19]]}},
  {name:"Uncle Bo's Haleiwa", neighborhood:"North Shore", area:"Haleʻiwa", days:"Daily when open", early:"2:00–6:00 PM", late:"—", beer:null, drinks:"Happy-hour drink specials", food:"Happy-hour pupu menu", tags:["northshore","food","local"], source:"https://www.unclebosrestaurant.com/wp-content/uploads/2022/07/HALEIWA-DINNER-MENU-2.pdf", slots:{2:[[14,18]],3:[[14,18]],4:[[14,18]],5:[[14,18]],6:[[14,18]],0:[[14,18]]}},
];

const statewideFallbackVenues = [
  {name:"Gather on Maui",island:"Maui",neighborhood:"Wailea",area:"Wailea",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"Daily happy-hour drinks",food:"Discounted small bites",tags:["food","views"],source:"https://gatheronmaui.com/wailea-kihei-happy-hour/",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"OAO Sushi Bar & Grill",island:"Maui",neighborhood:"Wailea",area:"Wailea",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"Happy-hour beverage specials",food:"Happy-hour sushi and bites",tags:["sushi","food"],source:"https://www.oaowailea.com/best-happy-hour",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Tommy Bahama Wailea",island:"Maui",neighborhood:"Wailea",area:"Wailea",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:8,drinks:"Specialty cocktails & wine $5 off; select drafts $8",food:"Selected happy-hour bites",tags:["cocktails","food"],source:"https://www.tommybahama.com/en/restaurants-and-marlin-bars/locations/wailea",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"The Pint & Cork",island:"Maui",neighborhood:"Wailea",area:"Wailea",days:"Daily",early:"2:00–5:00 PM",late:"—",beer:null,drinks:"Discounted drafts, cocktails & wine",food:"Happy-hour sliders and pub bites",tags:["beer","food"],source:"https://mauihappyhours.net/2026/01/05/pint-and-cork-wailea-maui-happy-hour/",slots:{0:[[14,17]],1:[[14,17]],2:[[14,17]],3:[[14,17]],4:[[14,17]],5:[[14,17]],6:[[14,17]]}},
  {name:"Three's Bar & Grill",island:"Maui",neighborhood:"Kihei",area:"Kīhei",days:"Daily",early:"3:00–6:00 PM",late:"—",beer:null,drinks:"Daily drink specials",food:"Sushi, oysters and small-plate specials",tags:["food","sushi"],source:"https://threesbarandgrill.com/",slots:{0:[[15,18]],1:[[15,18]],2:[[15,18]],3:[[15,18]],4:[[15,18]],5:[[15,18]],6:[[15,18]]}},
  {name:"Isana Brave Fish Kitchen",island:"Maui",neighborhood:"Kihei",area:"Kīhei",days:"Daily",early:"3:00–5:00 PM",late:"9:00–10:00 PM",beer:null,drinks:"Discounts on select beverages",food:"Discounted sushi and food",tags:["sushi","late"],source:"https://www.isanarestaurant.net/happy-hour-menu",slots:{0:[[15,17],[21,22]],1:[[15,17],[21,22]],2:[[15,17],[21,22]],3:[[15,17],[21,22]],4:[[15,17],[21,22]],5:[[15,17],[21,22]],6:[[15,17],[21,22]]}},
  {name:"Table at Poipu",island:"Kauai",neighborhood:"Poipu",area:"Poʻipū / Kōloa",days:"Mon–Sat",early:"4:00–5:30 PM",late:"—",beer:5,drinks:"$5 draft/local beer; $8 Mai Tai; $10 select wine",food:"Happy-hour dining menu",tags:["beer","food"],source:"https://tableatpoipu.com/",slots:{1:[[16,17.5]],2:[[16,17.5]],3:[[16,17.5]],4:[[16,17.5]],5:[[16,17.5]],6:[[16,17.5]]}},
  {name:"RumFire Poipu Beach",island:"Kauai",neighborhood:"Poipu",area:"Poʻipū",days:"Thu–Sun",early:"5:00–6:00 PM",late:"9:00–10:00 PM",beer:6,drinks:"$11 craft cocktails; $9 wine; $6 draft beer",food:"Select happy-hour pupus",tags:["views","late","food"],source:"https://www.rumfirekauai.com/our-menus",slots:{0:[[17,18],[21,22]],4:[[17,18],[21,22]],5:[[17,18],[21,22]],6:[[17,18],[21,22]]}},
  {name:"Kauai Island Brewing Company",island:"Kauai",neighborhood:"Port Allen",area:"Port Allen / ʻEleʻele",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"$2 off house beer & house seltzer",food:"$2 off pupus",tags:["brewery","food"],source:"https://kauaiislandbrewing.com/",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Brennecke's Beach Broiler",island:"Kauai",neighborhood:"Poipu",area:"Poʻipū",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"Happy-hour drink specials",food:"Happy-hour pupu specials",tags:["views","food"],source:"https://brenneckes.com/",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Lava Lava Beach Club Kauai",island:"Kauai",neighborhood:"Kapaa",area:"Kapaʻa",days:"Daily",early:"3:00–5:00 PM",late:"Drinks to 6:00 PM",beer:null,drinks:"$2 off draught beer; happy-hour cocktails",food:"Happy-hour pupus",tags:["beach","food"],source:"https://lavalavabeachclub.com/kauai/",slots:{0:[[15,18]],1:[[15,18]],2:[[15,18]],3:[[15,18]],4:[[15,18]],5:[[15,18]],6:[[15,18]]}},
  {name:"Jackie Rey's Ohana Grill Hilo",island:"Hawaii",neighborhood:"Hilo",area:"Hilo",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:6,drinks:"$6 draft beer; $7 classics; $9 wine",food:"Happy-hour pupu picks",tags:["food","local"],source:"https://www.jackiereyshilo.com/happy-hour-menu",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"On The Rocks",island:"Hawaii",neighborhood:"Kona",area:"Kailua-Kona",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"Happy-hour cocktails and beer",food:"Happy-hour pupus",tags:["beach","music","food"],source:"https://www.huggosontherocks.com/menu/",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}},
  {name:"Don's Mai Tai Bar & Restaurant",island:"Hawaii",neighborhood:"Kona",area:"Kailua-Kona",days:"Daily",early:"4:00–6:00 PM",late:"—",beer:null,drinks:"Happy-hour cocktails and drink specials",food:"Happy-hour pupus",tags:["views","cocktails"],source:"https://www.royalkona.com/dining",slots:{0:[[16,18]],1:[[16,18]],2:[[16,18]],3:[[16,18]],4:[[16,18]],5:[[16,18]],6:[[16,18]]}},
  {name:"Lava Lava Beach Club Waikoloa",island:"Hawaii",neighborhood:"Waikoloa",area:"Waikōloa",days:"Daily",early:"3:00–5:00 PM",late:"—",beer:null,drinks:"Happy-hour tropical drinks and beer",food:"Happy-hour pupus",tags:["beach","food"],source:"https://lavalavabeachclub.com/bigisland/",slots:{0:[[15,17]],1:[[15,17]],2:[[15,17]],3:[[15,17]],4:[[15,17]],5:[[15,17]],6:[[15,17]]}}
];


const SUPABASE_URL = "https://woygwngmfdkwotopkeur.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ovVbmHBT-ROEjmM6Vc48_w_qGrX7y5t";
const islandNames={Oahu:"Oʻahu",Maui:"Maui",Hawaii:"Hawaiʻi Island",Kauai:"Kauaʻi"};
const oahuFallback=fallbackVenues.map(v=>({...v,island:"Oahu"}));
let venues=[...oahuFallback,...statewideFallbackVenues];

function normalizeIsland(value){
  const raw=String(value||"").trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[ʻ’‘`']/g,"").replace(/\s+/g," ");
  if(!raw || raw==="oahu") return "Oahu";
  if(raw==="maui") return "Maui";
  if(raw==="kauai") return "Kauai";
  if(raw==="hawaii" || raw==="hawaii island" || raw==="big island") return "Hawaii";
  return value;
}
function rowToVenue(row){return {
  id:row.id,name:row.venue_name,island:normalizeIsland(row.island),city:row.city||"",market:row.market||"",metroSlug:row.metro_slug||"",state:row.state||"",country:row.country||"US",
  neighborhood:row.neighborhood||row.area||"",area:row.area||row.neighborhood||"",
  address:row.address||"",latitude:row.latitude==null?null:Number(row.latitude),longitude:row.longitude==null?null:Number(row.longitude),
  days:row.days||"Confirm hours",early:row.early_display||"Confirm current hours",late:row.late_display||"—",
  beer:row.cheapest_beer==null?null:Number(row.cheapest_beer),drinks:row.drink_highlight||"—",food:row.food_highlight||"—",dealHighlights:row.deal_highlights||"",
  verification:row.verification||"",noHappyHour:row.no_happy_hour===true||row.verification==="verified_no_happy_hour",
  tags:Array.isArray(row.tags)?row.tags:[],source:row.source_url||"#",slots:row.schedule&&typeof row.schedule==="object"?row.schedule:{}
}}
const MARKET_STATE_CODES={
  Oahu:"HI",Maui:"HI",Kauai:"HI",Hawaii:"HI",
  "los-angeles":"CA","san-diego":"CA","san-francisco":"CA",seattle:"WA",portland:"OR","las-vegas":"NV",phoenix:"AZ",denver:"CO",austin:"TX",dallas:"TX",houston:"TX","san-antonio":"TX",chicago:"IL",nashville:"TN","new-york":"NY",boston:"MA","washington-dc":"DC",philadelphia:"PA",atlanta:"GA",miami:"FL",tampa:"FL","new-orleans":"LA"
};
const MARKET_TIMEZONES={
  Oahu:"Pacific/Honolulu",Maui:"Pacific/Honolulu",Kauai:"Pacific/Honolulu",Hawaii:"Pacific/Honolulu",
  "los-angeles":"America/Los_Angeles","san-diego":"America/Los_Angeles","san-francisco":"America/Los_Angeles",seattle:"America/Los_Angeles",portland:"America/Los_Angeles","las-vegas":"America/Los_Angeles",phoenix:"America/Phoenix",denver:"America/Denver",austin:"America/Chicago",dallas:"America/Chicago",houston:"America/Chicago","san-antonio":"America/Chicago",chicago:"America/Chicago",nashville:"America/Chicago","new-york":"America/New_York",boston:"America/New_York","washington-dc":"America/New_York",philadelphia:"America/New_York",atlanta:"America/New_York",miami:"America/New_York",tampa:"America/New_York","new-orleans":"America/Chicago"
};
function normalizedStateCode(v){
  const raw=String(v||"").trim().toUpperCase();
  const full={HAWAII:"HI",CALIFORNIA:"CA",WASHINGTON:"WA",OREGON:"OR",NEVADA:"NV",ARIZONA:"AZ",COLORADO:"CO",TEXAS:"TX",ILLINOIS:"IL",TENNESSEE:"TN","NEW YORK":"NY",MASSACHUSETTS:"MA","DISTRICT OF COLUMBIA":"DC",PENNSYLVANIA:"PA",GEORGIA:"GA",FLORIDA:"FL",LOUISIANA:"LA"};
  return full[raw]||raw;
}
function addressStateCode(address){
  const m=String(address||"").toUpperCase().match(/,\s*([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?(?:,|$)/);
  return m?m[1]:"";
}
function venueBelongsToMarket(v,key){
  const expected=MARKET_STATE_CODES[key];
  if(!expected) return true;
  const explicit=normalizedStateCode(v.state);
  const fromAddress=addressStateCode(v.address);
  if(explicit && explicit.length<=2 && explicit!==expected) return false;
  if(fromAddress && fromAddress!==expected) return false;
  if(key==="Oahu" && Number.isFinite(v.latitude) && Number.isFinite(v.longitude)){
    if(v.latitude<21.20||v.latitude>21.75||v.longitude<-158.35||v.longitude>-157.60) return false;
  }
  return true;
}
async function loadVenuesFromSupabase(){
  const url=`${SUPABASE_URL}/rest/v1/happy_hours?select=*&active=eq.true&order=venue_name.asc`;
  try{const response=await fetch(url,{headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,Accept:"application/json"}});if(!response.ok)throw new Error(`Supabase ${response.status}`);const rows=await response.json();if(!Array.isArray(rows)||!rows.length)throw new Error("No active venues returned");venues=rows.map(rowToVenue).filter(v=>venueBelongsToMarket(v,venueMarketKey(v)));document.documentElement.dataset.dataSource="supabase";refreshAll();}
  catch(error){console.warn("Using bundled fallback because Supabase could not be reached.",error);document.documentElement.dataset.dataSource="fallback";refreshAll();}
}

const islandConfigs={
 Oahu:{label:"Oʻahu",center:[21.43,-157.98],zoom:10,bounds:[[21.242,-158.305],[21.725,-157.615]],regions:[
  {key:"North Shore",label:"North Shore / Haleʻiwa",lat:21.593,long:-158.104,zoom:12},{key:"Windward",label:"Kailua / Kāneʻohe",lat:21.407,long:-157.744,zoom:12},{key:"Central",label:"Aiea / Pearl City",lat:21.397,long:-157.965,zoom:12},{key:"West Oahu",label:"Kapolei / Ko Olina",lat:21.338,long:-158.123,zoom:12},{key:"East Honolulu",label:"Kaimukī / Kāhala",lat:21.278,long:-157.789,zoom:13},{key:"Ala Moana",label:"Ala Moana",lat:21.291,long:-157.843,zoom:14},{key:"Kakaako",label:"Kakaʻako",lat:21.297,long:-157.858,zoom:14},{key:"Waikiki",label:"Waikīkī",lat:21.279,long:-157.829,zoom:14}]},
 Maui:{label:"Maui",center:[20.80,-156.34],zoom:10,bounds:[[20.53,-156.75],[21.08,-156.02]],regions:[
  {key:"Wailea",label:"Wailea",lat:20.686,long:-156.440,zoom:13},{key:"Kihei",label:"Kīhei",lat:20.749,long:-156.457,zoom:13},{key:"Kahului",label:"Kahului / Wailuku",lat:20.889,long:-156.474,zoom:12},{key:"Kaanapali",label:"Kāʻanapali",lat:20.927,long:-156.696,zoom:13},{key:"Lahaina",label:"Lāhainā / Kahana",lat:20.908,long:-156.680,zoom:12},{key:"Paia",label:"Pāʻia / Upcountry",lat:20.915,long:-156.381,zoom:12}]},
 Kauai:{label:"Kauaʻi",center:[22.05,-159.50],zoom:10,bounds:[[21.83,-159.82],[22.27,-159.25]],regions:[
  {key:"Poipu",label:"Poʻipū / Kōloa",lat:21.881,long:-159.469,zoom:13},{key:"Lihue",label:"Līhuʻe",lat:21.974,long:-159.368,zoom:13},{key:"Kapaa",label:"Kapaʻa",lat:22.075,long:-159.319,zoom:13},{key:"Hanalei",label:"Hanalei / North Shore",lat:22.204,long:-159.497,zoom:12},{key:"Port Allen",label:"Port Allen / Waimea",lat:21.900,long:-159.583,zoom:12}]},
 Hawaii:{label:"Hawaiʻi Island",center:[19.60,-155.52],zoom:8,bounds:[[18.85,-156.15],[20.35,-154.75]],regions:[
  {key:"Kona",label:"Kailua-Kona",lat:19.640,long:-155.996,zoom:12},{key:"Waikoloa",label:"Waikōloa / Kohala",lat:19.925,long:-155.887,zoom:11},{key:"Hilo",label:"Hilo",lat:19.724,long:-155.086,zoom:12},{key:"Puna",label:"Puna",lat:19.49,long:-154.95,zoom:11}]}
};
islandConfigs["los-angeles"]={label:"Los Angeles",center:[34.0522,-118.2437],zoom:10,bounds:[[33.7022,-118.5937],[34.4022,-117.89370000000001]],regions:[{key:"__market__",label:"Los Angeles",lat:34.0522,long:-118.2437,zoom:11}]};
islandConfigs["san-diego"]={label:"San Diego",center:[32.7157,-117.1611],zoom:10,bounds:[[32.515699999999995,-117.36110000000001],[32.9157,-116.9611]],regions:[{key:"__market__",label:"San Diego",lat:32.7157,long:-117.1611,zoom:11}]};
islandConfigs["san-francisco"]={label:"San Francisco",center:[37.7749,-122.4194],zoom:10,bounds:[[37.5749,-122.6194],[37.974900000000005,-122.2194]],regions:[{key:"__market__",label:"San Francisco",lat:37.7749,long:-122.4194,zoom:11}]};
islandConfigs["seattle"]={label:"Seattle",center:[47.6062,-122.3321],zoom:10,bounds:[[47.4062,-122.5321],[47.806200000000004,-122.1321]],regions:[{key:"__market__",label:"Seattle",lat:47.6062,long:-122.3321,zoom:11}]};
islandConfigs["portland"]={label:"Portland",center:[45.5152,-122.6784],zoom:10,bounds:[[45.3152,-122.8784],[45.7152,-122.4784]],regions:[{key:"__market__",label:"Portland",lat:45.5152,long:-122.6784,zoom:11}]};
islandConfigs["las-vegas"]={label:"Las Vegas",center:[36.1699,-115.1398],zoom:10,bounds:[[35.969899999999996,-115.3398],[36.3699,-114.93979999999999]],regions:[{key:"__market__",label:"Las Vegas",lat:36.1699,long:-115.1398,zoom:11}]};
islandConfigs["phoenix"]={label:"Phoenix",center:[33.4484,-112.074],zoom:10,bounds:[[33.0984,-112.42399999999999],[33.7984,-111.724]],regions:[{key:"__market__",label:"Phoenix",lat:33.4484,long:-112.074,zoom:11}]};
islandConfigs["denver"]={label:"Denver",center:[39.7392,-104.9903],zoom:10,bounds:[[39.539199999999994,-105.19030000000001],[39.9392,-104.7903]],regions:[{key:"__market__",label:"Denver",lat:39.7392,long:-104.9903,zoom:11}]};
islandConfigs["austin"]={label:"Austin",center:[30.2672,-97.7431],zoom:10,bounds:[[30.0672,-97.9431],[30.4672,-97.5431]],regions:[{key:"__market__",label:"Austin",lat:30.2672,long:-97.7431,zoom:11}]};
islandConfigs["dallas"]={label:"Dallas",center:[32.7767,-96.797],zoom:10,bounds:[[32.576699999999995,-96.997],[32.9767,-96.597]],regions:[{key:"__market__",label:"Dallas",lat:32.7767,long:-96.797,zoom:11}]};
islandConfigs["houston"]={label:"Houston",center:[29.7604,-95.3698],zoom:10,bounds:[[29.4104,-95.71979999999999],[30.110400000000002,-95.0198]],regions:[{key:"__market__",label:"Houston",lat:29.7604,long:-95.3698,zoom:11}]};
islandConfigs["san-antonio"]={label:"San Antonio",center:[29.4241,-98.4936],zoom:10,bounds:[[29.2241,-98.6936],[29.6241,-98.2936]],regions:[{key:"__market__",label:"San Antonio",lat:29.4241,long:-98.4936,zoom:11}]};
islandConfigs["chicago"]={label:"Chicago",center:[41.8781,-87.6298],zoom:10,bounds:[[41.6781,-87.8298],[42.078100000000006,-87.4298]],regions:[{key:"__market__",label:"Chicago",lat:41.8781,long:-87.6298,zoom:11}]};
islandConfigs["nashville"]={label:"Nashville",center:[36.1627,-86.7816],zoom:10,bounds:[[35.9627,-86.9816],[36.362700000000004,-86.5816]],regions:[{key:"__market__",label:"Nashville",lat:36.1627,long:-86.7816,zoom:11}]};
islandConfigs["new-york"]={label:"New York",center:[40.7128,-74.006],zoom:10,bounds:[[40.5128,-74.206],[40.912800000000004,-73.806]],regions:[{key:"__market__",label:"New York",lat:40.7128,long:-74.006,zoom:11}]};
islandConfigs["boston"]={label:"Boston",center:[42.3601,-71.0589],zoom:10,bounds:[[42.1601,-71.2589],[42.560100000000006,-70.85889999999999]],regions:[{key:"__market__",label:"Boston",lat:42.3601,long:-71.0589,zoom:11}]};
islandConfigs["washington-dc"]={label:"Washington DC",center:[38.9072,-77.0369],zoom:10,bounds:[[38.7072,-77.2369],[39.107200000000006,-76.8369]],regions:[{key:"__market__",label:"Washington DC",lat:38.9072,long:-77.0369,zoom:11}]};
islandConfigs["philadelphia"]={label:"Philadelphia",center:[39.9526,-75.1652],zoom:10,bounds:[[39.752599999999994,-75.3652],[40.1526,-74.9652]],regions:[{key:"__market__",label:"Philadelphia",lat:39.9526,long:-75.1652,zoom:11}]};
islandConfigs["atlanta"]={label:"Atlanta",center:[33.749,-84.388],zoom:10,bounds:[[33.549,-84.58800000000001],[33.949000000000005,-84.188]],regions:[{key:"__market__",label:"Atlanta",lat:33.749,long:-84.388,zoom:11}]};
islandConfigs["miami"]={label:"Miami",center:[25.7617,-80.1918],zoom:10,bounds:[[25.561700000000002,-80.3918],[25.9617,-79.9918]],regions:[{key:"__market__",label:"Miami",lat:25.7617,long:-80.1918,zoom:11}]};
islandConfigs["tampa"]={label:"Tampa",center:[27.9506,-82.4572],zoom:10,bounds:[[27.750600000000002,-82.6572],[28.1506,-82.2572]],regions:[{key:"__market__",label:"Tampa",lat:27.9506,long:-82.4572,zoom:11}]};
islandConfigs["new-orleans"]={label:"New Orleans",center:[29.9511,-90.0715],zoom:10,bounds:[[29.7511,-90.2715],[30.1511,-89.8715]],regions:[{key:"__market__",label:"New Orleans",lat:29.9511,long:-90.0715,zoom:11}]};
Object.assign(islandNames,{"los-angeles":"Los Angeles","san-diego":"San Diego","san-francisco":"San Francisco","seattle":"Seattle","portland":"Portland","las-vegas":"Las Vegas","phoenix":"Phoenix","denver":"Denver","austin":"Austin","dallas":"Dallas","houston":"Houston","san-antonio":"San Antonio","chicago":"Chicago","nashville":"Nashville","new-york":"New York","boston":"Boston","washington-dc":"Washington DC","philadelphia":"Philadelphia","atlanta":"Atlanta","miami":"Miami","tampa":"Tampa","new-orleans":"New Orleans"});
function venueMarketKey(v){
  const slug=String(v.metroSlug||"").toLowerCase();
  if(slug==="honolulu"||slug==="oahu") return "Oahu";
  if(slug==="maui") return "Maui";
  if(slug==="kauai") return "Kauai";
  if(slug==="hawaii-island"||slug==="hawaii") return "Hawaii";
  if(slug) return slug;
  return v.island;
}
const state={q:"",island:"Oahu",neighborhood:"all",open:false,price:"any",time:"any",sort:"recommended",view:"map",selectedVenueKey:null};
const byId=id=>document.getElementById(id),grid=byId('venueGrid'),fullGrid=byId('venueGridFull'),resultCount=byId('resultCount');
function track(name,params={}){try{if(typeof gtag==='function')gtag('event',name,params)}catch(e){}}
function marketNow(){const tz=MARKET_TIMEZONES[state.island]||Intl.DateTimeFormat().resolvedOptions().timeZone||'UTC';const parts=new Intl.DateTimeFormat('en-US',{timeZone:tz,weekday:'short',hour:'numeric',minute:'2-digit',hour12:false}).formatToParts(new Date());const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));const days={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};let hour=Number(map.hour);if(hour===24)hour=0;return{day:days[map.weekday],hour:hour+Number(map.minute)/60,label:`${String(hour).padStart(2,'0')}:${map.minute}`}}
function statusFor(v){const n=marketNow(),slots=v.slots[n.day]||[];for(const[s,e]of slots){if(n.hour>=s&&n.hour<e)return{key:'open',label:'Open now'}}const future=slots.find(([s])=>s>n.hour);if(future){let h=Math.floor(future[0]),m=future[0]%1?30:0;return{key:'later',label:`Starts ${h>12?h-12:h}:${m?'30':'00'} ${h>=12?'PM':'AM'}`}}return{key:'closed',label:slots.length?'Done today':'Check hours'}}
function isLate(v){return v.tags.includes('late')||v.late!=='—'}
function isPlaceholderText(value){
  const t=String(value||"").trim().toLowerCase();
  if(!t||t==="—"||t==="-")return true;
  return /confirm|check hours|unknown|not available|tbd|coming soon/.test(t);
}
function hasUsefulDeal(v){
  if(Number.isFinite(v.beer))return true;
  const parts=[v.dealHighlights,v.drinks,v.food].map(x=>String(x||"").trim()).filter(x=>!isPlaceholderText(x));
  return parts.some(x=>x.length>=5);
}
function isCompleteHappyHour(v){
  if(v.noHappyHour)return false;
  const hasTime=!isPlaceholderText(v.early)||!isPlaceholderText(v.late);
  return hasTime&&hasUsefulDeal(v);
}
function completeVenuesForMarket(key=state.island){return venues.filter(v=>venueMarketKey(v)===key&&isCompleteHappyHour(v));}
function pendingVenuesForMarket(key=state.island){return venues.filter(v=>venueMarketKey(v)===key&&!v.noHappyHour&&!isCompleteHappyHour(v));}
function pendingCountForMarket(key=state.island){return pendingVenuesForMarket(key).length;}
function verifiedNoHappyHourForMarket(key=state.island){return venues.filter(v=>venueMarketKey(v)===key&&v.noHappyHour);}
function venueKnowledgeState(v){
  if(v.noHappyHour)return 'none';
  if(isCompleteHappyHour(v))return 'verified';
  return 'checking';
}
function filtered(){
  let list=venues.filter(v=>{
    if(venueMarketKey(v)!==state.island)return false;
    const knowledge=venueKnowledgeState(v);
    const text=(v.name+' '+v.area+' '+v.drinks+' '+v.food+' '+v.tags.join(' ')).toLowerCase();
    if(state.q&&!text.includes(state.q.toLowerCase()))return false;
    if(state.neighborhood!=='all'&&v.neighborhood!==state.neighborhood)return false;
    // Time/open/price filters only make sense for a verified happy hour.
    if((state.open||state.time==='open'||state.time==='late'||state.price!=='any')&&knowledge!=='verified')return false;
    if((state.open||state.time==='open')&&statusFor(v).key!=='open')return false;
    if(state.time==='late'&&!isLate(v))return false;
    if(state.price!=='any'&&!(v.beer&&v.beer<=Number(state.price)))return false;
    return true;
  });

  // Trust-first ordering: verified happy hours are always shown first,
  // followed by explicitly verified no-happy-hour venues, then venues still being checked.
  // Within each status group, keep neighborhoods/areas together for easy scanning.
  list.sort((a,b)=>{
    if(state.selectedVenueKey){
      const as=venueSelectionKey(a)===state.selectedVenueKey?0:1;
      const bs=venueSelectionKey(b)===state.selectedVenueKey?0:1;
      if(as!==bs)return as-bs;
    }
    const rank={verified:0,none:1,checking:2};
    const kr=(rank[venueKnowledgeState(a)]??9)-(rank[venueKnowledgeState(b)]??9);
    if(kr!==0)return kr;
    const areaCompare=areaLabel(a).localeCompare(areaLabel(b),undefined,{sensitivity:'base'});
    if(areaCompare!==0)return areaCompare;
    if(state.sort==='beer')return (a.beer??99)-(b.beer??99)||a.name.localeCompare(b.name);
    if(state.sort==='name')return a.name.localeCompare(b.name);
    if(venueKnowledgeState(a)==='verified'&&venueKnowledgeState(b)==='verified'){
      const sa=statusFor(a).key==='open'?0:1,sb=statusFor(b).key==='open'?0:1;
      if(sa!==sb)return sa-sb;
    }
    return (a.beer??99)-(b.beer??99)||a.name.localeCompare(b.name);
  });
  return list;
}
function venueSelectionKey(v){return String(v.id||v.google_place_id||`${venueMarketKey(v)}|${v.name}|${areaLabel(v)}`).toLowerCase()}
function focusVenueFromMap(v){
  const key=venueSelectionKey(v);
  state.selectedVenueKey=key;

  // If a current filter hides this venue, relax only the filters necessary
  // so the clicked map venue can actually appear in the list.
  let visible=filtered().some(x=>venueSelectionKey(x)===key);
  if(!visible){
    state.q="";
    state.neighborhood="all";
    state.open=false;
    state.time="any";
    state.price="any";
    sync();
    renderCoverage();
  }

  render();

  requestAnimationFrame(()=>{
    const row=grid?.querySelector(`[data-venue-key="${CSS.escape(key)}"]`);
    if(row){
      // The selected venue is sorted first, so put the list itself at the top,
      // then briefly emphasize the row.
      if(grid) grid.scrollTop=0;
      row.classList.add("map-selected");
      row.scrollIntoView({behavior:"smooth",block:"nearest"});
      setTimeout(()=>row.classList.remove("map-selected"),2200);
    }
  });
}
function initials(name){return name.split(/\s+/).filter(Boolean).slice(0,2).map(s=>s[0]).join('').toUpperCase()}
function shortDeal(v){const parts=[];if(v.beer)parts.push(`<b>$${v.beer} beer</b>`);if(v.drinks&&v.drinks!=='—')parts.push(`<span>${v.drinks}</span>`);if(v.food&&v.food!=='—')parts.push(`<span>${v.food}</span>`);return parts.slice(0,2).join('')||''}
function cardHTML(v,full=false){
  const knowledge=venueKnowledgeState(v);
  if(knowledge==='none'){
    return `<article class="venue-row venue-row-none" data-venue-key="${venueSelectionKey(v)}"><div class="venue-main"><div class="venue-avatar state-avatar none">☹</div><div><h3>${v.name}</h3><p>Verified venue</p></div></div><div class="venue-cell"><span class="mobile-label">Area</span><strong>${v.area}</strong></div><div class="venue-cell"><span class="mobile-label">Happy hour</span><strong>No current happy hour</strong></div>${full?`<div class="venue-cell"><span class="mobile-label">Drink deal</span>—</div><div class="venue-cell"><span class="mobile-label">Food deal</span>—</div>`:`<div class="venue-cell deal-stack"><span class="mobile-label">Deals</span><span>No happy-hour special verified</span></div>`}<div class="venue-status"><span class="mobile-label">Status</span><span class="status no-hh">☹ No happy hour</span></div><div class="venue-link">${v.source&&v.source!=='#'?`<a class="source-link" href="${v.source}" target="_blank" rel="noopener" data-venue="${v.name}" aria-label="Verify ${v.name}">›</a>`:''}</div></article>`;
  }
  if(knowledge==='checking'){
    return `<article class="venue-row venue-row-checking" data-venue-key="${venueSelectionKey(v)}"><div class="venue-main"><div class="venue-avatar state-avatar checking">?</div><div><h3>${v.name}</h3><p>Known venue</p></div></div><div class="venue-cell"><span class="mobile-label">Area</span><strong>${v.area}</strong></div><div class="venue-cell"><span class="mobile-label">Happy hour</span><strong>Being checked</strong></div>${full?`<div class="venue-cell"><span class="mobile-label">Drink deal</span>Not verified yet</div><div class="venue-cell"><span class="mobile-label">Food deal</span>Not verified yet</div>`:`<div class="venue-cell deal-stack"><span class="mobile-label">Deals</span><span>Happy-hour details not verified yet</span></div>`}<div class="venue-status"><span class="mobile-label">Status</span><span class="status checking">? Checking</span></div><div class="venue-link">${v.source&&v.source!=='#'?`<a class="source-link" href="${v.source}" target="_blank" rel="noopener" data-venue="${v.name}" aria-label="Check ${v.name}">›</a>`:''}</div></article>`;
  }
  const s=statusFor(v);return `<article class="venue-row" data-venue-key="${venueSelectionKey(v)}"><div class="venue-main"><div class="venue-avatar state-avatar verified">🙂</div><div><h3>${v.name}</h3><p>${v.days}</p></div></div><div class="venue-cell"><span class="mobile-label">Area</span><strong>${v.area}</strong></div><div class="venue-cell"><span class="mobile-label">Happy hour</span><strong>${v.early}</strong>${v.late!=='—'?`<small>${v.late}</small>`:''}</div>${full?`<div class="venue-cell"><span class="mobile-label">Drink deal</span>${v.drinks}</div><div class="venue-cell"><span class="mobile-label">Food deal</span>${v.food}</div>`:`<div class="venue-cell deal-stack"><span class="mobile-label">Deals</span>${shortDeal(v)}</div>`}<div class="venue-status"><span class="mobile-label">Status</span><span class="status verified-hh-status">🙂 Verified</span></div><div class="venue-link"><a class="source-link" href="${v.source}" target="_blank" rel="noopener" data-venue="${v.name}" aria-label="Verify ${v.name}">›</a></div></article>`}
function areaLabel(v){return String(v.area||v.neighborhood||'Other area').trim()||'Other area'}
function listHTML(list,full=false){return list.map(v=>cardHTML(v,full)).join('')}
function render(){const list=filtered();const pending=pendingCountForMarket();const verified=completeVenuesForMarket().length;const none=verifiedNoHappyHourForMarket().length;resultCount.textContent=list.length;const meta=resultCount.parentElement;if(meta){meta.querySelectorAll('.pending-check').forEach(el=>el.remove());const span=document.createElement('span');span.className='pending-check';span.textContent=` · ${verified} verified${none?` · ${none} no happy hour`:''}${pending?` · ${pending} being checked`:''}`;meta.appendChild(span)}grid.innerHTML=list.length?listHTML(list,false):'<div class="empty-results">No venues match these filters yet.</div>';fullGrid.innerHTML=list.length?listHTML(list,true):'<div class="empty-results">No venues match these filters yet.</div>';byId('localClock').textContent=marketNow().label;document.querySelectorAll('.source-link').forEach(a=>a.addEventListener('click',()=>track('venue_source_click',{venue:a.dataset.venue,island:state.island}))) }
function sync(){const sel=byId('islandFilter');if(sel&&[...sel.options].some(o=>o.value===state.island))sel.value=state.island;byId('neighborhoodFilter').value=state.neighborhood;byId('timeFilter').value=state.time;byId('priceFilter').value=state.price;byId('openNowFilter').checked=state.open;byId('sortSelect').value=state.sort;byId('searchInput').value=state.q;byId('headerSearch').value=state.q}
function clearFilters(){Object.assign(state,{q:"",neighborhood:"all",open:false,price:"any",time:"any",sort:"recommended"});sync();render();renderCoverage();fitCurrentIsland();track('filters_cleared',{island:state.island})}
function setView(mode){state.view=mode;byId('mapViewBtn').classList.toggle('active',mode==='map');byId('listViewBtn').classList.toggle('active',mode==='list');byId('mapMode').classList.toggle('hidden',mode!=='map');byId('listMode').classList.toggle('hidden',mode!=='list');if(mode==='map'&&hhMap)setTimeout(()=>hhMap.invalidateSize(),80);track('view_change',{view:mode,island:state.island})}
function updateContextText(){const label=islandNames[state.island]||islandConfigs[state.island]?.label||state.island;byId('cityPill').textContent=`${label} ▾`;byId('heroEyebrow').textContent=`${label.toUpperCase()} · VERIFIED HAPPY HOURS`;byId('heroDescription').textContent=`Find current drink and food deals around ${label} — by area, time and price.`;byId('mapBadgeTitle').textContent=label;byId('resultsTitle').textContent=`Deals around ${label}`;byId('fullListTitle').textContent=`All ${label} happy hours`;buildAreaOptions()}
function buildAreaOptions(){const select=byId('neighborhoodFilter'),cfg=islandConfigs[state.island];const regions=(cfg?.regions||[]).filter(r=>r.key!=='__market__');select.innerHTML='<option value="all">⌖ All areas</option>'+regions.map(r=>`<option value="${r.key}">${r.label}</option>`).join('');}
function setIsland(island){if(!islandConfigs[island])return;state.island=island;state.neighborhood='all';updateContextText();sync();render();renderCoverage();renderMapMarkers();fitCurrentIsland();closeModal();history.replaceState(null,'',`${location.pathname}?${['Oahu','Maui','Kauai','Hawaii'].includes(island)?'island':'market'}=${encodeURIComponent(island)}`);track('market_select',{market:island})}

let hhMap,regionMarkers=[];
function currentRegions(){return islandConfigs[state.island].regions}
function markerCacheKey(v){return `happyhr:geo:${String(v.id||v.name||'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}:${state.island}`}
function cachedVenueCoords(v){
  if(Number.isFinite(v.latitude)&&Number.isFinite(v.longitude)) return [v.latitude,v.longitude];
  try{const raw=localStorage.getItem(markerCacheKey(v));if(!raw)return null;const x=JSON.parse(raw);return Number.isFinite(x?.lat)&&Number.isFinite(x?.lng)?[x.lat,x.lng]:null}catch(e){return null}
}
async function geocodeVenue(v){
  const direct=cachedVenueCoords(v);if(direct)return direct;
  const cfg=islandConfigs[state.island]||{};
  const marketLabel=cfg.label||state.island;
  const query=(v.address&&v.address.trim())?v.address:`${v.name}, ${areaLabel(v)}, ${marketLabel}, ${MARKET_STATE_CODES[state.island]||''}, USA`;
  try{
    const url=`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&maxLocations=1&outFields=Match_addr,Addr_type&SingleLine=${encodeURIComponent(query)}`;
    const r=await fetch(url,{headers:{Accept:'application/json'}});if(!r.ok)return null;
    const j=await r.json();const c=j?.candidates?.[0];if(!c?.location)return null;
    const lat=Number(c.location.y),lng=Number(c.location.x);if(!Number.isFinite(lat)||!Number.isFinite(lng))return null;
    // Reject a geocode that lands outside the selected market's map bounds.
    if(Array.isArray(cfg.bounds)){const [[s,w],[n,e]]=cfg.bounds;if(lat<s||lat>n||lng<w||lng>e)return null}
    try{localStorage.setItem(markerCacheKey(v),JSON.stringify({lat,lng,at:Date.now()}))}catch(e){}
    return [lat,lng];
  }catch(e){return null}
}
function activateVenueMarker(marker,v){
  // Keep every map marker behavior identical regardless of how its coordinates were obtained.
  try{marker.openPopup()}catch(e){}
  track('map_venue_click',{market:state.island,venue:v.name,area:areaLabel(v)});
  focusVenueFromMap(v);
}
function wireVenueMarker(marker,v){
  let lastActivation=0;
  const activate=()=>{
    const now=Date.now();
    if(now-lastActivation<250)return;
    lastActivation=now;
    activateVenueMarker(marker,v);
  };

  // Leaflet event path (desktop + touch).
  marker.on('click',activate);
  marker.on('popupopen',()=>{
    const popupEl=marker.getPopup()?.getElement?.();
    const ride=popupEl?.querySelector('.ride-link');
    if(ride && ride.dataset.happyhrTracked!=='1'){
      ride.dataset.happyhrTracked='1';
      ride.addEventListener('click',()=>track('ride_uber_click',{venue:v.name,market:state.island,area:areaLabel(v)}));
    }
  });

  const bindDom=()=>{
    const el=marker.getElement();
    if(!el||el.dataset.happyhrBound==='1')return;
    el.dataset.happyhrBound='1';
    el.style.pointerEvents='auto';
    el.style.cursor='pointer';
    el.setAttribute('role','button');
    el.setAttribute('aria-label',`${v.name} — show venue details`);
    el.tabIndex=0;

    // Make the entire visible pin shape interactive, not only Leaflet's icon box.
    const visual=el.querySelector('.adult-map-pin,.venue-map-pin,.no-hh-pin,.checking-hh-pin');
    if(visual){
      visual.style.pointerEvents='auto';
      visual.style.cursor='pointer';
    }

    el.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();activate()},true);
    el.addEventListener('pointerup',(e)=>{
      if(e.pointerType==='touch'){e.preventDefault();e.stopPropagation();activate()}
    },true);
    el.addEventListener('keydown',(e)=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();activate()}
    });
  };

  // IMPORTANT: register before addTo(). Also bind immediately if Leaflet has
  // already created the element (for redraws / async geocoded markers).
  marker.on('add',()=>requestAnimationFrame(bindDom));
  requestAnimationFrame(bindDom);
  return marker;
}

// Ride-link configuration.
// Add an Uber developer/affiliate client ID here later to enable destination-prefilled
// universal links with attribution. Until then the button still opens Uber.
const UBER_CLIENT_ID="";

function uberRideUrl(v,coords){
  const [lat,lng]=coords||[];
  if(UBER_CLIENT_ID && Number.isFinite(lat) && Number.isFinite(lng)){
    const drop={
      latitude:lat,
      longitude:lng,
      addressLine1:String(v.name||"Destination"),
      addressLine2:String(v.address||areaLabel(v)||"")
    };
    return `https://m.uber.com/looking?client_id=${encodeURIComponent(UBER_CLIENT_ID)}&pickup=${encodeURIComponent("my_location")}&drop[0]=${encodeURIComponent(JSON.stringify(drop))}`;
  }
  return "https://m.uber.com/";
}
function rideButtonHtml(v,coords){
  const url=uberRideUrl(v,coords);
  return `<a class="ride-link ride-uber" href="${url}" target="_blank" rel="noopener" data-ride-venue="${String(v.name||"").replace(/"/g,'&quot;')}">Get a ride ↗</a>`;
}

function markerPresentation(v,status,coords){
  if(status==='verified'){
    const sourceLink=(v.source&&v.source!=='#')?`<a href="${v.source}" target="_blank" rel="noopener">Verify details ↗</a>`:'';
    return {
      className:'happyhr-marker-icon',
      visual:`<div class="happyhr-marker-hitbox"><div class="adult-map-pin verified-hh" title="Verified happy hour: ${String(v.name||'').replace(/"/g,'&quot;')}"><span class="adult-pin-face adult-pin-happy" aria-hidden="true"><i></i><b></b><em></em></span></div></div>`,
      popup:`<div class="venue-map-popup"><strong>${v.name}</strong><small>${areaLabel(v)}</small><b>${v.early}${v.late!=='—'?` · ${v.late}`:''}</b>${shortDeal(v)?`<div>${shortDeal(v)}</div>`:''}<div class="popup-actions">${rideButtonHtml(v,coords)}${sourceLink}</div></div>`,
      z:200,
      opacity:1
    };
  }
  if(status==='none'){
    return {
      className:'happyhr-marker-icon',
      visual:`<div class="happyhr-marker-hitbox"><div class="adult-map-pin no-hh-adult" title="Verified: no current happy hour"><span class="adult-pin-face adult-pin-sad" aria-hidden="true"><i></i><b></b><em></em></span></div></div>`,
      popup:`<div class="venue-map-popup no-hh-popup"><strong>${v.name}</strong><small>${areaLabel(v)}</small><b>No current happy hour</b><span>Verified by HappyHr.Me</span><div class="popup-actions">${rideButtonHtml(v,coords)}</div></div>`,
      z:-50,
      opacity:1
    };
  }
  return {
    className:'happyhr-marker-icon checking-marker',
    visual:`<div class="happyhr-marker-hitbox"><div class="checking-hh-pin" title="Happy hour still being checked"><span aria-hidden="true">?</span></div></div>`,
    popup:`<div class="venue-map-popup checking-popup"><strong>${v.name}</strong><small>${areaLabel(v)}</small><b>Happy hour being checked</b><span>We know this venue; current happy-hour details are not verified yet.</span><div class="popup-actions">${rideButtonHtml(v,coords)}</div></div>`,
    z:-300,
    opacity:.48
  };
}
function createVenueMarker(v,coords,status){
  const [lat,lng]=coords;
  const p=markerPresentation(v,status,coords);
  // Keep the interactive box close to the visible marker. Oversized hitboxes
  // overlap neighboring pins and can steal clicks from one another.
  const icon=L.divIcon({
    className:p.className,
    html:p.visual,
    iconSize:[42,46],
    iconAnchor:[21,43],
    popupAnchor:[0,-36]
  });
  const marker=L.marker([lat,lng],{
    icon,
    riseOnHover:status==='verified',
    zIndexOffset:p.z,
    opacity:p.opacity,
    interactive:true,
    keyboard:true,
    bubblingMouseEvents:false
  }).bindPopup(p.popup,{maxWidth:260});
  wireVenueMarker(marker,v);
  marker.addTo(hhMap);
  regionMarkers.push(marker);
  return marker;
}
function addVerifiedMarker(v,coords){return createVenueMarker(v,coords,'verified')}
function addNoHappyMarker(v,coords){return createVenueMarker(v,coords,'none')}
function addCheckingMarker(v,coords){return createVenueMarker(v,coords,'checking')}
async function renderMapMarkers(){
  if(!hhMap||!window.L)return;regionMarkers.forEach(m=>hhMap.removeLayer(m));regionMarkers=[];
  const renderToken=Symbol('mapRender');renderMapMarkers.token=renderToken;
  const groups=[
    [completeVenuesForMarket(),addVerifiedMarker],
    [verifiedNoHappyHourForMarket(),addNoHappyMarker],
    [pendingVenuesForMarket(),addCheckingMarker]
  ];
  // Draw already-known/cached coordinates instantly.
  const missing=[];
  groups.forEach(([list,adder])=>list.forEach(v=>{const c=cachedVenueCoords(v);if(c)adder(v,c);else missing.push([v,adder])}));
  // Older Hawaiʻi records often predate stored coordinates. Geocode those records
  // from their address/name and cache the result, so subsequent map loads are instant.
  for(const [v,adder] of missing){
    if(renderMapMarkers.token!==renderToken)return;
    const c=await geocodeVenue(v);if(c&&renderMapMarkers.token===renderToken)adder(v,c);
    await new Promise(r=>setTimeout(r,80));
  }
}

function fitCurrentIsland(){if(!hhMap)return;const cfg=islandConfigs[state.island];hhMap.fitBounds(L.latLngBounds(cfg.bounds),{padding:[18,18]});setTimeout(()=>hhMap.invalidateSize(),80)}
function initMap(){if(!window.L||hhMap)return;hhMap=L.map('map',{zoomControl:true,scrollWheelZoom:true,attributionControl:true});L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'Tiles © Esri'}).addTo(hhMap);fitCurrentIsland();renderMapMarkers();byId('recenterMap')?.addEventListener('click',fitCurrentIsland);setTimeout(()=>hhMap.invalidateSize(),150);window.addEventListener('resize',()=>setTimeout(()=>hhMap.invalidateSize(),100))}
function renderCoverage(){const strip=byId('coverageStrip');const regs=currentRegions().filter(r=>r.key!=='__market__');strip.innerHTML=regs.map(r=>{const count=completeVenuesForMarket().filter(v=>v.neighborhood===r.key).length;return `<button class="coverage-chip${state.neighborhood===r.key?' active':''}" data-region="${r.key}">${r.label} · ${count}</button>`}).join('');strip.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.neighborhood=b.dataset.region;sync();render();renderCoverage();const r=currentRegions().find(x=>x.key===b.dataset.region);if(hhMap&&r)hhMap.flyTo([r.lat,r.long],r.zoom,{duration:.7});track('area_filter',{island:state.island,area:b.textContent})}))}
function refreshAll(){updateContextText();sync();render();renderCoverage();renderMapMarkers();fitCurrentIsland()}
['searchInput','headerSearch'].forEach(id=>byId(id).addEventListener('input',e=>{state.q=e.target.value;sync();render()}));
byId('islandFilter').addEventListener('change',e=>setIsland(e.target.value));byId('neighborhoodFilter').addEventListener('change',e=>{state.neighborhood=e.target.value;render();renderCoverage();const r=currentRegions().find(x=>x.key===state.neighborhood);if(hhMap&&r)hhMap.flyTo([r.lat,r.long],r.zoom,{duration:.7});track('area_filter',{island:state.island,area:e.target.value})});
byId('timeFilter').addEventListener('change',e=>{state.time=e.target.value;render();track('time_filter',{value:e.target.value})});byId('priceFilter').addEventListener('change',e=>{state.price=e.target.value;render();track('price_filter',{value:e.target.value})});byId('openNowFilter').addEventListener('change',e=>{state.open=e.target.checked;render();track('open_now_filter',{enabled:e.target.checked})});byId('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});
byId('mapViewBtn').onclick=()=>setView('map');byId('listViewBtn').onclick=()=>setView('list');byId('navMap').onclick=()=>setView('map');byId('navList').onclick=()=>setView('list');byId('clearFilters').onclick=clearFilters;byId('clearFilters2').onclick=clearFilters;
const modal=byId('cityModal');function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}byId('cityPill').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};byId('modalClose').onclick=closeModal;modal.querySelector('.modal-backdrop').onclick=closeModal;modal.querySelectorAll('[data-island]').forEach(b=>b.addEventListener('click',()=>setIsland(b.dataset.island)));
const params=new URLSearchParams(location.search);if(islandConfigs[params.get('market')])state.island=params.get('market');else if(islandConfigs[params.get('island')])state.island=params.get('island');const requestedArea=params.get('area');updateContextText();if(requestedArea&&currentRegions().some(r=>r.key===requestedArea))state.neighborhood=requestedArea;
sync();renderCoverage();render();initMap();loadVenuesFromSupabase();setInterval(()=>{byId('localClock').textContent=marketNow().label;render()},60000);


window.addEventListener('happyhr:market',e=>{let m=e.detail?.market;const aliases={honolulu:'Oahu',maui:'Maui',kauai:'Kauai','hawaii-island':'Hawaii'};m=aliases[m]||m;if(m&&islandConfigs[m]&&state.island!==m)setIsland(m);});
// ===== HappyHr national market layer =====
(function(){
  const supported = window.HAPPYHR_SUPPORTED_MARKETS || {};
  const displayNames = supported;

  const marketSelectCandidates = [
    '#islandSelect',
    '#island-select',
    '[data-role="island-select"]',
    'select[name="island"]',
    'select[name="market"]'
  ];

  function q(sel){ try { return document.querySelector(sel); } catch(e){ return null; } }

  function getMarketSelect(){
    for (const s of marketSelectCandidates) {
      const el = q(s);
      if (el) return el;
    }
    // fallback: choose first select whose options mention Oahu/Maui
    for (const el of document.querySelectorAll('select')) {
      const txt = [...el.options].map(o=>o.textContent).join(' ');
      if (/O.?ahu|Maui|Kauai|Hawai/i.test(txt)) return el;
    }
    return null;
  }

  function ensureNationalOptions(select){
    if (!select) return;
    const existing = new Set([...select.options].map(o=>(o.value||'').toLowerCase()));
    const groups = [
      ['Hawaiʻi', [
        ['honolulu','Honolulu / Oʻahu'],
        ['maui','Maui'],
        ['kauai','Kauaʻi'],
        ['hawaii-island','Hawaiʻi Island']
      ]],
      ['Mainland U.S.', [
        ['los-angeles','Los Angeles'],
        ['san-diego','San Diego'],
        ['san-francisco','San Francisco'],
        ['seattle','Seattle'],
        ['portland','Portland'],
        ['las-vegas','Las Vegas'],
        ['phoenix','Phoenix'],
        ['denver','Denver'],
        ['austin','Austin'],
        ['dallas','Dallas'],
        ['houston','Houston'],
        ['san-antonio','San Antonio'],
        ['chicago','Chicago'],
        ['nashville','Nashville'],
        ['new-york','New York'],
        ['boston','Boston'],
        ['washington-dc','Washington DC'],
        ['philadelphia','Philadelphia'],
        ['atlanta','Atlanta'],
        ['miami','Miami'],
        ['tampa','Tampa'],
        ['new-orleans','New Orleans']
      ]]
    ];
    for (const [label, opts] of groups){
      const og = document.createElement('optgroup');
      og.label = label;
      let used = false;
      for (const [val, text] of opts){
        if (!existing.has(val.toLowerCase())){
          const o = document.createElement('option');
          o.value = val;
          o.textContent = text;
          og.appendChild(o);
          used = true;
        }
      }
      if (used) select.appendChild(og);
    }
  }

  function applyMarket(market, source){
    if (!market) return;
    const select = getMarketSelect();
    if (select) {
      const option = [...select.options].find(o => (o.value||'').toLowerCase() === market.toLowerCase());
      if (option) {
        select.value = option.value;
        select.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    if (window.happyHrSetMarket) window.happyHrSetMarket(market, displayNames[market] || market, 'US', source || 'manual');
  }

  function setupBanner(guess){
    const banner = q('#city-detect-banner');
    const text = q('#city-detect-text');
    const use = q('#city-detect-use');
    const change = q('#city-detect-change');
    if (!banner || !guess || !guess.market) return;
    const name = displayNames[guess.market] || guess.market;
    text.textContent = `We think you're near ${name}. Show happy hours there?`;
    banner.hidden = false;
    use.onclick = () => {
      banner.hidden = true;
      applyMarket(guess.market, 'ip_confirmed');
    };
    change.onclick = () => {
      banner.hidden = true;
      const select = getMarketSelect();
      if (select) { select.focus(); select.click(); }
    };
  }

  document.addEventListener('DOMContentLoaded', async function(){
    const select = getMarketSelect();
    ensureNationalOptions(select);

    if (select) {
      select.addEventListener('change', () => {
        const val = select.value;
        if (val && supported[val]) {
          if (window.happyHrSetMarket) window.happyHrSetMarket(val, supported[val], 'US', 'manual');
          if (history && history.replaceState) {
            const u = new URL(location.href);
            u.searchParams.set('market', val);
            history.replaceState({},'',u);
          }
        }
      });
    }

    const urlMarket = new URL(location.href).searchParams.get('market');
    if (urlMarket && supported[urlMarket]) {
      applyMarket(urlMarket, 'url');
      return;
    }

    const saved = window.happyHrGetSavedMarket && window.happyHrGetSavedMarket();
    if (saved && supported[saved]) {
      applyMarket(saved, 'saved');
      return;
    }

    if (window.happyHrGuessMarket) {
      const guess = await window.happyHrGuessMarket();
      if (guess && guess.market) setupBanner(guess);
    }
  });
})();

// Community contribution form
(function(){
  const form=document.getElementById('contributionForm');
  if(!form)return;
  const kind=document.getElementById('contributionType');
  const status=document.getElementById('contributionStatus');
  const venue=document.getElementById('contributionVenue');
  const market=document.getElementById('contributionMarket');
  function syncContributionMarket(){const cfg=islandConfigs[state.island];if(market&&cfg)market.value=cfg.label||state.island;}
  syncContributionMarket();
  window.addEventListener('happyhr:market',syncContributionMarket);
  document.querySelectorAll('[data-contribution-type]').forEach(btn=>btn.addEventListener('click',()=>{kind.value=btn.dataset.contributionType||'correction';document.getElementById('contribute').scrollIntoView({behavior:'smooth'});venue.focus()}));
  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const fd=new FormData(form);
    if(fd.get('website'))return; // honeypot
    const payload={submission_type:fd.get('submission_type'),venue_name:fd.get('venue_name'),market:fd.get('market'),area:fd.get('area'),details:fd.get('details'),source_url:fd.get('source_url'),submitter_contact:fd.get('submitter_contact')};
    status.textContent='Sending…';
    try{
      const r=await fetch(`${SUPABASE_URL}/rest/v1/happy_hour_submissions`,{method:'POST',headers:{apikey:SUPABASE_PUBLISHABLE_KEY,Authorization:`Bearer ${SUPABASE_PUBLISHABLE_KEY}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(payload)});
      if(!r.ok)throw new Error(`Submission failed (${r.status})`);
      form.reset();syncContributionMarket();status.textContent='Thank you — we’ll review it before publishing.';track('community_submission',{type:payload.submission_type,market:payload.market});
    }catch(err){console.warn(err);status.textContent='The submission box is being configured. Please try again shortly.';}
  });
})();
