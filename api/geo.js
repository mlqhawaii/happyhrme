
export default function handler(req, res) {
  const h = req.headers || {};
  const city = h['x-vercel-ip-city'] || '';
  const region = h['x-vercel-ip-country-region'] || '';
  const country = h['x-vercel-ip-country'] || '';
  const latitude = h['x-vercel-ip-latitude'] || '';
  const longitude = h['x-vercel-ip-longitude'] || '';
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ city, region, country, latitude, longitude });
}
