/**
 * Admin-Account erstellen
 *
 * Erstellt einen Admin-Benutzer direkt in Supabase Auth mit verknüpftem
 * profiles-Eintrag (role='admin').
 *
 * VORAUSSETZUNG:
 *   SUPABASE_SERVICE_ROLE_KEY muss in der .env Datei gesetzt sein!
 *   (Hol dir den Key aus dem Supabase Dashboard: Project Settings → API →
 *   service_role key)
 *
 * AUSFÜHRUNG:
 *   pnpm run create-admin
 *
 * Oder mit eigenem Email/Passwort:
 *   EMAIL=admin@example.com PASSWORD=MeinPasswort123 pnpm run create-admin
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env vom Projektroot laden
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

async function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function createAdmin() {
  console.log("=".repeat(50));
  console.log("  Admin-Account erstellen");
  console.log("=".repeat(50));

  // --- Konfiguration ---
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.error("❌ SUPABASE_URL fehlt in der .env Datei.");
    process.exit(1);
  }

  if (!serviceRoleKey) {
    console.error(
      "❌ SUPABASE_SERVICE_ROLE_KEY ist nicht in der .env gesetzt.",
    );
    console.log(
      "\n👉 Hol dir den Service Role Key aus dem Supabase Dashboard:",
    );
    console.log("   Project Settings → API → service_role key");
    console.log("   und trage ihn in der .env Datei ein:");
    console.log("   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJ...");
    process.exit(1);
  }

  // --- Admin-Client erstellen (umgeht RLS) ---
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // --- Email und Passwort einlesen ---
  const emailInput = process.env.EMAIL || (await askQuestion("Email: "));
  let passwordInput =
    process.env.PASSWORD || (await askQuestion("Passwort: "));

  if (!emailInput || !passwordInput) {
    console.error("❌ Email und Passwort sind erforderlich.");
    process.exit(1);
  }

  // Passwort-Mindestanforderungen prüfen
  if (passwordInput.length < 6) {
    console.error("❌ Passwort muss mindestens 6 Zeichen lang sein.");
    process.exit(1);
  }

  console.log(`\n📧 Email: ${emailInput}`);
  console.log(`🔑 Passwort: ${"*".repeat(passwordInput.length)}`);
  console.log("\n🚀 Erstelle Admin-Account...");

  try {
    // --- Admin-Benutzer in auth.users anlegen ---
    const { data: userData, error: createError } =
      await supabase.auth.admin.createUser({
        email: emailInput,
        password: passwordInput,
        email_confirm: true,
        user_metadata: {
          role: "admin",
          first_name: "Admin",
        },
      });

    if (createError) {
      console.error(`\n❌ Fehler beim Erstellen des Users: ${createError.message}`);
      if (createError.message.includes("already registered")) {
        console.log("⚠️  Die Email ist bereits registriert.");
        console.log("   Möchtest du stattdessen den bestehenden User auf admin aktualisieren?");
        const answer = await askQuestion("   (y/n): ");
        if (answer.toLowerCase() === "y") {
          // Bestehenden User per Email suchen
          const { data: existingUsers } = await supabase
            .from("profiles")
            .select("id, email, role")
            .eq("email", emailInput)
            .single();

          if (existingUsers) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ role: "admin" })
              .eq("id", existingUsers.id);

            if (updateError) {
              console.error(`❌ Fehler beim Aktualisieren: ${updateError.message}`);
            } else {
              console.log(`✅ Bestehender User (${existingUsers.id}) auf role='admin' aktualisiert.`);
            }
          } else {
            console.log("⚠️  Kein profiles-Eintrag gefunden für diese Email.");
          }
        }
      }
      process.exit(1);
    }

    const userId = userData.user!.id;
    console.log(`✅ User erstellt mit ID: ${userId}`);

    // --- Kurz warten, damit der Trigger feuern kann ---
    console.log("⏳ Warte auf Trigger (profiles-Eintrag)...");
    await new Promise((r) => setTimeout(r, 1000));

    // --- Prüfen, ob profiles-Eintrag existiert und Rolle korrekt ist ---
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, first_name, last_name, email")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.log(
        `ℹ️  profiles-Eintrag nicht automatisch gefunden: ${profileError.message}`,
      );
      console.log("📝 Erstelle profiles-Eintrag manuell...");

      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        email: emailInput,
        first_name: "Admin",
        last_name: "",
        role: "admin",
      });

      if (insertError) {
        console.error(`❌ Fehler beim manuellen Erstellen: ${insertError.message}`);
        process.exit(1);
      }
      console.log("✅ profiles-Eintrag manuell erstellt.");
    } else if (profile.role !== "admin") {
      console.log(
        `ℹ️  Rolle ist '${profile.role}' statt 'admin'. Aktualisiere...`,
      );

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", userId);

      if (updateError) {
        console.error(`❌ Fehler beim Aktualisieren: ${updateError.message}`);
        process.exit(1);
      }
      console.log("✅ Rolle auf 'admin' aktualisiert.");
    } else {
      console.log("✅ profiles-Eintrag vorhanden mit korrekter Rolle 'admin'.");
    }

    // --- Erfolgsmeldung ---
    console.log("\n" + "=".repeat(50));
    console.log("  ✅ ADMIN-ACCOUNT ERFOLGREICH ERSTELLT");
    console.log("=".repeat(50));
    console.log(`  User-ID:     ${userId}`);
    console.log(`  Email:       ${emailInput}`);
    console.log(`  Rolle:       admin`);
    console.log(`  Status:      email_confirm = true`);
    console.log("=".repeat(50));
    console.log("\n🔐 Du kannst dich jetzt mit diesen Daten einloggen.");
  } catch (err) {
    console.error("\n❌ Unerwarteter Fehler:", err);
    process.exit(1);
  }
}

createAdmin();