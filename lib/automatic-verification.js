import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import { supabaseAdminFetch } from './supabase-admin.js';
export async function db(path, options={}) {
  const r=await supabaseAdminFetch(path,options);
  const body=await r.text();
  if(!r.ok)throw new Error(`Database ${r.status}: ${body.slice(0,180)}`);
  return body?JSON.parse(body):null;
}
export const routine=['new_venue','venue','correction'];
export const textOf=s=>String(s||'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&#39;|&apos;/g,"'").replace(/\s+/g,' ').trim();
const norm=s=>textOf(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
const host=u=>new URL(u).hostname.toLowerCase().replace(/^www\./,'');
const directory=u=>/^(honoluluhappyhour.net|kauaihappyhour.com)$/.test(host(u));
function privateIP(ip){return /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.|192\.0\.|198\.(1[89])\.|22[4-9]\.|23\d\.|24\d\.|25\d\.)/.test(ip)||(ip.includes(':')&&/^(::|fc|fd|fe[89ab]|ff)/i.test(ip));}
export async function safePage(input){
  let url=new URL(input);
  for(let i=0;i<5;i++){
    if(url.protocol!=='https:'||url.username||url.password||(url.port&&url.port!=='443'))throw new Error('Source must be a public HTTPS website');
    const ips=isIP(url.hostname)?[{address:url.hostname}]:await lookup(url.hostname,{all:true});
    if(!ips.length||ips.some(x=>privateIP(x.address)))throw new Error('Source address is not public');
    const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(7000),headers:{'User-Agent':'HappyHr.Me source verification (+https://happyhr.me)'}});
    if([301,302,303,307,308].includes(r.status)){url=new URL(r.headers.get('location'),url);continue;}
    if(!r.ok)throw new Error(`Source returned ${r.status}`);
    if(!/text\/html|application\/xhtml/i.test(r.headers.get('content-type')||''))throw new Error('Menu requires another format or source');
    let size=0,chunks=[];
    for await(const chunk of r.body){size+=chunk.length;if(size>1200000)throw new Error('Source too large');chunks.push(chunk);}
    return {url:url.href,html:Buffer.concat(chunks).toString('utf8')};
  }
  throw new Error('Too many source redirects');
}
export function links(page){
  return [...page.html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].flatMap(m=>{try{return [{url:new URL(m[1].replace(/&amp;/g,'&'),page.url).href,label:textOf(m[2])}]}catch{return []}});
}
export function extractSchedule(html){
  const text=textOf(html);
  // Only a nearby, explicit daily schedule qualifies. Ambiguous/multiple schedules retry.
  const hits=[...text.matchAll(/happy[ -]?hour|pau hana/gi)];
  const accepted=[];
  for(const hit of hits){
    const excerpt=text.slice(Math.max(0,hit.index-30),hit.index+280);
    if(!/\b(daily|every day|seven days|7 days)\b/i.test(excerpt))continue;
    if(/\b(except|excluding|weekdays|weekends|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(excerpt))continue;
    const ranges=[...excerpt.matchAll(/\b(1[0-2]|0?[1-9])(?::([0-5]\d))?\s*([ap])?\.?m?\.?\s*(?:–|—|-|to)\s*(1[0-2]|0?[1-9])(?::([0-5]\d))?\s*([ap])\.?m\.?\b/gi)];
    if(ranges.length!==1)continue;
    const m=ranges[0],a=m[3]||m[6],b=m[6];
    const start=(Number(m[1])%12)*60+Number(m[2]||0)+(a.toLowerCase()==='p'?720:0);
    const end=(Number(m[4])%12)*60+Number(m[5]||0)+(b.toLowerCase()==='p'?720:0);
    if(end<=start||end-start>360)continue;
    accepted.push({days:'Daily',early_display:`${m[1]}:${m[2]||'00'} ${a.toUpperCase()}M–${m[4]}:${m[5]||'00'} ${b.toUpperCase()}M`,excerpt,start,end});
  }
  const unique=[...new Map(accepted.map(x=>[x.early_display,x])).values()];
  return unique.length===1?unique[0]:null;
}
function structured(html){
  const values=[];function walk(v){if(!v||typeof v!=='object')return;if(Array.isArray(v))return v.forEach(walk);if(v.address&&v.name)values.push(v);Object.values(v).forEach(walk);}
  for(const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{walk(JSON.parse(m[1]));}catch{}}
  return values;
}
export async function verifySubmission(s){
  const all=await db(`happy_hours?select=id,venue_name,address,latitude,longitude,source_url,market,island,metro_slug,verification&${/oahu|honolulu/.test(norm(s.market))?'island=eq.Oahu':`market=eq.${encodeURIComponent(s.market)}`}&limit=3000`);
  const market=norm(s.market),oahu=/oahu|honolulu/.test(market);
  const scoped=all.filter(h=>oahu?h.island==='Oahu':norm(h.market)===market);
  const exact=scoped.filter(h=>norm(h.venue_name)===norm(s.venue_name));
  if(exact.length>1)throw new Error('Multiple branches match this name. Retrying without changing locations');
  const existing=exact[0];
  let candidates=[];
  if(existing?.source_url&&!directory(existing.source_url))candidates.push(existing.source_url);
  if(s.source_url&&directory(s.source_url)){
    const index=await safePage(s.source_url);
    candidates.push(...links(index).filter(l=>/website|official|visit.*site/i.test(l.label)&&!directory(l.url)&&!/(google|facebook|instagram|yelp|opentable|maps)/i.test(host(l.url))).map(l=>l.url));
  }else if(existing?.source_url&&s.source_url&&host(existing.source_url)===host(s.source_url))candidates.push(s.source_url);
  candidates=[...new Set(candidates)].slice(0,2);
  if(!candidates.length)throw new Error('Official venue website not yet established');
  let last='Official source did not expose a complete, unambiguous schedule';
  for(const url of candidates){
    try{
      const first=await safePage(url);
      const pages=[first];
      const relevant=links(first).filter(l=>host(l.url)===host(first.url)&&/happy|pau.hana/.test(l.url+' '+l.label)&&!/\.pdf(?:\?|$)/i.test(l.url)).slice(0,2);
      for(const l of relevant){if(l.url!==first.url)try{pages.push(await safePage(l.url));}catch{}}
      for(const page of pages){
        const schedule=extractSchedule(page.html);if(!schedule)continue;
        const tokens=s.venue_name.toLowerCase().match(/[a-z0-9]{4,}/g)||[];
        if(!tokens.length||!tokens.some(t=>textOf(page.html).toLowerCase().includes(t)))continue;
        let address=existing?.address,latitude=Number(existing?.latitude),longitude=Number(existing?.longitude);
        const objects=structured(page.html).filter(o=>norm(o.name)===norm(s.venue_name));
        if(!existing){
          if(objects.length!==1)continue;
          const o=objects[0],a=o.address;
          if(!a?.streetAddress||!a.addressLocality||!o.geo)continue;
          address=[a.streetAddress,a.addressLocality,a.addressRegion,a.postalCode].filter(Boolean).join(', ');
          latitude=Number(o.geo.latitude);longitude=Number(o.geo.longitude);
          // New places require official structured coordinates and an exact named branch.
          if(oahu&&!(latitude>21.2&&latitude<21.8&&longitude> -158.4&&longitude< -157.5))continue;
          if(!oahu)continue;
        }else{
          // A known branch's street number/name must appear on the official site.
          const street=norm(String(address||'').split(',')[0]);
          if(!street||!norm(textOf(page.html)).includes(street))continue;
        }
        if(!address||!Number.isFinite(latitude)||!Number.isFinite(longitude)||Math.abs(latitude)>90||Math.abs(longitude)>180)continue;
        const patch={days:schedule.days,early_display:schedule.early_display,late_display:null,schedule:Object.fromEntries(Array.from({length:7},(_,day)=>[day,[[schedule.start/60,schedule.end/60]]])),happy_hour_start:null,happy_hour_end:null,cheapest_beer:null,drink_highlight:null,food_highlight:null,deal_highlights:'See current venue menu for food and drink prices.',source_url:page.url,verification:'official_source_verified',last_checked:new Date().toISOString(),updated_at:new Date().toISOString()};
        return {existing,patch,location:{address,latitude,longitude},evidence:{url:page.url,excerpt:schedule.excerpt,checked_at:patch.last_checked}};
      }
    }catch(e){last=e.message;}
  }
  throw new Error(last);
}
export async function processSubmission(s){
  try{
    const v=await verifySubmission(s);
    // Re-read status so a rejected/edited submission cannot publish after its lease began.
    const live=await db(`happy_hour_submissions?id=eq.${s.id}&select=status,submission_type`);
    if(live?.[0]?.status!=='pending'||!routine.includes(live[0].submission_type))return;
    if(v.existing)await db(`happy_hours?id=eq.${v.existing.id}`,{method:'PATCH',body:JSON.stringify(v.patch)});
    else await db('happy_hours',{method:'POST',body:JSON.stringify({...v.patch,...v.location,venue_name:s.venue_name,area:s.area||'Unknown',market:s.market,island:'Oahu',city:'Honolulu',metro_slug:'honolulu',state:'HI',country:'US',active:true})});
    await db(`happy_hour_submissions?id=eq.${s.id}`,{method:'PATCH',body:JSON.stringify({status:'applied',automation_state:'published',automation_evidence:v.evidence,automation_error:null,automation_checked_at:new Date().toISOString(),automation_next_at:null})});
    return 'published';
  }catch(e){
    await db(`happy_hour_submissions?id=eq.${s.id}`,{method:'PATCH',body:JSON.stringify({automation_state:'retry',automation_error:String(e.message).slice(0,500),automation_checked_at:new Date().toISOString(),automation_next_at:new Date(Date.now()+86400000).toISOString()})});
    return 'retry';
  }
}
