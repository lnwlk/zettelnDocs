import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Role = 'admin' | 'member';

/**
 * Background tint per role. The label text always stays `zettelnDarkBlue` for
 * legibility; the tint carries the role signal — red for Admin-only
 * permissions, blue for Teammitglied ones.
 */
const ROLE_PILL: Record<Role, string> = {
  admin: 'bg-zettelnRed/20',
  member: 'bg-zettelnInfoBlue/20',
};

/**
 * A full-width bar that flags which role a step (or action) is available to.
 * Used inside {@link StepCard} bodies; the outer spacing (from the copy above,
 * between stacked badges, and from the image below) is handled by the card via
 * the `data-role-badge` hook.
 */
export function RoleBadge({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  return (
    <span
      data-role-badge
      className={cn(
        // MDX may wrap the label in a <p>; reset its margins so the padding
        // alone centres the text vertically.
        'block w-full rounded-2xl px-3 py-2 text-sm leading-5 text-zettelnDarkBlue [&>p]:m-0',
        ROLE_PILL[role],
      )}
    >
      {children}
    </span>
  );
}
