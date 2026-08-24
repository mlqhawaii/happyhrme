import { isAdmin } from '../lib/admin-auth.js';
import { supabaseAdminFetch } from '../lib/supabase-admin.js';

function clean(v){return String(v||'').replace(/\s+/g,' ').trim()}
function slugify(s){return clean(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[ʻ’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function marketFields(market){
  const raw=clean(market),x=raw.toLowerCase();
  if(/honolulu|oahu|oʻahu|o‘ahu/.test(x))return {island:'Oahu',city:'Honolulu',market:'Honolulu',metro_slug:'honolulu',state:'HI',country:'US'};
  if(/maui/.test(x))return {island:'Maui',city:raw||'Maui',market:'Maui',metro_slug:'maui',state:'HI',country:'US'};
  if(/kauai|kaua/.test(x))return {island:'Kauai',city:raw||'Kauai',market:'Kauai',metro_slug:'kauai',state:'HI',country:'US'};
  if(/hawaii island|big island|hilo|kona/.test(x))return {island:'Hawaii',city:raw,market:'Hawaii Island',metro_slug:'hawaii-island',state:'HI',country:'US'};
  const states={'los angeles':'CA','san diego':'CA','san francisco':'CA','seattle':'WA','portland':'OR','las vegas':'NV','phoenix':'AZ','denver':'CO','austin':'TX','dallas':'TX','houston':'TX','san antonio':'TX','chicago':'IL','nashville':'TN','new york':'NY','boston':'MA','washington dc':'DC','philadelphia':'PA','atlanta':'GA','miami':'FL','tampa':'FL','new orleans':'LA'};
  return {island:null,city:raw,market:raw,metro_slug:slugify(raw),state:states[x]||'',country:'US'};
}
function normalizeHH(v){return clean(v).replace(/\b(am|pm)\b/gi,m=>m.toUpperCase())}

export default async function handler(req,res){
  if(!isAdmin(req))return res.status(401).json({error:'Unauthorized'});
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  let b=req.body||{};if(typeof b==='string'){try{b=JSON.parse(b)}catch{b={}}}
  const submissionId=Number(b.submission_id),name=clean(b.venue_name),address=clean(b.address);
  const lat=Number(b.latitude),lng=Number(b.longitude);
  if(!Number.isFinite(submissionId)||!name||!address||!Number.isFinite(lat)||!Number.isFinite(lng)){
    return res.status(400).json({error:'Venue name, verified address, and map coordinates are required before publishing.'});
  }
  const mf=marketFields(b.market);
  const hh=normalizeHH(b.happy_hour)||'Confirm current hours';
  const payload={
    venue_name:name,...mf,
    neighborhood:clean(b.area),area:clean(b.area),address,
    latitude:lat,longitude:lng,
    days:clean(b.days)||'Confirm days',early_display:hh,late_display:'—',
    deal_highlights:clean(b.deal_highlights),drink_highlight:clean(b.deal_highlights),food_highlight:'—',
    source_url:clean(b.source_url),tags:[],schedule:{},
    verification:`community_admin_verified_${new Date().toISOString().slice(0,10)}`,
    no_happy_hour:false,active:true,last_checked:new Date().toISOString()
  };
  try{
    const find=await supabaseAdminFetch(`happy_hours?venue_name=ilike.${encodeURIComponent(name)}&select=id&limit=1`);
    const rows=await find.json();const existing=rows?.[0];
    let r;
    if(existing){
      r=await supabaseAdminFetch(`happy_hours?id=eq.${existing.id}`,{method:'PATCH',headers:{'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(payload)});
    }else{
      r=await supabaseAdminFetch('happy_hours',{method:'POST',headers:{'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(payload)});
    }
    const txt=await r.text();if(!r.ok)return res.status(r.status).send(txt);
    await supabaseAdminFetch(`happy_hour_submissions?id=eq.${submissionId}`,{method:'PATCH',headers:{'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify({status:'applied',admin_notes:`Auto-enriched and published ${new Date().toISOString()}`})});
    res.status(200).json({ok:true,updated:Boolean(existing),venue:txt?JSON.parse(txt)[0]:payload});
  }catch(e){res.status(500).json({error:e.message||'Publish failed'})}
}
