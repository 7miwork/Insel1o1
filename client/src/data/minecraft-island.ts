
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
];

