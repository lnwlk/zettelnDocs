import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import localFont from 'next/font/local';

// Zetteln brand font (Lexend), loaded from the shared zettelnToken package
// so the docs site uses the exact same font files as the app & website.
const zetteln = localFont({
  src: [
    {
      path: '../node_modules/zettelnToken/fonts/lexend-latin-400-normal.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../node_modules/zettelnToken/fonts/lexend-latin-700-normal.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-zetteln',
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="de" className={zetteln.variable} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans">
        {/* Light-only design: disable theme switching entirely. */}
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
