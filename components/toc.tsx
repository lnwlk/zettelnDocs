'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type Item = { id: string; text: string; depth: number };

/**
 * Right-column table of contents rendered as simple text links. Works on ALL
 * pages — including StepCard pages that have no markdown headings — by scanning
 * the rendered <article> for heading anchors (`##`/`###` and StepCard <h3>s,
 * which carry ids). Fed to `DocsPage` via `tableOfContent.component`, so it
 * inherits the sticky right-column layout on xl screens. Includes scroll-spy:
 * the link for the heading currently near the top of the viewport is bold.
 */
export function Toc() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;

    const heads = Array.from(
      article.querySelectorAll<HTMLElement>('h2[id], h3[id]'),
    );
    setItems(
      heads.map((h) => ({
        id: h.id,
        text: h.textContent?.trim() ?? '',
        depth: h.tagName === 'H3' ? 3 : 2,
      })),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).id);
        }
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 },
    );
    heads.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="sticky top-(--fd-docs-row-1) flex h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] w-(--fd-toc-width) flex-col overflow-y-auto pe-4 pt-12 pb-2 [grid-area:toc] max-xl:hidden xl:layout:[--fd-toc-width:268px]">
      <p className="mb-3 text-sm text-fd-muted-foreground">Auf dieser Seite</p>
      <div className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={
              (active === item.id
                ? 'font-medium text-fd-foreground'
                : 'text-fd-muted-foreground hover:text-fd-foreground') +
              ' transition-colors' +
              (item.depth === 3 ? ' ps-3' : '')
            }
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
