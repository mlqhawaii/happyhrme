import { supabaseAdminFetch } from '../lib/supabase-admin.js';

function clean(v, n=5000) {
  return String(v ?? '').trim().slice(0, n);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const payload = {
    submission_type: 'claim',
    venue_key: clean(body.venue_key, 240) || null,
    venue_name: clean(body.venue_name, 200),
    market: clean(body.market, 120),
    area: clean(body.area, 160) || null,
    address: null,
    details: clean(body.details, 5000),
    source_url: clean(body.source_url, 1200) || null,
    submitter_contact: clean(body.submitter_contact, 320),
    owner_name: clean(body.owner_name, 200),
    owner_role: clean(body.owner_role, 120),
    owner_phone: clean(body.owner_phone, 80) || null,
    plan_requested: clean(body.plan_requested, 24).toLowerCase() || 'free',
    plan_status: 'lead',
    status: 'pending'
  };

  if (!payload.venue_name || !payload.market || payload.details.length < 5) {
    return res.status(400).json({ error: 'Venue, market and verification details are required.' });
  }
  if (!payload.submitter_contact || !payload.submitter_contact.includes('@')) {
    return res.status(400).json({ error: 'Enter a valid business email.' });
  }
  if (!['free','pro','featured'].includes(payload.plan_requested)) {
    return res.status(400).json({ error: 'Invalid plan.' });
  }

  try {
    const r = await supabaseAdminFetch(
      'happy_hour_submissions?select=id,submission_type,venue_name,market,area,submitter_contact,plan_requested,plan_status,status,created_at',
      {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(payload)
      }
    );
    const text = await r.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    if (!r.ok) {
      const msg = data?.message || data?.error || text || `Supabase insert failed (${r.status})`;
      return res.status(r.status).json({ error: msg });
    }
    return res.status(200).json({ claim: Array.isArray(data) ? data[0] : data });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Could not submit claim' });
  }
}
