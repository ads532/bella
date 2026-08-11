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
i18n/de.json        alle deutschen Texte                  ← bearbeiten
build.py            erzeugt daraus die englische Fassung

en/  de/            erzeugt — nicht von Hand ändern
  index.html  dona.html  magazine.html
sitemap.xml         erzeugt

assets/
  css/style.css     komplettes Design-System (Tokens, Komponenten)
  js/main.js        Header, Menü, Scroll-Reveal, Zähler, IBAN kopieren
  img/              alle verwendeten Bilder
  img/logos/        31 freigestellte Partner-Logos (aus der alten Logowand)
  img/_pool/        weitere Fotos aus dem Archiv der alten Seite (ungenutzt)
  fonts/            Red Hat Display + Text — lokal, keine Google-Verbindung

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
Magazine` plus ein permanenter grüner **Dona ora**-Button. Keine Dropdowns mehr,
auf Mobil ein Vollbild-Menü.

Die Reihenfolge der Sektionen folgt bewusst der Spenden-Logik von charity: water:
erst der Mensch (Esperanzas Geschichte), dann das Problem (260 Mio. Kinder), dann
die konkrete Lösung (die Schule), dann der Beweis für Vertrauen (zwei Konten,
100 %), erst danach die Community. Der Spenden-Button ist immer sichtbar.

---

## Drei Sprachen (IT / EN / DE)

Jede Sprache hat eigene, echte URLs — kein JavaScript-Umschalten:

| | Italienisch | Englisch | Deutsch |
|---|---|---|---|
| Startseite | `/` | `/en/` | `/de/` |
| Spenden | `/dona.html` | `/en/dona.html` | `/de/dona.html` |
| Magazine | `/magazine.html` | `/en/magazine.html` | `/de/magazine.html` |

Alle drei Fassungen sind vollwertige HTML-Seiten mit eigenem `<title>`, eigener
Meta-Description, eigenem `canonical` und wechselseitigen `hreflang`-Angaben.
Damit lassen sich fremdsprachige **Google-Ads-Kampagnen direkt auf die passenden
URLs** schalten, und Google kann jede Sprache getrennt indexieren.

### Wie das zusammenhängt

Italienisch ist die einzige Quelle. Die anderen Sprachen entstehen daraus:

```
index.html  +  i18n/en.json   ──build.py──▶   en/index.html
index.html  +  i18n/de.json   ──build.py──▶   de/index.html
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
- **Englisch / Deutsch** → in `i18n/en.json` bzw. `i18n/de.json`
- **Neuen Absatz anlegen** → im HTML mit `data-i18n="neuer.schlüssel"` auszeichnen
  und denselben Schlüssel in beiden Wörterbüchern ergänzen

Danach:

```bash
python3 build.py
```

Das Skript meldet jeden Schlüssel, für den eine Übersetzung fehlt, und schreibt
`en/`, `de/` sowie `sitemap.xml` neu. **Wer es vergisst, dem passiert nichts:** Bei
jedem Push nach GitHub läuft derselbe Build automatisch als Action und schiebt
das Ergebnis nach.

Neben `data-i18n` (Inhalt) gibt es noch `data-i18n-content` (für Meta-Tags),
`data-i18n-placeholder`, `data-i18n-idle` und `data-i18n-done` (Kopier-Buttons).

---

## Datenschutz

- **Schriften liegen lokal** in `assets/fonts/` — keine Verbindung zu Google
  Fonts, es werden also keine IP-Adressen an Dritte übertragen (das war der
  Streitpunkt im Urteil des LG München I, 3 O 17493/20).
- **Keine externen Requests** beim Seitenaufruf. Instagram, LinkedIn und
  Facebook sind reine Linkziele.
- **Donorbox mit Zwei-Klick-Schutz.** Das Spendenformular liegt bei Donorbox.
  Es lädt erst, wenn jemand darauf klickt — oder automatisch, wenn im Banner
  bereits zugestimmt wurde. Ohne Klick geht keine IP-Adresse dorthin.
- **Keine Cookies.** Gespeichert wird ausschließlich die Antwort auf den
  Einwilligungs-Banner (`localStorage`, Schlüssel `be-consent`). Das ist
  technisch notwendig und einwilligungsfrei.
- **Der Banner ist widerrufbar** über „Impostazioni privacy" / „Privatsphäre-Einstellungen" im Footer —
  Pflicht, sobald echtes Tracking dazukommt.

Streng genommen wäre der Banner im jetzigen Zustand nicht vorgeschrieben. Er ist
da, weil mit den geplanten Google-Ads-Kampagnen Conversion-Tracking kommt, und
das braucht eine Einwilligung, bevor es lädt.

## Design-System

Alle Werte stehen als CSS-Variablen ganz oben in `assets/css/style.css`.

**Farben** (Brand Book v0.6, Seite 13/14):
`#4CC78F` Green hope (Leitfarbe) · `#3B3B36` Chalkboard gray · `#E3E7EA` Cloud
white. Dazu abgeleitete Grüntöne `#34A473` und `#1E6B4A` sowie die
Sekundärfarben `#FFD649` Sunflower yellow, `#6E67A8` Lavander violet und
`#FF7325` Sunset orange, sparsam eingesetzt.

**Schriften** (Brand Book Seite 19): Red Hat Display für Überschriften,
Red Hat Text für Fließtext. Beide als Variable Font, lokal ausgeliefert,
zusammen 86 KB.

Weitere Details: geschichtete, farbig getönte Schatten statt flacher Boxen; ein
feines SVG-Rauschen (`.grain`) über den Flächen; Animationen ausschließlich über
`transform` und `opacity`; `prefers-reduced-motion` wird respektiert.

---

## Vor dem Livegang

- [ ] **Newsletter-Formular anbinden** — `<form data-demo-form>` in
      `index.html` (Sektion `#contatti`) zeigt aktuell nur eine Bestätigung.
      Der Verein nutzt noch keinen Dienst. Empfehlung MailerLite: EU-Server
      wählbar, günstiger und einfacher zu bedienen als Mailchimp, im
      kostenlosen Tarif bis 1.000 Kontakte ausreichend. Danach `action`
      setzen und `data-demo-form` entfernen.
- [ ] **Rechtstexte** — Privacy Policy, Cookie Policy und Credits verlinken noch
      auf die alte WordPress-Installation. Entweder dort belassen oder als eigene
      Seiten übernehmen.
- [ ] **Analytics / Conversion-Tracking** — noch nicht eingebaut. Der
      Einwilligungs-Banner ist bereits vorbereitet: Skripte, die erst nach
      Zustimmung starten sollen, so einbinden:

      ```html
      <script type="text/plain" data-consent="marketing" src="..."></script>
      ```

      Sie werden aktiviert, sobald jemand „Accetta tutto" wählt. Zusätzlich
      steht `window.beConsent` bereit und es feuert ein `be:consent`-Event.
- [ ] **Team vervollständigen** — der Vorstand steht nach der Präsentation
      2026. Für Mwende Mutinda, Paolo Pompermaier, Suor Helena, Alkaji
      Construction und Studio Chiomenti fehlen noch Fotos; dort steht
      vorerst eine Monogramm-Kachel. Alexandra bereitet eine Übersicht vor.
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
