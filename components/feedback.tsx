'use client';

import { type FormEvent, useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// Matches the zettelnApp styleguide (admin/styleguide): shadcn role colors are
// translated to the docs' zetteln utilities (border-input → border-zettelnSandDark,
// bg-card → bg-white, muted-foreground → zettelnGray, ring → zettelnBlue).
const fieldClass =
  'w-full rounded-md border border-zettelnSandDark bg-white px-3 py-2 text-base shadow-sm transition-colors placeholder:text-zettelnGray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zettelnBlue disabled:cursor-not-allowed disabled:opacity-50';

const buttonBase =
  'inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zettelnBlue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const buttonDefault = `${buttonBase} bg-zettelnDarkBlue text-white shadow hover:bg-zettelnBlue hover:text-zettelnDarkBlue`;

const buttonOutline = `${buttonBase} border border-zettelnDarkBlue bg-transparent text-zettelnDarkBlue hover:border-zettelnBlue hover:bg-zettelnBlue hover:text-zettelnDarkBlue`;

/**
 * Help / feedback form rendered inline on the page. Submissions POST to
 * `/api/feedback`, which forwards them to Slack. Email is required (so we can
 * reply); Team/Organisation is optional. The submit button stays disabled
 * until the required fields validate. Requires the `SLACK_WEBHOOK_URL` env var.
 */
export function Feedback() {
  const [status, setStatus] = useState<Status>('idle');
  const [valid, setValid] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: fd.get('message'),
          email: fd.get('email'),
          team: fd.get('team'),
          hp: fd.get('company'),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setValid(false);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="not-prose rounded-2xl border border-zettelnSandDark bg-white p-6">
      {status === 'sent' ? (
        <div className="flex flex-col items-start gap-3">
          <p className="m-0 text-sm text-zettelnDarkBlue">
            <span className="font-zettelnBold">Danke!</span> Deine Nachricht ist
            bei uns angekommen.
          </p>
          <button
            type="button"
            onClick={() => {
              setValid(false);
              setStatus('idle');
            }}
            className={buttonOutline}
          >
            Weitere Nachricht schreiben
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          onChange={(e) => setValid(e.currentTarget.checkValidity())}
          className="flex flex-col gap-3"
        >
          <textarea
            name="message"
            required
            minLength={2}
            maxLength={3000}
            rows={4}
            placeholder="Deine Nachricht …"
            className={fieldClass}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Bitte gib eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de)."
              placeholder="E-Mail"
              className={`${fieldClass} h-10`}
            />
            <input
              name="team"
              type="text"
              maxLength={200}
              placeholder="Team / Organisation (optional)"
              className={`${fieldClass} h-10`}
            />
          </div>
          {/* Honeypot: hidden from users, catches bots that fill every field. */}
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0"
          />
          {status === 'error' && (
            <p className="m-0 text-sm text-zettelnRed">
              Das hat leider nicht geklappt. Bitte versuch es später noch
              einmal.
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'sending' || !valid}
            className={`${buttonDefault} self-start`}
          >
            {status === 'sending' ? 'Senden …' : 'Senden'}
          </button>
        </form>
      )}
    </div>
  );
}
