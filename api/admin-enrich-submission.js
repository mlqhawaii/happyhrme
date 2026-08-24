import { isAdmin } from '../lib/admin-auth.js';
import { supabaseAdminFetch } from '../lib/supabase-admin.js';

function stripTags(html=''){
  return String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&nbsp;/gi,' ')
    .replace(/&amp;/gi,'&')
    .replace(/&#39;|&apos;/gi,"'")
    .replace(/&quot;/gi,'"')
    .replace(/\s+/g,' ')
    .trim();
}
function clean(v){return String(v||'').replace(/\s+/g,' ').trim()}
function addrFromObject(a){
  if(!a)return '';
  if(typeof a==='string')return clean(a);
  const parts=[a.streetAddress,a.addressLocality,a.addressRegion,a.postalCode,a.addressCountry].filter(Boolean);
  return clean(parts.join(', '));
}
function walkJson(value,out=[]){
  if(!value)return out;
  if(Array.isArray(value)){value.forEach(v=>walkJson(v,out));return out}
  if(typeof value==='object'){out.push(value);Object.values(value).forEach(v=>walkJson(v,out))}
  return out;
}
function extractStructured(html){
  const objects=[];
  const re=/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while((m=re.exec(html))){
    try{walkJson(JSON.parse(m[1].trim()),objects)}catch{}
  }
  const candidates=objects.filter(o=>{
    const t=Array.isArray(o['@type'])?o['@type'].join(' '):String(o['@type']||'');
    return /Restaurant|BarOrPub|FoodEstablishment|LocalBusiness|Organization/i.test(t) || o.address || o.geo;
  });
  let best=candidates.find(o=>o.address && (o.geo || o.name)) || candidates.find(o=>o.address) || candidates[0] || {};
  const geo=best.geo||{};
  return {
    name:clean(best.name),
    address:addrFromObject(best.address),
    latitude:Number.isFinite(Number(geo.latitude))?Number(geo.latitude):null,
    longitude:Number.isFinite(Number(geo.longitude))?Number(geo.longitude):null,
    telephone:clean(best.telephone),
    openingHours:Array.isArray(best.openingHours)?best.openingHours.join('; '):clean(best.openingHours)
  };
}
function extractHappyHour(text){
  const lower=text.toLowerCase();
  const terms=['happy hour','pau hana','power hour'];
  let idx=-1,term='';
  for(const t of terms){const i=lower.indexOf(t);if(i>=0&&(idx<0||i<idx)){idx=i;term=t}}
  if(idx<0)return {evidence:'',hours:''};
  const evidence=clean(text.slice(Math.max(0,idx-180),Math.min(text.length,idx+650)));
  const timeMatches=[...evidence.matchAll(/\b(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\s*(?:-|–|—|to)\s*(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\b/gi)].map(x=>x[0]);
  return {term,evidence,hours:timeMatches[0]||''};
}

function absolutize(base,href){
  try{return new URL(href,base).href}catch{return ''}
}
function sameOrigin(a,b){
  try{return new URL(a).origin===new URL(b).origin}catch{return false}
}
function candidateInternalLinks(html,baseUrl){
  if(!html||!baseUrl)return [];
  const links=[];
  const re=/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const keywords=/(contact|location|locations|find us|visit|directions|about|reservation|reservations|hours)/i;
  let m;
  while((m=re.exec(html))){
    const href=absolutize(baseUrl,m[1]);
    const label=stripTags(m[2]);
    if(!href||!sameOrigin(href,baseUrl))continue;
    if(keywords.test(`${label} ${href}`))links.push(href);
  }
  try{links.push(new URL('/',baseUrl).href)}catch{}
  return [...new Set(links)].slice(0,6);
}
async function fetchHtml(url,timeoutMs=10000){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{
    const r=await fetch(url,{redirect:'follow',signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 HappyHr.Me verification bot'}});
    if(!r.ok)throw new Error(`Source returned ${r.status}`);
    return {html:(await r.text()).slice(0,1500000),url:r.url||url};
  }finally{clearTimeout(timer)}
}
async function discoverAddressFromSite(startHtml,startUrl){
  const first=extractStructured(startHtml);
  if(first.address)return {structured:first,addressSource:startUrl,visited:[startUrl]};
  const links=candidateInternalLinks(startHtml,startUrl);
  const visited=[startUrl];
  for(const link of links){
    if(visited.includes(link))continue;
    visited.push(link);
    try{
      const page=await fetchHtml(link,8000);
      const structured=extractStructured(page.html);
      if(structured.address)return {structured,addressSource:page.url,visited};
      // Fallback for clearly formatted US street addresses on official contact/location pages.
      const text=stripTags(page.html);
      const m=text.match(/\b\d{1,6}\s+[A-Za-z0-9.'’\- ]{2,60}\s+(?:St(?:reet)?|Ave(?:nue)?|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Way|Hwy|Highway|Pkwy|Parkway|Pl|Place|Ct|Court)\b[^,]{0,30},\s*[A-Za-z .'-]{2,40},\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?\b/i);
      if(m)return {structured:{address:clean(m[0]),name:'',latitude:null,longitude:null,telephone:'',openingHours:''},addressSource:page.url,visited};
    }catch{}
  }
  return {structured:first,addressSource:'',visited};
}

async function geocode(address){
  if(!address)return null;
  const u=new URL('https://nominatim.openstreetmap.org/search');
  u.searchParams.set('format','jsonv2');u.searchParams.set('limit','1');u.searchParams.set('q',address);
  const r=await fetch(u,{headers:{'User-Agent':'HappyHr.Me admin enrichment (https://happyhr.me)','Accept-Language':'en'}});
  if(!r.ok)return null;
  const rows=await r.json();const x=rows?.[0];
  if(!x)return null;
  const lat=Number(x.lat),lng=Number(x.lon);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return null;
  return {latitude:lat,longitude:lng,display_name:clean(x.display_name)};
}

export default async function handler(req,res){
  if(!isAdmin(req))return res.status(401).json({error:'Unauthorized'});
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  let body=req.body||{};if(typeof body==='string'){try{body=JSON.parse(body)}catch{body={}}}
  const id=Number(body.id);if(!Number.isFinite(id))return res.status(400).json({error:'Invalid submission id'});
  try{
    const sr=await supabaseAdminFetch(`happy_hour_submissions?id=eq.${id}&select=*`);
    const submissions=await sr.json();const s=submissions?.[0];
    if(!s)return res.status(404).json({error:'Submission not found'});
    let html='',finalUrl=s.source_url||'',fetchError='',addressSource='';
    if(s.source_url){
      try{
        const page=await fetchHtml(s.source_url,12000);
        finalUrl=page.url||s.source_url;
        html=page.html;
      }catch(e){fetchError=e.message||'Could not fetch source'}
    }
    let structured=extractStructured(html);
    if(html && finalUrl && !clean(s.address) && !structured.address){
      try{
        const discovered=await discoverAddressFromSite(html,finalUrl);
        if(discovered.structured?.address){structured={...structured,...discovered.structured};addressSource=discovered.addressSource||''}
      }catch(e){}
    }
    const pageText=stripTags(html);
    const hh=extractHappyHour(pageText);
    let address=clean(s.address)||structured.address;
    let latitude=structured.latitude,longitude=structured.longitude,geoSource=structured.latitude!=null?'structured data':'';
    if((latitude==null||longitude==null)&&address){
      const g=await geocode(address);if(g){latitude=g.latitude;longitude=g.longitude;geoSource='address geocode'}
    }
    const submittedHours=clean(s.details).match(/\b(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\s*(?:-|–|—|to)\s*(?:1[0-2]|0?[1-9])(?::[0-5]\d)?\s*(?:am|pm)\b/i)?.[0]||'';
    res.setHeader('Cache-Control','no-store');
    res.status(200).json({
      id:s.id,
      venue_name:structured.name||s.venue_name,
      market:s.market||'',area:s.area||'',
      address,
      latitude,longitude,
      happy_hour:hh.hours||submittedHours,
      days:'Confirm days',
      deal_highlights:clean(s.details),
      source_url:finalUrl||s.source_url||'',
      source_evidence:hh.evidence,
      opening_hours:structured.openingHours,
      fetch_error:fetchError,
      geocode_source:geoSource,
      address_source:addressSource,
      confidence:{address:address?'high':'missing',location:(latitude!=null&&longitude!=null)?'high':'missing',happy_hour:(hh.hours||submittedHours)?(hh.hours?'official-source':'submitted'):'missing'}
    });
  }catch(e){res.status(500).json({error:e.message||'Enrichment failed'})}
}
