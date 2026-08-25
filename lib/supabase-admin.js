export function supabaseConfig() {
  const url = process.env.SUPABASE_URL || 'https://woygwngmfdkwotopkeur.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return { url, key };
}

export async function supabaseAdminFetch(path, options = {}) {
  const { url, key } = supabaseConfig();
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    Accept: 'application/json',
    ...(options.body != null ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };
  return fetch(`${url}/rest/v1/${path}`, { ...options, headers });
}
