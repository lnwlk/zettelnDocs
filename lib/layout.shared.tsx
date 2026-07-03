import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-zettelnDarkBlue font-zettelnBold text-zettelnSand">
            Z
          </span>
          <span className="font-zettelnBold text-xl text-fd-foreground">
            Support
          </span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    // Light-only design: no theme toggle in the sidebar.
    themeSwitch: { enabled: false },
  };
}
