/**
 * Supabase Verbindungstest
 *
 * Führe diesen Test aus mit:
 *   npx tsx scripts/test-supabase-connection.ts
 *
 * Alternative (PowerShell):
 *   pnpm tsx scripts/test-supabase-connection.ts
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env vom Projektroot laden
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

async function testConnection() {
  console.log("🔌 Supabase Verbindungstest");
  console.log("=" .repeat(40));

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Fehler: Supabase URL oder Anon Key fehlt in der .env Datei.");
    console.log("\nStelle sicher, dass folgende Variablen in der .env existieren:");
    console.log("  VITE_SUPABASE_URL=https://hxrennghicphbzfcxcwd.supabase.co");
    console.log("  VITE_SUPABASE_ANON_KEY=eyJhbGci...");
    process.exit(1);
  }

  console.log(`📍 Supabase URL: ${supabaseUrl}`);
  console.log(`🔑 Anon Key: ${supabaseKey.substring(0, 20)}...`);

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test 1: Einfacher Health-Check via auth.getSession()
    console.log("\n📡 Teste Verbindung...");
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error(`⚠️  Session Check Fehler: ${sessionError.message}`);
    } else {
      console.log("✅ Session API erreichbar");
    }

    // Test 2: Versuche auf eine Tabelle zuzugreifen (z.B. profiles)
    console.log("\n📋 Teste Datenbank-Zugriff (profiles)...");
    const { data: profiles, error: dbError } = await supabase
      .from("profiles")
      .select("count", { count: "exact", head: true });

    if (dbError) {
      console.log(`ℹ️  profiles-Tabelle nicht vorhanden oder kein Zugriff: ${dbError.message}`);
      console.log("   (Das ist normal, solange das Schema noch nicht ausgeführt wurde)");
    } else {
      console.log(`✅ profiles-Tabelle erreichbar`);
    }

    // Test 3: Supabase Project-Info prüfen
    console.log("\n🏥 Führe Health-Check durch...");
    const { error: healthError } = await supabase.from("_dummy_check").select("*").limit(1).maybeSingle();

    if (healthError && !healthError.message.includes("relation") && !healthError.message.includes("does not exist")) {
      console.log(`⚠️  Health-Check Hinweis: ${healthError.message}`);
    } else {
      console.log("✅ Supabase ist erreichbar und antwortet");
    }

    console.log("\n" + "=" .repeat(40));
    console.log("✅ TEST ABGESCHLOSSEN");
    console.log("\nNächste Schritte:");
    console.log("1. Führe das Schema aus: Supabase Dashboard -> SQL Editor -> schema.sql einfügen");
    console.log("2. Starte die App: pnpm run dev");
    console.log("3. Verwende supabase.auth.signUp() für Registrierung");

  } catch (err) {
    console.error("\n❌ Verbindung fehlgeschlagen:", err);
    process.exit(1);
  }
}

testConnection();