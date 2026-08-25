import { supabaseAdminFetch } from '../lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    // A paid subscription alone is not enough: the owner claim must also have
    // been reviewed/applied by HappyHr. Verification remains separate.
    const r = await supabaseAdminFetch(
      'happy_hour_submissions?select=venue_key,venue_name,market,area&submission_type=eq.claim&plan_requested=eq.featured&plan_status=eq.active&status=in.(reviewed,applied)&order=created_at.desc',
      { method: 'GET' }
    );
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);

    let rows = [];
    try { rows = JSON.parse(text); } catch { rows = []; }

    const seen = new Set();
    const featured = [];
    for (const row of Array.isArray(rows) ? rows : []) {
      const key = String(row.venue_key || '').trim().toLowerCase();
      const name = String(row.venue_name || '').trim();
      const market = String(row.market || '').trim();
      const area = String(row.area || '').trim();
      const fingerprint = key || `${name.toLowerCase()}|${market.toLowerCase()}|${area.toLowerCase()}`;
      if (!fingerprint || seen.has(fingerprint)) continue;
      seen.add(fingerprint);
      featured.push({ key, name, market, area });
    }

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ featured });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Could not load featured venues' });
  }
}
