# Inhalte schreiben – Kurzanleitung

Alle Doku-Seiten liegen als `.mdx`-Dateien unter [`content/docs/`](content/docs/).
Eine Datei = eine Seite. Ein Ordner = eine Sidebar-Gruppe.

## Vorschau

```bash
npm run dev      # http://localhost:3000/docs – lädt bei jeder Änderung neu
```

Fertig? `git add -A && git commit -m "..." && git push` → Vercel deployt automatisch.

## Neue Seite anlegen

1. Neue Datei erstellen, z. B. `content/docs/erste-schritte/passwort.mdx`.
2. Kopiervorlage einfügen (siehe unten).
3. Speichern – die Seite erscheint dank `"..."` in der `meta.json` **automatisch**
   in der Sidebar. Reihenfolge festlegen: Dateinamen in die `pages`-Liste der
   `meta.json` **vor** das `"..."` schreiben.

### Kopiervorlage für eine Seite

```mdx
---
title: Titel der Seite
description: Ein Satz, der oben als Untertitel und in der Suche erscheint.
---

Kurze Einleitung.

<Steps>
  <StepCard step={1} title="Erster Schritt" image="/docs/mein-screenshot.png">
    Erklärungstext. **Fett** und [Links](/docs/erste-schritte) funktionieren.
  </StepCard>

  <StepCard
    step={2}
    title="Zweiter Schritt"
    image="/docs/landscape.png"
    phoneImage="/docs/iphone.png"
  >
    Schritt mit zusätzlichem iPhone-Screenshot.
  </StepCard>
</Steps>
```

## Neue Gruppe anlegen

```
content/docs/faq/
  meta.json     →  { "title": "Häufige Fragen", "icon": "CircleHelp", "pages": ["index", "..."] }
  index.mdx
```

Dann den Ordnernamen (`"faq"`) in [`content/docs/meta.json`](content/docs/meta.json)
ergänzen (oder das `"..."` erledigt es automatisch).

## Frontmatter (der Block zwischen den `---`)

| Feld          | Zweck                                             |
| ------------- | ------------------------------------------------- |
| `title`       | Überschrift + Sidebar-Label (Pflicht)             |
| `description` | Untertitel + Text für Suche/SEO                   |
| `icon`        | Sidebar-Icon: `book` (Seiten) oder `folder` (Gruppen) |
| `full: true`  | Volle Breite (ohne „On this page“-Spalte rechts)  |

Icons sind die eigenen Zetteln-SVGs in [`components/icons.tsx`](components/icons.tsx),
registriert in [`lib/source.ts`](lib/source.ts). Konvention: Seiten nutzen `icon: book`
im Frontmatter, Gruppen `"icon": "folder"` in der `meta.json`. Neues Icon hinzufügen:
SVG als Komponente in `components/icons.tsx` ergänzen und in die `icons`-Map eintragen.

## Bausteine für Seiten

| Baustein | Beispiel |
| --- | --- |
| Schritt-Karte | `<StepCard step={1} title="…" image="/docs/x.png" phoneImage="/docs/y.png">Text</StepCard>` |
| Karten gruppieren | `<Steps> … mehrere StepCards … </Steps>` |
| Link-Kacheln | `<Cards><Card title="…" href="/docs/…" description="…" /></Cards>` |
| Hinweis-Box | `<Callout type="warn">Achtung …</Callout>` (auch `info`, `tip`) |

Dazu ganz normales Markdown: `##` Überschriften (landen automatisch im
„On this page“-Menü), Listen, Tabellen, **fett**, `Code`.

## Bilder

Screenshots nach [`public/docs/`](public/docs/) legen und als `/docs/dateiname.png`
einbinden. Querformat für das große Bild (`image`), iPhone-Screenshots für den
schmalen `phoneImage`-Slot. Die vorhandenen `placeholder-*.png` sind die Platzhalter,
die du ersetzen kannst.

## Marken-Farben & Schrift

Kommen automatisch aus dem [`zettelnToken`](https://github.com/lnwlk/zettelnToken)-Paket
(`bg-zettelnSand`, `text-zettelnRed`, `font-zettelnBold`, …). Nichts zu tun beim
Schreiben – nur relevant, wenn du eigene Komponenten baust.
