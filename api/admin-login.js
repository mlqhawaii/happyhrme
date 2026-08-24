import { createAdminToken, safeEqual, setAdminCookie } from '../lib/admin-auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const configured = process.env.ADMIN_PASSWORD || '';
  if (!configured) return res.status(500).json({ error: 'Admin password is not configured' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  if (!safeEqual(body.password, configured)) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  setAdminCookie(res, createAdminToken());
  res.status(200).json({ ok: true });
}
