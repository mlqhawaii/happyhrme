import { isAdmin } from '../lib/admin-auth.js';
import { supabaseAdminFetch } from '../lib/supabase-admin.js';

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const status = String(req.query.status || 'pending');
  const type = String(req.query.type || 'all');

  const filters = [
    'select=id,submission_type,venue_name,market,area,address,details,source_url,submitter_contact,status,admin_notes,created_at',
    'order=created_at.desc',
    'limit=250'
  ];
  if (status !== 'all') filters.push(`status=eq.${encodeURIComponent(status)}`);
  if (type !== 'all') filters.push(`submission_type=eq.${encodeURIComponent(type)}`);

  try {
    const r = await supabaseAdminFetch(`happy_hour_submissions?${filters.join('&')}`);
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
