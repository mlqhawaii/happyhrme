(() => {
  const root = document.querySelector('[data-live-city-guide]');
  if (!root) return;

  const SUPABASE_URL = 'https://woygwngmfdkwotopkeur.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ovVbmHBT-ROEjmM6Vc48_w_qGrX7y5t';

  const config = {
    honolulu: { island: 'Oahu', timezone: 'Pacific/Honolulu', finder: '/?island=Oahu' },
    maui: { island: 'Maui', timezone: 'Pacific/Honolulu', finder: '/?island=Maui' },
    seattle: { market: 'seattle', timezone: 'America/Los_Angeles', finder: '/?market=seattle' },
    'san-francisco': { market: 'san-francisco', timezone: 'America/Los_Angeles', finder: '/?market=san-francisco' },
    'new-york': { market: 'new-york', timezone: 'America/New_York', finder: '/?market=new-york' }
  };

  const key = root.dataset.cityKey;
  const city = config[key];
  if (!city) return;

  const status = root.querySelector('[data-live-status]');
  const grid = root.querySelector('[data-live-grid]');
  const openCount = root.querySelector('[data-open-count]');
  const verifiedCount = root.querySelector('[data-verified-count]');

  const norm = (v) => String(v || '').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[ʻ’‘\x60']/g, '');

  const marketFor = (row) => norm(row.metro_slug || row.market || row.city || '');
  const islandFor = (row) => norm(row.island || '');

  function belongs(row) {
    if (city.island) {
      const wanted = norm(city.island);
      return islandFor(row) === wanted || (wanted === 'oahu' && norm(row.city) === 'honolulu');
    }
    const wanted = norm(city.market);
    const candidates = [row.metro_slug, row.market, row.city].map(norm);
    return candidates.some((v) => v === wanted || v.replace(/\s+/g, '-') === wanted);
  }

  function targetNow(timezone) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const days = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };
    return { day: days[get('weekday')], hour: Number(get('hour')) + Number(get('minute')) / 60 };
  }

  function isOpenNow(row) {
    const schedule = row.schedule && typeof row.schedule === 'object' ? row.schedule : {};
    const now = targetNow(city.timezone);
    const slots = schedule[now.day] || schedule[String(now.day)] || [];
    return Array.isArray(slots) && slots.some((slot) => {
      if (!Array.isArray(slot) || slot.length < 2) return false;
      const start = Number(slot[0]);
      const end = Number(slot[1]);
      if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
      return end >= start ? now.hour >= start && now.hour <= end : now.hour >= start || now.hour <= end;
    });
  }

  function isVerified(row) {
    const v = norm(row.verification);
    return v.includes('verified') && !v.includes('no happy hour') && row.no_happy_hour !== true;
  }

  function checkDate(row) {
    const raw = row.last_verified_at || row.verified_at || row.source_checked_at || '';
    if (!raw) return '';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
  }

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function card(row) {
    const open = isOpenNow(row);
    const verified = isVerified(row);
    const area = row.area || row.neighborhood || '';
    const time = row.early_display || row.days || 'Confirm current hours';
    const deal = row.deal_highlights || row.drink_highlight || row.food_highlight || 'See source for current specials';
    const date = checkDate(row);
    const source = row.source_url && row.source_url !== '#'
      ? `<a class="live-city-source" href="${esc(row.source_url)}" target="_blank" rel="noopener">Source ↗</a>`
      : '';
    return `
      <article class="live-city-card">
        <div class="live-city-card-top">
          <div>
            <h3>${esc(row.venue_name)}</h3>
            <p class="live-city-area">${esc(area)}</p>
          </div>
          <span class="live-city-now ${open ? 'is-open' : ''}">${open ? 'Open now' : 'Check time'}</span>
        </div>
        <p class="live-city-time">${esc(time)}</p>
        <p class="live-city-deal">${esc(deal)}</p>
        <div class="live-city-meta">
          <span class="${verified ? 'is-verified' : ''}">${verified ? '✓ Verified' : 'Checking'}</span>
          ${date ? `<span>Checked ${esc(date)}</span>` : ''}
          ${source}
        </div>
      </article>`;
  }

  async function load() {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/happy_hours?select=*&active=eq.true&order=venue_name.asc`, {
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          Accept: 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Supabase ${response.status}`);
      const rows = (await response.json())
        .filter(belongs)
        .filter((row) => row.no_happy_hour !== true)
        .sort((a, b) => {
          const openDiff = Number(isOpenNow(b)) - Number(isOpenNow(a));
          if (openDiff) return openDiff;
          const verifiedDiff = Number(isVerified(b)) - Number(isVerified(a));
          if (verifiedDiff) return verifiedDiff;
          return String(a.venue_name || '').localeCompare(String(b.venue_name || ''));
        });

      const visible = rows.slice(0, 12);
      if (!visible.length) {
        status.textContent = 'We are still verifying this market. Open the live finder to see venues currently in the database.';
        grid.innerHTML = '';
        return;
      }

      grid.innerHTML = visible.map(card).join('');
      const open = rows.filter(isOpenNow).length;
      const verified = rows.filter(isVerified).length;
      if (openCount) openCount.textContent = String(open);
      if (verifiedCount) verifiedCount.textContent = String(verified);
      status.innerHTML = `Showing <strong>${visible.length}</strong> of <strong>${rows.length}</strong> current listings. Open-now venues are shown first.`;

      const allLink = root.querySelector('[data-live-all]');
      if (allLink) allLink.href = city.finder;
    } catch (error) {
      console.warn('Live city guide data unavailable', error);
      status.textContent = 'Live venue data is temporarily unavailable. Use the live finder for the latest listings.';
    }
  }

  load();
})();