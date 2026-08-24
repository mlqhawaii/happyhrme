import { isAdmin } from '../lib/admin-auth.js';

export default async function handler(req, res) {
  res.status(isAdmin(req) ? 200 : 401).json({ authenticated: isAdmin(req) });
}
