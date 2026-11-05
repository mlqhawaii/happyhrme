import { isAdmin } from '../lib/admin-auth.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  const authenticated = isAdmin(req);
  res.status(authenticated ? 200 : 401).json({ authenticated });
}
