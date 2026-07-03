import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface StepCardProps {
  /** Optional step number shown in the blue badge (e.g. 1, 2, 3). */
  step?: number;
  /** Headline of the step. */
  title: string;
  /** Landscape image (screenshot / illustration). Path in /public or a remote URL. */
  image: string;
  imageAlt?: string;
  /** Optional iPhone screenshot shown to the right of the landscape image. */
  phone?: string;
  phoneAlt?: string;
  /** The copy / body text of the step. */
  children?: ReactNode;
}

/**
 * Step card — matches the Zetteln support-page design (Figma node 119:2589):
 * a 32px blue number badge + headline, a description line, then a full-width
 * image row (one landscape image, or a landscape + a narrower iPhone image
 * split ~397/185 with a 16px gap). Radii, spacing and colors follow the
 * zettelnToken brand tokens.
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
        'not-prose flex flex-col gap-4 rounded-[32px] bg-white p-6 text-zettelnDarkBlue',
        'shadow-[0_1px_2px_rgba(20,23,36,0.04),0_10px_28px_rgba(20,23,36,0.07)]',
      )}
    >
      {/* Header: badge + headline */}
      <div className="flex items-center gap-[9px]">
        {step != null && (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zettelnBlue text-sm text-zettelnDarkBlue">
            {step}
          </span>
        )}
        <h3 className="m-0 font-zettelnBold text-xl leading-6 text-zettelnDarkBlue">
          {title}
        </h3>
      </div>

      {/* Description */}
      {children && (
        <div className="text-base leading-[22px] text-zettelnDarkBlue [&_a]:text-zettelnInfoBlue [&_a]:underline [&_p]:m-0 [&_strong]:font-zettelnBold">
          {children}
        </div>
      )}

      {/* Image row */}
      {phone ? (
        <div className="grid grid-cols-[397fr_185fr] items-stretch gap-4">
          <div className="relative aspect-[397/266] overflow-hidden rounded-3xl bg-zettelnBackground">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 60vw, 400px"
              className="object-cover"
            />
          </div>
          <div className="relative h-full overflow-hidden rounded-3xl bg-zettelnBackground">
            <Image
              src={phone}
              alt={phoneAlt ?? `${title} – App`}
              fill
              sizes="(max-width: 768px) 30vw, 185px"
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[598/266] w-full overflow-hidden rounded-3xl bg-zettelnBackground">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}

/** Stacks multiple step cards with the 48px gap used in the design. */
export function Steps({ children }: { children?: ReactNode }) {
  return <div className="not-prose flex flex-col gap-12">{children}</div>;
}
