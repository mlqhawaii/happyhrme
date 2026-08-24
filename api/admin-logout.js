import { clearAdminCookie } from '../lib/admin-auth.js';

export default async function handler(req, res) {
  clearAdminCookie(res);
  res.status(200).json({ ok: true });
}
