# Supabase OAuth Setup – Manuelle Konfiguration

> ⚠️ **Wichtig:** Diese Schritte musst du manuell im Supabase Dashboard durchführen.
> Der Code verwendet `window.location.origin` dynamisch – es gibt keine hartcodierten
> localhost-URLs im Quellcode. Das Problem liegt in der Supabase-Konfiguration.

---

## 1. Supabase Dashboard → Authentication → URL Configuration

| Feld | Wert |
|---|---|
| **Site URL** | `https://i-land1o1.com` |
| **Redirect URLs** (Allowlist) | `https://i-land1o1.com/*` |
| | `http://localhost:3000/*` (für lokale Entwicklung) |

**Ohne diese Einträge** fällt Supabase nach dem OAuth-Login immer auf die
hinterlegte Site URL zurück, egal was der Code als `redirectTo` übergibt.

---

## 2. Google Cloud Console – Authorized Redirect URIs

Füge folgende URI in der Google Cloud Console hinzu:

```
https://hxrennghicphbzfcxcwd.supabase.co/auth/v1/callback
```

---

## 3. Supabase Dashboard → Authentication → Providers → Google

Stelle sicher, dass:

- **Enabled** = ON
- **Client ID** und **Client Secret** korrekt eingetragen sind (aus Google Cloud Console)

---

## 4. Lokaler Test

Nachdem die URLs oben konfiguriert sind:

```bash
pnpm run dev
```

Browser öffnen → `http://localhost:3000/#/login` → "Continue with Google" klicken

Nach erfolgreichem Login solltest du auf `http://localhost:3000/#/dashboard` landen.

---

## 5. Produktiv-Test

Nach dem Deployment auf Hostinger:

```
https://i-land1o1.com/#/login
```

→ "Continue with Google" klicken → sollte auf `https://i-land1o1.com/#/dashboard` landen.

---

## Code-Referenz: Wie die redirectTo-URL gebaut wird

**`client/src/components/SocialLogin.tsx`** (Zeile 46):
```ts
const redirectUrl = `${window.location.origin}/#/login`;
```

**`client/src/const.ts`** (Zeile 7):
```ts
const redirectUri = `${window.location.origin}/api/oauth/callback`;
```

Beide verwenden `window.location.origin` – die URL wird **immer dynamisch**
zur Laufzeit gebildet, abhängig von der aktuellen Domain. Kein hartcodierter
localhost im Code.