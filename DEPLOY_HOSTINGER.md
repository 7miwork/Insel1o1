# Deploy auf Hostinger Static Hosting (public_html)

## Wichtiger Hinweis zum Backend

Dieses Projekt enthält einen **Express-Backend-Server** (`server/index.ts`), der für **Dynamic Hosting** gedacht ist (z.B. Node.js-Hoster, VPS, Docker).

**Hostinger Static Hosting (`public_html`) unterstützt KEIN Node.js/Express.**

Die gute Nachricht: Der Express-Server macht in diesem Projekt fast nichts außer statische Dateien auszuliefern und SPA-Routing per Fallback zu `index.html` zu ermöglichen. Beides kann Hostinger Static Hosting ebenfalls — mit der richtigen Konfiguration.

## Build für Hostinger erstellen

```bash
cd I-Land1o1
pnpm run build:hostinger
```

Dies erstellt im Ordner `dist/` die fertige statische Website mit korrekten Asset-Pfaden für die Root-Domain.

## Was hochgeladen werden muss

**Zielordner auf Hostinger:** `public_html/`

**Lokaler Quellordner:** `dist/`

### Upload-Schritte:

1. Erstelle lokal einen Build: `pnpm run build:hostinger`
2. Verbinde dich mit dem Hostinger-FTP oder dem Dateimanager
3. Navigiere zu `public_html/` auf dem Server
4. Lösche alle bestehenden Dateien in `public_html/` (außer evtl. gewünschten Eigenen Dateien)
5. Lade **alle Inhalte von `dist/`** (nicht den Ordner `dist/` selbst, sondern dessen Inhalt) nach `public_html/` hoch:
   - `index.html`
   - `assets/` (Ordner mit JS/CSS)
   - `.htaccess`
   - `404.html`
   - alle weiteren Dateien aus `dist/`

## Was die `.htaccess` macht

Die Datei `public/.htaccess` sorgt dafür, dass:
- Bestehende Dateien und Ordner normal ausgeliefert werden
- Alle anderen Anfragen (z.B. `/world/coding`) auf `index.html` umgeleitet werden → SPA-Routing funktioniert auch bei Direktaufrufen und Reloads

## Funktionsprüfung

Nach dem Upload:
- https://i-land1o1.com/ → Startseite
- https://i-land1o1.com/world → Weltkarte
- https://i-land1o1.com/world/coding → Fach-Ansicht
- Direktaufrufe und Reloads auf Unterseiten liefern keine 404 mehr

## Alternativen, falls du Express-Funktionen brauchst

Falls die App später echte Backend-Features (API, Auth, Datenbank) benötigt, bietet Hostinger auch **Dynamic Hosting** mit Node.js-Unterstützung an. Dann müsste der `server/index.ts` deployt und konfiguriert werden. 
