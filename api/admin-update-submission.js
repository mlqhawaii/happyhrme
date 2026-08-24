import { isAdmin } from '../lib/admin-auth.js';
import { supabaseAdminFetch } from '../lib/supabase-admin.js';

const ALLOWED = new Set(['pending','reviewed','applied','rejected']);

export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'PATCH' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const id = Number(body.id);
  const status = String(body.status || '');
  const admin_notes = String(body.admin_notes || '').slice(0, 5000);

  if (!Number.isFinite(id) || !ALLOWED.has(status)) {
    return res.status(400).json({ error: 'Invalid update' });
  }

  try {
    const r = await supabaseAdminFetch(
      `happy_hour_submissions?id=eq.${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({ status, admin_notes })
      }
    );
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);
    res.status(200).send(text || '[]');
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
