import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          {/* Logo: save your file as public/logo.svg (SVG recommended).
              h-8 w-auto keeps a 32px height for a square mark or a wordmark. */}
          <img src="/logo.svg" alt="Zetteln" className="h-8 w-auto" />
          <span className="font-zettelnBold text-xl text-fd-foreground">
            Support
          </span>
        </span>
      ),
    },
    // Light-only design: no theme toggle in the sidebar.
    themeSwitch: { enabled: false },
  };
}
