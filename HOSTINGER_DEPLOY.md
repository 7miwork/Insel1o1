# Hostinger FTP Deploy – Anleitung

## Einrichtung (nur einmal)

### 1. FTP-Zugangsdaten bei Hostinger finden

1. Einloggen auf [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Menü: **Files** → **FTP Accounts**
3. Dort siehst du eine Liste der FTP-Konten. Klicke auf das Konto, das für deine Domain (`I-Land1o1.ch`) zuständig ist.
4. Wichtig für das Deploy-Script:
   - **FTP Hostname** – meist `ftp.I-Land1o1.ch` oder `ftp.1234567.hostinger.com`
   - **Benutzername** – z.B. `u670872482.i-land1o1.com`
   - **Passwort** – das beim Anlegen des FTP-Kontos vergebene Passwort
   - **Port** – standardmäßig `21`

### 2. Erstmaliges Deploy

```bash
cd I-Land1o1
pnpm run deploy:hostinger
```

Das Script fragt dich jetzt interaktiv nach den FTP-Zugangsdaten. Du kannst sie in `.env.ftp` speichern lassen, damit du sie nicht jedes Mal neu eingeben musst. Die Datei liegt lokal und ist durch `.gitignore` vor versehentlichem Committen geschützt.

## Was das Script macht

1. **Production-Build**: Führt `pnpm run build:hostinger` aus – dabei wird `VITE_BASE=/` gesetzt, sodass alle Assets mit Root-Pfaden (`/assets/...`) eingebunden werden. Keine falschen Unterordner-Pfade mehr, keine weiße Seite.
2. **FTP-Verbindung**: Stellt eine FTPS-Verbindung zu Hostinger her.
3. **Clean Slate**: Löscht den gesamten Inhalt von `/public_html/` vor dem Upload, damit keine alten Dateien zurückbleiben.
4. **Upload**: Lädt das gesamte `dist/`-Verzeichnis inkl. `.htaccess` und `404.html` hoch.
5. **Verifikation**: Vergleicht lokal und remote alle Dateien und meldet, falls etwas fehlt.

## Erneutes Deploy

```bash
cd I-Land1o1
pnpm run deploy:hostinger
```

Wenn du `.env.ftp` gespeichert hast, läuft das Script ohne weitere Eingaben durch.

## Wichtige Hinweise

- **.htaccess**: Liegt in `client/public/.htaccess`. Sie sorgt für:
  - SPA-Routing (alle Anfragen werden an `index.html` weitergeleitet)
  - Security-Headers
  - Caching für statische Assets
- **.env.ftp**: Lokale Datei mit FTP-Zugangsdaten, steht in `.gitignore`. Nie committen!
- **Build-Ausgabe**: `dist/` enthält alle fertigen Dateien für den Produktiv-Betrieb.
- **Weiße Seite verhindern**: Der Default-Wert in `vite.config.ts` ist jetzt `"/"`. Das Script erzwingt zusätzlich `VITE_BASE=/`.

## Fehlerbehebung

### `getaddrinfo ENOTFOUND ...`
Prüfe den FTP-Hostnamen. Er darf **kein** `ftp://`-Präfix haben. Richtige Form: `ftp.I-Land1o1.ch` oder die IP-Adresse.

### Weiße Seite nach Upload
1. Öffne die Browser-Konsole (F12) → Tab "Netzwerk" → Neu laden
2. Suche nach 404-Fehlern bei JS-/CSS-Dateien
3. Prüfe, ob die Pfade mit `/assets/...` beginnen (nicht `/I-Land1o1/assets/...`)
4. Erneut deployen mit `pnpm run deploy:hostinger`

### `.env.ftp` neu erstellen
Lösche die Datei `.env.ftp` im Projekt-Root, dann fragt das Script sie beim nächsten Lauf wieder ab.
</parameter>
<task_progress>
- [x] Read vite.config.ts to check base setting
- [x] Fix vite.config.ts default base to "/"
- [x] Update deploy-hostinger.js to set VITE_BASE=/ and add recursive verification
- [x] Check .htaccess existence in public folder
- [x] Add .htaccess for SPA routing and security
- [x] Rebuild and verify dist paths
- [x] Verify client/public files are copied to dist
- [ ] Clean up test .env.ftp with fake credentials
- [ ] Provide summary and usage instructions
</parameter>
</write_to_file>
