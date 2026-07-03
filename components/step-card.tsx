import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface StepCardProps {
  /** Optional step number shown in the badge (e.g. 1, 2, 3). */
  step?: number;
  /** Headline of the step. */
  title: string;
  /** Landscape image (screenshot / illustration). Path in /public or a remote URL. */
  image: string;
  imageAlt?: string;
  /** Optional iPhone screenshot shown next to the landscape image. */
  phone?: string;
  phoneAlt?: string;
  /** The copy / body text of the step. */
  children?: ReactNode;
}

/**
 * A step card matching the Zetteln docs layout:
 * headline + copy on the left, one landscape image (and an optional
 * iPhone screenshot) on the right. Stacks to a single column on mobile.
 */
export function StepCard({
  step,
  title,
  image,
  imageAlt,
  phone,
  phoneAlt,
  children,
}: StepCardProps) {
  return (
    <div
      className={cn(
        'not-prose my-6 overflow-hidden rounded-2xl border',
        'border-zettelnSandDark/60 bg-zettelnSand text-zettelnDarkBlue',
        'shadow-sm',
      )}
    >
      <div className="grid gap-6 p-6 md:grid-cols-2 md:items-center md:p-8">
        {/* Text side */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {step != null && (
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-zettelnRed font-zettelnBold text-sm text-zettelnSand">
                {step}
              </span>
            )}
            <h3 className="m-0 font-zettelnBold text-xl leading-tight text-zettelnDarkBlue">
              {title}
            </h3>
          </div>
          {children && (
            <div className="text-sm leading-relaxed text-zettelnDarkBlue/80 [&_a]:text-zettelnInfoBlue [&_a]:underline">
              {children}
            </div>
          )}
        </div>

        {/* Media side */}
        <div className="flex items-end justify-center gap-3">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zettelnSandDark/50 bg-zettelnBackground">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          {phone && (
            <div className="relative aspect-[9/19] w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-zettelnDarkBlue/80 bg-zettelnBackground shadow-md sm:w-28">
              <Image
                src={phone}
                alt={phoneAlt ?? `${title} – App`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Simple wrapper to stack multiple step cards with consistent spacing. */
export function Steps({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
