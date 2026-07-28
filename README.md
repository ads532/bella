# Bella Esperanza | BE — neue Website

Statische Website (HTML / CSS / Vanilla JS), kein Build-Schritt, überall hostbar:
Netlify, Vercel, GitHub Pages, Cloudflare Pages oder klassisches Webhosting per FTP.

---

## Lokal ansehen

Node ist auf diesem Rechner nicht installiert, deshalb der Python-Weg:

```bash
cd /Users/coop/Desktop/Claude/Bella
python3 -m http.server 3000
# → http://localhost:3000
```

Falls Node vorhanden ist, geht auch `node serve.mjs` (liegt im Projekt bei und
unterstützt zusätzlich URLs ohne `.html`, z. B. `/dona`).

Nicht per `file://` öffnen — die Sprachumschaltung und der Sticky-Header brauchen
einen echten HTTP-Server.

---

## Struktur

```
index.html          One-Pager mit allen Kerninhalten      ← bearbeiten
dona.html           Spenden (Donorbox, IBAN, 5×1000)      ← bearbeiten
magazine.html       BE Magazine — alle 6 Kooperationen    ← bearbeiten
i18n/en.json        alle englischen Texte                 ← bearbeiten
build.py            erzeugt daraus die englische Fassung

en/                 erzeugt — nicht von Hand ändern
  index.html  dona.html  magazine.html
sitemap.xml         erzeugt

assets/
  css/style.css     komplettes Design-System (Tokens, Komponenten)
  js/main.js        Header, Menü, Scroll-Reveal, Zähler, IBAN kopieren
  img/              alle verwendeten Bilder
  img/_pool/        weitere Fotos aus dem Archiv der alten Seite (ungenutzt)

serve.mjs           optionaler Dev-Server (Node)
.github/workflows/  baut en/ bei jedem Push automatisch neu
```

---

## Menü: von 12 Seiten auf 3

Die alte Seite hatte 4 Dropdowns mit 12 Unterseiten. Viele davon trugen nur
wenige Absätze — für Spender:innen bedeutet das viele Klicks bis zur eigentlichen
Aussage. Die neue Struktur:

| alt | neu |
|---|---|
| Perché BE?, Come lavoriamo, La nostra storia, Scuola, Team, Perché l'istruzione?, Supporto, Co-Creazione, Scopri | **index.html** — ein durchgehender Scroll |
| Donazione | **dona.html** |
| BE Magazine | **magazine.html** |
| Connettiti | Sektion `#contatti` am Seitenende |

Navigation: `La storia · Il progetto · Creatività · Come lavoriamo · Community ·
Magazine` plus ein permanenter gelber **Dona ora**-Button. Keine Dropdowns mehr,
auf Mobil ein Vollbild-Menü.

Die Reihenfolge der Sektionen folgt bewusst der Spenden-Logik von charity: water:
erst der Mensch (Esperanzas Geschichte), dann das Problem (260 Mio. Kinder), dann
die konkrete Lösung (die Schule), dann der Beweis für Vertrauen (zwei Konten,
100 %), erst danach die Community. Der Spenden-Button ist immer sichtbar.

---

## Zweisprachigkeit (IT / EN)

Jede Sprache hat eigene, echte URLs — kein JavaScript-Umschalten:

| | Italienisch | Englisch |
|---|---|---|
| Startseite | `/` | `/en/` |
| Spenden | `/dona.html` | `/en/dona.html` |
| Magazine | `/magazine.html` | `/en/magazine.html` |

Beide Fassungen sind vollwertige HTML-Seiten mit eigenem `<title>`, eigener
Meta-Description, eigenem `canonical` und wechselseitigen `hreflang`-Angaben.
Damit lassen sich englischsprachige **Google-Ads-Kampagnen direkt auf die
englischen URLs** schalten, und Google kann beide Sprachen getrennt indexieren.

### Wie das zusammenhängt

Italienisch ist die einzige Quelle. Die englischen Seiten werden daraus erzeugt:

```
index.html  +  i18n/en.json   ──build.py──▶   en/index.html
```

Verknüpft wird über Schlüssel im HTML:

```html
<p data-i18n="story.p1">Testo italiano</p>
```

```json
"story.p1": "English text"
```

### Text ändern

- **Italienisch** → direkt in `index.html` / `dona.html` / `magazine.html`
- **Englisch** → in `i18n/en.json` beim passenden Schlüssel
- **Neuen Absatz anlegen** → im HTML mit `data-i18n="neuer.schlüssel"` auszeichnen
  und denselben Schlüssel in `i18n/en.json` ergänzen

Danach:

```bash
python3 build.py
```

Das Skript meldet jeden Schlüssel, für den eine Übersetzung fehlt, und schreibt
`en/` sowie `sitemap.xml` neu. **Wer es vergisst, dem passiert nichts:** Bei
jedem Push nach GitHub läuft derselbe Build automatisch als Action und schiebt
das Ergebnis nach.

Neben `data-i18n` (Inhalt) gibt es noch `data-i18n-content` (für Meta-Tags),
`data-i18n-placeholder`, `data-i18n-idle` und `data-i18n-done` (Kopier-Buttons).

---

## Design-System

Alle Werte stehen als CSS-Variablen ganz oben in `assets/css/style.css`.

**Farben** (aus dem bestehenden Brand-Kit der alten Seite übernommen):
`#FECC4E` Gelb (primär) · `#F37932` Orange · `#F04C71` Pink · `#6B69B0` Violett ·
`#72C594` Grün · `#00CEB4` Türkis · `#E91558` Magenta · `#141312` Tiefschwarz ·
`#FBF7F1` Warmweiß

**Schriften:** Poppins (Überschriften, Markenschrift) · Inter (Fließtext) ·
Cardo kursiv (Zitate und Akzente)

Weitere Details: geschichtete, farbig getönte Schatten statt flacher Boxen; ein
feines SVG-Rauschen (`.grain`) über den Flächen; Animationen ausschließlich über
`transform` und `opacity`; `prefers-reduced-motion` wird respektiert.

---

## Vor dem Livegang

- [ ] **Newsletter-Formular anbinden** — `<form data-demo-form>` in
      `index.html` (Sektion `#contatti`) zeigt aktuell nur eine Bestätigung.
      `action` auf Mailchimp / Brevo / MailerLite setzen und `data-demo-form`
      entfernen.
- [ ] **Rechtstexte** — Privacy Policy, Cookie Policy und Credits verlinken noch
      auf die alte WordPress-Installation. Entweder dort belassen oder als eigene
      Seiten übernehmen.
- [ ] **Cookie-Banner** — derzeit werden keine Tracking-Cookies gesetzt (nur
      `localStorage` für die Sprachwahl, technisch notwendig). Sobald Analytics
      dazukommt, ist ein Consent-Banner nötig.
- [ ] **Donorbox** — der Button verlinkt auf
      `https://donorbox.org/join-the-bevolution`. Alternativ lässt sich das
      Donorbox-iframe direkt in `dona.html` einbetten.
- [ ] **Spendenbeispiele auf `dona.html`** (25 € / 75 € / 250 €) sind Platzhalter
      und sollten vom Verein mit echten Zahlen bestätigt werden.
- [ ] **Bildrechte** — alle Fotos stammen aus der Mediathek der bestehenden Seite
      (Fotograf:innen u. a. Mariana Arrieta, Max Tomasinelli). Für Fotos von
      Kindern die vorhandenen Einwilligungen prüfen.
- [ ] **Bilder weiter optimieren** — die JPEGs sind auf max. 1800 px verkleinert.
      Für den Livebetrieb lohnt sich zusätzlich WebP/AVIF (z. B. via Squoosh oder
      der Bildoptimierung des Hosters).
- [ ] **Domain & Weiterleitungen** — alte URLs (`/why-be/`, `/our-school/`, …)
      per 301 auf die neuen Anker umleiten, damit keine Links ins Leere laufen.

---

## Inhaltlich übernommen

Alle Inhalte der Live-Seite (Stand Juli 2026) sind enthalten: Mission und Vision,
die Geschichte von Esperanza, „Perché l'istruzione?" mit allen acht Argumenten
und den Zahlen 260 Mio. / 825 Mio. / 10 %, die Schule in Ugwachanya samt
Raumprogramm, das Charity-3C-Modell, die sieben Werte, beide Bankkonten,
5×1000 (C.F. 94155370219), die sechs BE-Friends-Stimmen, der Vorstand, die
Partner, alle sechs Magazin-Beiträge sowie sämtliche Kontaktadressen.

Neu hinzugekommen: Kopier-Buttons für IBAN und Codice Fiscale, animierte
Kennzahlen, die 5×1000-Sektion auf der Spendenseite und die Anker-Navigation.
