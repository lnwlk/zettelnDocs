# Zetteln Docs

Die Hilfe- und Dokumentationswebsite für die **Zetteln**-App, gebaut mit
[Fumadocs](https://fumadocs.dev) (Next.js).

## Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000). Die Doku liegt unter `/docs`.

## Branding

Farben und Schriften kommen aus dem gemeinsamen Design-Token-Paket
[`zettelnToken`](https://github.com/lnwlk/zettelnToken) – dieselbe Quelle wie
App und Website. Tokens werden in [`app/global.css`](app/global.css) über
`@theme` als Tailwind-Utilities registriert (`bg-zettelnSand`, `text-zettelnRed`,
`font-zettelnBold`, …). Die Schrift (Lexend) wird in
[`app/layout.tsx`](app/layout.tsx) direkt aus dem Paket geladen.

Um Marken-Werte zu ändern: im `zettelnToken`-Repo anpassen, dort `npm run build:css`
laufen lassen, veröffentlichen und hier `npm update zettelnToken`.

## Inhalte schreiben

Seiten liegen als MDX unter [`content/docs`](content/docs). Die Navigation
(Gruppen + Reihenfolge) wird über `meta.json`-Dateien gesteuert.

### Schritt-Karten

Für Anleitungen gibt es die Komponente `<StepCard>` (Überschrift, Text,
Querformat-Bild + optionaler iPhone-Screenshot):

```mdx
<StepCard
  step={1}
  title="Öffne die App"
  image="/docs/dein-screenshot.png"
  phone="/docs/dein-iphone-screenshot.png"
>
  Erklärungstext des Schritts.
</StepCard>
```

Mehrere Karten lassen sich mit `<Steps>…</Steps>` gruppieren. Bilder liegen in
[`public/docs`](public/docs) (aktuell Platzhalter – durch echte Screenshots ersetzen).

## Deployment

Für Vercel: Repo verbinden, Framework „Next.js“ wird automatisch erkannt, keine
weitere Konfiguration nötig.

## Struktur

| Pfad                      | Zweck                                             |
| ------------------------- | ------------------------------------------------- |
| `content/docs`            | Doku-Seiten (MDX) + `meta.json`-Navigation        |
| `components/step-card.tsx`| `StepCard` / `Steps` Layout-Komponenten           |
| `app/global.css`          | Tailwind + Zetteln-Marken-Tokens                  |
| `lib/source.ts`           | Content-Source-Adapter für Fumadocs               |
| `lib/shared.ts`           | App-Name, GitHub-Info, Routen                     |
