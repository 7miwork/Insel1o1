/**
 * Test-Accounts erstellen
 *
 * Erstellt Schüler, Teacher und Parent-Test-User in Supabase Auth
 * mit Klassen- und Eltern-Kind-Verknüpfungen fürrealistische Tests.
 *
 * VORAUSSETZUNG:
 *   SUPABASE_SERVICE_ROLE_KEY muss in der .env Datei gesetzt sein!
 *
 * AUSFÜHRUNG:
 *   pnpm run create-test-accounts
 */

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env laden
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY müssen in .env gesetzt sein.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const PASSWORD = "Test1234!";

// ── Test-Daten ──
const STUDENTS = [
  { email: "test.student1@insel1o1.test", firstName: "Student", lastName: "Eins" },
  { email: "test.student2@insel1o1.test", firstName: "Student", lastName: "Zwei" },
  { email: "test.student3@insel1o1.test", firstName: "Student", lastName: "Drei" },
  { email: "test.student4@insel1o1.test", firstName: "Student", lastName: "Vier" },
  { email: "test.student5@insel1o1.test", firstName: "Student", lastName: "Fünf" },
  { email: "test.student6@insel1o1.test", firstName: "Student", lastName: "Sechs" },
];

const TEACHERS = [
  { email: "test.teacher1@insel1o1.test", firstName: "Teacher", lastName: "Eins" },
  { email: "test.teacher2@insel1o1.test", firstName: "Teacher", lastName: "Zwei" },
];

const PARENTS = [
  { email: "test.parent0@insel1o1.test", firstName: "Parent", lastName: "Null" },
  { email: "test.parent1@insel1o1.test", firstName: "Parent", lastName: "Eins" },
  { email: "test.parent2@insel1o1.test", firstName: "Parent", lastName: "Zwei" },
  { email: "test.parent3@insel1o1.test", firstName: "Parent", lastName: "Drei" },
];

async function createUser(email: string, firstName: string, lastName: string, role: string): Promise<string | null> {
  // Prüfen, ob User bereits existiert
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    console.log(`  ⏭️  ${email} existiert bereits (ID: ${existing.id})`);
    // Rolle sicherstellen
    await supabase.from("profiles").update({ role, first_name: firstName, last_name: lastName }).eq("id", existing.id);
    return existing.id;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { role, first_name: firstName, last_name: lastName },
  });

  if (error) {
    console.error(`  ❌ Fehler beim Erstellen von ${email}:`, error.message);
    return null;
  }

  const userId = data.user!.id;
  console.log(`  ✅ ${email} erstellt (ID: ${userId})`);

  // Warten auf Trigger
  await new Promise((r) => setTimeout(r, 500));

  // Rolle explizit setzen
  const { error: updateError } = await supabase
    .from("profiles")
    .upsert({ id: userId, email, role, first_name: firstName, last_name: lastName }, { onConflict: "id" });

  if (updateError) {
    console.log(`  ⚠️  Profile-Update: ${updateError.message}`);
  }

  return userId;
}

async function createClass(name: string, teacherId: string, courseId?: string) {
  // Zuerst prüfen, ob Klasse mit diesem Namen + teacher_id bereits existiert
  const { data: existing } = await supabase
    .from("classes")
    .select("id")
    .eq("name", name)
    .eq("teacher_id", teacherId)
    .single();

  if (existing) {
    console.log(`  ⏭️  Klasse "${name}" existiert bereits (ID: ${existing.id})`);
    return existing.id;
  }

  const { data, error } = await supabase
    .from("classes")
    .insert({ name, teacher_id: teacherId, course_id: courseId || null })
    .select("id")
    .single();

  if (error) {
    if (error.message.includes("does not exist") || error.code === "42P01") {
      console.log(`  ⏭️  classes-Tabelle nicht vorhanden, überspringe Klasse "${name}"`);
      return null;
    }
    console.error(`  ❌ Fehler beim Erstellen von Klasse "${name}":`, error.message);
    return null;
  }

  console.log(`  ✅ Klasse "${name}" erstellt (ID: ${data.id})`);
  return data.id;
}

async function addStudentToClass(classId: string, studentId: string) {
  const { error } = await supabase
    .from("class_students")
    .upsert(
      { class_id: classId, student_id: studentId },
      { onConflict: "class_id,student_id", ignoreDuplicates: true }
    );

  if (error) {
    // Falls Tabelle nicht existiert, stillschweigend überspringen
    const msg = error.message || "";
    if (msg.includes("does not exist") || error.code === "42P01") {
      return null;
    }
    console.error(`  ❌ Fehler beim Hinzufügen von Student ${studentId} zu Klasse ${classId}:`, error.message);
    return null;
  }

  console.log(`  ✅ Student ${studentId} zu Klasse ${classId} hinzugefügt`);
  return classId;
}

async function linkParentChild(parentId: string, childId: string) {
  const { error } = await supabase
    .from("parent_child_links")
    .upsert(
      { parent_id: parentId, child_id: childId },
      { onConflict: "parent_id,child_id", ignoreDuplicates: true }
    );

  if (error) {
    const msg = error.message || "";
    if (msg.includes("does not exist") || error.code === "42P01") {
      console.log(`  ⏭️  parent_child_links-Tabelle nicht vorhanden, überspringe Verknüpfung`);
      return;
    }
    console.error(`  ❌ Fehler beim Verknüpfen Parent ${parentId} → Child ${childId}:`, error.message);
    return;
  }

  console.log(`  ✅ Parent ${parentId} → Child ${childId} verknüpft`);
}

async function addProgressEntries(userId: string, lessonIds: string[]) {
  const entries = lessonIds.map((lessonId, idx) => ({
    user_id: userId,
    lesson_id: lessonId,
    completed: true,
    score: Math.floor(Math.random() * 30) + 70, // 70-100
    completed_at: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
  }));

  const { error } = await supabase
    .from("student_progress")
    .upsert(entries, { onConflict: "user_id,lesson_id", ignoreDuplicates: true });

  if (error) {
    const msg = error.message || "";
    if (msg.includes("does not exist") || error.code === "42P01") {
      console.log(`  ⏭️  student_progress-Tabelle nicht vorhanden, überspringe Testdaten`);
      return;
    }
    console.error(`  ❌ Fehler beim Hinzufügen von Progress für ${userId}:`, error.message);
    return;
  }

  console.log(`  ✅ Progress für ${userId} angelegt (${entries.length} Einträge)`);
}

async function main() {
  console.log("=".repeat(60));
  console.log("  Test-Accounts erstellen");
  console.log("=".repeat(60));
  console.log();

  // ── 1) User erstellen ──
  console.log("📌 Schritt 1: Schüler erstellen");
  const studentIds: string[] = [];
  for (const s of STUDENTS) {
    const id = await createUser(s.email, s.firstName, s.lastName, "student");
    if (id) studentIds.push(id);
  }

  console.log("\n📌 Schritt 2: Teacher erstellen");
  const teacherIds: string[] = [];
  for (const t of TEACHERS) {
    const id = await createUser(t.email, t.firstName, t.lastName, "teacher");
    if (id) teacherIds.push(id);
  }

  console.log("\n📌 Schritt 3: Parents erstellen");
  const parentIds: string[] = [];
  for (const p of PARENTS) {
    const id = await createUser(p.email, p.firstName, p.lastName, "parent");
    if (id) parentIds.push(id);
  }

  // ── 2) Kurs suchen ──
  console.log("\n📌 Schritt 4: Suche ersten Kurs für Klassen-Verknüpfung");
  const { data: courses } = await supabase.from("courses").select("id").limit(1);
  const courseId = courses?.[0]?.id;
  console.log(`  ${courseId ? `Kurs gefunden: ${courseId}` : "Kein Kurs gefunden, Klassen werden ohne course_id erstellt"}`);

  // ── 3) Klassen erstellen ──
  console.log("\n📌 Schritt 5: Klassen erstellen");
  let classAId: string | null = null;
  let classBId: string | null = null;
  let classCId: string | null = null;

  if (teacherIds.length > 0) {
    const t1 = teacherIds[0];
    const t2 = teacherIds[1] || null;

    const a = await createClass("Klasse A", t1, courseId);
    const b = await createClass("Klasse B", t1, courseId);
    const c = t2 ? await createClass("Klasse C", t2, courseId) : null;

    classAId = a;
    classBId = b;
    classCId = c;
  }

  // ── 4) Schüler zu Klassen hinzufügen ──
  console.log("\n📌 Schritt 6: Schüler zu Klassen hinzufügen");
  if (classAId && studentIds[0]) await addStudentToClass(classAId, studentIds[0]);
  if (classAId && studentIds[1]) await addStudentToClass(classAId, studentIds[1]);
  if (classAId && studentIds[2]) await addStudentToClass(classAId, studentIds[2]);
  if (classBId && studentIds[3]) await addStudentToClass(classBId, studentIds[3]);
  if (classCId && studentIds[4]) await addStudentToClass(classCId, studentIds[4]);
  if (classCId && studentIds[5]) await addStudentToClass(classCId, studentIds[5]);

  // ── 5) Eltern-Kind-Verknüpfungen ──
  console.log("\n📌 Schritt 7: Eltern-Kind-Verknüpfungen erstellen");
  if (parentIds[1] && studentIds[0]) await linkParentChild(parentIds[1], studentIds[0]);
  if (parentIds[2] && studentIds[0]) await linkParentChild(parentIds[2], studentIds[0]);
  if (parentIds[2] && studentIds[1]) await linkParentChild(parentIds[2], studentIds[1]);
  if (parentIds[3] && studentIds[2]) await linkParentChild(parentIds[3], studentIds[2]);
  if (parentIds[3] && studentIds[3]) await linkParentChild(parentIds[3], studentIds[3]);
  if (parentIds[3] && studentIds[4]) await linkParentChild(parentIds[3], studentIds[4]);

  // ── 6) Test-Progress-Einträge ──
  console.log("\n📌 Schritt 8: Test-Progress für student1-student4 anlegen");
  // Lektionen aus seed.sql: d0000000-0000-0000-0000-000000000001 bis d0000000-0000-0000-0000-000000000006
  const lessonIds = [
    "d0000000-0000-0000-0000-000000000001",
    "d0000000-0000-0000-0000-000000000002",
    "d0000000-0000-0000-0000-000000000003",
  ];

  if (studentIds[0]) await addProgressEntries(studentIds[0], lessonIds);
  if (studentIds[1]) await addProgressEntries(studentIds[1], lessonIds.slice(0, 2));
  if (studentIds[2]) await addProgressEntries(studentIds[2], lessonIds);
  if (studentIds[3]) await addProgressEntries(studentIds[3], lessonIds.slice(0, 2));

  // ── Zusammenfassung ──
  console.log("\n" + "=".repeat(60));
  console.log("  ✅ FERTIG");
  console.log("=".repeat(60));
  console.log(`  Schüler:       ${studentIds.length} erstellt/verwendet`);
  console.log(`  Teacher:       ${teacherIds.length} erstellt/verwendet`);
  console.log(`  Parents:       ${parentIds.length} erstellt/verwendet`);
  console.log(`  Klassen:       ${[classAId, classBId, classCId].filter(Boolean).length} angelegt`);
  console.log(`  Verknüpfungen: class_students + parent_child_links`);
  console.log("=".repeat(60));
  console.log("\n🔐 Login-Daten (Passwort für alle: Test1234!):");
  console.log("   Schüler:  test.student1@insel1o1.test");
  console.log("   Teacher:  test.teacher1@insel1o1.test");
  console.log("   Parent:   test.parent1@insel1o1.test");
  console.log("   Admin:    info@i-land1o1.com");
  console.log("=".repeat(60));
}

main().catch((err) => {
  console.error("\n❌ Unerwarteter Fehler:", err);
  process.exit(1);
});