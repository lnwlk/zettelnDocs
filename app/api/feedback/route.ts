/**
 * Docs feedback → Slack. Posts a message to a Slack Incoming Webhook.
 *
 * Setup:
 * 1. Create an Incoming Webhook in Slack (Slack app → Incoming Webhooks →
 *    add to the channel you want).
 * 2. Set the URL as env var `SLACK_WEBHOOK_URL` (Vercel + local `.env.local`).
 *
 * Spam defense here is a honeypot + length caps. For a public form, add
 * Cloudflare Turnstile later (verify the token server-side before posting).
 */

const MAX_MESSAGE = 3000;
const MAX_EMAIL = 200;
const MAX_TEAM = 200;

export async function POST(req: Request): Promise<Response> {
  let body: {
    message?: unknown;
    email?: unknown;
    team?: unknown;
    hp?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success so we don't hint at it.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') {
    return Response.json({ ok: true });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const team = typeof body.team === 'string' ? body.team.trim() : '';

  if (message.length < 2 || message.length > MAX_MESSAGE) {
    return Response.json({ error: 'invalid_message' }, { status: 400 });
  }
  // Email is required (so we can reply).
  if (!email || email.length > MAX_EMAIL || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (team.length > MAX_TEAM) {
    return Response.json({ error: 'invalid_team' }, { status: 400 });
  }

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.error('SLACK_WEBHOOK_URL is not set');
    return Response.json({ error: 'not_configured' }, { status: 500 });
  }

  const text = [
    ':speech_balloon: *Neues Docs-Feedback*',
    `*E-Mail:* ${email}`,
    `*Team / Organisation:* ${team || '—'}`,
    '',
    message,
  ].join('\n');

  const slack = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!slack.ok) {
    console.error('Slack webhook failed', slack.status);
    return Response.json({ error: 'delivery_failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
