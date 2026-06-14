
export interface CodeBlock {
  name: string;
  description: string;
  example: string;
  icon: string;
}

export interface LessonVideo {
  enabled: boolean;
  title: string;
  description: string;
  provider: '' | 'youtube' | 'peertube' | 'vimeo' | 'mp4';
  url: string;
  thumbnail: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  phase: 'getting-started' | 'loops' | 'conditionals' | 'creative' | 'final-project';
  duration: 60;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  content: string;
  codeBlocks: CodeBlock[];
  studentActivity: string;
  teacherTip: string;
  quiz: QuizQuestion[];
  video?: LessonVideo;
  xpReward: number;
  unlocks?: number[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}


export const MINECRAFT_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Grundlagen der Steuerung',
    description: 'Bevor wir mit Block Coding und Agenten arbeiten, lernst du die wichtigsten Steuerungen in Minecraft Education kennen. Bewege dich sicher durch die Welt, überwinde Hindernisse und orientiere dich mit Koordinaten und Wegmarkierungen.',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Sicher bewegen',
      'Kamera kontrollieren',
      'Hindernisse überwinden',
      'Richtungen verstehen',
      'Koordinaten nutzen',
      'Hinweise in der Welt lesen',
    ],
    content: `
# Grundlagen der Steuerung

## Einführung
Bevor wir mit Block Coding und Agenten arbeiten, lernst du die wichtigsten Steuerungen in Minecraft Education kennen. Bewege dich sicher durch die Welt, überwinde Hindernisse und orientiere dich mit Koordinaten und Wegmarkierungen.

## WASD-Steuerung
Mit den Tasten **W**, **A**, **S** und **D** bewegst du dich in der Minecraft-Welt:
- **W** – Vorwärts (nach vorn)
- **A** – Links (nach links)
- **S** – Rückwärts (nach hinten)
- **D** – Rechts (nach rechts)

Kombiniere die Tasten, um diagonal zu laufen (z. B. W + D für schräg nach rechts vorwärts).

## Springen
Drücke die **Leertaste (Space)**, um zu springen. Springen ist nötig, um über Hindernisse wie Blöcke, Zäune oder Wasser zu gelangen.

## Schleichen
Halte die **Shift-Taste** gedrückt, um zu schleichen. Beim Schleichen:
- Bewegst du dich langsamer
- Fällst du nicht von hohen Kanten
- Kannst du vorsichtig an Rändern gehen

## Bewegung im Raum
Minecraft ist eine 3D-Welt. Du kannst dich in alle Richtungen bewegen:
- **Vorwärts / Rückwärts** auf dem gleichen Niveau
- **Links / Rechts** seitlich
- **Aufwärts** durch Springen oder Treppen
- **Abwärts** durch Abstiege oder Fallgruben

## Kamera kontrollieren
Bewege die **Maus**, um deine Sicht zu drehen. Das ist wichtig, um:
- Deine Umgebung zu erkunden
- Hindernisse rechtzeitig zu sehen
- Wegmarkierungen und Schilder zu finden

## Richtungen und Orientierung
In Minecraft gibt es vier Himmelsrichtungen: **Nord**, **Süd**, **Ost** und **West**. Du kannst deine Richtung anhand der Sonne oder des Kompasses bestimmen. Farbige Wollblöcke und Schilder helfen dir als Wegmarkierungen.

## Koordinaten nutzen
Koordinaten geben die Position in der Welt an. Sie bestehen aus drei Werten:
- **X** – Ost (positive) / West (negativ)
- **Y** – Höhe (wie hoch du bist)
- **Z** – Süd (positive) / Nord (negativ)

Drücke **F3** (Java Edition) oder schaue in den Einstellungen, um die Koordinaten anzuzeigen. Koordinaten helfen dir, Orte wiederzufinden und präzise zu navigieren.

## Aufgabe 1: Parcours der Farben
Folge dem farbigen Wollpfad durch den Parcours. Überwinde alle Hindernisse – Springe über Lücken, klettere über Blöcke und nutze Schleichen, um sicher an engen Stellen vorbeizukommen.

## Aufgabe 2: Schatzsuche
Finde die versteckten Gegenstände mithilfe von Richtungsangaben und Koordinaten. Lese die Hinweise auf den Schildern in der Welt und navigiere präzise zum Ziel.

## Reflexion
Was war schwer? Welche Tasten haben dir am meisten geholfen? Welche Tipps kannst du für die nächste Stunde mitgeben?
`,
    codeBlocks: [],
    studentActivity: `
**Aufgabe 1: Parcours der Farben**
1. Folge dem farbigen Wollpfad durch den Parcours.
2. Überwinde alle Hindernisse – Springe über Lücken, klettere über Blöcke.
3. Nutze Schleichen, um sicher an engen Stellen vorbeizukommen.

**Aufgabe 2: Schatzsuche**
1. Lies die Hinweise auf den Schildern in der Welt.
2. Nutze die angegebenen Richtungen und Koordinaten, um zum versteckten Gegenstand zu navigieren.
3. Finde alle versteckten Items.

**Reflexion im Team:**
Welche Tasten haben dir am meisten geholfen? Welche Schwierigkeiten gab es?
`,
    teacherTip: 'Beginne mit einer kurzen Live-Demo der WASD-Steuerung. Nutze farbige Schilder, um die Koordinaten-Hinweise klar zu markieren. Lasse die Schüler zunächst frei die Steuerung ausprobieren, bevor sie den Parcours starten.',
    quiz: [
      {
        id: 1,
        question: 'Welche Taste wird normalerweise verwendet, um vorwärts zu laufen?',
        options: ['A', 'B', 'W', 'S'],
        correctAnswer: 2,
        explanation: 'Die W-Taste wird für das Vorwärtslaufen verwendet (W = Walk Forward).',
      },
      {
        id: 2,
        question: 'Warum sind Koordinaten hilfreich?',
        options: ['Zum Bauen von Häusern', 'Zum Finden von Orten', 'Zum Ändern von Blöcken', 'Zum Öffnen von Truhen'],
        correctAnswer: 1,
        explanation: 'Koordinaten helfen dir, Orte in der Minecraft-Welt wiederzufinden und präzise zu navigieren.',
      },
      {
        id: 3,
        question: 'Welche Taste wird zum Schleichen verwendet?',
        options: ['Ctrl', 'Alt', 'Shift', 'Tab'],
        correctAnswer: 2,
        explanation: 'Mit der Shift-Taste kannst du dich leise und langsam bewegen (Schleichen).',
      },
      {
        id: 4,
        question: 'Was passiert, wenn du die Leertaste drückst?',
        options: ['Du läufst schneller', 'Du springst', 'Du öffnest dein Inventar', 'Du schleichst'],
        correctAnswer: 1,
        explanation: 'Die Leertaste (Space) wird zum Springen verwendet.',
      },
      {
        id: 5,
        question: 'Was bedeuten die drei Koordinatenwerte X, Y und Z in Minecraft?',
        options: [
          'Breite, Höhe, Tiefe',
          'Ost/West, Höhe, Süd/Nord',
          'Nord, Süd, Ost',
          'Himmelsrichtung, Zeit, Temperatur',
        ],
        correctAnswer: 1,
        explanation: 'X steht für Ost/West, Y für die Höhe und Z für Süd/Nord.',
      },
    ],
    xpReward: 50,
    unlocks: [2],
  },
  {
    id: 2,
    title: 'Einführung in Block Coding',
    description: 'In dieser Lektion lernst du die Grundlagen des Block Codings kennen. Du erfährst, wie Programme aus einzelnen Befehlen aufgebaut werden und wie Minecraft auf deine Blöcke reagiert.',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Block Coding verstehen',
      'Codeblöcke verwenden',
      'Befehle anordnen',
      'Programme starten',
      'Ergebnisse beobachten',
      'Fehler erkennen',
    ],
    content: `
# Einführung in Block Coding

## Was ist Block Coding?
Beim Block Coding setzt du Programme aus einzelnen Bausteinen zusammen – wie mit LEGO-Steinen. Jeder Block steht für einen Befehl, den dein Agent ausführt. So entsteht Schritt für Schritt ein vollständiges Programm.

## Warum Block Coding?
Im Vergleich zu geschriebenem Code ist Block Coding einfacher:
- Du musst keine Syntax lernen (keine Klammern, Semikolons oder Fehlerquellen)
- Du siehst sofort, welche Befehle zusammengehören
- Du kannst Blöcke per Drag & Drop anordnen
- Fehler entstehen eher durch die Logik als durch Tippfehler

## So ist ein Programm aufgebaut
Ein Programm besteht aus einer Folge von Blöcken. Minecraft führt die Blöcke von oben nach unten aus – also genau in der Reihenfolge, in der du sie angeordnet hast.

Beispiel:
\`\`\`
place(GRASS)
move(FORWARD, 1)
place(GRASS)
move(FORWARD, 1)
place(GRASS)
\`\`\`

Dieses Programm legt drei Grasblöcke in einer Reihe.

## Wichtige Befehle
- **move(Richtung, Anzahl)** – Bewege den Agenten vorwärts, rückwärts, links, rechts, hoch oder runter
- **turn(Richtung)** – Drehe den Agenten nach links oder rechts
- **place(Blöcke)** – Lege einen Block vor den Agenten
- **destroy()** – Zerstöre den Block vor dem Agenten

## Programme starten
Sobald du alle Blöcke in der richtigen Reihenfolge angeordnet hast, kannst du dein Programm starten. Der Agent führt dann jeden Befehl nacheinander aus. Beobachte genau, was passiert!

## Fehler erkennen und beheben
Wenn dein Programm nicht das richtige Ergebnis zeigt:
1. Schau dir die Reihenfolge der Blöcke an
2. Prüfe, ob alle Blöcke die richtigen Richtungen haben
3. Überprüfe, ob Blöcke fehlen
4. Teste das Programm Schritt für Schritt

## Aufgabe 1: Mein erstes Programm
Erstelle ein einfaches Programm mit 5 Befehlen: Der Agent soll 3 Blöcke nach vorne legen und dabei jeweils einen Schritt weitergehen.

## Aufgabe 2: Muster legen
Erstelle ein Programm, das ein einfaches Muster erzeugt – zum Beispiel ein Quadrat oder einen Zickzack-Pfad aus verschiedenen Blöcken.

## Aufgabe 3: Fehler finden
Jemand hat ein Fehlerhaftes Programm erstellt. Finde den Fehler und korrigiere ihn, damit der Agent das richtige Ergebnis erzeugt.

## Reflexion
Was ist dir leicht gefallen? Wo gab es Schwierigkeiten? Welche Befehle findest du am nützlichsten?
`,
    codeBlocks: [
      {
        name: 'move',
        description: 'Bewege den Agenten in eine Richtung',
        example: 'move(FORWARD, 3)',
        icon: '🚀',
      },
      {
        name: 'turn',
        description: 'Drehe den Agenten nach links oder rechts',
        example: 'turn(LEFT)',
        icon: '🔄',
      },
      {
        name: 'place',
        description: 'Lege einen Block',
        example: 'place(GRASS)',
        icon: '🧱',
      },
      {
        name: 'destroy',
        description: 'Zerstöre einen Block',
        example: 'destroy()',
        icon: '💥',
      },
    ],
    studentActivity: `
**Aufgabe 1: Mein erstes Programm**
1. Erstelle ein Programm mit 5 Befehlen.
2. Der Agent soll 3 Blöcke nach vorne legen und dabei jeweils einen Schritt weitergehen.
3. Starte das Programm und beobachte das Ergebnis.

**Aufgabe 2: Muster legen**
1. Erstelle ein Programm, das ein einfaches Muster erzeugt.
2. Probiere ein Quadrat oder einen Zickzack-Pfad aus verschiedenen Blöcken.
3. Teste dein Programm und passe die Befehle an.

**Aufgabe 3: Fehler finden**
1. Finde den Fehler in einem vorgegebenen Programm.
2. Korrigiere den Fehler, damit der Agent das richtige Ergebnis erzeugt.

**Reflexion im Team:**
Was ist dir leicht gefallen? Wo gab es Schwierigkeiten? Welche Befehle findest du am nützlichsten?
`,
    teacherTip: 'Beginne damit, Block Coding anhand eines einfachen Beispiels zu demonstrieren. Lasse die Schüler zuerst frei experimentieren, bevor sie die strukturierten Aufgaben bearbeiten. Betone die Bedeutung der Reihenfolge der Blöcke.',
    quiz: [
      {
        id: 1,
        question: 'Was ist ein Block im Block Coding?',
        options: ['Ein Minecraft-Haus', 'Ein Baustein eines Programms', 'Ein Werkzeug', 'Ein Gegenstand'],
        correctAnswer: 1,
        explanation: 'Ein Block ist ein Baustein eines Programms. Jede(r) Block steht für einen einzelnen Befehl.',
      },
      {
        id: 2,
        question: 'In welcher Reihenfolge führt Minecraft die Blöcke aus?',
        options: ['Zufällig', 'Von unten nach oben', 'Von oben nach unten', 'Gleichzeitig'],
        correctAnswer: 2,
        explanation: 'Minecraft führt die Blöcke von oben nach unten aus – also in der Reihenfolge, in der du sie angeordnet hast.',
      },
      {
        id: 3,
        question: 'Was macht der Befehl move(FORWARD, 3)?',
        options: ['Den Agenten 3 Blöcke nach vorne bewegen', '3 Blöcke nach vorne legen', 'Den Agenten nach links drehen', '3 Schritte zurückgehen'],
        correctAnswer: 0,
        explanation: 'move(FORWARD, 3) bewegt den Agenten 3 Blöcke in die angegebene Richtung.',
      },
      {
        id: 4,
        question: 'Warum ist Block Coding einfacher als geschriebener Code?',
        options: [
          'Es ist schneller auszuführen',
          'Man braucht keine Tastatur',
          'Man braucht keine Syntax zu lernen',
          'Es ist nur für Experten',
        ],
        correctAnswer: 2,
        explanation: 'Beim Block Coding musst du keine Syntax lernen – keine Klammern, Semikolons oder Tippfehler.',
      },
      {
        id: 5,
        question: 'Was solltest du tun, wenn dein Programm nicht das richtige Ergebnis zeigt?',
        options: [
          'Das Programm löschen',
          'Die Reihenfolge der Blöcke prüfen',
          'Einen anderen Computer verwenden',
          'Minecraft neu starten',
        ],
        correctAnswer: 1,
        explanation: 'Prüfe zuerst die Reihenfolge der Blöcke – oft liegt der Fehler in der falschen Anordnung.',
      },
    ],
    xpReward: 50,
    unlocks: [3],
  },
  {
    id: 3,
    title: 'Der Agent und seine ersten Befehle',
    description: 'Lerne deinen ersten programmierbaren Helfer kennen – den Agenten. Entdecke, wie du ihm Befehle gibst und wie er Blöcke in der Welt platziert und bewegt.',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Den Agenten kennenlernen',
      'Agentenbefehle verstehen',
      'Erste Befehle ausführen',
      'Bewegungen steuern',
      'Ergebnisse beobachten',
      'Fehler erkennen',
    ],
    content: `
# Der Agent und seine ersten Befehle

## Wer ist der Agent?
Der Agent ist ein kleiner, programmierbarer Roboter in Minecraft Education. Er steht neben dir in der Welt und kann Befehle ausführen, die du ihm gibst. Wie ein treuer Helfer baut, bewegt und zerstört er Blöcke genau nach deinen Anweisungen.

## Warum ist der Agent wichtig?
Im weiteren Verlauf des Kurses wirst du dem Agenten komplexere Aufgaben übertragen – wie das automatische Bauen von Straßen, das Sammeln von Ressourcen oder das Erkunden der Umgebung. In dieser Lektion lernst du die Grundbefehle, die dafür die Basis bilden.

## So arbeitest du mit dem Agenten
1. **Agenten spawnen** – Rufe den Agenten in die Nähe deines Spielers
2. **Befehle programmieren** – Setze Befehlsblöcke zusammen
3. **Programm ausführen** – Der Agent führt deine Befehle der Reihe nach aus
4. **Ergebnis beobachten** – Schau dir an, was der Agent gebaut oder verändert hat

## Die wichtigsten Befehle

### Bewegung
- **move(FORWARD, Anzahl)** – Der Agent bewegt sich vorwärts
- **move(BACKWARD, Anzahl)** – Der Agent bewegt sich rückwärts
- **turn(LEFT)** – Der Agent dreht sich nach links
- **turn(RIGHT)** – Der Agent dreht sich nach rechts

### Bauen und Zerstören
- **place(Blöcke)** – Der Agent legt einen Block vor sich ab
- **destroy()** – Der Agent zerstört den Block vor sich

## Das solltest du wissen
- **Agent** – Ein programmierbarer Roboter, der Befehle in der Minecraft-Welt ausführt
- **Befehl** – Eine einzelne Anweisung, die der Agent ausführt (z. B. move, place, turn)
- **Ausführung** – Der Vorgang, bei dem der Agent deine Befehle der Reihe nach abarbeitet
- **Bewegung** – Das Fortbewegen des Agenten in eine bestimmte Richtung

## Aufgabe 1: Agent starten
Spawne den Agenten in deiner Nähe. Schreibe ein Programm mit drei Befehlen: Der Agent soll zwei Schritte nach vorne gehen und dann einen Block legen.

## Aufgabe 2: Pfad bauen
Erstelle einen einfachen Pfad aus 5 Blöcken. Der Agent soll jeweils einen Block legen und dann einen Schritt nach vorne gehen.

## Aufgabe 3: Richtung wechseln
Lass den Agenten nach drei Schritten nach vorne nach rechts drehen und weitere zwei Blöcke legen. Beobachte, wie sich die Richtung verändert.

## Reflexion
Was ist dir aufgefallen? Wie unterscheidet sich der Agent von deinem Spieler? Welche Befehle findest du am nützlichsten?
`,
    codeBlocks: [
      {
        name: 'move',
        description: 'Bewege den Agenten in eine Richtung',
        example: 'move(FORWARD, 2)',
        icon: '🚀',
      },
      {
        name: 'turn',
        description: 'Drehe den Agenten nach links oder rechts',
        example: 'turn(RIGHT)',
        icon: '🔄',
      },
      {
        name: 'place',
        description: 'Lege einen Block vor den Agenten',
        example: 'place(STONE)',
        icon: '🧱',
      },
      {
        name: 'destroy',
        description: 'Zerstöre den Block vor dem Agenten',
        example: 'destroy()',
        icon: '💥',
      },
    ],
    studentActivity: `
**Aufgabe 1: Agent starten**
1. Spawne den Agenten in deiner Nähe.
2. Schreibe ein Programm mit drei Befehlen: 2× move(FORWARD) und 1× place(STONE).
3. Starte das Programm und beobachte das Ergebnis.

**Aufgabe 2: Pfad bauen**
1. Erstelle einen Pfad aus 5 Blöcken.
2. Der Agent soll jeweils einen Block legen und dann einen Schritt nach vorne gehen.
3. Teste dein Programm und passe es bei Bedarf an.

**Aufgabe 3: Richtung wechseln**
1. Lass den Agenten 3 Schritte nach vorne gehen.
2. Dann soll er nach rechts drehen.
3. Anschließend 2 weitere Blöcke legen.
4. Beobachte, wie sich die Richtung verändert.

**Reflexion im Team:**
Wie unterscheidet sich der Agent von deinem Spieler? Welche Befehle findest du am nützlichsten?
`,
    teacherTip: 'Zeige zuerst, wie man den Agenten spawnt. Lass die Schüler dann frei experimentieren, bevor sie die strukturierten Aufgaben bearbeiten. Betone, dass der Agent immer in die Richtung schaut, in die er zuletzt gedreht hat.',
    quiz: [
      {
        id: 1,
        question: 'Wozu dient der Agent?',
        options: ['Zum Dekorieren', 'Zum Ausführen von Befehlen', 'Zum Speichern der Welt', 'Zum Ändern der Sprache'],
        correctAnswer: 1,
        explanation: 'Der Agent ist ein programmierbarer Roboter, der Befehle in der Minecraft-Welt ausführt.',
      },
      {
        id: 2,
        question: 'Was macht der Befehl move(FORWARD, 3)?',
        options: ['Bewegt den Spieler 3 Blöcke', 'Bewegt den Agenten 3 Schritte nach vorne', 'Legt 3 Blöcke ab', 'Dreht den Agenten 3 Mal'],
        correctAnswer: 1,
        explanation: 'move(FORWARD, 3) bewegt den Agenten 3 Schritte in die angegebene Richtung.',
      },
      {
        id: 3,
        question: 'Was passiert, wenn der Agent turn(RIGHT) ausführt?',
        options: ['Er bewegt sich nach rechts', 'Er dreht sich nach rechts', 'Er legt einen Block', 'Er zerstört einen Block'],
        correctAnswer: 1,
        explanation: 'turn(RIGHT) dreht den Agenten um 90 Grad nach rechts.',
      },
      {
        id: 4,
        question: 'Welcher Befehl legt einen Block vor den Agenten?',
        options: ['move()', 'turn()', 'place()', 'destroy()'],
        correctAnswer: 2,
        explanation: 'Der Befehl place() legt einen Block vor den Agenten ab.',
      },
      {
        id: 5,
        question: 'Was sollte man tun, bevor man dem Agenten Befehle gibt?',
        options: ['Minecraft beenden', 'Den Agenten spawnen', 'Die Welt löschen', 'Einen neuen Server erstellen'],
        correctAnswer: 1,
        explanation: 'Bevor der Agent Befehle ausführen kann, muss er zuerst in die Nähe des Spielers gespawnt werden.',
      },
    ],
    xpReward: 50,
    unlocks: [4],
  },
  {
    id: 4,
    title: 'Bewegung und Navigation des Agenten',
    description: 'Lerne, den Agenten gezielt durch die Minecraft-Welt zu bewegen. Verstehe Richtungen, kombiniere Befehle und plane einfache Wege.',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Bewegungsbefehle verstehen',
      'Richtungen korrekt nutzen',
      'Den Agenten steuern',
      'Befehle kombinieren',
      'Wege planen',
      'Fehler korrigieren',
    ],
    content: `
# Bewegung und Navigation des Agenten

## Wie bewegt sich der Agent?
Der Agent kann sich in verschiedene Richtungen bewegen. Die Grundbefehle dafür sind:
- **move(FORWARD, Anzahl)** – Der Agent geht nach vorne
- **move(BACKWARD, Anzahl)** – Der Agent geht nach hinten
- **turn(LEFT)** – Der Agent dreht sich nach links
- **turn(RIGHT)** – Der Agent dreht sich nach rechts

Jeder Bewegungsbefehl wird nacheinander ausgeführt. Die Reihenfolge ist entscheidend!

## Warum ist die Reihenfolge wichtig?
Minecraft führt deine Befehle der Reihe nach aus – von oben nach unten. Wenn du zuerst drehst und dann gehst, bewegt sich der Agent in die neue Richtung. Wenn du zuerst gehst und dann drehst, hat sich der Agent schon in die falsche Richtung bewegt.

## Befehle zu Bewegungsabläufen kombiniere
Um den Agenten zum Beispiel in einem Quadrat zu bewegen, brauchst du:
1. move(FORWARD, 4) – 4 Schritte geradeaus
2. turn(RIGHT) – Nach rechts drehen
3. move(FORWARD, 4) – Nochmal 4 Schritte
4. turn(RIGHT) – Wieder drehen
5. ... und so weiter

## Fehler bei Bewegungen
Häufige Fehler:
- Der Agent bewegt sich in die falsche Richtung → Prüfe die Drehung
- Der Agent geht zu weit oder zu kurz → Passe die Anzahl an
- Der Agent dreht sich zu oft oder zu wenig → Reihenfolge prüfen

## Das solltest du wissen
- **Richtung** – Die Himmelsrichtung, in die der Agent zeigt (Nord, Süd, Ost, West)
- **Vorwärts** – Der Agent bewegt sich in die Richtung, in die er gerade schaut
- **Rückwärts** – Der Agent bewegt sich entgegen seiner Blickrichtung
- **Drehen** – Den Agenten nach links oder rechts drehen, ohne ihn zu bewegen
- **Navigation** – Das gezielte Planen und Ausführen von Bewegungsabläufen

## Aufgabe 1: Gerader Weg
Lass den Agenten 6 Schritte nach vorne gehen. Beobachte, was passiert. Ändere dann die Anzahl auf 3 und auf 10.

## Aufgabe 2: Rechteck laufen
Lass den Agenten ein Rechteck ablaufen: 4 Schritte vorwärts, rechts drehen, 6 Schritte vorwärts, rechts drehen, 4 Schritte vorwärts, rechts drehen, 6 Schritte vorwärts.

## Aufgabe 3: Hindernis umgehen
Der Agent steht vor einer Wand. Lass ihn nach links drehen, 2 Schritte gehen, nach rechts drehen und dann weiter vorwärts gehen.

## Reflexion
Was ist dir aufgefallen, als du den Agenten gelenkt hast? Was passiert, wenn die Reihenfolge der Befehle nicht stimmt?
`,
    codeBlocks: [
      {
        name: 'move',
        description: 'Bewege den Agenten in eine Richtung',
        example: 'move(FORWARD, 4)',
        icon: '🚀',
      },
      {
        name: 'turn',
        description: 'Drehe den Agenten nach links oder rechts',
        example: 'turn(RIGHT)',
        icon: '🔄',
      },
    ],
    studentActivity: `
**Aufgabe 1: Gerader Weg**
1. Lass den Agenten 6 Schritte nach vorne gehen.
2. Beobachte, was passiert.
3. Ändere dann die Anzahl auf 3 und auf 10.

**Aufgabe 2: Rechteck laufen**
1. move(FORWARD, 4)
2. turn(RIGHT)
3. move(FORWARD, 6)
4. turn(RIGHT)
5. move(FORWARD, 4)
6. turn(RIGHT)
7. move(FORWARD, 6)

**Aufgabe 3: Hindernis umgehen**
1. turn(LEFT)
2. move(FORWARD, 2)
3. turn(RIGHT)
4. move(FORWARD, 3)

**Reflexion im Team:**
Was passiert, wenn die Reihenfolge der Befehle nicht stimmt? Wie planst du einen Weg?
`,
    teacherTip: 'Lasse die Schüler zuerst mit Papierskizzen planen, welche Befehle der Agent braucht. Dann das Programm testen. Betone, dass der Agent immer in die Richtung schaut, in die er zuletzt gedreht hat.',
    quiz: [
      {
        id: 1,
        question: 'Warum ist die Reihenfolge von Befehlen wichtig?',
        options: ['Weil Minecraft sonst abstürzt', 'Weil der Agent die Befehle nacheinander ausführt', 'Weil Blöcke verschwinden', 'Weil die Welt gespeichert wird'],
        correctAnswer: 1,
        explanation: 'Der Agent führt die Befehle nacheinander aus – die Reihenfolge bestimmt das Ergebnis.',
      },
      {
        id: 2,
        question: 'Was macht turn(RIGHT)?',
        options: ['Bewegt den Agenten nach rechts', 'Dreht den Agenten nach rechts', 'Legt einen Block rechts', 'Zerstört einen Block rechts'],
        correctAnswer: 1,
        explanation: 'turn(RIGHT) dreht den Agenten um 90 Grad nach rechts, ohne ihn zu bewegen.',
      },
      {
        id: 3,
        question: 'Wie läuft der Agent ein Quadrat ab?',
        options: ['4× move(FORWARD, 4)', '4× (move(FORWARD, 4) + turn(RIGHT))', '4× turn(RIGHT)', 'move(CIRCLE)'],
        correctAnswer: 1,
        explanation: 'Für ein Quadrat brauchst du 4× die Kombination: geradeaus gehen und dann drehen.',
      },
      {
        id: 4,
        question: 'Der Agent schaut nach Norden. Was passiert bei move(FORWARD, 3)?',
        options: ['Er geht 3 Blöcke nach Süden', 'Er geht 3 Blöcke nach Norden', 'Er dreht sich nach Norden', 'Nichts'],
        correctAnswer: 1,
        explanation: 'Der Agent bewegt sich in die Richtung, in die er gerade schaut – hier nach Norden.',
      },
      {
        id: 5,
        question: 'Was solltest du tun, bevor du Befehle ausführst?',
        options: ['Minecraft beenden', 'Einen Plan erstellen', 'Die Welt löschen', 'Den Server neustarten'],
        correctAnswer: 1,
        explanation: 'Plane zuerst den Weg – zum Beispiel auf Papier – bevor du die Befehle programmierst.',
      },
    ],
    xpReward: 75,
    unlocks: [5],
  },
  {
    id: 5,
    title: 'Bauen mit dem Agenten',
    description: 'Der Agent wird zum Baumeister. Mit den ersten Baubefehlen lernst du, wie der Agent automatisch Blöcke platzieren und einfache Bauwerke erstellen kann.',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Baubefehle verstehen',
      'Blöcke platzieren',
      'Den Agenten als Baumeister nutzen',
      'Bauaufgaben planen',
      'Fehler erkennen und korrigieren',
      'Einfache Bauwerke automatisieren',
    ],
    content: `
# Bauen mit dem Agenten

## Wie platziert der Agent Blöcke?
Der Agent kann mit dem Befehl **place(Blöcke)** Blöcke in der Welt ablegen. Er legt den Block immer vor sich ab – also in die Richtung, in die er gerade schaut. Das ist wichtig, denn wenn du willst, dass der Agent einen Block an einer bestimmten Stelle platziert, musst du ihn zuerst in die richtige Richtung drehen.

## Warum automatisiertes Bauen wichtig ist
Stell dir vor, du möchtest eine Mauer aus 20 Blöcken bauen. Statt 20 Mal manuell zu klicken, kannst du den Agenten programmed der das für dich tut. Er macht es schneller, exakter und macht keine Fehler – solange dein Programm stimmt.

## Aus einzelnen Befehlen entstehen Bauwerke
Einzelne place-Befehle werden zu ganzen Strukturen, wenn du sie in der richtigen Reihenfolge anordnest:
1. Block platzieren
2. Bewegen
3. Nächsten Block platzieren
4. Wiederholen

So entstehen Wände, Wege, Treppen und vieles mehr.

## Wichtige Baubefehle
- **place(STONE)** – Einen Steinblock vor den Agenten legen
- **place(WOOD)** – Einen Holzblock legen
- **place(GRASS)** – Einen Grasblock legen
- **destroy()** – Einen Block vor dem Agenten zerstören

## Fehler beim Bauen
- **Block liegt falsch** → Der Agent schaut in die falsche Richtung → turn()-Befehl hinzufügen
- **Zu wenig Blöcke** → Die Anzahl der place-Befehle erhöhen
- **Agent bewegt sich nicht** → move()-Befehl zwischen die place-Befehle einfügen

## Das solltest du wissen
- **Platzieren** – Der Agent legt einen Block in die Welt ab
- **Block** – Ein Baustein in Minecraft (z. B. Stein, Holz, Gras)
- **Bauen** – Das Erstellen von Strukturen durch das Platzieren von Blöcken
- **Agent** – Der programmierbare Roboter, der die Baubefehle ausführt
- **Bauauftrag** – Eine Aufgabe, bei der der Agent eine Struktur erstellen soll

## Aufgabe 1: Erste Mauer
Lass den Agenten eine einfache Mauer aus 5 Steinblöcken bauen. Der Agent soll: place(STONE), move(FORWARD, 1), place(STONE), move(FORWARD, 1), ... fortsetzen, bis 5 Blöcke liegen.

## Aufgabe 2: Farbiger Pfad
Erstelle einen Pfad aus 4 verschiedenen Blöcken: place(WOOD), move(FORWARD, 1), place(STONE), move(FORWARD, 1), place(GRASS), move(FORWARD, 1), place(SAND).

## Aufgabe 3: Treppe bauen
Bau eine einfache Treppe mit 3 Stufen. Jede Stufe ist einen Block höher als die vorherige. Verwende place() und move() in Kombination.

## Reflexion
Was ist dir beim Bauen aufgefallen? Warum ist die Richtung des Agenten so wichtig? Wie würdest du eine komplexere Struktur planen?
`,
    codeBlocks: [
      {
        name: 'place',
        description: 'Einen Block vor den Agenten legen',
        example: 'place(STONE)',
        icon: '🧱',
      },
      {
        name: 'destroy',
        description: 'Einen Block vor dem Agenten zerstören',
        example: 'destroy()',
        icon: '💥',
      },
      {
        name: 'move',
        description: 'Bewege den Agenten zur nächsten Position',
        example: 'move(FORWARD, 1)',
        icon: '🚀',
      },
    ],
    studentActivity: `
**Aufgabe 1: Erste Mauer**
1. Lass den Agenten 5× place(STONE) und move(FORWARD, 1) ausführen.
2. Beobachte, wie eine gerade Mauer entsteht.
3. Teste mit verschiedenen Blöcken.

**Aufgabe 2: Farbiger Pfad**
1. place(WOOD), move(FORWARD, 1)
2. place(STONE), move(FORWARD, 1)
3. place(GRASS), move(FORWARD, 1)
4. place(SAND)
5. Beobachte den bunten Pfad.

**Aufgabe 3: Treppe bauen**
1. Place und move kombinieren, um 3 Stufen zu bauen.
2. Jede Stufe einen Block höher.
3. Teste und korrigiere Fehler.

**Baumeister-Challenge:**
Erstelle ein kleines Bauprojekt mit dem Agenten – zum Beispiel ein einfaches Haus aus 4 Wänden oder einen geraden Weg aus 10 Blöcken. Plane zuerst, welche Befehle du brauchst.

**Reflexion im Team:**
Warum ist die Richtung des Agenten beim Bauen so wichtig? Wie planst du ein Bauprojekt?
`,
    teacherTip: 'Zeige zuerst, wie place() funktioniert – der Agent legt den Block immer VOR sich ab. Lasse die Schüler dann mit Papierskizzen planen, welche Befehle sie brauchen. Betone die Bedeutung der richtigen Richtung.',
    quiz: [
      {
        id: 1,
        question: 'Was passiert, wenn der Agent einen Block platziert?',
        options: ['Der Block verschwindet', 'Ein neuer Block wird an der angegebenen Position gesetzt', 'Der Agent teleportiert sich', 'Das Inventar wird gelöscht'],
        correctAnswer: 1,
        explanation: 'Der Agent legt einen neuen Block vor sich in die Welt ab.',
      },
      {
        id: 2,
        question: 'Wohin platziert der Agent einen Block?',
        options: ['Hinter sich', 'Vor sich', 'Über sich', 'Zufällig'],
        correctAnswer: 1,
        explanation: 'Der Agent platziert den Block immer vor sich – in die Richtung, in die er schaut.',
      },
      {
        id: 3,
        question: 'Wie baust du eine Mauer aus 5 Blöcken?',
        options: ['5× place(STONE)', '5× (place(STONE) + move(FORWARD, 1))', '5× turn(RIGHT)', '1× place(STONE, 5)'],
        correctAnswer: 1,
        explanation: 'Für eine Mauer brauchst du: Block legen, weitergehen, Block legen – 5 Mal.',
      },
      {
        id: 4,
        question: 'Was solltest du tun, bevor du mit dem Bauen beginnst?',
        options: ['Minecraft beenden', 'Einen Plan erstellen', 'Die Welt löschen', 'Den Server neustarten'],
        correctAnswer: 1,
        explanation: 'Plane zuerst, welche Blöcke du wo platzieren möchtest – zum Beispiel auf Papier.',
      },
      {
        id: 5,
        question: 'Warum ist die Richtung des Agenten beim Bauen wichtig?',
        options: ['Weil der Agent sonst nicht baut', 'Weil er den Block immer vor sich platziert', 'Weil Blöcke nur in eine Richtung funktionieren', 'Weil die Welt sonst abstürzt'],
        correctAnswer: 1,
        explanation: 'Der Agent platziert den Block immer in Blickrichtung – falsche Richtung = falsche Position.',
      },
    ],
    xpReward: 75,
    unlocks: [6],
  },
  {
    id: 6,
    title: 'Schleifen – Aufgaben automatisch wiederholen',
    description: 'Lerne, wie du mit Schleifen Befehle automatisch wiederholen kannst. Der Agent führt Aufgaben mehrfach aus, ohne dass du den Code immer wieder schreiben musst.',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Schleifen verstehen',
      'Wiederholungen erkennen',
      'Wiederholungsblöcke einsetzen',
      'Bewegungen automatisieren',
      'Aufgaben effizient lösen',
      'Wiederkehrende Abläufe planen',
    ],
    content: `
# Schleifen – Aufgaben automatisch wiederholen

## Was sind Schleifen?
Eine Schleife ist ein Baustein im Programm, der Befehle automatisch wiederholt. Statt denselben Code 10 Mal zu schreiben, schreibst du ihn einmal und sagst der Schleife, wie oft sie ihn wiederholen soll.

## Warum sind Schleifen wichtig?
Stell dir vor, du möchtest eine Mauer aus 10 Blöcken bauen. Ohne Schleife müsstest du 10 Mal den gleichen Befehl schreiben. Mit einer Schleife reicht eine einzige Anweisung!

## So funktioniert eine Schleife
\`\`\`
repeat(5) {
  place(STONE)
  move(FORWARD, 1)
}
\`\`\`

Diese Schleife wiederholt den place- und move-Befehl 5 Mal. Das Ergebnis: Eine Mauer aus 5 Steinblöcken.

## Ablauf einer Schleife
1. **Start** – Die Schleife beginnt
2. **Befehl ausführen** – Die Befehle innerhalb der Schleife werden ausgeführt
3. **Wiederholen** – Die Schleife zählt: Noch nicht geschafft? Nochmal!
4. **Ergebnis** – Wenn die Anzahl erreicht ist, geht es weiter

## Schleifen sparen Zeit
- Ohne Schleife: 10× place(STONE), 10× move(FORWARD, 1) = 20 Befehle
- Mit Schleife: repeat(10) { place(STONE); move(FORWARD, 1) } = 2 Befehle

## Endlosschleifen vermeiden
Vorsicht: Wenn du die Anzahl vergisst oder zu hoch setzt, läuft die Schleife sehr lange. Starte immer mit kleinen Zahlen und teste dein Programm.

## Das solltest du wissen
- **Schleife** – Ein Baustein, der Befehle automatisch wiederholt
- **Wiederholung** – Der Vorgang, einen Befehl mehrfach auszuführen
- **Anzahl** – Die Zahl, die angibt, wie oft wiederholt wird
- **Ablauf** – Die Reihenfolge, in der die Befehle ausgeführt werden
- **Automatisierung** – Aufgaben werden vom Computer wiederholt, ohne dass man sie manuell eingibt

## Aufgabe 1: Erste Schleife
Baue eine Mauer aus 8 Steinblöcken mit einer Schleife. Verwende repeat(8) { place(STONE); move(FORWARD, 1) }.

## Aufgabe 2: Bunter Pfad
Erstelle einen Pfad aus 6 Grasblöcken mit einer Schleife. Verwende repeat(6) { place(GRASS); move(FORWARD, 1) }.

## Aufgabe 3: Rechteck mit Schleifen
Baue ein Rechteck: Verwende 4 Schleifen für die 4 Seiten. Jede Seite ist 5 Blöcke lang.

## Codefluss
Start → Befehl ausführen → Nochmal wiederholen? → Ja: Befehl ausführen → Nein: Fertig

## Reflexion
Was ist dir aufgefallen? Warum sparen Schleifen Zeit? Was passiert, wenn du die Anzahl vergisst?
`,
    codeBlocks: [
      {
        name: 'repeat',
        description: 'Befehle automatisch wiederholen',
        example: 'repeat(5) { place(STONE); move(FORWARD, 1) }',
        icon: '🔁',
      },
    ],
    studentActivity: `
**Aufgabe 1: Erste Schleife**
1. Baue eine Mauer aus 8 Steinblöcken mit repeat(8).
2. Beobachte, wie die Schleife die Befehle wiederholt.
3. Ändere die Anzahl auf 5 und auf 12.

**Aufgabe 2: Bunter Pfad**
1. Erstelle einen Pfad aus 6 Grasblöcken mit repeat(6).
2. Teste das Programm.
3. Ändere den Blocktyp zu STONE.

**Aufgabe 3: Rechteck mit Schleifen**
1. Verwende 4 Schleifen für die 4 Seiten eines Rechtecks.
2. Jede Seite: repeat(5) { place(STONE); move(FORWARD, 1) }
3. Nach jeder Seite: turn(RIGHT)

**Endlosschleifen-Mission:**
Vermeide Endlosschleifen! Starte mit kleinen Zahlen und teste schrittweise. Was passiert bei repeat(100)?

**Reflexion im Team:**
Warum sparen Schleifen Zeit? Was passiert, wenn du die Anzahl vergisst?
`,
    teacherTip: 'Beginne mit einer Demonstration: Schreibe 5 Mal place+move, dann zeige die Schleife. Lasse die Schüler die Anzahl variieren und die Ergebnisse vergleichen. Betone, dass Schleifen bei sich wiederholenden Aufgaben helfen.',
    quiz: [
      {
        id: 1,
        question: 'Warum verwendet man Schleifen?',
        options: ['Damit Programme länger werden', 'Damit man Befehle nicht ständig wiederholen muss', 'Damit Minecraft schneller startet', 'Damit Blöcke verschwinden'],
        correctAnswer: 1,
        explanation: 'Schleifen sparen Zeit, indem sie Befehle automatisch wiederholen.',
      },
      {
        id: 2,
        question: 'Wie oft führt repeat(6) { place(GRASS) } den place-Befehl aus?',
        options: ['1 Mal', '6 Mal', '10 Mal', 'Unendlich'],
        correctAnswer: 1,
        explanation: 'repeat(6) wiederholt den Befehl 6 Mal.',
      },
      {
        id: 3,
        question: 'Was passiert, wenn du die Anzahl in einer Schleife vergisst?',
        options: ['Die Schleife läuft gar nicht', 'Die Schleife wird 1 Mal ausgeführt', 'Ein Fehler tritt auf', 'Die Schleife läuft endlos'],
        correctAnswer: 2,
        explanation: 'Ohne Anzahl oder bei ungültiger Angabe gibt es einen Fehler.',
      },
      {
        id: 4,
        question: 'Was ist der Vorteil von repeat(10) gegenüber 10 Mal den gleichen Befehl zu schreiben?',
        options: ['Es ist sicherer', 'Es spart Zeit und Code', 'Es ist schwieriger', 'Es macht mehr Spaß'],
        correctAnswer: 1,
        explanation: 'Schleifen sparen Zeit und machen den Code kürzer und übersichtlicher.',
      },
      {
        id: 5,
        question: 'Wie baust du eine Mauer aus 5 Blöcken mit einer Schleife?',
        options: ['5× place(STONE)', 'repeat(5) { place(STONE); move(FORWARD, 1) }', 'repeat(STONE) { place(5) }', 'place(5, STONE)'],
        correctAnswer: 1,
        explanation: 'repeat(5) wiederholt Block legen und weitergehen 5 Mal.',
      },
    ],
    xpReward: 100,
    unlocks: [7],
  },
  {
    id: 7,
    title: 'Bedingungen und Entscheidungen',
    description: 'Programme treffen Entscheidungen. Der Agent lernt, unterschiedlich zu reagieren, abhängig von einer Situation oder Bedingung.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Bedingungen verstehen',
      'Entscheidungen programmieren',
      'Wenn-Dann-Logik anwenden',
      'Situationen erkennen',
      'Reaktionen steuern',
      'Programme intelligenter machen',
    ],
    content: `
# Bedingungen und Entscheidungen

## Was sind Bedingungen?
Eine Bedingung ist eine Frage, die dein Programm beantwortet – zum Beispiel: "Ist vor mir ein Block?" oder "Kann ich nach vorne gehen?". Je nach Antwort führt das Programm unterschiedliche Befehle aus.

## Warum müssen Programme Entscheidungen treffen?
Ohne Bedingungen führt dein Programm immer die gleichen Befehle aus – egal was passiert. Mit Bedingungen wird dein Agent intelligent: Er kann auf seine Umgebung reagieren und unterschiedlich handeln.

## Wenn-Dann-Logik
\`\`\`
if (canMove(FORWARD)) {
  move(FORWARD, 1)
} else {
  turn(LEFT)
}
\`\`\`

- **Wenn** die Bedingung wahr ist (der Agent kann nach vorne) → dann geht er vorwärts.
- **Wenn nicht** (die Bedingung ist falsch) → dann dreht er sich.

## Was passiert bei einer Bedingung?
1. Das Programm stellt die Frage (die Bedingung)
2. **Ja (wahr)** → Der Code im "Dann"-Block wird ausgeführt
3. **Nein (falsch)** → Der Code im "Sonst"-Block wird ausgeführt (falls vorhanden)

## Entscheidungsbaum
\`\`\`
Kann ich nach vorne?
├─ Ja → Gehe vorwärts
└─ Nein → Drehe dich
\`\`\`

## Wichtige Bedingungen
- **canMove(FORWARD)** – Kann der Agent nach vorne gehen?
- **blockAt(x, y, z) == GRASS** – Ist an dieser Stelle ein Grasblock?
- **agentX == 5** – Steht der Agent an Position 5?

## Wenn-Dann-Logik im Alltag
- "Wenn es regnet, nehme ich einen Regenschirm. Sonst nicht."
- "Wenn ich hungrig bin, esse ich. Sonst gehe ich spielen."
- "Wenn die Tür offen ist, gehe ich rein. Sonst klopfe ich."

## Das solltest du wissen
- **Bedingung** – Eine Frage, die mit Ja oder Nein beantwortet wird
- **Entscheidung** – Das Programm wählt verschiedene Aktionen
- **Wenn (if)** – Führt Code nur aus, wenn die Bedingung wahr ist
- **Dann** – Der Code, der bei "wahr" ausgeführt wird
- **Wahr / Falsch** – Die zwei möglichen Antworten einer Bedingung

## Aufgabe 1: Hindernis erkennen
Lass den Agenten prüfen, ob er nach vorne gehen kann. Wenn ja: move(FORWARD, 1). Wenn nein: turn(LEFT).

## Aufgabe 2: Block prüfen
Prüfe, ob an einer bestimmten Stelle ein Grasblock liegt. Wenn ja: place(STONE). Wenn nein: move(FORWARD, 1).

## Aufgabe 3: Entscheidungsbaum
Erstelle einen Ablauf mit 2 aufeinanderfolgenden Bedingungen: Zuerst prüfen, ob man gehen kann. Dann prüfen, ob rechts frei ist.

## Reflexion
Was ist dir aufgefallen? Wie macht eine Bedingung dein Programm intelligenter? Was passiert, wenn du die Bedingung vergisst?
`,
    codeBlocks: [
      {
        name: 'if',
        description: 'Führe Code nur aus, wenn eine Bedingung wahr ist',
        example: 'if (canMove(FORWARD)) { move(FORWARD, 1) }',
        icon: '🔀',
      },
      {
        name: 'else',
        description: 'Führe Code aus, wenn die Bedingung falsch ist',
        example: 'if (bedingung) { ... } else { turn(LEFT) }',
        icon: '🔄',
      },
    ],
    studentActivity: `
**Aufgabe 1: Hindernis erkennen**
1. Prüfe mit if (canMove(FORWARD)).
2. Wenn ja: move(FORWARD, 1).
3. Wenn nein: turn(LEFT).

**Aufgabe 2: Block prüfen**
1. Prüfe, ob an einer Stelle Gras liegt.
2. Wenn ja: place(STONE).
3. Wenn nein: move(FORWARD, 1).

**Aufgabe 3: Entscheidungsbaum**
1. Prüfe, ob vorne frei ist.
2. Wenn ja: Gehe vorwärts.
3. Wenn nein: Prüfe, ob rechts frei ist.
4. Wenn ja: Drehe rechts und gehe.
5. Wenn nein: Drehe links.

**Mission: Der schlaue Agent**
Setze Bedingungen ein und erlebe, wie der Agent abhängig von Situationen unterschiedliche Aktionen ausführt.

**Reflexion im Team:**
Wie macht eine Bedingung dein Programm intelligenter? Was passiert, wenn du die Bedingung vergisst?
`,
    teacherTip: 'Beginne mit Alltagsbeispielen: "Wenn es regnet, Regenschirm. Sonst nicht." Zeige dann, wie der Agent mit if/else reagieren kann. Betone, dass else optional ist.',
    quiz: [
      {
        id: 1,
        question: 'Wann wird ein Wenn-Block ausgeführt?',
        options: ['Immer', 'Nur wenn die Bedingung erfüllt ist', 'Nur nachts', 'Nur beim Bauen'],
        correctAnswer: 1,
        explanation: 'Ein Wenn-Block wird nur ausgeführt, wenn die Bedingung wahr (erfüllt) ist.',
      },
      {
        id: 2,
        question: 'Was passiert, wenn eine Bedingung falsch ist und ein Else-Block vorhanden ist?',
        options: ['Nichts passiert', 'Der Else-Block wird ausgeführt', 'Ein Fehler entsteht', 'Das Programm stoppt'],
        correctAnswer: 1,
        explanation: 'Wenn die Bedingung falsch ist, wird der Else-Block ausgeführt.',
      },
      {
        id: 3,
        question: 'Was macht canMove(FORWARD)?',
        options: ['Bewegt den Agenten nach vorne', 'Prüft, ob der Agent nach vorne gehen kann', 'Dreht den Agenten', 'Legt einen Block'],
        correctAnswer: 1,
        explanation: 'canMove(FORWARD) prüft, ob Bewegung nach vorne möglich ist.',
      },
      {
        id: 4,
        question: 'Kann man if ohne else verwenden?',
        options: ['Nein, immer beide brauchen', 'Ja, else ist optional', 'Nur bei Schleifen', 'Nur bei Bedingungen mit Zahl'],
        correctAnswer: 1,
        explanation: 'Else ist optional. Man kann nur if verwenden, ohne else.',
      },
      {
        id: 5,
        question: 'Wie wird dein Programm durch Bedingungen besser?',
        options: ['Es wird kürzer', 'Es kann auf verschiedene Situationen reagieren', 'Es startet schneller', 'Es braucht weniger Blöcke'],
        correctAnswer: 1,
        explanation: 'Bedingungen machen dein Programm intelligenter, weil es auf verschiedene Situationen reagieren kann.',
      },
    ],
    xpReward: 75,
    unlocks: [8],
  },
  {
    id: 8,
    title: 'Ereignisse und Chat-Befehle',
    description: 'Programme können auf Ereignisse reagieren. Der Agent und Minecraft sollen Aktionen ausführen, wenn ein bestimmter Auslöser eintritt oder ein Chat-Befehl verwendet wird.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Ereignisse verstehen',
      'Chat-Befehle verwenden',
      'Auslöser erkennen',
      'Aktionen starten',
      'Programme interaktiv machen',
      'Ereignisse mit Befehlen verbinden',
    ],
    content: `
# Ereignisse und Chat-Befehle

## Was ist ein Ereignis?
Ein Ereignis ist etwas, das passiert – zum Beispiel ein Spieler drückt eine Taste, der Agent trifft auf einen Block oder jemand gibt einen Chat-Befehl ein. Programme können auf solche Ereignisse reagieren.

## Was ist ein Auslöser (Trigger)?
Ein Auslöser ist das, was das Ereignis startet. Zum Beispiel: "Spieler gibt /bauen im Chat ein" ist der Auslöser. "Der Agent legt einen Steinblock" ist die Aktion.

## Wie funktionieren Chat-Befehle?
Chat-Befehle sind Wörter, die du in den Chat von Minecraft eingibst. Sie beginnen oft mit einem Schrägstrich (/). Wenn du zum Beispiel /start eingibst, beginnt der Agent mit dem Bauen. Minecraft erkennt den Befehl und führt die dazugehörige Aktion aus.

## Vom Auslöser zur Aktion:
Chat-Befehl → Ereignis → Programm startet → Aktion wird ausgeführt

Beispiel: Der Spieler gibt /bridge ein
1. **Chat-Befehl** – /bridge
2. **Ereignis** – Minecraft bemerkt den Befehl
3. **Programm startet** – Das zugehörige Programm läuft
4. **Aktion** – Der Agent baut eine Brücke

## Warum sind Ereignisse wichtig?
Ohne Ereignisse läuft dein Programm immer gleich ab. Mit Ereignissen wird dein Programm interaktiv: Es wartet auf Eingaben und reagiert erst dann.

## Das solltest du wissen
- **Ereignis** – Etwas, das passiert (Taste, Chat-Befehl, Blockberührung)
- **Trigger/Auslöser** – Das, was das Ereignis startet
- **Chat-Befehl** – Ein Befehl, den du im Chat eingibst (oft mit /)
- **Aktion** – Die Reaktion des Programms auf das Ereignis
- **Eingabe** – Das, was der Spieler macht oder sagt
- **Reaktion** – Das, was der Agent als Antwort tut

## Aufgabe 1: Erster Chat-Befehl
Erstelle ein Programm, das auf den Chat-Befehl /start reagiert. Wenn der Spieler /start eingibt, soll der Agent "Hallo!" sagen.

## Aufgabe 2: Bauen mit Befehl
Erstelle ein Programm mit dem Chat-Befehl /bridge. Wenn der Spieler /bridge eingibt, baut der Agent eine Brücke aus 5 Steinblöcken.

## Aufgabe 3: Zwei Befehle
Erstelle zwei Chat-Befehle: /wall baut eine Mauer, /path baut einen Pfad. Je nach Befehl führt der Agent eine andere Aktion aus.

## Reflexion
Wie verändert sich ein Programm, wenn es auf Ereignisse reagiert? Warum sind Chat-Befehle nützlich?
`,
    codeBlocks: [
      {
        name: 'on chat command',
        description: 'Starte ein Programm, wenn ein Chat-Befehl eingegeben wird',
        example: 'on chat "/start" { ... }',
        icon: '💬',
      },
      {
        name: 'say',
        description: 'Der Agent sagt einen Text',
        example: 'say("Hallo!")',
        icon: '🗣️',
      },
    ],
    studentActivity: `
**Aufgabe 1: Erster Chat-Befehl**
1. Erstelle ein Programm mit on chat "/start".
2. Wenn der Befehl eingegeben wird, sagt der Agent "Hallo!".
3. Teste das Programm im Chat.

**Aufgabe 2: Bauen mit Befehl**
1. Erstelle den Chat-Befehl /bridge.
2. Der Agent baut eine Brücke aus 5 Steinblöcken.
3. Teste: Gib /bridge im Chat ein.

**Aufgabe 3: Zwei Befehle**
1. /wall → Agent baut eine Mauer aus 8 Steinen.
2. /path → Agent baut einen Pfad aus 6 Grasblöcken.
3. Teste beide Befehle im Chat.

**Mission: Der magische Sprachbefehl**
Erlebe, wie durch einen Chat-Befehl automatisch Aktionen ausgelöst werden. Erstelle einen eigenen Befehl, der den Agenten etwas bauen oder sagen lässt.

**Reflexion im Team:**
Wie verändert sich ein Programm, wenn es auf Ereignisse reagiert? Wann sind Chat-Befehle nützlich?
`,
    teacherTip: 'Zeige zuerst, wie Chat-Befehle in Minecraft funktionieren. Demonstriere den on chat-Block und erkläre, dass das Programm auf den Befehl wartet. Lasse die Schüler eigene Befehle erfinden.',
    quiz: [
      {
        id: 1,
        question: 'Was passiert bei einem Ereignis?',
        options: ['Minecraft wird beendet', 'Eine Aktion wird durch einen Auslöser gestartet', 'Alle Blöcke verschwinden', 'Der Agent wird gelöscht'],
        correctAnswer: 1,
        explanation: 'Ein Ereignis ist ein Auslöser, der eine bestimmte Aktion startet.',
      },
      {
        id: 2,
        question: 'Wofür steht der Schrägstrich (/) bei einem Chat-Befehl?',
        options: ['Er ist nur Dekoration', 'Er zeigt an, dass es ein Befehl ist', 'Er löscht den Chat', 'Er startet Minecraft neu'],
        correctAnswer: 1,
        explanation: 'Der Schrägstrich zeigt an, dass es sich um einen Befehl und nicht um normalen Chat-Text handelt.',
      },
      {
        id: 3,
        question: 'Was macht der Befehl say("Hallo")?',
        options: ['Der Spieler sagt Hallo', 'Der Agent sagt Hallo', 'Ein Block sagt Hallo', 'Nichts'],
        correctAnswer: 1,
        explanation: 'Der Befehl say() lässt den Agenten einen Text im Chat ausgeben.',
      },
      {
        id: 4,
        question: 'Was ist der Unterschied zwischen einem normalen Programm und einem ereignisgesteuerten Programm?',
        options: ['Es gibt keinen Unterschied', 'Ereignisgesteuerte Programme warten auf Eingaben', 'Normale Programme sind besser', 'Ereignisse gibt es nicht in Minecraft'],
        correctAnswer: 1,
        explanation: 'Ereignisgesteuerte Programme warten auf einen Auslöser und reagieren erst dann.',
      },
      {
        id: 5,
        question: 'Wie kannst du den Agenten dazu bringen, erst auf Befehl zu handeln?',
        options: ['Gar nicht', 'Durch einen Chat-Befehl wie /start', 'Durch Neustarten', 'Durch Bauen'],
        correctAnswer: 1,
        explanation: 'Mit einem Chat-Befehl wie /start kannst du steuern, wann der Agent handelt.',
      },
    ],
    xpReward: 75,
    unlocks: [9],
  },
  {
    id: 9,
    title: 'Variablen und Daten speichern',
    description: 'Programme können sich Informationen merken. Mit Variablen lassen sich Werte speichern, verändern und später wiederverwenden.',
    phase: 'creative',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Variablen verstehen',
      'Werte speichern',
      'Werte verändern',
      'Informationen wiederverwenden',
      'Daten verwalten',
      'Programme intelligenter machen',
    ],
    content: `
# Variablen und Daten speichern

## Was ist eine Variable?
Eine Variable ist wie eine kleine Schachtel mit einem Namen. Du kannst etwas hineinlegen – zum Beispiel eine Zahl oder einen Text – und später wieder herausnehmen. Der Name der Schachtel hilft dir, sie wiederzufinden.

## Warum müssen Programme Informationen speichern?
Stell dir vor, der Agent soll sich merken, wie viele Blöcke er schon gelegt hat. Oder er soll den Namen eines Spielers speichern. Ohne Variablen müsste er immer von vorne anfangen. Mit Variablen kann er sich Werte merken und später verwenden.

## Wie eine Variable arbeitet
1. **Variable erstellen** – Gib der Variable einen Namen (z. B. "anzahl")
2. **Wert speichern** – Lege einen Wert hinein (z. B. anzahl = 0)
3. **Wert ändern** – Verändere den Wert (z. B. anzahl + 1)
4. **Wert verwenden** – Hole den Wert heraus und nutze ihn

## Beispiel: Zählen mit Variablen
\`\`\`
set variable schritte = 0
schritte = schritte + 1
say(schritte)
\`\`\`

Dieses Programm zählt die Schritte des Agenten und gibt sie im Chat aus.

## Variablen in Minecraft Education
- **set variable name = wert** – Erstellt eine Variable mit einem Wert
- **change variable name by zahl** – Verändert den Wert (z. B. +1 oder -1)
- **Variable im say** – Zeige den Wert einer Variable im Chat an
- **Variable in Bedingungen** – Vergleiche Werte (z. B. if (schritte == 5))

## Das solltest du wissen
- **Variable** – Eine Schachtel mit Namen, die einen Wert speichert
- **Wert** – Das, was in der Variable gespeichert ist (Zahl oder Text)
- **Speichern** – Einen Wert in die Variable legen
- **Ändern** – Den Wert der Variable verändern
- **Daten** – Informationen, die ein Programm verwendet
- **Information** – Alles, was das Programm sich merken muss

## Aufgabe 1: Erste Variable
Erstelle eine Variable namens "anzahl" mit dem Wert 0. Lasse den Agenten "anzahl" im Chat ausgeben. Ändere den Wert auf 10.

## Aufgabe 2: Schritte zählen
Erstelle eine Variable "schritte". Jedes Mal, wenn der Agent einen Schritt geht, erhöhe den Wert um 1. Gib am Ende die Gesamtzahl aus.

## Aufgabe 3: Variable in Bedingungen
Setze eine Variable "bloecke" auf 0. Jedes Mal, wenn der Agent einen Block platziert, erhöhe bloecke um 1. Wenn bloecke == 5, dann sagt der Agent: "Fertig!".

## Reflexion
Was ist dir an Variablen aufgefallen? Warum sind sie nützlich? Was passiert, wenn du den Wert vergisst?
`,
    codeBlocks: [
      {
        name: 'set variable',
        description: 'Erstelle eine Variable und speichere einen Wert',
        example: 'set variable anzahl = 0',
        icon: '📦',
      },
      {
        name: 'change variable',
        description: 'Verändere den Wert einer Variable',
        example: 'change variable anzahl by 1',
        icon: '✏️',
      },
    ],
    studentActivity: `
**Aufgabe 1: Erste Variable**
1. Erstelle eine Variable "anzahl" mit Wert 0.
2. Lasse den Agenten "anzahl" sagen.
3. Ändere den Wert auf 10 und lasse ihn erneut sagen.

**Aufgabe 2: Schritte zählen**
1. Erstelle eine Variable "schritte" mit Wert 0.
2. Nach jedem move(FORWARD, 1): schritte + 1.
3. Am Ende: say(schritte).

**Aufgabe 3: Variable in Bedingungen**
1. Variable "bloecke" mit Wert 0.
2. Nach jedem place: bloecke + 1.
3. Wenn bloecke == 5: say("Fertig!").

**Mission: Der Gedächtnis-Agent**
Programmiere den Agenten so, dass er sich eine Zahl merkt, diese bei jedem Schritt erhöht und sie am Ende ausgibt.

**Reflexion im Team:**
Warum sind Variablen nützlich? Was passiert, wenn du den Wert vergisst?
`,
    teacherTip: 'Beginne mit einem Alltagsbeispiel: "Wenn ich Zähle, wie viele Äpfel ich habe, merke ich mir die Zahl." Zeige dann, wie man in Minecraft eine Variable erstellt und verwendet. Betone den Unterschied zwischen set (festlegen) und change (verändern).',
    quiz: [
      {
        id: 1,
        question: 'Wozu dient eine Variable?',
        options: ['Um Blöcke zu zerstören', 'Um Informationen zu speichern', 'Um Minecraft zu schließen', 'Um die Welt zu löschen'],
        correctAnswer: 1,
        explanation: 'Eine Variable ist wie eine Schachtel, die Informationen für das Programm speichert.',
      },
      {
        id: 2,
        question: 'Was passiert bei "change variable anzahl by 1"?',
        options: ['Die Variable wird gelöscht', 'Der Wert der Variable wird um 1 erhöht', 'Ein Block wird platziert', 'Der Agent wird bewegt'],
        correctAnswer: 1,
        explanation: '"change variable anzahl by 1" erhöht den Wert der Variable um 1.',
      },
      {
        id: 3,
        question: 'Wie erstellt man eine Variable "schritte" mit dem Wert 0?',
        options: ['set variable schritte = 0', 'create schritte = 0', 'new schritte is 0', 'var schritte ist 0'],
        correctAnswer: 0,
        explanation: 'Mit "set variable schritte = 0" erstellst du eine Variable und legst den Startwert fest.',
      },
      {
        id: 4,
        question: 'Warum sind Variablen in Programmen wichtig?',
        options: ['Sie machen Programme kürzer', 'Damit Programme sich Werte merken können', 'Sie sind nicht wichtig', 'Sie ersetzen den Agenten'],
        correctAnswer: 1,
        explanation: 'Variablen sind wichtig, weil Programme sich Werte wie Zahlen oder Texte merken müssen.',
      },
      {
        id: 5,
        question: 'Was gibt der Agent aus, wenn schritte = 5 und er say(schritte) ausführt?',
        options: ['"schritte"', '5', 'nichts', 'einen Fehler'],
        correctAnswer: 1,
        explanation: 'say(schritte) gibt den aktuellen Wert der Variable aus – hier 5.',
      },
    ],
    xpReward: 100,
    unlocks: [10],
  },
  {
    id: 10,
    title: 'Eigenes Projekt und Abschlussabenteuer',
    description: 'Nutze alles, was du bisher gelernt hast. Plane dein eigenes Projekt und kombiniere die Fähigkeiten aus den vorherigen Lektionen.',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Vorwissen anwenden',
      'Eigene Lösungen entwickeln',
      'Mehrere Coding-Konzepte kombinieren',
      'Projekte planen',
      'Fehler selbstständig beheben',
      'Komplexere Aufgaben lösen',
    ],
    content: `
# Eigenes Projekt und Abschlussabenteuer

## Herzlichen Glückwunsch!
Du hast dich durch neun Inseln gearbeitet und dabei viele wichtige Fähigkeiten gelernt. Jetzt ist es an der Zeit, alles zu kombinieren und dein eigenes Projekt zu planen.

## Warum Projekte wichtig sind
In der echten Programmierung arbeitest du nie mit nur einem Konzept. Du musst Agenten steuern, Schleifen verwenden, Bedingungen prüfen, Variablen einsetzen und auf Ereignisse reagieren – oft alles im selben Programm.

## Programmierer kombinieren Konzepte
Ein gutes Programm vereint mehrere Fähigkeiten:
- **Agent** – Der Agent führt deine Befehle aus
- **Schleifen** – Wiederhole Aufgaben automatisch
- **Bedingungen** – Triff Entscheidungen
- **Variablen** – Merke dir Werte
- **Ereignisse** – Reagiere auf Chat-Befehle
- **Bauen** – Platziere Blöcke

## Dein Werkzeugkasten
| Fähigkeit | Gelernt in Lektion | Kurzfassung |
|-----------|-------------------|-------------|
| Steuerung | 1 | WASD, Springen, Schleichen |
| Block Coding | 2 | Programme aus Blöcken |
| Agent | 3 | Befehle an den Agenten |
| Navigation | 4 | move, turn, Richtungen |
| Bauen | 5 | place, destroy |
| Schleifen | 6 | repeat, Wiederholungen |
| Bedingungen | 7 | if, else, canMove |
| Ereignisse | 8 | Chat-Befehle, say |
| Variablen | 9 | Werte speichern, ändern |

## Projektphase 1: Planung
Überlege dir ein Projekt, das mindestens 3 verschiedene Konzepte kombiniert. Zeichne eine Skizze und schreibe auf, welche Befehle du brauchst.

## Projektphase 2: Umsetzung
Setze dein Projekt Schritt für Schritt um. Arbeite mit deinem Team zusammen. Teste jede Funktion einzeln, bevor du alles kombinierst.

## Projektphase 3: Präsentation
Zeige dein Projekt der Klasse. Erkläre, welche Konzepte du verwendet hast und wie du Probleme gelöst hast.

## Deine Reise durch das Archipel
| Nr | Insel | Status |
|----|-------|--------|
| 1 | Grundlagen der Steuerung | ✓ |
| 2 | Einführung in Block Coding | ✓ |
| 3 | Der Agent und seine ersten Befehle | ✓ |
| 4 | Bewegung und Navigation des Agenten | ✓ |
| 5 | Bauen mit dem Agenten | ✓ |
| 6 | Schleifen – Aufgaben automatisch wiederholen | ✓ |
| 7 | Bedingungen und Entscheidungen | ✓ |
| 8 | Ereignisse und Chat-Befehle | ✓ |
| 9 | Variablen und Daten speichern | ✓ |
| 10 | Eigenes Projekt und Abschlussabenteuer | ★ |
| 11 | 🔒 Die letzte Insel | 🔒 |

## Reflexion
Was war deine größte Herausforderung? Welches Konzept hat dir am besten gefallen? Worauf freust du dich bei der letzten Insel?
`,
    codeBlocks: [
      {
        name: 'project planning',
        description: 'Plane dein Projekt mit mindestens 3 Konzepten',
        example: 'Skizze + Befehlsliste',
        icon: '📋',
      },
    ],
    studentActivity: `
**Projektphase 1: Planung**
1. Überlege ein Projekt, das Agent, Schleifen und Bedingungen kombiniert.
2. Zeichne eine Skizze.
3. Schreibe eine Liste mit allen benötigten Befehlen.

**Projektphase 2: Umsetzung**
1. Setze dein Projekt Schritt für Schritt um.
2. Teste jede Funktion einzeln.
3. Arbeite mit deinem Team zusammen.

**Projektphase 3: Präsentation**
1. Zeige dein Projekt der Klasse.
2. Erkläre, welche Konzepte du verwendet hast.
3. Beschreibe, wie du Probleme gelöst hast.

**Mission: Der Weg zur letzten Insel**
Nutze die Fähigkeiten aller bisherigen Inseln, um die Abschlussaufgabe erfolgreich zu lösen.

**Reflexion im Team:**
Was war deine größte Herausforderung? Welches Konzept hat dir am besten gefallen?
`,
    teacherTip: 'Gib den Schülern Zeit für die Planung. Ermutige sie, verschiedene Konzepte zu kombinieren. Die Präsentation ist genauso wichtig wie das Programm selbst.',
    quiz: [
      {
        id: 1,
        question: 'Welche Fähigkeit hast du in Lektion 6 gelernt?',
        options: ['Agenten bewegen', 'Schleifen verwenden', 'Blöcke bauen', 'Chat-Befehle'],
        correctAnswer: 1,
        explanation: 'In Lektion 6 hast du gelernt, wie Schleifen Aufgaben automatisch wiederholen.',
      },
      {
        id: 2,
        question: 'Wofür wird der Befehl place() verwendet?',
        options: ['Den Agenten bewegen', 'Einen Block platzieren', 'Einen Chat-Befehl senden', 'Eine Variable erstellen'],
        correctAnswer: 1,
        explanation: 'place() platziert einen Block vor dem Agenten.',
      },
      {
        id: 3,
        question: 'Was prüft canMove(FORWARD)?',
        options: ['Ob der Agent sich nach vorne bewegen kann', 'Ob der Agent einen Block platziert hat', 'Ob der Chat aktiv ist', 'Ob der Agent existiert'],
        correctAnswer: 0,
        explanation: 'canMove(FORWARD) prüft, ob der Agent nach vorne gehen kann.',
      },
      {
        id: 4,
        question: 'Wie erstellt man eine Variable "zaehler" mit Wert 0?',
        options: ['new zaehler = 0', 'set variable zaehler = 0', 'create zaehler = 0', 'var zaehler 0'],
        correctAnswer: 1,
        explanation: 'Mit "set variable zaehler = 0" erstellst du eine Variable.',
      },
      {
        id: 5,
        question: 'Was bewirkt turn(RIGHT)?',
        options: ['Der Agent geht nach rechts', 'Der Agent dreht sich nach rechts', 'Ein Block wird nach rechts gelegt', 'Nichts'],
        correctAnswer: 1,
        explanation: 'turn(RIGHT) dreht den Agenten um 90 Grad nach rechts.',
      },
      {
        id: 6,
        question: 'Wozu dienen Chat-Befehle wie /start?',
        options: ['Minecraft neustarten', 'Ein Programm durch Eingabe starten', 'Den Chat löschen', 'Den Agenten löschen'],
        correctAnswer: 1,
        explanation: 'Chat-Befehle starten ein Programm, wenn der Spieler sie eingibt.',
      },
      {
        id: 7,
        question: 'Wie oft führt repeat(5) den Code darin aus?',
        options: ['1 Mal', '5 Mal', '10 Mal', 'Unendlich'],
        correctAnswer: 1,
        explanation: 'repeat(5) wiederholt den Code 5 Mal.',
      },
      {
        id: 8,
        question: 'Was passiert bei "change variable anzahl by 1"?',
        options: ['Die Variable wird gelöscht', 'Der Wert erhöht sich um 1', 'Ein Block wird gesetzt', 'Der Agent sagt die Zahl'],
        correctAnswer: 1,
        explanation: '"change variable anzahl by 1" erhöht den Wert um 1.',
      },
      {
        id: 9,
        question: 'Welcher Befehl lässt den Agenten etwas sagen?',
        options: ['say("Text")', 'talk("Text")', 'speak("Text")', 'write("Text")'],
        correctAnswer: 0,
        explanation: 'say("Text") lässt den Agenten einen Text im Chat ausgeben.',
      },
      {
        id: 10,
        question: 'Wie viele Inseln hast du auf deiner Reise besucht?',
        options: ['5', '9', '10', '11'],
        correctAnswer: 2,
        explanation: 'Du hast 10 Inseln besucht. Die 11. Insel wartet noch auf dich!',
      },
    ],
    xpReward: 200,
    unlocks: [],
  },
  {
    id: 11,
    title: '🏝️ Die letzte Insel',
    description: 'Du hast alle Inseln des Minecraft Education Block Coding Archipels abgeschlossen. Vor dir liegt die letzte Insel – mit Belohnung, Abenteuer und dem Abschluss deiner Reise.',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Die letzte Herausforderung meistern',
      'Das Jump-and-Run absolvieren',
      'Die Schatzkiste öffnen',
      'Das Meisterzertifikat erhalten',
      'Den Archipel-Meister-Titel tragen',
      'Die Reise abschließen',
    ],
    content: `
# 🏝️ Die letzte Insel

## Willkommen auf der letzten Insel!
Du hast alle 10 Inseln des Archipels erfolgreich abgeschlossen. Diese Insel ist deine Belohnung. Hier erwartet dich ein kleines Abenteuer, dein Zertifikat und der offizielle Abschluss deiner Reise.

## Inselbereiche
Die letzte Insel besteht aus mehreren Bereichen:

### 1. Empfangsbereich (introArea)
Hier beginnt deine Ankunft. Ein Willkommensschild begrüßt dich. Der Archipel-Meister spricht dich an und überreicht dir den ersten Hinweis.

### 2. Jump-and-Run (parkourArea)
Ein kleiner Parkour durch die Insel. Springe über Blöcke, klettere über Mauern und finde den Weg zur Schatzkammer. Keine Angst – es ist nicht schwer, nur ein symbolischer Abschlussparcours.

### 3. Schatzkiste (treasureArea)
Am Ende des Parkours wartet eine große Schatzkiste. Öffne sie und erhalte deine Belohnung:
- ⭐ **500 XP Bonus**
- 🏆 **Archipel-Meister-Pokal**
- 🎖️ **Meisterabzeichen**
- 📜 **Dein persönliches Zertifikat**

### 4. Zertifikatsbereich (certificateArea)
Hier wird dein Zertifikat ausgestellt. Es bestätigt, dass du alle 10 Lektionen des Minecraft Education Block Coding Archipels erfolgreich abgeschlossen hast.

### 5. Abschlussbereich (rewardArea)
Der krönende Abschluss. Hier kannst du:
- Deinen Archipel-Meister-Titel aktivieren
- Eine spezielle Profilmarkierung freischalten
- Den nächsten Archipel erkunden (in Vorbereitung)

## Die Reise ist abgeschlossen
| Etappe | Status |
|--------|--------|
| Insel 1–10: Ausbildung | ✅ Abgeschlossen |
| Insel 11: Letzte Insel | ★ Aktiv |
| Nächstes Archipel | 🔄 In Vorbereitung |

## Reflexion
Du hast die gesamte Reise durch das Minecraft Education Block Coding Archipel gemeistert. Von den ersten Schritten mit WASD bis zu Variablen und Ereignissen – du hast alle Konzepte gelernt, die du brauchst, um eigene Projekte zu programmieren.

**Was kommt als Nächstes?**
- Python-Archipel (in Vorbereitung)
- JavaScript-Archipel (in Vorbereitung)
- Webdesign-Archipel (in Vorbereitung)
`,
    codeBlocks: [],
    studentActivity: `
**Bereich 1: Empfang**
Betrete die Insel und lies das Willkommensschild.

**Bereich 2: Jump-and-Run**
1. Folge dem Pfad aus bunten Blöcken.
2. Springe über Lücken (Leertaste).
3. Klettere über Mauern (Shift + Springen).
4. Erreiche die Schatzkammer.

**Bereich 3: Schatzkiste**
Öffne die Schatzkiste und sammle deine Belohnungen ein:
- ⭐ 500 XP Bonus
- 🏆 Archipel-Meister-Pokal
- 🎖️ Meisterabzeichen
- 📜 Zertifikat

**Bereich 4: Zertifikat**
Dein Name wird auf dem Zertifikat eingetragen. Herzlichen Glückwunsch!

**Bereich 5: Abschluss**
Aktiviere deinen Archipel-Meister-Titel und schalte die Profilmarkierung frei.
`,
    teacherTip: 'Diese Insel ist die Belohnung für den gesamten Kurs. Lasse den Schülern Zeit, alle Bereiche zu erkunden. Der Parkour ist symbolisch – es geht um den Abschluss, nicht um die Herausforderung.',
    quiz: [],
    xpReward: 500,
    unlocks: [],
  },

  // ═══════════════════════════════════════════════════════════════════
  //  LEVEL 2: Bedingungen & Funktionen mit Python
  // ═══════════════════════════════════════════════════════════════════

  {
    id: 21,
    title: 'Einfache Bedingungen',
    description: 'Dein Agent lernt, auf seine Umgebung zu reagieren. Mit if-Abfragen erkennt er Blöcke, Wasser und Hindernisse – und trifft selbstständige Entscheidungen.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'if-Abfragen verstehen',
      'Blöcke mit agent.detect() erkennen',
      'Bedingungen für Luft, Gras und Wasser prüfen',
      'Einfache Entscheidungen programmieren',
      'Nachrichten bei Fund ausgeben',
      'Grundlagen der Verzweigung',
    ],
    content: `
# Einfache Bedingungen

## Einführung
Bisher hat dein Agent immer blind Befehle ausgeführt. Aber was, wenn der Agent selbst entscheiden soll, was zu tun ist? In dieser Lektion lernst du **Bedingungen** – damit der Agent auf seine Umgebung reagieren kann.

## Was ist eine Bedingung?
Eine Bedingung ist eine Frage, die mit **Ja** oder **Nein** beantwortet werden kann. Im Code fragst du zum Beispiel: „Ist vor mir Luft?" Wenn ja → mache das. Wenn nein → mache etwas anderes.

## if in Python
\`\`\`python
if agent.detect(AIR, FORWARD):
    agent.say("Luft vorne!", "Friendly")
\`\`\`
Dieses Programm prüft, ob vor dem Agenten Luft ist. Wenn ja, gibt er eine Nachricht aus.

## elif und else
Mit **elif** (else if) kannst du mehrere Bedingungen prüfen:
\`\`\`python
if agent.detect(GRASS, FORWARD):
    agent.say("Gras gefunden!", "Friendly")
elif agent.detect(WATER, FORWARD):
    agent.say("Wasser erkannt!", "Friendly")
else:
    agent.say("Nichts Besonderes.", "Friendly")
\`\`\`

## Wichtige Befehle
- **agent.detect(AIR, FORWARD)** – Prüft, ob vor dem Agenten Luft ist
- **agent.detect(GRASS, FORWARD)** – Prüft, ob Gras vorne ist
- **agent.detect(WATER, FORWARD)** – Prüft, ob Wasser vorne ist
- **if / elif / else** – Bedingte Verzweigung

## Aufgabe 1: Block-Detektor
Schreibe ein Programm, das prüft, was vor dem Agenten liegt. Der Agent soll:
1. Vorwärts gehen
2. Prüfen: Ist Luft, Gras oder Wasser vorne?
3. Die richtige Nachricht ausgeben

## Aufgabe 2: Gras-Zähler
Der Agent geht 10 Schritte vorwärts und zählt bei jedem Schritt, ob Gras vorne ist. Am Ende gibt er die Gesamtzahl der Grasblöcke aus.

## Aufgabe 3: Hindernis-Scanner
Der Agent erkennt, ob vor ihm ein Hindernis (Stein) oder freier Weg (Luft) ist. Bei Hindernis: nach links drehen und 2 Schritte gehen.

## Reflexion
Was passiert, wenn du eine if-Bedingung vergisst? Kann der Agent mehrere Bedingungen gleichzeitig prüfen?
`,
    codeBlocks: [
      { name: 'if', description: 'Prüfe eine Bedingung', example: 'if agent.detect(AIR, FORWARD):', icon: '❓' },
      { name: 'elif', description: 'Alternative Bedingung', example: 'elif agent.detect(GRASS, FORWARD):', icon: '🔄' },
      { name: 'else', description: 'Andernfalls', example: 'else:', icon: '➡️' },
      { name: 'detect', description: 'Erkenne einen Block', example: 'agent.detect(AIR, FORWARD)', icon: '🔍' },
    ],
    studentActivity: `
**Aufgabe 1: Block-Detektor**
1. Gehe 5 Schritte vorwärts.
2. Prüfe bei jedem Schritt, was vorne ist.
3. Gib eine Nachricht aus (Luft, Gras, Wasser).

**Aufgabe 2: Gras-Zähler**
1. Initialisiere eine Variable \`gezaehlt = 0\`.
2. Gehe 10 Schritte und zähle bei jedem Gras-Block.
3. Am Ende: \`agent.say("Gefunden: " + str(gezaehlt))\`

**Aufgabe 3: Hindernis-Scanner**
1. Prüfe, ob vorne Luft ist.
2. Wenn ja: weitergehen.
3. Wenn nein: nach links drehen und 2 Schritte gehen.

**Reflexion im Team:**
Was passiert, wenn du eine if-Bedingung vergisst? Kann der Agent mehrere Bedingungen gleichzeitig prüfen?
`,
    teacherTip: 'Beginne damit, dass du die Schüler fragst: „Was würdet ihr tun, wenn vor euch eine Mauer steht?" Übertrage dann diese Logik auf den Agenten. Lasse die Schüler zuerst mit einfachen if-Abfragen experimentieren, bevor sie elif/else einführen.',
    quiz: [
      { id: 1, question: 'Was macht agent.detect(AIR, FORWARD)?', options: ['Bewegt den Agenten nach vorne', 'Prüft, ob vorne Luft ist', 'Setzt einen Luftblock', 'Zerstört einen Block'], correctAnswer: 1, explanation: 'agent.detect() prüft, ob ein bestimmter Block vor dem Agenten ist – ohne ihn zu bewegen.' },
      { id: 2, question: 'Was passiert, wenn die if-Bedingung nicht stimmt?', options: ['Das Programm stürzt ab', 'Der Code im if-Block wird übersprungen', 'Der Agent bewegt sich trotzdem', 'Es wird else ausgeführt'], correctAnswer: 1, explanation: 'Wenn die Bedingung nicht zutrifft, wird der Code im if-Block übersprungen.' },
      { id: 3, question: 'Wofür steht elif?', options: ['Else if – Alternative Bedingung', 'End line – Zeilenende', 'Else loop – Schleife', 'Electronic – Elektronisch'], correctAnswer: 0, explanation: 'elif steht für „else if" und prüft eine weitere Bedingung, wenn die vorherige nicht zutraf.' },
      { id: 4, question: 'Wie many Bedingungen kann man mit if/elif/else prüfen?', options: ['Nur eine', 'Genau zwei', 'Mehrere', 'Unendlich viele'], correctAnswer: 2, explanation: 'Man kann beliebig viele elif-Zweige haben, aber nur einen else am Ende.' },
      { id: 5, question: 'Was ist der Unterschied zwischen detect() und move()?', options: ['Kein Unterschied', 'detect() prüft, move() bewegt', 'detect() ist schneller', 'move() ist deprecated'], correctAnswer: 1, explanation: 'detect() prüft nur, ob ein Block da ist. move() bewegt den Agenten.' },
    ],
    xpReward: 75,
    unlocks: [22],
  },
  {
    id: 22,
    title: 'Mehrfach-Bedingungen',
    description: 'Komplexe Entscheidungen mit if/elif/else. Dein Agent lernt, verschiedene Blöcke zu unterscheiden und sortiert sie automatisch in die richtige Richtung.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Mehrfach-Bedingungen verstehen',
      'if/elif/else kombinieren',
      'Verschiedene Blöcke unterscheiden',
      'Sortierlogik programmieren',
      'Reihenfolge der Prüfungen verstehen',
      'Komplexe Verzweigungen bauen',
    ],
    content: `
# Mehrfach-Bedingungen

## Einführung
Manchmal reicht eine einzige Bedingung nicht aus. Was, wenn dein Agent rote UND blaue Wolle unterscheiden und in verschiedene Richtungen sortieren soll? In dieser Lektion lernst du, wie du mehrere Bedingungen hintereinander schaltest.

## Die Kette: if → elif → else
\`\`\`python
if agent.detect(RED_WOOL, FORWARD):
    agent.destroy(FORWARD)
    agent.set_item(RED_WOOL, 1, 1)
    agent.place(LEFT)
elif agent.detect(BLUE_WOOL, FORWARD):
    agent.destroy(FORWARD)
    agent.set_item(BLUE_WOOL, 1, 1)
    agent.place(RIGHT)
else:
    agent.say("Keine Wolle gefunden.", "Friendly")
\`\`\`

## Reihenfolge ist wichtig
Die Bedingungen werden von oben nach unten geprüft. Sobald eine zutrifft, werden die restlichen übersprungen. Deshalb solltest du die spezifischsten Bedingungen zuerst stellen.

## Wichtige Konzepte
- **if** – Erste Bedingung (wird zuerst geprüft)
- **elif** – Weitere Bedingungen (nur wenn vorherige nicht zutraf)
- **else** – Auffang, wenn keine Bedingung zutrifft
- **Verschachtelung** – Bedigungen innerhalb von Bedingungen

## Aufgabe 1: Sortiermaschine
Der Agent steht vor einer Reihe von Blöcken. Er sortiert:
- Rote Wolle → links
- Blaue Wolle → rechts
- Alles andere → ignorieren

## Aufgabe 2: Dreifarben-Sortierer
Erweitere das Programm: Der Agent erkennt 3 Farben (Rot, Blau, Grün) und platziert jede in eine eigene Richtung.

## Aufgabe 3: Material-Erkennung
Der Agent erkennt verschiedene Materialien (Stein, Holz, Sand) und gibt eine Beschreibung aus.

## Reflexion
Was passiert, wenn du die Reihenfolge der elif-Blöcke vertauschst? Warum ist die Reihenfolge wichtig?
`,
    codeBlocks: [
      { name: 'if', description: 'Erste Bedingung prüfen', example: 'if agent.detect(RED_WOOL, FORWARD):', icon: '❓' },
      { name: 'elif', description: 'Weitere Bedingung', example: 'elif agent.detect(BLUE_WOOL, FORWARD):', icon: '🔄' },
      { name: 'else', description: 'Auffang-Block', example: 'else:', icon: '➡️' },
      { name: 'destroy', description: 'Block zerstören', example: 'agent.destroy(FORWARD)', icon: '💥' },
      { name: 'place', description: 'Block platzieren', example: 'agent.place(LEFT)', icon: '🧱' },
    ],
    studentActivity: `
**Aufgabe 1: Sortiermaschine**
1. Scanne die Blöcke vor dir.
2. Rote Wolle → links platzieren.
3. Blaue Wolle → rechts platzieren.
4. Teste mit verschiedenen Farben.

**Aufgabe 2: Dreifarben-Sortierer**
1. Erkenne Rot, Blau und Grün.
2. Rot → links, Blau → rechts, Grün → nach vorne.
3. Gib bei jeder Erkennung eine Nachricht aus.

**Aufgabe 3: Material-Erkennung**
1. Erkenne Stein, Holz und Sand.
2. Bei Stein: „Hartes Material!"
3. Bei Holz: „Baumaterial!"
4. Bei Sand: „Lockeres Material!"

**Reflexion im Team:**
Was passiert, wenn du die Reihenfolge der elif-Blöcke vertauschst?
`,
    teacherTip: 'Erstelle eine Sortierstation mit verschiedenen Wollblöcken auf dem Boden. Die Schüler sollen den Agenten programmieren, um die Blöcke zu sortieren. Beginne mit 2 Farben und erhöhe dann auf 3+. Betone die Reihenfolge der Bedingungen.',
    quiz: [
      { id: 1, question: 'In welcher Reihenfolge werden if/elif/else geprüft?', options: ['Von unten nach oben', 'Zufällig', 'Von oben nach unten', 'Gleichzeitig'], correctAnswer: 2, explanation: 'Python prüft die Bedingungen von oben nach unten. Sobald eine zutrifft, werden die restlichen übersprungen.' },
      { id: 2, question: 'Was passiert, wenn eine elif-Bedingung zutrifft?', options: ['Alle weiteren elif werden auch geprüft', 'Nur else wird noch geprüft', 'Die restlichen Bedingungen werden übersprungen', 'Das Programm stoppt'], correctAnswer: 2, explanation: 'Sobald eine Bedingung zutrifft, werden alle restlichen elif/else-Blöcke übersprungen.' },
      { id: 3, question: 'Kann man mehrere elif-Blöcke haben?', options: ['Nein, nur einen', 'Ja, beliebig viele', 'Nur zwei', 'Nur mit else'], correctAnswer: 1, explanation: 'Man kann beliebig viele elif-Blöcke verwenden.' },
      { id: 4, question: 'Was ist der Zweck des else-Blocks?', options: ['Er prüft eine Bedingung', 'Er wird nur bei Fehler ausgeführt', 'Er fängt alle nicht erfüllten Bedingungen ab', 'Er beendet das Programm'], correctAnswer: 2, explanation: 'else wird ausgeführt, wenn keine der vorherigen if/elif-Bedingungen zutraf.' },
      { id: 5, question: 'Wann sollte man elif statt mehrerer if verwenden?', options: ['Wenn man alle Bedingungen parallel prüfen will', 'Wenn nur eine Bedingung zutreffen soll', 'Wenn man das Programm beenden will', 'Nie – if ist immer besser'], correctAnswer: 1, explanation: 'elif wird verwendet, wenn nur ein Zweig ausgeführt werden soll – wenn die Bedingungen gegenseitig ausschließen.' },
    ],
    xpReward: 75,
    unlocks: [23],
  },
  {
    id: 23,
    title: 'Variablen & Zähler',
    description: 'Dein Agent speichert Daten – Punkte, gezählte Blöcke, Zustände. Lerne, wie Variablen funktionieren und wie du damit rechnen kannst.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Variablen erstellen und nutzen',
      'Werte speichern und ändern',
      'Zähler verwenden',
      'Mit Variablen rechnen',
      'Global-Variablen verstehen',
      'Daten in Echtzeit ausgeben',
    ],
    content: `
# Variablen & Zähler

## Einführung
Variablen sind wie Schachteln, in denen du Daten speichern kannst. In dieser Lektion lernst du, wie du mit Variablen Punkte zählst, Blöcke trackst und Ergebnisse speicherst.

## Was ist eine Variable?
Eine Variable ist ein benannter Speicherplatz. Du kannst ihr einen Wert geben und später ändern:
\`\`\`python
gesammelt = 0
\`\`\`

## Variablen ändern
\`\`\`python
gesammelt = 0
gesammelt = gesammelt + 1  # jetzt ist gesammelt = 1
# oder kürzer:
gesammelt += 1             # jetzt ist gesammelt = 2
\`\`\`

## Global-Variablen
Wenn du eine Variable in einer Funktion ändern willst, brauchst du **global**:
\`\`\`python
gesammelt = 0

def sammle():
    global gesammelt
    if agent.detect(STONE, FORWARD):
        agent.destroy(FORWARD)
        gesammelt += 1
        agent.say("Gesammelt: " + str(gesammelt), "Friendly")
\`\`\`

## Variablen in der Ausgabe
Verwende **str()**, um Zahlen in Text umzuwandeln:
\`\`\`python
agent.say("Punkte: " + str(punkte), "Friendly")
\`\`\`

## Aufgabe 1: Block-Sammler
Der Agent geht 10 Schritte vorwärts und zählt alle Steine, die er zerstört. Am Ende gibt er die Gesamtzahl aus.

## Aufgabe 2: Punkte-System
Erstelle ein einfaches Punktesystem:
- Stein zerstört = +1 Punkt
- Holz zerstört = +2 Punkte
- Am Ende: Gesamtpunkte ausgeben

## Aufgabe 3: Doppel-Zähler
Zähle gleichzeitig Steine UND Holz in zwei verschiedenen Variablen. Gib beide am Ende aus.

## Reflexion
Was passiert, wenn du die Variable nicht mit 0 initialisierst? Warum brauchst du das Schlüsselwort global?
`,
    codeBlocks: [
      { name: 'Variable', description: 'Wert speichern', example: 'punkte = 0', icon: '📦' },
      { name: '+=', description: 'Wert erhöhen', example: 'punkte += 1', icon: '➕' },
      { name: 'global', description: 'Variable in Funktion ändern', example: 'global gesammelt', icon: '🌐' },
      { name: 'str()', description: 'Zahl in Text umwandeln', example: 'str(punkte)', icon: '📝' },
    ],
    studentActivity: `
**Aufgabe 1: Block-Sammler**
1. Initialisiere \`gesammelt = 0\`.
2. Gehe 10 Schritte vorwärts.
3. Bei jedem Stein: zerstören und \`gesammelt += 1\`.
4. Am Ende: \`agent.say("Steine: " + str(gesammelt))\`

**Aufgabe 2: Punkte-System**
1. \`punkte = 0\`
2. Stein zerstört: \`punkte += 1\`
3. Holz zerstört: \`punkte += 2\`
4. Am Ende ausgeben.

**Aufgabe 3: Doppel-Zähler**
1. \`steine = 0\` und \`holz = 0\`
2. Bei Stein: \`steine += 1\`
3. Bei Holz: \`holz += 1\`
4. Am Ende beide Werte ausgeben.

**Reflexion im Team:**
Was passiert, wenn du die Variable nicht mit 0 initialisierst?
`,
    teacherTip: 'Zeige zuerst, wie man mit Papier und Stift zählt – dann übertrage das Konzept auf den Code. Erstelle eine Welt mit verstreuten Blöcken differenter Materialien. Die Schüler programmieren den Agenten, um die Blöcke zu sammeln und zu zählen.',
    quiz: [
      { id: 1, question: 'Was macht die Zeile "punkte = 0"?', options: ['Setzt punkte auf 1', 'Erstellt eine Variable und speichert 0', 'Löscht die Variable', 'Druckt 0 auf den Bildschirm'], correctAnswer: 1, explanation: 'Die Zeile erstellt eine Variable namens "punkte" und weist ihr den Wert 0 zu.' },
      { id: 2, question: 'Was bedeutet gesammelt += 1?', options: ['gesammelt wird 1', 'gesammelt wird um 1 erhöht', '1 wird zu gesammelt addiert', 'Antwort 2 und 3 sind richtig'], correctAnswer: 3, explanation: '+= erhöht den aktuellen Wert der Variable um 1. Es ist die Kurzform von gesammelt = gesammelt + 1.' },
      { id: 3, question: 'Warum braucht man "global" in einer Funktion?', options: ['Damit die Funktion schneller läuft', 'Um eine äußere Variable in der Funktion zu ändern', 'Es ist ein Pflichtbefehl', 'Nur für Fehlermeldungen'], correctAnswer: 1, explanation: 'Ohne "global" erstellt die Funktion eine lokale Variable. Mit "global" greift sie auf die äußere Variable zu.' },
      { id: 4, question: 'Was passiert, wenn du str() vergisst?', options: ['Nichts – Python wandert automatisch um', 'Ein Fehler – Zahl + Text geht nicht', 'Die Zahl wird gelöscht', 'Der Text wird zur Zahl'], correctAnswer: 1, explanation: 'Python kann Zahl und Text nicht direkt verketten. str() wandelt die Zahl in einen Text um.' },
      { id: 5, question: 'Was ist der Anfangswert einer Zähler-Variable?', options: ['1', '100', '0', 'Es gibt keinen Anfangswert'], correctAnswer: 2, explanation: 'Ein Zähler beginnt normalerweise bei 0, weil noch nichts gezählt wurde.' },
    ],
    xpReward: 75,
    unlocks: [24],
  },
  {
    id: 24,
    title: 'Funktionen mit Parametern',
    description: 'Deine Funktionen werden flexibel. Mit Parametern kannst du denselben Code für verschiedene Materialien, Längen und Formen wiederverwenden.',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Funktionen mit Parametern schreiben',
      'Eingabewerte an Funktionen übergeben',
      'Wiederverwendbaren Code erstellen',
      'Mehrere Parameter kombinieren',
      'Funktionen aufrufen mit konkreten Werten',
      'Code modular aufbauen',
    ],
    content: `
# Funktionen mit Parametern

## Einführung
Du kennst bereits einfache Funktionen mit \`def\`. Aber bisher konntest du ihnen keine Daten übergeben. Mit **Parametern** werden Funktionen flexibel – du kannst Längen, Materialien und Formen als Eingabe verwenden.

## Parameter definieren
\`\`\`python
def bau_wand(laenge, material):
    for i in range(laenge):
        agent.set_item(material, 1, 1)
        agent.place(FORWARD)
        agent.move(FORWARD, 1)
\`\`\`

## Funktion aufrufen
\`\`\`python
bau_wand(5, STONE)    # Baut eine 5-Stein-Wand
bau_wand(8, WOOD)     # Baut eine 8-Holz-Wand
\`\`\`

## Mehrere Parameter
\`\`\`python
def bau_bruecke(laenge, material):
    for i in range(laenge):
        agent.set_item(material, 1, 1)
        agent.place(DOWN)
        agent.move(FORWARD, 1)
\`\`\`

## Wichtige Konzepte
- **Parameter** – Platzhalter in der Funktionsdefinition (z.B. \`laenge\`)
- **Argument** – Der konkrete Wert beim Aufruf (z.B. \`5\`)
- **Wiederverwendbarkeit** – Eine Funktion, viele Anwendungen

## Aufgabe 1: Modulare Brücke
Schreibe eine Funktion \`bau_bruecke(laenge, material)\` und baue Brücken aus verschiedenen Materialien und Längen.

## Aufgabe 2: Fenster-Funktion
Erstelle \`bau_fenster(breite, hoehe)\` – der Agent baut ein Fenster aus Glasblöcken.

## Aufgabe 3: Bauplan-Kombination
Kombiniere mehrere Funktionen: \`bau_wand()\`, \`bau_tuer()\`, \`bau_fenster()\` – um ein ganzes Haus zu bauen.

## Reflexion
Was passiert, wenn du weniger Argumente übergibst als die Funktion Parameter hat? Was wäre der Vorteil, wenn du die Funktion für verschiedene Häuser wiederverwenden könntest?
`,
    codeBlocks: [
      { name: 'def', description: 'Funktion mit Parametern definieren', example: 'def bau_wand(laenge, material):', icon: '🔧' },
      { name: 'Parameter', description: 'Eingabewerte übergeben', example: 'bau_wand(5, STONE)', icon: '📥' },
      { name: 'for range', description: 'Schleife mit Parameter', example: 'for i in range(laenge):', icon: '🔁' },
      { name: 'set_item', description: 'Item auswählen', example: 'agent.set_item(material, 1, 1)', icon: '🎒' },
    ],
    studentActivity: `
**Aufgabe 1: Modulare Brücke**
1. Definiere \`def bau_bruecke(laenge, material):\`
2. Rufe auf: \`bau_bruecke(10, STONE)\`
3. Teste mit verschiedenen Werten.

**Aufgabe 2: Fenster-Funktion**
1. \`def bau_fenster(breite, hoehe):\`
2. Baue ein 3×2-Fenster aus Glas.
3. Teste mit verschiedenen Größen.

**Aufgabe 3: Bauplan-Kombination**
1. \`bau_wand(6, STONE)\`
2. \`bau_tuer()\`
3. \`bau_fenster(3, 2)\`
4. Kombiniere alles zu einem Haus.

**Reflexion im Team:**
Was wäre der Vorteil, wenn du die Funktion für verschiedene Häuser wiederverwenden könntest?
`,
    teacherTip: 'Lasse die Schüler zuerst eine Funktion ohne Parameter schreiben (z.B. bau_wand()). Dann zeige, wie man dieselbe Funktion mit verschiedenen Werten aufruft. Das Verständnis für Parameter entsteht am besten durch Experimente.',
    quiz: [
      { id: 1, question: 'Was ist der Unterschied zwischen Parameter und Argument?', options: ['Kein Unterschied', 'Parameter = Definition, Argument = Aufruf', 'Parameter ist größer', 'Argument ist ein Fehler'], correctAnswer: 1, explanation: 'Parameter ist der Platzhalter in der Funktionsdefinition. Argument ist der konkrete Wert beim Aufruf.' },
      { id: 2, question: 'Was macht def bau_wand(laenge, material)?', options: ['Ruft eine Funktion auf', 'Definiert eine Funktion mit zwei Parametern', 'Löscht eine Variable', 'Erstellt eine Schleife'], correctAnswer: 1, explanation: 'def definiert eine neue Funktion mit den Parametern laenge und material.' },
      { id: 3, question: 'Was passiert, wenn du beim Aufruf zu wenig Argumente übergibst?', options: ['Python errät den fehlenden Wert', 'Ein Fehler – TypeError', 'Die Funktion wird übersprungen', 'Es wird None verwendet'], correctAnswer: 1, explanation: 'Python gibt einen TypeError aus, weil nicht genügend Argumente übergeben wurden.' },
      { id: 4, question: 'Was ist der Vorteil von Funktionen mit Parametern?', options: ['Der Code läuft schneller', 'Man kann dieselbe Funktion mit verschiedenen Werten verwenden', 'Man braucht keine Schleifen mehr', 'Die Funktion wird automatisch ausgeführt'], correctAnswer: 1, explanation: 'Mit Parametern wird die Funktion flexibel und wiederverwendbar.' },
      { id: 5, question: 'Wie rufst du eine Funktion auf?', options: ['def bau(5)', 'bau(5)', 'bau[5]', 'bau{5}'], correctAnswer: 1, explanation: 'Man ruft eine Funktion mit dem Namen und Klammern auf: bau(5)' },
    ],
    xpReward: 100,
    unlocks: [25],
  },
  {
    id: 25,
    title: 'Bedingungen in Funktionen',
    description: 'Kombiniere Bedingungen mit Funktionen. Deine Funktionen treffen jetzt eigenständige Entscheidungen basierend auf Eingabewerten.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'if in Funktionen verwenden',
      'Basierend auf Parameter entscheiden',
      'Material-spezifische Logik programmieren',
      'Fehlerbehandlung in Funktionen',
      'Komplexe Funktionen bauen',
      'Verschachtelte Bedingungen',
    ],
    content: `
# Bedingungen in Funktionen

## Einführung
Was, wenn deine Funktion nicht nur Befehle ausführt, sondern auch Entscheidungen trifft? In dieser Lektion kombinierst du Bedingungen mit Funktionen – damit dein Code intelligent wird.

## if in einer Funktion
\`\`\`python
def pruefe_material(material):
    if material == STONE:
        agent.say("Stein – hartes Material!", "Friendly")
    elif material == WOOD:
        agent.say("Holz – Baustoff!", "Friendly")
    else:
        agent.say("Unbekanntes Material.", "Friendly")
\`\`\`

## Farbcodierte Tür
\`\`\`python
def oeffne_tuer(farbe):
    if farbe == RED_WOOL:
        agent.say("Zutritt gewährt!", "Friendly")
        agent.destroy(FORWARD)
    elif farbe == BLUE_WOOL:
        agent.say("Falsche Farbe!", "Friendly")
    else:
        agent.say("Keine Tür erkannt.", "Friendly")
\`\`\`

## Bedingungen + Schleifen
\`\`\`python
def bau_sicher(laenge):
    for i in range(laenge):
        if agent.detect(AIR, DOWN):
            agent.set_item(STONE, 1, 1)
            agent.place(DOWN)
        agent.move(FORWARD, 1)
\`\`\`

## Aufgabe 1: Farbcodierte Tür
Schreibe eine Funktion \`oeffne_tuer(farbe)\` – die Tür öffnet sich nur bei der richtigen Farbe.

## Aufgabe 2: Sicheres Bauen
Der Agent baut nur auf festem Grund. \`bau_sicher(laenge)\` – wenn Luft unten ist → Stein setzen, dann weiter.

## Aufgabe 3: Material-Reaktion
\`\`\`python
def reagiere(art):
    if art == "stein":
        # Hartes Material – weitergehen
    elif art == "wasser":
        # Brücke bauen
    elif art == "lava":
        # Alert ausgeben
\`\`\`

## Reflexion
Warum ist es nützlich, Bedingungen IN Funktionen zu haben statt außerhalb?
`,
    codeBlocks: [
      { name: 'if in def', description: 'Bedingung in Funktion', example: 'if material == STONE:', icon: '❓' },
      { name: 'Parameter', description: 'Entscheidung basierend auf Eingabe', example: 'def pruefe(farbe):', icon: '📥' },
      { name: 'Vergleich', description: 'Werte vergleichen mit ==', example: 'if farbe == RED_WOOL:', icon: '⚖️' },
      { name: 'Kombination', description: 'if + for in einer Funktion', example: 'for i in range(laenge):', icon: '🔗' },
    ],
    studentActivity: `
**Aufgabe 1: Farbcodierte Tür**
1. \`def oeffne_tuer(farbe):\`
2. Bei ROT: „Zutritt!" + Tür öffnen.
3. Bei BLAU: „Falsche Farbe!"
4. Teste mit verschiedenen Farben.

**Aufgabe 2: Sicheres Bauen**
1. \`def bau_sicher(laenge):\`
2. Bei jedem Schritt: Prüfe ob Luft unten.
3. Wenn Luft: Stein setzen.
4. Dann weitergehen.

**Aufgabe 3: Material-Reaktion**
1. Erkennung: Stein → weiter, Wasser → Brücke, Lava → Alert.
2. Teste alle drei Fälle.

**Reflexion im Team:**
Warum ist es nützlich, Bedingungen IN Funktionen zu haben?
`,
    teacherTip: 'Erstelle eine Welt mit verschiedenen Wolltoren (rot, blau, grün). Die Schüler programmieren eine Funktion, die je nach Farbe reagiert. Dann erweitere um sicherheitstechnische Bedingungen.',
    quiz: [
      { id: 1, question: 'Kann man if in einer Funktion verwenden?', options: ['Nein, das ist verboten', 'Ja, das ist möglich und nützlich', 'Nur mit while', 'Nur außerhalb von Funktionen'], correctAnswer: 1, explanation: 'Ja, if/elif/else funktioniert innerhalb von Funktionen genauso wie außerhalb.' },
      { id: 2, question: 'Was prüft if material == STONE?', options: ['Ob material und STONE gleich sind', 'Ob material größer als STONE ist', 'Ob material existiert', 'Ob STONE ein String ist'], correctAnswer: 0, explanation: '== prüft, ob zwei Werte gleich sind.' },
      { id: 3, question: 'Was ist der Vorteil von Bedingungen in Funktionen?', options: ['Der Code wird kürzer', 'Die Funktion wird intelligenter', 'Man braucht keine Parameter', 'Es ist Pflicht'], correctAnswer: 1, explanation: 'Bedingungen in Funktionen ermöglichen es der Funktion, situationsabhängig zu handeln.' },
      { id: 4, question: 'Was macht bau_sicher(5)?', options: ['Baut 5 Häuser', 'Baut 5 Blöcke sicher auf festem Grund', 'Prüft 5 Bedingungen', 'Zerstört 5 Blöcke'], correctAnswer: 1, explanation: 'Die Funktion baut 5 Blöcke und prüft dabei, ob der Grund fest ist.' },
      { id: 5, question: 'Was ist == vs. = ?', options: ['Gleicher Operator', '== vergleicht, = weist zu', '= vergleicht, == weist zu', 'Beide weisen zu'], correctAnswer: 1, explanation: '== ist der Vergleichsoperator (prüft Gleichheit). = ist der Zuweisungsoperator (speichert einen Wert).' },
    ],
    xpReward: 100,
    unlocks: [26],
  },
  {
    id: 26,
    title: 'Komplexe Muster',
    description: 'Schachbrettmuster, Zickzack und Parkett – dein Agent kombiniert Schleifen und Bedingungen, um kunstvolle Muster zu erzeugen.',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Verschachtelte Schleifen mit Bedingungen',
      'Muster mit if/else erzeugen',
      'Schachbrett-Logik verstehen',
      'Zickzack-Muster programmieren',
      'Koordinatenbasierte Muster',
      'Komplexe Schleifenlogik',
    ],
    content: `
# Komplexe Muster

## Einführung
Du kennst bereits Schleifen und Bedingungen. Jetzt kombinierst du beides, um kunstvolle Muster zu erzeugen – wie ein Parkettboden oder ein Schachbrett.

## Schachbrett mit if/else
\`\`\`python
for zeile in range(8):
    for spalte in range(8):
        if (zeile + spalte) % 2 == 0:
            agent.set_item(WHITE_WOOL, 1, 1)
        else:
            agent.set_item(BLACK_WOOL, 1, 1)
        agent.place(DOWN)
        agent.move(RIGHT, 1)
    agent.move(FORWARD, 1)
    # Zurück zur Startposition der Zeile
\`\`\`

## Der Modulo-Operator (%)
\`\`\`python
ergebnis = 10 % 3  # = 1 (Rest von 10 ÷ 3)
\`\`\`
% gibt den Rest einer Division. Mit % 2 kannst du gerade/ungerade Zahlen erkennen.

## Zickzack-Muster
\`\`\`python
for i in range(10):
    if i % 2 == 0:
        agent.move(FORWARD, 3)
    else:
        agent.move(RIGHT, 3)
\`\`\`

## Aufgabe 1: Schachbrett
Erstelle ein 6×6-Schachbrett aus weißer und schwarzer Wolle.

## Aufgabe 2: Zickzack-Pfad
Ein Pfad, der bei geraden Schritten geradeaus und bei ungeraden nach rechts geht.

## Aufgabe 3: Regenbogen-Zeile
Wechsle bei jedem Schritt die Farbe: Rot, Orange, Gelb, Grün, Blau.

## Reflexion
Warum braucht man % 2 für Schachbrettmuster? Was passiert, wenn du % 3 verwendest?
`,
    codeBlocks: [
      { name: '%', description: 'Modulo – Rest der Division', example: '(zeile + spalte) % 2', icon: '🔢' },
      { name: 'for-for', description: 'Verschachtelte Schleifen', example: 'for zeile in range(8):', icon: '🔁' },
      { name: 'if-else', description: 'Muster-Wechsel', example: 'if (zeile + spalte) % 2 == 0:', icon: '❓' },
      { name: 'range', description: 'Wiederholungen', example: 'range(8)', icon: '📊' },
    ],
    studentActivity: `
**Aufgabe 1: Schachbrett**
1. 8×8-Schleife (zeile, spalte).
2. Wenn (zeile + spalte) % 2 == 0: weiß.
3. Sonst: schwarz.
4. Jedes Feld als Block platzieren.

**Aufgabe 2: Zickzack-Pfad**
1. 10 Schritte.
2. Gerade: vorwärts 3.
3. Ungerade: rechts 3.

**Aufgabe 3: Regenbogen-Zeile**
1. Farbliste: [RED, ORANGE, YELLOW, GREEN, BLUE]
2. Bei jedem Schritt: nächste Farbe.

**Reflexion im Team:**
Was passiert, wenn du % 3 statt % 2 verwendest?
`,
    teacherTip: 'Zeige zuerst, wie % 2 funktioniert (gerade/ungerade). Dann ein einfaches Schachbrett auf Papier mit nummerierten Feldern. Lasse die Schüler das Muster vorher auf Papier planen, bevor sie den Code schreiben.',
    quiz: [
      { id: 1, question: 'Was ist 7 % 2?', options: ['3', '1', '7', '0'], correctAnswer: 1, explanation: '7 ÷ 2 = 3 Rest 1. Also ist 7 % 2 = 1.' },
      { id: 2, question: 'Wofür steht % in Python?', options: ['Prozent', 'Modulo – Rest der Division', 'Teilen', 'Multiplizieren'], correctAnswer: 1, explanation: '% ist der Modulo-Operator und gibt den Rest einer Division zurück.' },
      { id: 3, question: 'Warum braucht man verschachtelte Schleifen für ein Schachbrett?', options: ['Für Zeilen UND Spalten', 'Nur für Farben', 'Es geht auch ohne', 'Für Geschwindigkeit'], correctAnswer: 0, explanation: 'Ein Schachbrett hat Zeilen und Spalten – jede braucht eine eigene Schleife.' },
      { id: 4, question: 'Was bedeutet (2 + 3) % 2 == 0?', options: ['Die Position ist gerade', 'Die Position ist ungerade', 'Es ist eine Fehlermeldung', 'Die Schleife endet'], correctAnswer: 0, explanation: '(2+3) = 5, und 5 % 2 = 1. Also ist die Aussage False (ungerade).' },
      { id: 5, question: 'Was kann der Modulo-Operator in Mustererkennung?', options: ['Farben mischen', 'Gerade/ungerade Positionen erkennen', 'Blöcke zerstören', 'Geschwindigkeit ändern'], correctAnswer: 1, explanation: 'Mit % 2 kannst du erkennen, ob eine Position gerade oder ungerade ist – ideal für Schachbrettmuster.' },
    ],
    xpReward: 100,
    unlocks: [27],
  },
  {
    id: 27,
    title: 'Umgebungs-Checks',
    description: 'Dein Agent scannt seine Umgebung und reagiert intelligent auf Wasser, Höhen und Hindernisse. Er baut nur auf sicherem Grund.',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Umgebung mit detect() scannen',
      'Wasser und Hindernisse erkennen',
      'Höhenveränderungen verarbeiten',
      'Sichere Positionen berechnen',
      'Adaptives Verhalten programmieren',
      'Komplexe Umgebungsanalysen',
    ],
    content: `
# Umgebungs-Checks

## Einführung
In der echten Minecraft-Welt ist der Boden nicht immer gleich. Es gibt Hügel, Löcher, Wasser und Lava. In dieser Lektion lernst du, wie dein Agent diese Hindernisse erkennt und intelligent darauf reagiert.

## Mehrere Richtungen scannen
\`\`\`python
def scanne_umgebung():
    if agent.detect(AIR, FORWARD):
        agent.say("Freier Weg vorne", "Friendly")
    if agent.detect(WATER, DOWN):
        agent.say("Wasser unter mir!", "Friendly")
    if agent.detect(STONE, DOWN):
        agent.say("Fester Grund", "Friendly")
\`\`\`

## Sicheres Bauen über Wasser
\`\`\`python
def buecke_ueber_wasser():
    while agent.detect(WATER, FORWARD):
        agent.set_item(STONE, 1, 1)
        agent.place(DOWN)
        agent.move(FORWARD, 1)
    agent.move(FORWARD, 1)
\`\`\`

## Position auslesen
\`\`\`python
pos = agent.get_position()
agent.say("Ich bin bei X=" + str(pos.x) + " Y=" + str(pos.y) + " Z=" + str(pos.z))
\`\`\`

## Aufgabe 1: Sicherer Turm
Der Agent baut einen Turm. Bei jedem Stockwerk prüft er: Ist der Boden fest? Nur dann weiterbauen.

## Aufgabe 2: Wasser-Brücke
Der Agent erkennt Wasser und baut automatisch eine Brücke darüber.

## Aufgabe 3: Hügel-Steigung
Der Agent erkennt, ob vor ihm ein Hügel ist (Block höher) und baut eine Treppe.

## Reflexion
Was passiert, wenn der Agent ein endloses Wasserfeld erreicht? Wie könnte man das Programm stoppen?
`,
    codeBlocks: [
      { name: 'detect(WATER, DOWN)', description: 'Prüfe Wasser unter dir', example: 'agent.detect(WATER, DOWN)', icon: '💧' },
      { name: 'detect(AIR, FORWARD)', description: 'Prüfe freien Weg', example: 'agent.detect(AIR, FORWARD)', icon: '🌬️' },
      { name: 'get_position', description: 'Aktuelle Position abrufen', example: 'agent.get_position()', icon: '📍' },
      { name: 'while', description: 'Schleife mit Bedingung', example: 'while agent.detect(WATER, FORWARD):', icon: '🔁' },
    ],
    studentActivity: `
**Aufgabe 1: Sicherer Turm**
1. Prüfe DOWN auf feste Blöcke.
2. Wenn fest: weiterbauen.
3. Wenn Luft: stoppen oder absteigen.

**Aufgabe 2: Wasser-Brücke**
1. Gehe vorwärts.
2. Bei Wasser: Stein platzieren UND weitergehen.
3. Bis kein Wasser mehr.

**Aufgabe 3: Hügel-Treppe**
1. Prüfe, ob vorne ein Block höher ist.
2. Wenn ja: Stein als Treppe setzen.
3. Dann weitergehen.

**Reflexion im Team:**
Was passiert bei endlosem Wasserfeld?
`,
    teacherTip: 'Erstelle eine abwechslungsreiche Welt mit Wasser, Hügeln und Löchern. Die Schüler programmieren den Agenten, um verschiedene Hindernisse zu überwinden. Beginne mit einem einfachen Szenario und erweitere dann.',
    quiz: [
      { id: 1, question: 'Was prüft agent.detect(WATER, DOWN)?', options: ['Ob Wasser vorne ist', 'Ob Wasser unter dem Agenten ist', 'Ob der Agent schwimmen kann', 'Ob es regnet'], correctAnswer: 1, explanation: 'DOWN prüft die Position unter dem Agenten.' },
      { id: 2, question: 'Was ist der Unterschied zwischen while und for?', options: ['Kein Unterschied', 'while prüft Bedingung, for zählt', 'for ist schneller', 'while ist nur für Zahlen'], correctAnswer: 1, explanation: 'for läuft eine bestimmte Anzahl Male. while läuft, solange eine Bedingung wahr ist.' },
      { id: 3, question: 'Was macht agent.get_position()?', options: ['Bewegt den Agenten', 'Gibt die aktuelle Position zurück', 'Setzt eine neue Position', 'Löscht die Position'], correctAnswer: 1, explanation: 'get_position() gibt die X, Y, Z Koordinaten des Agenten zurück.' },
      { id: 4, question: 'Warum ist es wichtig, nach unten zu scannen?', options: ['Um die Geschwindigkeit zu messen', 'Um den Boden zu prüfen', 'Um die Höhe zu ignorieren', 'Nur aus Neugier'], correctAnswer: 1, explanation: 'Nach unten scannen zeigt, ob der Boden fest, flüssig oder luftig ist – wichtig für sicheres Bauen.' },
      { id: 5, question: 'Wann endet eine while-Schleife?', options: ['Nach 10 Durchläufen', 'Wenn die Bedingung falsch wird', 'Wenn man stoppt drückt', 'Nie'], correctAnswer: 1, explanation: 'while endet, wenn die Bedingung nicht mehr zutrifft (wahr → falsch).' },
    ],
    xpReward: 125,
    unlocks: [28],
  },
  {
    id: 28,
    title: 'Redstone-Interaktionen',
    description: 'Dein Agent reagiert auf Knöpfe, Hebel und Redstone-Signale. Türen öffnen sich nur mit dem richtigen Code – wie in einem Geheimlabor.',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Redstone-Signale verstehen',
      'Chat-Befehle als Trigger nutzen',
      'Bedingte Aktionen programmieren',
      'Sicherheitssysteme bauen',
      'Passwort-Logik implementieren',
      'Interaktive Objekte steuern',
    ],
    content: `
# Redstone-Interaktionen

## Einführung
Redstone ist die Elektronik in Minecraft. In dieser Lektion lernst du, wie dein Agent auf Chat-Befehle und Redstone-Signale reagiert – wie ein Sicherheitssystem in einem Geheimlabor.

## Chat als Trigger
\`\`\`python
def oeffne_tuer():
    if player.has_item(GOLD_BLOCK):
        blocks.fill(AIR, positions.add(player.position(), 0, 1, 0),
                    positions.add(player.position(), 0, 3, 0))
        agent.say("Tür geöffnet!", "Friendly")
    else:
        agent.say("Kein Goldblock – Zutritt verweigert!", "Friendly")

player.on_chat("oeffne", oeffne_tuer)
\`\`\`

## Passwort-System
\`\`\`python
def check_passwort(geheimnis):
    if geheimnis == "secretpassword":
        agent.say("Willkommen!", "Friendly")
        # Tür öffnen
    else:
        agent.say("Falsches Passwort!", "Friendly")

player.on_chat("oeffne123", lambda: check_passwort("oeffne123"))
\`\`\`

## Mehrstufige Sicherheit
\`\`\`python
stufe = 0

def erhoehe_sicherheit():
    global stufe
    stufe += 1
    if stufe >= 3:
        agent.say("Alarm! Maximale Sicherheit!", "Friendly")
\`\`\`

## Aufgabe 1: Redstone-Tür
Eine Tür öffnet sich nur, wenn der Spieler einen Goldblock im Inventar hat UND den richtigen Chat-Befehl sendet.

## Aufgabe 2: Geheimes Labor
Erstelle ein Passwort-System. Nur mit dem richtigen Befehl öffnet sich der Zugang.

## Aufgabe 3: Alarm-System
Nach 3 falschen Versuchen wird ein Alarm ausgelöst.

## Reflexion
Was sind die Schwachstellen eines Passwort-Systems? Wie könnte man es sicherer machen?
`,
    codeBlocks: [
      { name: 'on_chat', description: 'Chat als Trigger nutzen', example: 'player.on_chat("oeffne", oeffne_tuer)', icon: '💬' },
      { name: 'has_item', description: 'Inventar prüfen', example: 'player.has_item(GOLD_BLOCK)', icon: '🎒' },
      { name: 'blocks.fill', description: 'Bereich verändern', example: 'blocks.fill(AIR, pos1, pos2)', icon: '🔲' },
      { name: 'global', description: 'Variable in Funktion ändern', example: 'global stufe', icon: '🌐' },
    ],
    studentActivity: `
**Aufgabe 1: Redstone-Tür**
1. Prüfe Goldblock im Inventar.
2. Bei Gold: Tür öffnen (Wände entfernen).
3. Ohne Gold: „Zutritt verweigert!"

**Aufgabe 2: Geheimes Labor**
1. Passwort: „secretpassword".
2. Richtig: Zugang öffnen.
3. Falsch: „Falsches Passwort!"

**Aufgabe 3: Alarm-System**
1. Zähle falsche Versuche.
2. Bei 3+: Alarm auslösen.

**Reflexion im Team:**
Was sind die Schwachstellen eines Passwort-Systems?
`,
    teacherTip: 'Erstelle ein „Geheimlabor" mit verschlossenen Türen. Die Schüler programmieren die Zugangskontrolle. Beginne mit einfachem Gold-Check, dann Passwort-Logik. Diskutiere danach echte Sicherheitssysteme und deren Schwachstellen.',
    quiz: [
      { id: 1, question: 'Was macht player.on_chat()?', options: ['Sendet eine Nachricht', 'Reagiert auf einen Chat-Befehl', 'Löscht Nachrichten', 'Zeigt den Chat an'], correctAnswer: 1, explanation: 'on_chat() registriert eine Funktion, die ausgeführt wird, wenn der Spieler einen bestimmten Chat-Befehl sendet.' },
      { id: 2, question: 'Was macht blocks.fill()?', options: ['Füllt Inventar', 'Füllt einen Bereich mit Blöcken', 'Löscht Blöcke', 'Prüft Blöcke'], correctAnswer: 1, explanation: 'blocks.fill() füllt einen definierten Bereich mit einem bestimmten Blocktyp.' },
      { id: 3, question: 'Warum braucht man player.has_item() für Sicherheit?', options: ['Weil es Pflicht ist', 'Um zu prüfen, ob der Spieler einen bestimmten Gegenstand hat', 'Für Geschwindigkeit', 'Nur als Dekoration'], correctAnswer: 1, explanation: 'has_item() prüft, ob ein bestimmter Gegenstand im Inventar ist – als zusätzliche Sicherheitsebene.' },
      { id: 4, question: 'Was ist ein Lambda in Python?', options: ['Ein Fehler', 'Eine anonyme Funktion', 'Ein Typfehler', 'Eine Schleife'], correctAnswer: 1, explanation: 'Lambda ist eine kurze, anonyme Funktion ohne Namen – nützlich für einfache Aufrufe.' },
      { id: 5, question: 'Was passiert nach 3 falschen Passwörtern im Alarm-System?', options: ['Das Programm löscht sich', 'Ein Alarm wird ausgelöst', 'Die Tür öffnet sich trotzdem', 'Nichts passiert'], correctAnswer: 1, explanation: 'Bei 3 oder mehr Fehlversuchen wird der Alarm ausgelöst – eine typische Sicherheitsmaßnahme.' },
    ],
    xpReward: 125,
    unlocks: [29],
  },
  {
    id: 29,
    title: 'Mini-Spiele',
    description: 'Erstelle interaktive Spiele mit deinem Agenten – Punkte, Timer und Spielregeln. Der Agent wird zur Spielfigur.',
    phase: 'loops',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Spiellogik programmieren',
      'Punkte-Systeme erstellen',
      'Timer und Wartezeiten nutzen',
      'Spielregeln definieren',
      'Zufallsgeneratoren verwenden',
      'Mehrspieler-Interactionen',
    ],
    content: `
# Mini-Spiele

## Einführung
Jetzt wird es spannend! Du programmierst dein erstes Spiel. Der Agent wird zur Spielfigur, du erstellst Regeln und Punkte. Bist du bereit?

## Wartezeiten mit loops.pause()
\`\`\`python
import loops

def countdown():
    for i in range(5, 0, -1):
        agent.say(str(i), "Friendly")
        loops.pause(1000)  # 1 Sekunde warten
    agent.say("LOS!", "Friendly")
\`\`\`

## Zufallsgeneratoren
\`\`\`python
import random

def zufalls_aufgabe():
    aufgabe = random.randint(1, 3)
    if aufgabe == 1:
        agent.say("Baue eine Brücke!", "Friendly")
    elif aufgabe == 2:
        agent.say("Sammle 5 Steine!", "Friendly")
    else:
        agent.say("Erkunde den Turm!", "Friendly")
\`\`\`

## Punkte-System
\`\`\`python
punkte = 0

def belohnung():
    global punkte
    punkte += 10
    agent.say("Punkte: " + str(punkte), "Friendly")
\`\`\`

## Aufgabe 1: Block-Jagd
Der Agent versteckt sich an verschiedenen Stellen. Der Spieler muss ihn innerhalb eines Zeitlimits finden. Punkte für Geschwindigkeit.

## Aufgabe 2: Bau-Wettbewerb
Zwei Teams bauen gleichzeitig. Das Team mit dem höheren Score gewinnt. Punkte für jede abgeschlossene Struktur.

## Aufgabe 3: Rätsel-Pfad
Der Agent stellt 3 Rätsel. Bei richtiger Antwort: +10 Punkte. Bei falscher: –5 Punkte. Am Ende: Gesamtpunktzahl.

## Reflexion
Was macht ein gutes Spiel aus? Wie können wir Spannung und Fairness programmieren?
`,
    codeBlocks: [
      { name: 'loops.pause()', description: 'Wartezeit einfügen', example: 'loops.pause(1000)', icon: '⏱️' },
      { name: 'random.randint()', description: 'Zufallszahl generieren', example: 'random.randint(1, 10)', icon: '🎲' },
      { name: 'for range()', description: 'Countdown-Schleife', example: 'for i in range(5, 0, -1):', icon: '🔁' },
      { name: 'global', description: 'Punkte in Funktion ändern', example: 'global punkte', icon: '🌐' },
    ],
    studentActivity: `
**Aufgabe 1: Block-Jagd**
1. Zufällige Position: \`random.randint(1, 10)\`
2. Zeitlimit: \`loops.pause(30000)\`
3. Punkte: je schneller, desto mehr.

**Aufgabe 2: Bau-Wettbewerb**
1. Zähle abgeschlossene Strukturen.
2. Vergleiche die Punktzahl.
3. Gewinner bekanntgeben.

**Aufgabe 3: Rätsel-Pfad**
1. 3 Rätsel mit Antworten.
2. Richtig: +10, Falsch: –5.
3. Am Ende Gesamtpunktzahl.

**Reflexion im Team:**
Was macht ein gutes Spiel aus?
`,
    teacherTip: 'Lasse die Schüler zunächst ein einfaches Zählen-Spiel bauen (Zähler + Timer). Dann erweitere um Zufallselemente und Belohnungssysteme. Diskutiere danach, was ein gutes Spiel ausmacht (Spannung, Fairness, Belohnung).',
    quiz: [
      { id: 1, question: 'Was macht loops.pause(1000)?', options: ['Pausiert das Spiel für immer', 'Wartet 1 Sekunde', 'Startet neu', 'Löscht den Code'], correctAnswer: 1, explanation: 'loops.pause(1000) wartet 1000 Millisekunden (= 1 Sekunde).' },
      { id: 2, question: 'Was gibt random.randint(1, 10) zurück?', options: ['Immer 1', 'Immer 10', 'Eine Zufallszahl zwischen 1 und 10', 'Eine Fehlermeldung'], correctAnswer: 2, explanation: 'random.randint(a, b) gibt eine Zufallszahl zwischen a und b (inklusive) zurück.' },
      { id: 3, question: 'Wofür wird ein Timer in Spielen verwendet?', options: ['Für Grafik', 'Für Wartezeiten und Zeitlimits', 'Für Musik', 'Nur als Dekoration'], correctAnswer: 1, explanation: 'Timers erstellen Spannung (Countdown) und begrenzen die Spielzeit.' },
      { id: 4, question: 'Was passiert bei for i in range(5, 0, -1)?', options: ['5 bis 1 abwärts zählen', '1 bis 5 aufwärts zählen', 'Nur 5 und 0', 'Einen Fehler'], correctAnswer: 0, explanation: 'range(5, 0, -1) erzeugt die Zahlen 5, 4, 3, 2, 1 – einen Countdown.' },
      { id: 5, question: 'Was ist der Unterschied zwischen Spiel und Programm?', options: ['Kein Unterschied', 'Spiel hat Regeln und Feedback', 'Spiel ist immer komplexer', 'Nur Spiele haben Variablen'], correctAnswer: 1, explanation: 'Ein Spiel hat interaktive Regeln, Feedback (Punkte) und ein Ziel – im Gegensatz zu einem linearen Programm.' },
    ],
    xpReward: 150,
    unlocks: [30],
  },
  {
    id: 30,
    title: 'Projekt: Interaktive Stadt',
    description: 'Das große Finale! Kombiniere alles, was du gelernt hast: Bedingungen, Funktionen, Variablen, Schleifen und Redstone. Jedes Team baut ein interaktives Gebäude.',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Alle Konzepte kombinieren',
      'Modulare Funktionen einsetzen',
      'Teamarbeit organisieren',
      'Interaktive Gebäude bauen',
      'Chat-Befehle als Steuerung',
      'Gesamtprojekt planen',
    ],
    content: `
# Projekt: Interaktive Stadt

## Einführung
Du hast in den letzten Lektionen alles gelernt: Bedingungen, Funktionen mit Parametern, Variablen, Umgebungs-Checks und Redstone. Jetzt setzt du alles zusammen und baust eine interaktive Stadt.

## Die Stadt besteht aus:
1. **Haus 1: Bäckerei** – Der Agent backt Brot (Chat: /brot)
2. **Haus 2: Schmiede** – Der Agent schmiedet Werkzeuge (Chat: /werkzeug)
3. **Haus 3: Marktplatz** – Der Agent zählt Besucher (Variable)
4. **Haus 4: Stadttor** – Öffnet sich nur mit Passwort (if/elif)

## Modulares Stadtprojekt
\`\`\`python
def hausbau(typ):
    if typ == "baeckerei":
        bau_baeckerei()
    elif typ == "schmiede":
        bau_schmiede()
    elif typ == "marktplatz":
        bau_marktplatz()
    elif typ == "tor":
        bau_stadttor()
\`\`\`

## Chat-Steuerung
\`\`\`python
player.on_chat("baeckerei", lambda: hausbau("baeckerei"))
player.on_chat("schmiede", lambda: hausbau("schmiede"))
player.on_chat("stadt", lambda: bau_gesamtstadt())
\`\`\`

## Aufgabe: Interaktive Stadt
1. **Planung**: Welche Gebäude baut ihr? Wer macht was?
2. **Funktionen**: Schreibt für jedes Gebäude eine Funktion.
3. **Chat-Befehle**: Verbindet die Funktionen mit Chat-Befehlen.
4. **Variablen**: Zählt Besucher, produzierte Gegenstände.
5. **Testen**: Funktioniert alles? Korrigiert Fehler.
6. **Präsentation**: Zeigt eure Stadt den anderen Teams.

## Reflexion
Was hat am besten funktioniert? Was war die größte Herausforderung? Was würdet ihr beim nächsten Mal anders machen?
`,
    codeBlocks: [
      { name: 'def hausbau(typ)', description: 'Hauptfunktion mit Verzweigung', example: 'if typ == "baeckerei":', icon: '🏗️' },
      { name: 'player.on_chat', description: 'Chat-Befehle steuern Gebäude', example: 'player.on_chat("stadt", bau_gesamtstadt)', icon: '💬' },
      { name: 'global', description: 'Zähler in Funktionen', example: 'global besucher', icon: '🌐' },
      { name: 'lambda', description: 'Kurze Funktion', example: 'lambda: hausbau("tor")', icon: '⚡' },
    ],
    studentActivity: `
**Aufgabe: Interaktive Stadt**
1. Team organisieren (2-3 Personen).
2. Jede Person baut 1-2 Gebäude.
3. Funktionen für jedes Gebäude schreiben.
4. Chat-Befehle verbinden.
5. Variablen für Zähler einsetzen.
6. Gesamtstadt testen und präsentieren.

**Reflexion im Team:**
Was hat am besten funktioniert? Was war die größte Herausforderung?
`,
    teacherTip: 'Organisiere die Klasse in Teams von 2-3 Schüler:innen. Jedes Team baut eine Straße mit 2-4 Gebäuden. Ermutige sie, verschiedene Konzepte zu kombinieren. Am Ende gibt es eine „Stadtrundfahrt" – jedes Team zeigt seine Gebäude.',
    quiz: [
      { id: 1, question: 'Was ist das Ziel des Stadtprojekts?', options: ['Eine Hausarbeit schreiben', 'Alle Konzepte in einem Projekt kombinieren', 'Einen Roman schreiben', 'Matheaufgaben lösen'], correctAnswer: 1, explanation: 'Das Projekt kombiniert alle gelernten Konzepte: Bedingungen, Funktionen, Variablen und Chat-Befehle.' },
      { id: 2, question: 'Warum sind Funktionen wichtig für große Projekte?', options: ['Weil es Pflicht ist', 'Weil sie den Code strukturieren und wiederverwendbar machen', 'Weil sie den Code kürzer machen', 'Nur für Fehlermeldungen'], correctAnswer: 1, explanation: 'Funktionen machen Code modular, wiederverwendbar und leichter zu debuggen.' },
      { id: 3, question: 'Was ist der erste Schritt beim Stadtprojekt?', options: ['Sofort zu programmieren', 'Planung: Welche Gebäude? Wer macht was?', 'Eine Präsentation halten', 'Einen Fehler finden'], correctAnswer: 1, explanation: 'Planung ist der wichtigste Schritt – klären, was gebaut wird und wer was übernimmt.' },
      { id: 4, question: 'Wie viele Chat-Befehle braucht die Stadt mindestens?', options: ['1', '2-4', '10', 'Keine'], correctAnswer: 1, explanation: 'Mindestens ein Chat-Befehl pro Gebäude – also 2-4 für eine kleine Stadt.' },
      { id: 5, question: 'Was passiert am Ende des Projekts?', options: ['Das Programm wird gelöscht', 'Präsentation und Reflexion', 'Ein neues Spiel startet', 'Nichts'], correctAnswer: 1, explanation: 'Am Ende wird die Stadt präsentiert und reflektiert – was lief gut, was kann verbessert werden?' },
    ],
    xpReward: 200,
    unlocks: [31],
  },
  {
    id: 31,
    title: 'Sandbox Bay',
    description: 'Deine Belohnung! Freies Bauen, Experimentieren und Entdecken. Versteckte Schätze, Easter Eggs und kreative Freiheit erwarten dich.',
    phase: 'creative',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Frei experimentieren',
      'Kreative Projekte umsetzen',
      'Versteckte Schätze entdecken',
      'Easter Eggs finden',
      'Eigenen Code testen',
      'Von anderen lernen',
    ],
    content: `
# 🏝️ Sandbox Bay

## Willkommen in der Sandbox!
Du hast alle 10 Lektionen des Level 2 Archipels abgeschlossen. Diese Insel ist deine Belohnung – hier darfst du frei bauen, experimentieren und alles ausprobieren, was du gelernt hast.

## Die Inselbereiche

### 1. Freibau-Zone (freeArea)
Hier kannst du bauen, was du willst. Keine Regeln, kein Ziel – nur deine Kreativität.

### 2. Experimentier-Werkstatt (labArea)
Probiere alle Befehle aus, die du gelernt hast. Teste neue Kombinationen und entdecke, was der Agent noch kann.

### 3. Schatzkammer (treasureArea)
Finde alle versteckten Schätze auf der Insel. Jeder Schatz enthält eine Belohnung:
- ⭐ **600 XP Bonus**
- 🏆 **Level-2-Meister-Pokal**
- 🎖️ **Bedingungsmeister-Abzeichen**
- 📜 **Dein persönliches Zertifikat**

### 4. Easter-Egg-Ecke (eggArea)
Versteckte Referenzen und Überraschungen. Findest du alle?

### 5. Hall of Fame (hallArea)
Dein Name wird in die Ehrenrolle eingetragen. Herzlichen Glückwunsch!

## Die Reise ist abgeschlossen
| Etappe | Status |
|--------|--------|
| Level 1: Grundlagen | ✅ Abgeschlossen |
| Level 2: Bedingungen & Funktionen | ✅ Abgeschlossen |
| Sandbox Bay | ★ Aktiv |
| Nächstes Level | 🔄 In Vorbereitung |

## Reflexion
Du hast die gesamte Reise durch Level 2 gemeistert – von einfachen if-Abfragen bis hin zu interaktiven Städten. Was war dein Lieblingsprojekt? Was willst du als Nächstes lernen?
`,
    codeBlocks: [],
    studentActivity: `
**Bereich 1: Freibau**
Baue, was du willst! Keine Regeln.

**Bereich 2: Experimente**
Teste alle Befehle aus. Kombiniere neue Dinge.

**Bereich 3: Schatzsuche**
Finde alle versteckten Schätze und sammle Belohnungen.

**Bereich 4: Easter Eggs**
Entdecke versteckte Referenzen.

**Bereich 5: Hall of Fame**
Dein Name wird eingetragen. Herzlichen Glückwunsch!
`,
    teacherTip: 'Diese Insel ist die Belohnung für den gesamten Level-2-Kurs. Lasse die Schüler freely explorieren und ihre Kreativität ausleben. Am Ende: Reflexion über die gesamte Reise und was als Nächstes kommt.',
    quiz: [],
    xpReward: 600,
    unlocks: [],
  },
];

