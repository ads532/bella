#!/usr/bin/env python3
"""
Erzeugt die englische Fassung der Website als echte statische Seiten.

    python3 build.py

Quelle sind die italienischen HTML-Dateien im Projektwurzelverzeichnis plus
das Wörterbuch i18n/en.json. Daraus entstehen:

    en/index.html   en/dona.html   en/magazine.html
    sitemap.xml

Italienisch bleibt damit die einzige Stelle, an der Struktur und Layout
gepflegt werden. Wer einen englischen Text ändern will, ändert ihn in
i18n/en.json und lässt dieses Skript neu laufen.

Verknüpft werden beide Sprachen über die Attribute im HTML:

    <p data-i18n="story.p1">Testo italiano</p>      -> Inhalt wird ersetzt
    <meta data-i18n-content="meta.homeDesc" ...>    -> content-Attribut
    <input data-i18n-placeholder="contact.ph" ...>  -> placeholder-Attribut
    <span data-i18n-idle="ui.copyIban" ...>         -> data-idle-Attribut

Nur die Standardbibliothek, keine Abhängigkeiten.
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(ROOT, 'en')
SITE = 'https://www.bellaesperanza.org'

# Quelldatei -> (URL italienisch, URL englisch)
PAGES = {
    'index.html':    ('/',              '/en/'),
    'dona.html':     ('/dona.html',     '/en/dona.html'),
    'magazine.html': ('/magazine.html', '/en/magazine.html'),
}

# data-i18n-<suffix> -> Zielattribut in der Ausgabe
ATTR_TARGETS = {
    'content':     'content',
    'placeholder': 'placeholder',
    'aria':        'aria-label',
    'title':       'title',
    'idle':        'data-idle',
    'done':        'data-done',
    'success':     'data-success',
}

VOID_TAGS = {'meta', 'link', 'img', 'br', 'hr', 'input', 'source', 'path', 'rect', 'circle'}


# ---------------------------------------------------------------------------
# HTML-Hilfsfunktionen
# ---------------------------------------------------------------------------

def find_element_end(html, tag, after_open_tag):
    """Index, an dem der Inhalt von <tag> endet — verschachtelte gleiche Tags
    werden mitgezählt, damit z. B. ein <span> in einem <span> nicht zu früh
    schließt."""
    depth = 1
    pos = after_open_tag
    pattern = re.compile(r'<(/?)%s\b[^>]*?(/?)>' % re.escape(tag), re.I)
    while depth > 0:
        m = pattern.search(html, pos)
        if not m:
            raise ValueError('kein schliessendes </%s> gefunden' % tag)
        if m.group(1) == '/':
            depth -= 1
            if depth == 0:
                return m.start(), m.end()
        elif not m.group(2):
            depth += 1
        pos = m.end()
    raise ValueError('unerreichbar')


def translate(html, words, source_name):
    """Ersetzt Inhalte und Attribute anhand der data-i18n-Auszeichnungen.
    Wird von hinten nach vorne abgearbeitet, damit die gefundenen Positionen
    durch vorherige Ersetzungen nicht verrutschen."""
    missing = []
    opens = list(re.finditer(r'<([a-zA-Z][\w-]*)\b([^>]*)>', html))

    for m in reversed(opens):
        tag, attrs = m.group(1).lower(), m.group(2)
        if 'data-i18n' not in attrs:
            continue

        new_attrs = attrs

        # 1. Attribut-Übersetzungen
        for suffix, target in ATTR_TARGETS.items():
            hit = re.search(r'\bdata-i18n-%s="([^"]+)"' % suffix, new_attrs)
            if not hit:
                continue
            key = hit.group(1)
            if key not in words:
                missing.append(key)
                continue
            value = words[key].replace('"', '&quot;')
            # (?<![-\w]) verhindert, dass content=" innerhalb von
            # data-i18n-content=" getroffen wird — sonst überschreibt die
            # Ersetzung den Schlüssel statt des echten Attributs.
            exists = r'(?<![-\w])%s="' % re.escape(target)
            if re.search(exists, new_attrs):
                new_attrs = re.sub(r'(?<![-\w])%s="[^"]*"' % re.escape(target),
                                   lambda _: '%s="%s"' % (target, value), new_attrs, count=1)
            else:
                new_attrs += ' %s="%s"' % (target, value)

        # 2. Inhalt übersetzen
        inner_key = None
        hit = re.search(r'\bdata-i18n="([^"]+)"', new_attrs)
        if hit:
            inner_key = hit.group(1)
            if inner_key not in words:
                missing.append(inner_key)
                inner_key = None

        # 3. Auszeichnungen aus der Ausgabe entfernen
        new_attrs = re.sub(r'\s*\bdata-i18n(?:-\w+)?="[^"]*"', '', new_attrs)
        new_open = '<%s%s>' % (m.group(1), new_attrs)

        if inner_key is not None and tag not in VOID_TAGS:
            close_start, close_end = find_element_end(html, tag, m.end())
            html = html[:m.start()] + new_open + words[inner_key] + html[close_start:]
        else:
            html = html[:m.start()] + new_open + html[m.end():]

    return html, missing


LANG_SWITCH_EN = '''<div class="lang" role="group" aria-label="Lingua / Language">
          <a href="../%s" hreflang="it" lang="it">IT</a>
          <span aria-current="true">EN</span>
        </div>'''


def build_page(source, words):
    it_url, en_url = PAGES[source]
    html = open(os.path.join(ROOT, source), encoding='utf-8').read()

    html, missing = translate(html, words, source)

    # Sprache des Dokuments
    html = html.replace('<html lang="it">', '<html lang="en">', 1)

    # Pfade: die Seite liegt eine Ebene tiefer
    html = re.sub(r'((?:src|href)=")(assets/)', r'\1../\2', html)

    # Sprachumschalter zeigt zurück auf die italienische Fassung
    html = re.sub(r'<div class="lang".*?</div>', LANG_SWITCH_EN % source, html, flags=re.S)

    # Kanonische Adresse und Social-Angaben auf die englische URL drehen
    html = re.sub(r'<link rel="canonical" href="[^"]*">',
                  '<link rel="canonical" href="%s%s">' % (SITE, en_url), html, count=1)
    html = re.sub(r'<meta property="og:url" content="[^"]*">',
                  '<meta property="og:url" content="%s%s">' % (SITE, en_url), html, count=1)
    html = html.replace('<meta property="og:locale" content="it_IT">',
                        '<meta property="og:locale" content="en_GB">\n'
                        '<meta property="og:locale:alternate" content="it_IT">', 1)

    # og:title und og:description tragen keine eigenen Schlüssel — sie
    # übernehmen den bereits übersetzten Seitentitel und die Beschreibung.
    title = re.search(r'<title>(.*?)</title>', html, re.S)
    if title:
        html = re.sub(r'<meta property="og:title" content="[^"]*">',
                      lambda _: '<meta property="og:title" content="%s">'
                                % title.group(1).replace('"', '&quot;'), html, count=1)
    desc = re.search(r'<meta name="description" content="([^"]*)"', html)
    if desc:
        html = re.sub(r'<meta property="og:description" content="[^"]*">',
                      lambda _: '<meta property="og:description" content="%s">'
                                % desc.group(1), html, count=1)

    # Hinweis für alle, die in den Quelltext schauen
    html = html.replace('<head>',
                        '<head>\n<!-- Automatisch erzeugt aus %s + i18n/en.json '
                        '(python3 build.py). Nicht direkt bearbeiten. -->' % source, 1)

    os.makedirs(OUT_DIR, exist_ok=True)
    target = os.path.join(OUT_DIR, source)
    open(target, 'w', encoding='utf-8').write(html)
    return target, missing


def build_sitemap():
    entries = []
    for source, (it_url, en_url) in PAGES.items():
        for url, other, lang, other_lang in (
            (it_url, en_url, 'it', 'en'),
            (en_url, it_url, 'en', 'it'),
        ):
            entries.append(
                '  <url>\n'
                '    <loc>{site}{url}</loc>\n'
                '    <xhtml:link rel="alternate" hreflang="{lang}" href="{site}{url}"/>\n'
                '    <xhtml:link rel="alternate" hreflang="{other_lang}" href="{site}{other}"/>\n'
                '    <xhtml:link rel="alternate" hreflang="x-default" href="{site}{it}"/>\n'
                '  </url>'.format(site=SITE, url=url, other=other, lang=lang,
                                  other_lang=other_lang, it=it_url))
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
           '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + '\n'.join(entries) + '\n</urlset>\n')
    open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write(xml)
    return len(entries)


def main():
    words = json.load(open(os.path.join(ROOT, 'i18n', 'en.json'), encoding='utf-8'))
    all_missing = []

    for source in PAGES:
        target, missing = build_page(source, words)
        all_missing += missing
        print('  %-42s %6d Bytes' % (os.path.relpath(target, ROOT), os.path.getsize(target)))

    count = build_sitemap()
    print('  %-42s %6d URLs' % ('sitemap.xml', count))

    if all_missing:
        print('\nFehlende Übersetzungen in i18n/en.json:')
        for key in sorted(set(all_missing)):
            print('  -', key)
        return 1

    print('\nFertig. %d Schlüssel übersetzt.' % len(words))
    return 0


if __name__ == '__main__':
    sys.exit(main())
