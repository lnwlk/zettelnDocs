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
  phoneImage?: string;
  phoneImageAlt?: string;
  /** The copy / body text of the step. */
  children?: ReactNode;
}

/**
 * Step card (Zetteln support-page design, Figma node 119:2589):
 * a 32px blue number badge + headline, a description line, then an image row —
 * one landscape image, or a landscape + a narrower iPhone image. Images use
 * `object-contain` on a sand background so real screenshots of any ratio show
 * in full without cropping. White card + soft shadow (website card style).
 */
export function StepCard({
  step,
  title,
  image,
  imageAlt,
  phoneImage,
  phoneImageAlt,
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
      {phoneImage ? (
        <div className="grid grid-cols-[397fr_185fr] items-stretch gap-4">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-zettelnBackground">
            <Image
              src={image}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 768px) 60vw, 400px"
              className="object-contain"
            />
          </div>
          <div className="relative h-full min-h-[220px] overflow-hidden rounded-3xl bg-zettelnBackground">
            <Image
              src={phoneImage}
              alt={phoneImageAlt ?? `${title} – App`}
              fill
              sizes="(max-width: 768px) 30vw, 185px"
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-zettelnBackground">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-contain"
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
