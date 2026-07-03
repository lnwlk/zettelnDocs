import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zettelnBackground px-6 text-center text-zettelnDarkBlue">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-zettelnBold text-4xl tracking-tight">Zetteln Hilfe</h1>
        <p className="max-w-md text-zettelnDarkBlue/70">
          Anleitungen, Tipps und Antworten rund um die Zetteln-App – Schritt für
          Schritt erklärt.
        </p>
      </div>
      <Link
        href="/docs"
        className="rounded-full bg-zettelnRed px-6 py-2.5 font-zettelnBold text-zettelnSand transition-opacity hover:opacity-90"
      >
        Zur Dokumentation
      </Link>
    </main>
  );
}
