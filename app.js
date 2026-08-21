const venues = [
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
  {name:"Aloha Table Waikiki", neighborhood:"Waikiki", area:"Waikīkī", days:"Daily", early:"Confirm current hours", late:"—", beer:5, drinks:"$5 Bud Light; $6.50 Aloha Blonde", food:"Under-$10 dishes", tags:["cheap","casual"], source:"https://www.waikiki.alohatable.com/happy-hour", slots:{}}
];

const state={q:"",neighborhood:"all",open:false,cheap:false,late:false,sort:"recommended",preset:null};
const grid=document.getElementById('venueGrid');
const resultCount=document.getElementById('resultCount');
const localClock=document.getElementById('localClock');
const nowCount=document.getElementById('nowCount');
const nowPreview=document.getElementById('nowPreview');

function honoluluNow(){
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'Pacific/Honolulu',weekday:'short',hour:'numeric',minute:'2-digit',hour12:false}).formatToParts(new Date());
  const map=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  const dayMap={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  let hour=Number(map.hour); if(hour===24) hour=0;
  return {day:dayMap[map.weekday],hour:hour+Number(map.minute)/60,label:`${String(hour).padStart(2,'0')}:${map.minute}`};
}
function statusFor(v){
  const n=honoluluNow(), slots=v.slots[n.day]||[];
  for(const [s,e] of slots){if(n.hour>=s&&n.hour<e)return {key:'open',label:'Open now'};}
  const future=slots.find(([s])=>s>n.hour);
  if(future){const h=Math.floor(future[0]),m=future[0]%1?30:0;return {key:'later',label:`Starts ${h>12?h-12:h}:${m?'30':'00'} ${h>=12?'PM':'AM'}`};}
  return {key:'closed',label:slots.length?'Done today':'Check hours'};
}
function isLate(v){return v.tags.includes('late')||v.late!=='—';}
function render(){
  let list=venues.filter(v=>{
    const text=(v.name+' '+v.area+' '+v.drinks+' '+v.food+' '+v.tags.join(' ')).toLowerCase();
    if(state.q&&!text.includes(state.q.toLowerCase()))return false;
    if(state.neighborhood!=='all'&&v.neighborhood!==state.neighborhood)return false;
    if(state.open&&statusFor(v).key!=='open')return false;
    if(state.cheap&&!(v.beer&&v.beer<=6))return false;
    if(state.late&&!isLate(v))return false;
    if(state.preset==='rooftop'&&!v.tags.includes('rooftop'))return false;
    if(state.preset==='food'&&!v.tags.includes('food'))return false;
    return true;
  });
  if(state.sort==='beer')list.sort((a,b)=>(a.beer??99)-(b.beer??99));
  if(state.sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
  if(state.sort==='recommended')list.sort((a,b)=>{const sa=statusFor(a).key==='open'?0:1,sb=statusFor(b).key==='open'?0:1;return sa-sb||(a.beer??99)-(b.beer??99)});
  resultCount.textContent=list.length;
  grid.innerHTML=list.length?list.map(cardHTML).join(''):`<div class="empty"><strong>No matches.</strong><br>Try clearing a filter or searching another neighborhood.</div>`;
}
function cardHTML(v){
  const s=statusFor(v);
  return `<article class="venue-row">
    <div class="venue-main"><h3>${v.name}</h3><p>${v.area} · ${v.days}</p></div>
    <div class="venue-cell"><span class="mobile-label">Happy hour</span><strong>${v.early}</strong>${v.late!=='—'?`<small>Late: ${v.late}</small>`:''}</div>
    <div class="venue-cell"><span class="mobile-label">Drink deal</span>${v.drinks}</div>
    <div class="venue-cell"><span class="mobile-label">Food deal</span>${v.food}</div>
    <div class="venue-cell"><span class="mobile-label">Beer</span>${v.beer?`<span class="price-pill">$${v.beer}</span>`:'—'}</div>
    <div class="venue-status"><span class="mobile-label">Status</span><span class="status ${s.key}">${s.label}</span></div>
    <div class="venue-link"><span class="mobile-label">Source</span><a class="source-link" href="${v.source}" target="_blank" rel="noopener">Verify ↗</a></div>
  </article>`;
}
function refreshNow(){
  const n=honoluluNow(); localClock.textContent=n.label;
  const open=venues.filter(v=>statusFor(v).key==='open');
  nowCount.textContent=`${open.length} ${open.length===1?'spot':'spots'}`;
  nowPreview.innerHTML=open.slice(0,3).map(v=>`<div class="now-mini"><span>${v.name}</span><span>${v.early}</span></div>`).join('')||'<div class="now-mini"><span>No confirmed deals active this minute.</span><span>Plan ahead ↓</span></div>';
}
function syncInputs(){
  document.getElementById('searchInput').value=state.q; document.getElementById('heroSearch').value=state.q;
  document.getElementById('neighborhoodFilter').value=state.neighborhood;
  document.getElementById('openNowFilter').classList.toggle('active',state.open);
  document.getElementById('cheapFilter').classList.toggle('active',state.cheap);
  document.getElementById('lateFilter').classList.toggle('active',state.late);
  document.getElementById('sortSelect').value=state.sort;
}
function setPreset(p){state.preset=null;if(p==='cheap'){state.cheap=true;state.sort='beer'}if(p==='late')state.late=true;if(p==='rooftop'||p==='food')state.preset=p;syncInputs();render();document.getElementById('deals').scrollIntoView({behavior:'smooth'});}

document.getElementById('searchInput').addEventListener('input',e=>{state.q=e.target.value;document.getElementById('heroSearch').value=state.q;render()});
document.getElementById('heroSearch').addEventListener('input',e=>{state.q=e.target.value;document.getElementById('searchInput').value=state.q;render()});
document.getElementById('heroSearch').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('deals').scrollIntoView({behavior:'smooth'})});
document.getElementById('neighborhoodFilter').addEventListener('change',e=>{state.neighborhood=e.target.value;render()});
document.getElementById('openNowFilter').addEventListener('click',()=>{state.open=!state.open;syncInputs();render()});
document.getElementById('showNowBtn').addEventListener('click',()=>{state.open=true;syncInputs();render();document.getElementById('deals').scrollIntoView({behavior:'smooth'})});
document.getElementById('cheapFilter').addEventListener('click',()=>{state.cheap=!state.cheap;syncInputs();render()});
document.getElementById('lateFilter').addEventListener('click',()=>{state.late=!state.late;syncInputs();render()});
document.getElementById('sortSelect').addEventListener('change',e=>{state.sort=e.target.value;render()});
document.getElementById('clearFilters').addEventListener('click',()=>{Object.assign(state,{q:"",neighborhood:"all",open:false,cheap:false,late:false,sort:"recommended",preset:null});syncInputs();render()});
document.querySelectorAll('.quick-card').forEach(b=>b.addEventListener('click',()=>setPreset(b.dataset.preset)));
const modal=document.getElementById('cityModal');document.getElementById('cityPill').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};document.getElementById('modalClose').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};modal.querySelector('.modal-backdrop').onclick=document.getElementById('modalClose').onclick;

document.getElementById('venueCount').textContent=venues.length;refreshNow();render();setInterval(refreshNow,60000);
