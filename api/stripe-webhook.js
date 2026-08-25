import crypto from 'node:crypto';
import { supabaseAdminFetch } from '../lib/supabase-admin.js';

export const config = {
  api: {
    bodyParser: false
  }
};

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function parseStripeSignature(header = '') {
  const parts = String(header).split(',');
  let timestamp = '';
  const signatures = [];
  for (const part of parts) {
    const [k, v] = part.split('=', 2);
    if (k === 't') timestamp = v || '';
    if (k === 'v1' && v) signatures.push(v);
  }
  return { timestamp, signatures };
}

function verifyStripeSignature(rawBody, header, secret) {
  const { timestamp, signatures } = parseStripeSignature(header);
  if (!timestamp || !signatures.length) return false;

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const payload = `${timestamp}.${rawBody.toString('utf8')}`;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const expectedBuf = Buffer.from(expected, 'hex');

  return signatures.some(sig => {
    try {
      const actualBuf = Buffer.from(sig, 'hex');
      return actualBuf.length === expectedBuf.length &&
        crypto.timingSafeEqual(actualBuf, expectedBuf);
    } catch {
      return false;
    }
  });
}

function stripeStatusToPlanStatus(status) {
  const s = String(status || '').toLowerCase();
  if (['active', 'trialing'].includes(s)) return 'active';
  if (['past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'paused'].includes(s)) return 'past_due';
  if (s === 'canceled') return 'canceled';
  return s || 'pending';
}

async function patchClaimById(id, patch) {
  if (!id) return;
  const r = await supabaseAdminFetch(
    `happy_hour_submissions?id=eq.${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(patch)
    }
  );
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Could not update claim ${id}: ${text}`);
  }
}

async function patchClaimBySubscription(subscriptionId, patch) {
  if (!subscriptionId) return;
  const r = await supabaseAdminFetch(
    `happy_hour_submissions?stripe_subscription_id=eq.${encodeURIComponent(subscriptionId)}`,
    {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(patch)
    }
  );
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Could not update subscription ${subscriptionId}: ${text}`);
  }
}

function getInvoiceSubscriptionId(invoice) {
  return invoice?.subscription ||
    invoice?.parent?.subscription_details?.subscription ||
    invoice?.lines?.data?.[0]?.subscription ||
    null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  if (!webhookSecret) {
    return res.status(503).send('STRIPE_WEBHOOK_SECRET is not configured');
  }

  const rawBody = await readRawBody(req);
  const sig = req.headers['stripe-signature'] || '';

  if (!verifyStripeSignature(rawBody, sig, webhookSecret)) {
    return res.status(400).send('Invalid Stripe signature');
  }

  let event;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return res.status(400).send('Invalid JSON');
  }

  try {
    const obj = event?.data?.object || {};

    if (event.type === 'checkout.session.completed') {
      const claimId = obj.client_reference_id || obj.metadata?.claim_id || '';
      await patchClaimById(claimId, {
        plan_status: 'active',
        stripe_customer_id: typeof obj.customer === 'string' ? obj.customer : obj.customer?.id || null,
        stripe_subscription_id: typeof obj.subscription === 'string' ? obj.subscription : obj.subscription?.id || null
      });
    }

    if (event.type === 'customer.subscription.created' ||
        event.type === 'customer.subscription.updated') {
      await patchClaimBySubscription(obj.id, {
        plan_status: stripeStatusToPlanStatus(obj.status),
        stripe_customer_id: typeof obj.customer === 'string' ? obj.customer : obj.customer?.id || null,
        stripe_current_period_end: obj.current_period_end
          ? new Date(obj.current_period_end * 1000).toISOString()
          : null
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      await patchClaimBySubscription(obj.id, {
        plan_status: 'canceled',
        stripe_customer_id: typeof obj.customer === 'string' ? obj.customer : obj.customer?.id || null,
        stripe_current_period_end: null
      });
    }

    if (event.type === 'invoice.payment_failed') {
      const subId = getInvoiceSubscriptionId(obj);
      await patchClaimBySubscription(subId, { plan_status: 'past_due' });
    }

    if (event.type === 'invoice.paid') {
      const subId = getInvoiceSubscriptionId(obj);
      await patchClaimBySubscription(subId, { plan_status: 'active' });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Stripe webhook processing error', err);
    return res.status(500).json({ error: err?.message || 'Webhook processing failed' });
  }
}
