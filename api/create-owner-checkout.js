const PLAN_PRICE_ENV = {
  pro: 'STRIPE_PRO_PRICE_ID',
  featured: 'STRIPE_FEATURED_PRICE_ID'
};

function originFrom(req) {
  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'happyhr.me').split(',')[0];
  return `${proto}://${host}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  let body=req.body||{};
  if(typeof body==='string'){try{body=JSON.parse(body)}catch{body={}}}
  const plan=String(body.plan||'').toLowerCase();
  const email=String(body.email||'').trim().slice(0,320);
  const venue=String(body.venue_name||'').trim().slice(0,200);
  const claimId=String(body.claim_id||'').trim().slice(0,80);
  if(!PLAN_PRICE_ENV[plan]) return res.status(400).json({error:'Choose Pro or Featured'});
  const secret=process.env.STRIPE_SECRET_KEY||'';
  const price=process.env[PLAN_PRICE_ENV[plan]]||'';
  if(!secret || !price) return res.status(503).json({error:'Subscription checkout is not configured yet',setup_required:true});
  const origin=originFrom(req);
  const p=new URLSearchParams();
  p.set('mode','subscription');
  p.set('line_items[0][price]',price);
  p.set('line_items[0][quantity]','1');
  p.set('success_url',`${origin}/?owner_checkout=success&plan=${encodeURIComponent(plan)}`);
  p.set('cancel_url',`${origin}/owners?owner_checkout=canceled`);
  p.set('allow_promotion_codes','true');
  if(email) p.set('customer_email',email);
  if(claimId) p.set('client_reference_id',claimId);
  p.set('metadata[happyhr_plan]',plan);
  if(venue) p.set('metadata[venue_name]',venue);
  if(claimId) p.set('metadata[claim_id]',claimId);
  try{
    const r=await fetch('https://api.stripe.com/v1/checkout/sessions',{
      method:'POST',
      headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/x-www-form-urlencoded'},
      body:p.toString()
    });
    const x=await r.json();
    if(!r.ok) return res.status(r.status).json({error:x?.error?.message||'Could not start checkout'});
    return res.status(200).json({url:x.url});
  }catch(e){return res.status(500).json({error:e.message})}
}
