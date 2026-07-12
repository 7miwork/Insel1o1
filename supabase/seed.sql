-- ============================================================
-- Insel1o1 - Seed-Daten für die Lernplattform
-- ============================================================
-- Ausführung: Dieses SQL in den Supabase SQL Editor einfügen
-- und ausführen, NACHDEM schema.sql bereits ausgeführt wurde.
-- ============================================================

-- ============================================================
-- 1. COURSES (Kurse mit Piraten-Thema)
-- ============================================================
INSERT INTO public.courses (id, title, description, category, level, published) VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Mystical Waters',
    'Eine geheimnisvolle Reise durch die Gewässer der Programmierung. Lerne die Grundlagen des Codens in einer magischen Welt voller Herausforderungen.',
    'Programming Basics',
    'beginner',
    true
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Sturm der Algorithmen',
    'Trotze den Wellen komplexer Algorithmen und meistere fortgeschrittene Konzepte. Nur die mutigsten Piraten bestehen diesen Kurs!',
    'Algorithms',
    'intermediate',
    true
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'Schatzinsel Datenbanken',
    'Tauche ein in die Welt der Datenbanken. Lerne Daten zu speichern, zu filtern und zu analysieren wie ein echter Schatzsucher.',
    'Databases',
    'intermediate',
    true
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. LESSONS (Lektionen = Inseln innerhalb der Kurse)
-- ============================================================
-- Mystical Waters (6 Lektionen)
INSERT INTO public.lessons (id, course_id, title, content, order_index, duration_min) VALUES
  (
    'd0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Island 1: Anlegestelle - Erste Schritte',
    'Willkommen auf der ersten Insel! Lerne die grundlegenden Konzepte und mache dich bereit für das Abenteuer.',
    1, 15
  ),
  (
    'd0000000-0000-0000-0000-000000000002',
    'c0000000-0000-0000-0000-000000000001',
    'Island 2: Der Leuchtturm - Variablen & Typen',
    'Entdecke den Leuchtturm der Variablen. Hier lernst du, wie Daten gespeichert und verwaltet werden.',
    2, 20
  ),
  (
    'd0000000-0000-0000-0000-000000000003',
    'c0000000-0000-0000-0000-000000000001',
    'Island 3: Die Bucht der Bedingungen',
    'In dieser Bucht entscheiden Bedingungen über deinen Weg. Lerne if-else und switch-Anweisungen.',
    3, 25
  ),
  (
    'd0000000-0000-0000-0000-000000000004',
    'c0000000-0000-0000-0000-000000000001',
    'Island 4: Das Labyrinth der Schleifen',
    'Verirre dich im Labyrinth der Schleifen! Hier meisterst du for- und while-Schleifen.',
    4, 30
  ),
  (
    'd0000000-0000-0000-0000-000000000005',
    'c0000000-0000-0000-0000-000000000001',
    'Island 5: Der Tempel der Funktionen',
    'Der alte Tempel birgt die Geheimnisse der Funktionen. Lerne, Code wiederzuverwenden und zu strukturieren.',
    5, 25
  ),
  (
    'd0000000-0000-0000-0000-000000000006',
    'c0000000-0000-0000-0000-000000000001',
    'Island 6: Die Schatzkammer - Projektabschluss',
    'Herzlichen Glückwunsch! In der finalen Schatzkammer setzt du alles Gelernte in einem großen Projekt um.',
    6, 40
  )
ON CONFLICT (id) DO NOTHING;

-- Sturm der Algorithmen (4 Lektionen)
INSERT INTO public.lessons (id, course_id, title, content, order_index, duration_min) VALUES
  (
    'd0000000-0000-0000-0000-000000000007',
    'c0000000-0000-0000-0000-000000000002',
    'Klippe der Sortierung',
    'Erkunde verschiedene Sortieralgorithmen und finde heraus, welcher der schnellste ist.',
    1, 30
  ),
  (
    'd0000000-0000-0000-0000-000000000008',
    'c0000000-0000-0000-0000-000000000002',
    'Die Rekursions-Riff',
    'Ein gefährliches Riff, das nur mit rekursiven Denken zu umschiffen ist.',
    2, 35
  ),
  (
    'd0000000-0000-0000-0000-000000000009',
    'c0000000-0000-0000-0000-000000000002',
    'Graph-Dschungel',
    'Navigiere durch den dichten Dschungel der Graphen und lerne BFS und DFS.',
    3, 40
  ),
  (
    'd0000000-0000-0000-0000-000000000010',
    'c0000000-0000-0000-0000-000000000002',
    'Optimierungs-Oase',
    'Optimiere deine Algorithmen für maximale Performance.',
    4, 30
  )
ON CONFLICT (id) DO NOTHING;

-- Schatzinsel Datenbanken (3 Lektionen)
INSERT INTO public.lessons (id, course_id, title, content, order_index, duration_min) VALUES
  (
    'd0000000-0000-0000-0000-000000000011',
    'c0000000-0000-0000-0000-000000000003',
    'Die Schatzkarte - ER-Modelle',
    'Lerne, wie du Datenstrukturen mit Entity-Relationship-Modellen entwirfst.',
    1, 25
  ),
  (
    'd0000000-0000-0000-0000-000000000012',
    'c0000000-0000-0000-0000-000000000003',
    'Der Kompass - SQL Queries',
    'Mit SQL-Queries wie einem Kompass navigierst du durch deine Datenbank.',
    2, 35
  ),
  (
    'd0000000-0000-0000-0000-000000000013',
    'c0000000-0000-0000-0000-000000000003',
    'Der verborgene Hafen - Indexing & Performance',
    'Entdecke, wie Indizes und Optimierungen deine Datenbank blitzschnell machen.',
    3, 30
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 3. ACHIEVEMENTS (Errungenschaften / Schätze)
-- ============================================================
INSERT INTO public.achievements (id, title, description, icon_url, xp_reward, criteria) VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    'First Steps',
    'Schließe deine erste Lektion ab',
    '🗺️',
    100,
    '{"type": "lessons_completed", "count": 1, "rarity": "common"}'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'Sea Master',
    'Schließe 3 Lektionen in einem Kurs ab',
    '⚓',
    250,
    '{"type": "lessons_completed", "count": 3, "rarity": "uncommon"}'
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'Legendary Sailor',
    'Schließe einen gesamten Kurs ab',
    '🏴‍☠️',
    500,
    '{"type": "course_completed", "count": 1, "rarity": "rare"}'
  ),
  (
    'a0000000-0000-0000-0000-000000000004',
    'Treasure Hunter',
    'Sammle 500 XP',
    '💎',
    200,
    '{"type": "xp_total", "count": 500, "rarity": "legendary"}'
  ),
  (
    'a0000000-0000-0000-0000-000000000005',
    'Navigator',
    'Erreiche Level 3',
    '🧭',
    150,
    '{"type": "level", "count": 3, "rarity": "uncommon"}'
  ),
  (
    'a0000000-0000-0000-0000-000000000006',
    'Code Pirate',
    'Schließe 5 Quizze erfolgreich ab',
    '🦜',
    300,
    '{"type": "quizzes_passed", "count": 5, "rarity": "rare"}'
  )
ON CONFLICT (id) DO NOTHING;