import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Put on a `relative`, sized image container to make `ZoomImage` fill it.
 * `ImageZoom` nests two spans between the container and the image:
 * `[data-rmiz] > [data-rmiz-content] > <img fill>`. next/image's `fill` needs
 * its *direct* parent (`[data-rmiz-content]`, an inline, static, zero-height
 * span by default) to be positioned and sized, or the image collapses.
 *
 * We only *add* sizing — never override `[data-rmiz]`'s own `position:relative`
 * (that rule ships unlayered in image-zoom2.css and would beat a Tailwind
 * `@layer utilities` override anyway). Both spans are stretched to fill the
 * container (`size-full`, `block` so the inline content span honours it), and
 * the content span gets `relative` so it becomes the image's positioned parent.
 */
const ZOOM_FILL =
  '[&_[data-rmiz]]:block [&_[data-rmiz]]:size-full [&_[data-rmiz-content]]:relative [&_[data-rmiz-content]]:block [&_[data-rmiz-content]]:size-full';

/**
 * Fills its parent (which must be `relative` and carry {@link ZOOM_FILL}) with
 * a screenshot that opens full-screen on click. The displayed image is a `fill`
 * `next/image` passed as `ImageZoom`'s child (keeps next/image typing — the
 * framework's own `ImageProps` has no `fill`), while `src` tells the zoom modal
 * the full-res source.
 */
function ZoomImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <ImageZoom src={src} alt={alt}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain"
      />
    </ImageZoom>
  );
}

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

      {/* Description — supports multiple paragraphs and bulleted lists.
          `flex flex-col gap-2` gives the vertical rhythm between blocks (the
          card is `not-prose`, so there are no default block margins/markers). */}
      {children && (
        <div className="flex flex-col gap-2 text-base leading-[22px] text-zettelnDarkBlue [&_a]:text-zettelnInfoBlue [&_a]:underline [&_li]:mt-1 [&_li:first-child]:mt-0 [&_p]:m-0 [&_strong]:font-zettelnBold [&_ul]:m-0 [&_ul]:list-disc [&_ul]:ps-5">
          {children}
        </div>
      )}

      {/*
        Image row — each screenshot opens full-screen on click.
        Column ratio 3.854:1 = (2556/1179)·(16/9): the exact split at which the
        16:9 landscape and the 19.5:9 phone derive the SAME height from their
        widths, at any container width. Landscape grows to match the tall phone;
        both keep their aspect ratios.
      */}
      {phoneImage ? (
        <div className="grid grid-cols-[3.854fr_1fr] items-start gap-4">
          <div
            className={cn(
              'relative aspect-video overflow-hidden rounded-3xl bg-zettelnBackground',
              ZOOM_FILL,
            )}
          >
            <ZoomImage
              src={image}
              alt={imageAlt ?? title}
              sizes="(max-width: 768px) 60vw, 400px"
            />
          </div>
          {/* iPhone 19.5:9 — matches the uploaded 1179×2556 screenshots so
              the phone image fills its frame with no letterboxing. */}
          <div
            className={cn(
              'relative aspect-1179/2556 overflow-hidden rounded-3xl bg-zettelnBackground',
              ZOOM_FILL,
            )}
          >
            <ZoomImage
              src={phoneImage}
              alt={phoneImageAlt ?? `${title} – App`}
              sizes="(max-width: 768px) 30vw, 185px"
            />
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'relative aspect-video w-full overflow-hidden rounded-3xl bg-zettelnBackground',
            ZOOM_FILL,
          )}
        >
          <ZoomImage
            src={image}
            alt={imageAlt ?? title}
            sizes="(max-width: 768px) 100vw, 600px"
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
