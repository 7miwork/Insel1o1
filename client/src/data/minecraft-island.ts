
export interface CodeBlock {
  name: string;
  description: string;
  example: string;
  icon: string;
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
    title: 'Conditionals + Movement – Agent Avoids Obstacles',
    description: 'Use conditionals to navigate around obstacles',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Combine conditionals with movement',
      'Detect and avoid obstacles',
      'Create pathfinding logic',
      'Handle multiple conditions',
    ],
    content: `
# Obstacle Avoidance

## The Problem
The Agent needs to move forward but there might be obstacles in the way.

## The Solution
Check if the Agent can move forward. If yes, move. If no, try turning and moving.

## Code Pattern
\`\`\`
if (canMove(FORWARD)) {
  move(FORWARD, 1)
} else if (canMove(LEFT)) {
  turn(LEFT)
  move(FORWARD, 1)
} else if (canMove(RIGHT)) {
  turn(RIGHT)
  move(FORWARD, 1)
} else {
  turn(LEFT)
  turn(LEFT)
}
\`\`\`

## Conditions to Check
- canMove(FORWARD)
- canMove(LEFT)
- canMove(RIGHT)
- canMove(UP)
- canMove(DOWN)
`,
    codeBlocks: [
      {
        name: 'canMove',
        description: 'Check if Agent can move in direction',
        example: 'canMove(FORWARD)',
        icon: '🚧',
      },
    ],
    studentActivity: `
1. Create an obstacle course and have the Agent navigate it
2. Make the Agent avoid water blocks
3. Make the Agent find a path around a wall
4. Create complex obstacle patterns
5. Time how fast the Agent can navigate
`,
    teacherTip: 'Create a simple maze first, then gradually increase complexity.',
    quiz: [
      {
        id: 1,
        question: 'How do you check if the Agent can move forward?',
        options: ['move(FORWARD)', 'canMove(FORWARD)', 'checkMove(FORWARD)', 'testMove(FORWARD)'],
        correctAnswer: 1,
        explanation: 'Use canMove(FORWARD) to check if movement is possible.',
      },
      {
        id: 2,
        question: 'What should the Agent do if it can\'t move forward?',
        options: ['Stop', 'Try turning and moving', 'Jump', 'Teleport'],
        correctAnswer: 1,
        explanation: 'The Agent should try alternative directions like left or right.',
      },
      {
        id: 3,
        question: 'Can the Agent move in multiple directions?',
        options: ['No, only forward', 'Yes, forward/back/left/right/up/down', 'Only diagonally', 'Only up'],
        correctAnswer: 1,
        explanation: 'The Agent can move in all 6 directions.',
      },
    ],
    xpReward: 75,
    unlocks: [9],
  },
  {
    id: 9,
    title: 'Combined Challenge – Agent Navigates a Simple Maze',
    description: 'Challenge: Use loops and conditionals to navigate a maze',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Combine loops and conditionals',
      'Solve complex navigation problems',
      'Debug multi-step logic',
      'Optimize maze-solving algorithms',
    ],
    content: `
# Maze Navigation Challenge

## The Challenge
Navigate the Agent through a maze from start to finish.

## Strategy
1. Use loops to repeat navigation attempts
2. Use conditionals to check for obstacles
3. Try different directions until finding a path
4. Repeat until reaching the goal

## Maze-Solving Algorithms
- **Wall Follower**: Keep one hand on the wall and follow it
- **Right-Hand Rule**: Always try to turn right first
- **Breadth-First Search**: Try all directions systematically

## Code Pattern
\`\`\`
repeat(100) {
  if (canMove(FORWARD)) {
    move(FORWARD, 1)
  } else if (canMove(RIGHT)) {
    turn(RIGHT)
  } else {
    turn(LEFT)
  }
}
\`\`\`
`,
    codeBlocks: [
      {
        name: 'maze solving',
        description: 'Navigate complex paths',
        example: 'Combine loops + conditionals',
        icon: '🗺️',
      },
    ],
    studentActivity: `
1. Navigate a simple 10x10 maze
2. Navigate a complex maze with multiple paths
3. Implement the wall-follower algorithm
4. Implement the right-hand rule
5. Create your own maze and solve it
`,
    teacherTip: 'Start with a simple maze and gradually increase difficulty.',
    quiz: [
      {
        id: 1,
        question: 'What is the wall-follower algorithm?',
        options: ['Follow walls with one hand', 'Destroy all walls', 'Build walls', 'Avoid walls'],
        correctAnswer: 0,
        explanation: 'The wall-follower algorithm keeps one hand on a wall and follows it through the maze.',
      },
      {
        id: 2,
        question: 'How many times should you repeat the navigation loop?',
        options: ['10 times', '50 times', '100+ times', 'Infinite'],
        correctAnswer: 2,
        explanation: 'Use a large repeat number to ensure the Agent has enough attempts to solve the maze.',
      },
      {
        id: 3,
        question: 'What combination of concepts is needed for maze solving?',
        options: ['Only loops', 'Only conditionals', 'Loops AND conditionals', 'Neither'],
        correctAnswer: 2,
        explanation: 'Maze solving requires both loops (to keep trying) and conditionals (to make decisions).',
      },
    ],
    xpReward: 100,
    unlocks: [10],
  },
  {
    id: 10,
    title: 'Design a Farm with the Agent Using Loops',
    description: 'Create a realistic farm structure using loops',
    phase: 'creative',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Design functional structures',
      'Use loops for efficient building',
      'Plan multi-component projects',
      'Combine different building techniques',
    ],
    content: `
# Building a Farm

## Farm Components
- **Crop Rows**: Parallel lines of farmland
- **Fences**: Boundaries for the farm
- **Paths**: Walking paths between rows
- **Water Channels**: For irrigation

## Farm Layout
\`\`\`
Fence
Crop Row 1
Path
Crop Row 2
Path
Crop Row 3
Fence
\`\`\`

## Building Technique
1. Use loops to create rows
2. Use nested loops for multiple rows
3. Use conditionals to place different materials

## Block Types for Farm
- FARMLAND: Tilled soil for crops
- WATER: Water channels
- FENCE: Fence blocks
- DIRT: Paths
`,
    codeBlocks: [
      {
        name: 'farm building',
        description: 'Create crop rows and paths',
        example: 'Nested loops for rows',
        icon: '🌾',
      },
    ],
    studentActivity: `
1. Build a 5-row farm
2. Add fences around the farm
3. Add water channels
4. Add walking paths
5. Create a decorative farm entrance
`,
    teacherTip: 'Show pictures of real farms to inspire designs.',
    quiz: [
      {
        id: 1,
        question: 'What is farmland used for?',
        options: ['Growing crops', 'Walking', 'Decoration', 'Storage'],
        correctAnswer: 0,
        explanation: 'Farmland is where crops grow.',
      },
      {
        id: 2,
        question: 'How would you create multiple crop rows efficiently?',
        options: ['Place each manually', 'Use nested loops', 'Use conditionals', 'Use teleport'],
        correctAnswer: 1,
        explanation: 'Nested loops are perfect for creating multiple rows.',
      },
      {
        id: 3,
        question: 'What is a water channel used for?',
        options: ['Decoration', 'Irrigation', 'Swimming', 'Storage'],
        correctAnswer: 1,
        explanation: 'Water channels irrigate the farmland.',
      },
    ],
    xpReward: 100,
    unlocks: [11],
  },
  {
    id: 11,
    title: 'Build a Village House Using Loops and Functions',
    description: 'Design and build a house structure',
    phase: 'creative',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Design 3D structures',
      'Use functions for reusable code',
      'Build walls, roof, and interior',
      'Plan complex multi-part projects',
    ],
    content: `
# Building a House

## House Components
- **Walls**: 4 walls forming a rectangle
- **Roof**: Sloped or flat roof
- **Door**: Entrance
- **Windows**: Light and aesthetics
- **Interior**: Rooms and furniture

## House Dimensions
- Width: 10 blocks
- Depth: 10 blocks
- Height: 5 blocks

## Building Sequence
1. Build walls (nested loops)
2. Build roof (pyramid or flat)
3. Add door and windows
4. Add interior details

## Materials
- WOOD: Walls and roof
- STONE: Foundation
- GLASS: Windows
- OAK_DOOR: Door
`,
    codeBlocks: [
      {
        name: 'house building',
        description: 'Create walls and roof',
        example: 'Nested loops for walls',
        icon: '🏠',
      },
    ],
    studentActivity: `
1. Build a simple 10x10 house
2. Add a roof
3. Add windows and a door
4. Add interior walls and rooms
5. Decorate the interior
`,
    teacherTip: 'Have students sketch their house design before coding.',
    quiz: [
      {
        id: 1,
        question: 'What material is good for house walls?',
        options: ['WATER', 'WOOD', 'SAND', 'GLASS'],
        correctAnswer: 1,
        explanation: 'WOOD is a good material for house walls.',
      },
      {
        id: 2,
        question: 'How would you build 4 walls efficiently?',
        options: ['Build each manually', 'Use loops', 'Use conditionals', 'Use teleport'],
        correctAnswer: 1,
        explanation: 'Loops make building walls much more efficient.',
      },
      {
        id: 3,
        question: 'What is the purpose of windows?',
        options: ['Strength', 'Light and aesthetics', 'Storage', 'Cooking'],
        correctAnswer: 1,
        explanation: 'Windows let light in and make the house look nice.',
      },
    ],
    xpReward: 100,
    unlocks: [12],
  },
  {
    id: 12,
    title: 'Creative Build – Code a Bridge Over Water',
    description: 'Design and build a bridge structure',
    phase: 'creative',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Plan structures over obstacles',
      'Use advanced building techniques',
      'Combine multiple building concepts',
      'Create aesthetically pleasing structures',
    ],
    content: `
# Building a Bridge

## Bridge Types
- **Beam Bridge**: Simple horizontal beams
- **Arch Bridge**: Curved arch structure
- **Suspension Bridge**: Cables and towers
- **Drawbridge**: Movable bridge

## Bridge Components
- **Supports**: Pillars holding the bridge
- **Deck**: The walkable surface
- **Rails**: Safety railings
- **Decorations**: Lanterns, banners, etc.

## Building Technique
1. Build support pillars
2. Build the deck connecting pillars
3. Add railings
4. Add decorative elements

## Materials
- STONE: Pillars and supports
- WOOD: Deck
- FENCE: Railings
- LANTERN: Decorations
`,
    codeBlocks: [
      {
        name: 'bridge building',
        description: 'Create spans and supports',
        example: 'Loops for pillars and deck',
        icon: '🌉',
      },
    ],
    studentActivity: `
1. Build a simple beam bridge
2. Build a bridge with decorative railings
3. Build a bridge with multiple spans
4. Build an arch bridge
5. Create a themed bridge (castle, modern, etc.)
`,
    teacherTip: 'Show pictures of real bridges for inspiration.',
    quiz: [
      {
        id: 1,
        question: 'What is the main purpose of bridge supports?',
        options: ['Decoration', 'Hold the bridge up', 'Store items', 'Look cool'],
        correctAnswer: 1,
        explanation: 'Supports hold the bridge up and distribute weight.',
      },
      {
        id: 2,
        question: 'What are railings used for on a bridge?',
        options: ['Decoration', 'Storage', 'Safety', 'Cooking'],
        correctAnswer: 2,
        explanation: 'Railings provide safety by preventing falls.',
      },
      {
        id: 3,
        question: 'What is a good material for bridge supports?',
        options: ['WOOD', 'STONE', 'GLASS', 'SAND'],
        correctAnswer: 1,
        explanation: 'STONE is strong and good for supports.',
      },
    ],
    xpReward: 100,
    unlocks: [13],
  },
  {
    id: 13,
    title: 'Final Project – Village Planning: Design 3 Buildings',
    description: 'Plan a village with 3 different buildings',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Plan a complete village layout',
      'Design 3 unique buildings',
      'Coordinate multiple structures',
      'Present your design',
    ],
    content: `
# Village Planning

## Village Components
1. **House**: Residential building
2. **Farm**: Food production
3. **Market**: Trading center

## Planning Steps
1. Sketch the village layout on paper
2. Decide building positions
3. Plan paths between buildings
4. List materials needed
5. Write code to build each building

## Village Layout
\`\`\`
    Market
    
House    Farm

    Path
\`\`\`

## Design Considerations
- Space between buildings
- Accessible paths
- Logical arrangement
- Aesthetic appeal
`,
    codeBlocks: [
      {
        name: 'village planning',
        description: 'Design multiple buildings',
        example: 'Coordinate 3 structures',
        icon: '🏘️',
      },
    ],
    studentActivity: `
1. Sketch your village layout
2. Plan the 3 buildings
3. List all materials needed
4. Write code for each building
5. Present your design to the class
`,
    teacherTip: 'Have students present their designs before coding.',
    quiz: [
      {
        id: 1,
        question: 'What is the first step in village planning?',
        options: ['Start coding', 'Sketch the layout', 'Gather materials', 'Build immediately'],
        correctAnswer: 1,
        explanation: 'Always plan and sketch before coding.',
      },
      {
        id: 2,
        question: 'How many buildings should a village have?',
        options: ['1', '2', '3 or more', 'Unlimited'],
        correctAnswer: 2,
        explanation: 'A village should have at least 3 buildings for this project.',
      },
      {
        id: 3,
        question: 'Why are paths important in a village?',
        options: ['Decoration', 'Connect buildings', 'Store items', 'Nothing'],
        correctAnswer: 1,
        explanation: 'Paths connect buildings and make the village functional.',
      },
    ],
    xpReward: 150,
    unlocks: [14],
  },
  {
    id: 14,
    title: 'Final Project – Village Build: Code the 3 Buildings',
    description: 'Build the 3 planned buildings using code',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Implement building designs with code',
      'Use all learned concepts',
      'Debug complex multi-building code',
      'Optimize code efficiency',
    ],
    content: `
# Building the Village

## Code Organization
Organize your code into sections:
1. Build House
2. Build Farm
3. Build Market
4. Build Paths
5. Add Decorations

## Code Pattern
\`\`\`
// Build House
teleport(0, 0, 0)
// ... house building code ...

// Build Farm
teleport(20, 0, 0)
// ... farm building code ...

// Build Market
teleport(40, 0, 0)
// ... market building code ...
\`\`\`

## Testing
- Build each building separately
- Test the entire village
- Fix any issues
- Optimize code
`,
    codeBlocks: [
      {
        name: 'village building',
        description: 'Build all 3 buildings',
        example: 'Complete village code',
        icon: '🏗️',
      },
    ],
    studentActivity: `
1. Code the house building
2. Code the farm
3. Code the market
4. Connect with paths
5. Add decorative details
`,
    teacherTip: 'Have students test each building before combining them.',
    quiz: [
      {
        id: 1,
        question: 'How should you organize village code?',
        options: ['All mixed together', 'In sections by building', 'Randomly', 'Backwards'],
        correctAnswer: 1,
        explanation: 'Organize code into sections for each building.',
      },
      {
        id: 2,
        question: 'What should you do before building everything?',
        options: ['Nothing', 'Test each building separately', 'Pray', 'Give up'],
        correctAnswer: 1,
        explanation: 'Test each building separately to find bugs early.',
      },
      {
        id: 3,
        question: 'How do you move the Agent to different building locations?',
        options: ['Walk there', 'Use teleport', 'Use move', 'Magic'],
        correctAnswer: 1,
        explanation: 'Use teleport to move the Agent to different building locations.',
      },
    ],
    xpReward: 150,
    unlocks: [15],
  },
  {
    id: 15,
    title: 'Final Project – Connect the Village: Roads and Village Square',
    description: 'Complete the village with roads and a central square',
    phase: 'final-project',
    duration: 60,
    difficulty: 'advanced',
    objectives: [
      'Connect all buildings with roads',
      'Create a central village square',
      'Add final decorative touches',
      'Complete and present the village',
    ],
    content: `
# Connecting the Village

## Village Square
A central gathering place:
- Open area for events
- Decorative elements (fountain, statue)
- Benches or seating
- Lanterns for lighting

## Roads
Connect all buildings:
- Main road through center
- Side roads to each building
- Consistent material (stone, dirt)
- Decorative elements (lanterns, signs)

## Final Decorations
- Lanterns along roads
- Trees and plants
- Banners and signs
- Fences and gates

## Completion Checklist
- [ ] All 3 buildings built
- [ ] Roads connect all buildings
- [ ] Village square created
- [ ] Decorations added
- [ ] Code is organized
- [ ] Village tested and working
`,
    codeBlocks: [
      {
        name: 'village completion',
        description: 'Roads and square',
        example: 'Final village code',
        icon: '✨',
      },
    ],
    studentActivity: `
1. Build roads connecting all buildings
2. Create a central village square
3. Add decorative elements
4. Add lighting with lanterns
5. Present your completed village
`,
    teacherTip: 'Celebrate student achievements! Have them present their villages to the class.',
    quiz: [
      {
        id: 1,
        question: 'What is a village square used for?',
        options: ['Storage', 'Gathering place', 'Farming', 'Nothing'],
        correctAnswer: 1,
        explanation: 'A village square is a central gathering place.',
      },
      {
        id: 2,
        question: 'What should roads be made of?',
        options: ['Anything', 'Consistent material', 'Random blocks', 'Nothing'],
        correctAnswer: 1,
        explanation: 'Use consistent materials for roads to look professional.',
      },
      {
        id: 3,
        question: 'What have you learned in this course?',
        options: ['Nothing', 'Basic coding concepts', 'How to play Minecraft', 'How to build houses'],
        correctAnswer: 1,
        explanation: 'You\'ve learned sequencing, loops, conditionals, and problem-solving!',
      },
    ],
    xpReward: 200,
    unlocks: [],
  },
];
