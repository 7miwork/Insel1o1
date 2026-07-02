# Hostinger Deployment via GitHub Actions

Dieses Setup deployt die App automatisch nach Hostinger per FTP bei jedem Push auf `main`.

## Voraussetzung

- FTP-Zugang zu Hostinger (siehe unten)
- GitHub Secrets konfiguriert (siehe unten)

## GitHub Secrets eintragen

Repository → Settings → Secrets and variables → Actions → New repository secret

Benötigte Secrets:

| Name | Wert |
|------|------|
| `HOSTINGER_FTP_SERVER` | FTP-Host, z.B. `ftp.i-land1o1.com` oder eine IP-Adresse |
| `HOSTINGER_FTP_USERNAME` | FTP-Benutzername |
| `HOSTINGER_FTP_PASSWORD` | FTP-Passwort |

## FTP-Zugangsdaten in Hostinger finden

1. Hostinger-Login: https://hpanel.hostinger.com
2. Links den Menüpunkt **"Files"** oder **"FTP Accounts"** auswählen
3. Unter **"FTP Accounts"** findest du:
   - **FTP Hostname**: z.B. `ftp.i-land1o1.com` oder `185.199.108.153`
   - **FTP Username**: dein FTP-Benutzer (z.B. `u123456789`)
   - **FTP Password**: das zugehörige Passwort

Alternative:
- Im Hostinger-Dashboard unter **"Home"** → **"FTP Accounts"** → **"Create FTP Account"** oder bestehenden Account bearbeiten

## Was der Workflow macht

1. Checkout des Codes
2. Node.js/pnpm Setup
3. `pnpm install` (Abhängigkeiten)
4. `pnpm run build:hostinger` (Build mit Base-Pfad `/` für Root-Domain)
5. Kopiert `public/.htaccess` nach `dist/.htaccess` für SPA-Routing
6. Lädt den Inhalt von `dist/` per FTP nach `public_html/` auf Hostinger hoch
7. Löscht vorherige Dateien auf Hostinger (`delete-existing: true`)

## Build-Output

Lokal erstellst du den Build mit:
```bash
pnpm run build:hostinger
```

Der Output liegt in `dist/` und enthält:
- `index.html`
- `assets/` (JS/CSS)
- `.htaccess`
- `404.html`

Dieser Ordnerinhalt wird nach `public_html/` auf Hostinger hochgeladen.

## Manuell deployen (wenn Workflow nicht gewünscht)

Lokalen Build erstellen:
```bash
pnpm run build:hostinger
```

Dann per FTP-Client (FileZilla, WinSCP, etc.) den Inhalt von `dist/` nach `public_html/` auf Hostinger hochladen.

## SPA-Routing auf Hostinger

Die `.htaccess` sorgt dafür, dass Direktaufrufe wie `/world/coding` nicht 404 werfen, sondern auf `index.html` umgeleitet werden.