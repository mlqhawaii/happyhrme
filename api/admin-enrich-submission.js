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
    let html='',finalUrl=s.source_url||'',fetchError='';
    if(s.source_url){
      try{
        const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
        const r=await fetch(s.source_url,{redirect:'follow',signal:controller.signal,headers:{'User-Agent':'Mozilla/5.0 HappyHr.Me verification bot'}});clearTimeout(timer);
        finalUrl=r.url||s.source_url;
        if(!r.ok)throw new Error(`Source returned ${r.status}`);
        html=(await r.text()).slice(0,1500000);
      }catch(e){fetchError=e.message||'Could not fetch source'}
    }
    const structured=extractStructured(html);
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
      confidence:{address:address?'high':'missing',location:(latitude!=null&&longitude!=null)?'high':'missing',happy_hour:(hh.hours||submittedHours)?(hh.hours?'official-source':'submitted'):'missing'}
    });
  }catch(e){res.status(500).json({error:e.message||'Enrichment failed'})}
}
