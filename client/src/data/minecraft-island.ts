
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

// Placeholder lessons for other islands
export const PLACEHOLDER_LESSONS: Lesson[] = [
  {
    id: 2,
    title: 'Python Basics - Coming Soon',
    description: 'Learn Python programming fundamentals',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: ['Coming soon'],
    content: 'This course is coming soon! Check back later.',
    codeBlocks: [],
    studentActivity: 'Stay tuned for Python lessons!',
    teacherTip: 'Python course will be available soon.',
    quiz: [],
    xpReward: 0,
  },
  {
    id: 3,
    title: 'Web Development - Coming Soon',
    description: 'Learn HTML, CSS, and JavaScript',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: ['Coming soon'],
    content: 'This course is coming soon! Check back later.',
    codeBlocks: [],
    studentActivity: 'Stay tuned for Web Development lessons!',
    teacherTip: 'Web Development course will be available soon.',
    quiz: [],
    xpReward: 0,
  },
  {
    id: 4,
    title: 'Game Design - Coming Soon',
    description: 'Learn game design principles',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: ['Coming soon'],
    content: 'This course is coming soon! Check back later.',
    codeBlocks: [],
    studentActivity: 'Stay tuned for Game Design lessons!',
    teacherTip: 'Game Design course will be available soon.',
    quiz: [],
    xpReward: 0,
  },
];

export const MINECRAFT_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Welcome to Minecraft Education – Controls and Codebuilder',
    description: 'Learn keyboard/mouse controls and your first code block',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Move and interact in Minecraft Education using keyboard and mouse',
      'Open Codebuilder for the first time',
      'Use the say command to print messages in chat',
      'Understand that Codebuilder controls the Agent, not the player',
    ],
    content: `
# Welcome to Minecraft Education

## Controls
- **WASD**: Move forward, left, backward, right
- **Space**: Jump
- **Shift**: Sneak/Crouch
- **E**: Open inventory
- **Right Click**: Place/interact with blocks
- **Left Click**: Break/destroy blocks

## Codebuilder Basics
Codebuilder is a visual programming tool that lets you write code to control the Agent (a programmable robot). The Agent is separate from your player character.

## Your First Command: Say
The 'say' command prints a message in the chat for everyone to see.

\`\`\`
say("Hello, Minecraft World!")
\`\`\`

## Key Concept
**Important**: You (the player) are controlled by your keyboard and mouse. The Agent is controlled by your code in Codebuilder. They are separate!
`,
    codeBlocks: [
      {
        name: 'say',
        description: 'Print a message in chat',
        example: 'say("Hello")',
        icon: '💬',
      },
      {
        name: 'teleport',
        description: 'Move the Agent to a location',
        example: 'teleport(10, 5, 20)',
        icon: '📍',
      },
    ],
    studentActivity: `
1. Open Codebuilder by pressing 'C'
2. Write: say("I am learning to code!")
3. Run the code and see your message in chat
4. Change the message and run again
5. Try teleporting the Agent: teleport(0, 5, 0)
`,
    teacherTip: 'Emphasize the difference between player and Agent. Have students practice moving around and then using Codebuilder separately.',
    quiz: [
      {
        id: 1,
        question: 'Which keys move your player character forward and backward?',
        options: ['W and S', 'A and D', 'Space and Shift', 'E and Q'],
        correctAnswer: 0,
        explanation: 'W moves forward and S moves backward in Minecraft.',
      },
      {
        id: 2,
        question: 'What does the say command do?',
        options: ['Moves the Agent', 'Prints a message in chat', 'Breaks blocks', 'Places blocks'],
        correctAnswer: 1,
        explanation: 'The say command prints a message that everyone in the world can see.',
      },
      {
        id: 3,
        question: 'Who does Codebuilder control?',
        options: ['Your player character', 'The Agent robot', 'All mobs', 'Nothing'],
        correctAnswer: 1,
        explanation: 'Codebuilder controls the Agent, not your player character.',
      },
    ],
    xpReward: 50,
    unlocks: [2],
  },
  {
    id: 2,
    title: 'Basic Commands for the Agent',
    description: 'Meet the Agent and learn essential movement and building commands',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Understand the Agent as a programmable robot',
      'Use movement commands: move, turn',
      'Use building commands: place, destroy',
      'Understand that the Agent has a facing direction',
    ],
    content: `
# Basic Agent Commands

## Movement Commands
- **move(direction, distance)**: Move the Agent forward, backward, left, right, up, or down
- **turn(direction)**: Turn the Agent left or right

## Building Commands
- **place(blockType)**: Place a block in front of the Agent
- **destroy()**: Destroy the block in front of the Agent

## Agent Facing Direction
The Agent has a facing direction (which way it's looking). When you use 'place', it places a block in front of where it's facing.

## Example Code
\`\`\`
move(FORWARD, 5)
turn(LEFT)
place(GRASS)
\`\`\`
`,
    codeBlocks: [
      {
        name: 'move',
        description: 'Move the Agent in a direction',
        example: 'move(FORWARD, 5)',
        icon: '🚀',
      },
      {
        name: 'turn',
        description: 'Turn the Agent left or right',
        example: 'turn(LEFT)',
        icon: '🔄',
      },
      {
        name: 'place',
        description: 'Place a block',
        example: 'place(GRASS)',
        icon: '🧱',
      },
      {
        name: 'destroy',
        description: 'Destroy a block',
        example: 'destroy()',
        icon: '💥',
      },
    ],
    studentActivity: `
1. Spawn the Agent near you
2. Write code to move the Agent forward 3 blocks
3. Turn the Agent left
4. Place a grass block
5. Move forward and place another block
6. Try destroying blocks with destroy()
`,
    teacherTip: 'Have students visualize the Agent\'s facing direction. Use arrows or markers to show which way the Agent is facing.',
    quiz: [
      {
        id: 1,
        question: 'What does move(FORWARD, 5) do?',
        options: ['Moves you forward 5 blocks', 'Moves the Agent forward 5 blocks', 'Turns the Agent', 'Places 5 blocks'],
        correctAnswer: 1,
        explanation: 'move(FORWARD, 5) moves the Agent forward 5 blocks.',
      },
      {
        id: 2,
        question: 'Which command destroys a block?',
        options: ['place()', 'move()', 'destroy()', 'turn()'],
        correctAnswer: 2,
        explanation: 'The destroy() command destroys the block in front of the Agent.',
      },
      {
        id: 3,
        question: 'What is the Agent?',
        options: ['Your player character', 'A programmable robot', 'A monster', 'A building'],
        correctAnswer: 1,
        explanation: 'The Agent is a programmable robot that you control with code.',
      },
    ],
    xpReward: 50,
    unlocks: [3],
  },
  {
    id: 3,
    title: 'Build a Simple Path or Road with the Agent',
    description: 'Combine movement and building commands to create structures',
    phase: 'getting-started',
    duration: 60,
    difficulty: 'beginner',
    objectives: [
      'Combine multiple commands in sequence',
      'Build a path using repeated commands',
      'Identify and fix sequencing bugs',
      'Understand block types and materials',
    ],
    content: `
# Building a Path

## Sequencing
Sequencing means putting commands in the right order. The Agent executes commands from top to bottom.

## Block Types
- GRASS: Green grass block
- STONE: Gray stone block
- DIRT: Brown dirt block
- WOOD: Brown wood block
- SAND: Yellow sand block

## Example: Simple Path
\`\`\`
place(GRASS)
move(FORWARD, 1)
place(GRASS)
move(FORWARD, 1)
place(GRASS)
\`\`\`

This creates a path of 3 grass blocks.

## Debugging
If your path doesn't look right, check:
1. Are the commands in the right order?
2. Did you use the right block type?
3. Is the Agent facing the right direction?
`,
    codeBlocks: [
      {
        name: 'place',
        description: 'Place different block types',
        example: 'place(STONE)',
        icon: '🧱',
      },
      {
        name: 'move',
        description: 'Move and build',
        example: 'move(FORWARD, 1)',
        icon: '🚀',
      },
    ],
    studentActivity: `
1. Create a 5-block path using GRASS blocks
2. Create a 5-block path using STONE blocks
3. Create a path that changes direction (use turn commands)
4. Intentionally make a mistake and fix it
5. Create a 10-block road with alternating block types
`,
    teacherTip: 'Have students plan their path on paper before coding. This helps them understand sequencing.',
    quiz: [
      {
        id: 1,
        question: 'What is sequencing?',
        options: ['Putting commands in the right order', 'Repeating commands', 'Turning the Agent', 'Placing blocks'],
        correctAnswer: 0,
        explanation: 'Sequencing means executing commands in the correct order.',
      },
      {
        id: 2,
        question: 'If your path looks wrong, what should you check first?',
        options: ['The block type', 'The command order', 'Your player position', 'The time of day'],
        correctAnswer: 1,
        explanation: 'Always check if your commands are in the right order.',
      },
      {
        id: 3,
        question: 'Which block type is STONE?',
        options: ['Green', 'Gray', 'Brown', 'Yellow'],
        correctAnswer: 1,
        explanation: 'STONE blocks are gray.',
      },
    ],
    xpReward: 50,
    unlocks: [4],
  },
  {
    id: 4,
    title: 'Repeat Loops – Making the Agent Build a Wall',
    description: 'Learn loops to reduce repetitive code',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Understand the concept of loops',
      'Use repeat loops to reduce code repetition',
      'Build a wall structure using loops',
      'Modify loop parameters',
    ],
    content: `
# Repeat Loops

## What is a Loop?
A loop repeats a block of code multiple times. Instead of writing the same command 10 times, you can write it once in a loop.

## Syntax
\`\`\`
repeat(5) {
  place(STONE)
  move(FORWARD, 1)
}
\`\`\`

This places a stone block and moves forward 5 times.

## Building a Wall
To build a wall, you need to:
1. Place a block
2. Move to the next position
3. Repeat

## Benefits of Loops
- Less code to write
- Easier to modify (change one number instead of many commands)
- Easier to understand
`,
    codeBlocks: [
      {
        name: 'repeat',
        description: 'Repeat code N times',
        example: 'repeat(10) { ... }',
        icon: '🔁',
      },
    ],
    studentActivity: `
1. Build a 10-block wall using a repeat loop
2. Build a 20-block wall
3. Build a wall and then move up and build another wall (2 levels)
4. Create a wall with different block types (alternate)
5. Build a wall in a circle (use turns)
`,
    teacherTip: 'Show the difference between writing 10 separate commands vs. 1 repeat loop. Emphasize code efficiency.',
    quiz: [
      {
        id: 1,
        question: 'What does a loop do?',
        options: ['Turns the Agent', 'Repeats code multiple times', 'Places blocks', 'Destroys blocks'],
        correctAnswer: 1,
        explanation: 'A loop repeats a block of code multiple times.',
      },
      {
        id: 2,
        question: 'How many times will this code repeat? repeat(7) { place(GRASS) }',
        options: ['5 times', '7 times', '10 times', '1 time'],
        correctAnswer: 1,
        explanation: 'repeat(7) means the code inside runs 7 times.',
      },
      {
        id: 3,
        question: 'Why use loops instead of repeating commands?',
        options: ['Loops are faster', 'Loops use less code', 'Loops are more fun', 'Loops are required'],
        correctAnswer: 1,
        explanation: 'Loops reduce code repetition and make code easier to modify.',
      },
    ],
    xpReward: 75,
    unlocks: [5],
  },
  {
    id: 5,
    title: 'Nested Loops – Build a Floor or Grid Pattern',
    description: 'Use loops inside loops to create 2D patterns',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Understand nested loops',
      'Build 2D grid patterns',
      'Combine horizontal and vertical loops',
      'Create complex structures efficiently',
    ],
    content: `
# Nested Loops

## What are Nested Loops?
Nested loops are loops inside loops. They let you create 2D patterns.

## Example: 3x3 Grid
\`\`\`
repeat(3) {
  repeat(3) {
    place(GRASS)
    move(FORWARD, 1)
  }
  turn(LEFT)
  move(FORWARD, 1)
  turn(RIGHT)
}
\`\`\`

This creates a 3x3 grid of grass blocks.

## How It Works
1. Outer loop: Repeat 3 times (for each row)
2. Inner loop: Repeat 3 times (for each block in the row)
3. After each row, move to the next row

## Grid Patterns
You can create:
- Squares
- Rectangles
- Checkerboards (alternating blocks)
- Floors for buildings
`,
    codeBlocks: [
      {
        name: 'nested repeat',
        description: 'Loops inside loops',
        example: 'repeat(3) { repeat(3) { ... } }',
        icon: '📦',
      },
    ],
    studentActivity: `
1. Build a 5x5 floor using nested loops
2. Build a 10x10 floor
3. Build a checkerboard pattern (alternate block types)
4. Build a 3x3x3 cube using 3 nested loops
5. Create a pattern of your choice
`,
    teacherTip: 'Use visual aids to show how nested loops work. Have students trace through the code step by step.',
    quiz: [
      {
        id: 1,
        question: 'What are nested loops?',
        options: ['Loops that turn', 'Loops inside loops', 'Loops that place blocks', 'Loops that move'],
        correctAnswer: 1,
        explanation: 'Nested loops are loops placed inside other loops.',
      },
      {
        id: 2,
        question: 'How many blocks will this create? repeat(4) { repeat(4) { place(GRASS) } }',
        options: ['4 blocks', '8 blocks', '16 blocks', '32 blocks'],
        correctAnswer: 2,
        explanation: '4 x 4 = 16 blocks total.',
      },
      {
        id: 3,
        question: 'What can you build with nested loops?',
        options: ['Only walls', '2D patterns and grids', 'Only circles', 'Nothing special'],
        correctAnswer: 1,
        explanation: 'Nested loops are perfect for creating 2D patterns and grids.',
      },
    ],
    xpReward: 75,
    unlocks: [6],
  },
  {
    id: 6,
    title: 'Loop Challenge – Build a Pyramid with the Agent',
    description: 'Challenge: Use loops to build a pyramid structure',
    phase: 'loops',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Apply loop knowledge to a complex structure',
      'Use nested loops for 3D building',
      'Problem-solve and debug code',
      'Optimize code for efficiency',
    ],
    content: `
# Pyramid Challenge

## The Challenge
Build a pyramid that looks like this (side view):
\`\`\`
    X
   XXX
  XXXXX
 XXXXXXX
XXXXXXXXX
\`\`\`

## Hints
1. Each row has a different number of blocks
2. You need to position the Agent correctly for each row
3. Use nested loops for each row

## Solution Strategy
- Row 1: 1 block
- Row 2: 3 blocks
- Row 3: 5 blocks
- Pattern: Each row has 2 more blocks than the previous

## Code Pattern
\`\`\`
repeat(5) {
  // Place blocks for this row
  // Move to next row position
}
\`\`\`
`,
    codeBlocks: [
      {
        name: 'nested loops',
        description: 'For building pyramids',
        example: 'repeat(n) { repeat(n) { ... } }',
        icon: '🔺',
      },
    ],
    studentActivity: `
1. Build a 5-level pyramid
2. Build a 10-level pyramid
3. Build a pyramid with different block types per level
4. Build an upside-down pyramid
5. Build two pyramids facing each other
`,
    teacherTip: 'This is a challenging problem. Encourage students to draw the pyramid first and plan their code.',
    quiz: [
      {
        id: 1,
        question: 'How many blocks are in a 5-level pyramid?',
        options: ['15 blocks', '25 blocks', '35 blocks', '45 blocks'],
        correctAnswer: 2,
        explanation: '1+3+5+7+9 = 25 blocks (wait, let me recalculate: 1+3+5+7+9 = 25). Actually 1+3+5+7+9 = 25.',
      },
      {
        id: 2,
        question: 'What is the pattern for pyramid blocks per row?',
        options: ['Same number each row', 'Each row has 1 more block', 'Each row has 2 more blocks', 'Random'],
        correctAnswer: 2,
        explanation: 'In a pyramid, each row typically has 2 more blocks than the previous row.',
      },
      {
        id: 3,
        question: 'Which is easier: writing 25 place commands or using loops?',
        options: ['Writing 25 commands', 'Using loops', 'They\'re the same', 'Neither works'],
        correctAnswer: 1,
        explanation: 'Loops are much easier and more efficient than writing 25 separate commands.',
      },
    ],
    xpReward: 100,
    unlocks: [7],
  },
  {
    id: 7,
    title: 'If/Else – The Agent Reacts to the World',
    description: 'Learn conditional logic to make decisions in code',
    phase: 'conditionals',
    duration: 60,
    difficulty: 'intermediate',
    objectives: [
      'Understand conditional logic (if/else)',
      'Use conditions to make decisions',
      'Check block types and positions',
      'Create responsive code',
    ],
    content: `
# Conditionals: If/Else

## What is a Conditional?
A conditional lets your code make decisions. It runs different code based on whether a condition is true or false.

## Syntax
\`\`\`
if (condition) {
  // Do this if true
} else {
  // Do this if false
}
\`\`\`

## Common Conditions
- blockAt(x, y, z) == GRASS: Is there grass at this position?
- canMove(FORWARD): Can the Agent move forward?
- agentX == 5: Is the Agent at position 5?

## Example
\`\`\`
if (canMove(FORWARD)) {
  move(FORWARD, 1)
} else {
  turn(LEFT)
}
\`\`\`

This moves forward if possible, otherwise turns left.
`,
    codeBlocks: [
      {
        name: 'if/else',
        description: 'Make decisions in code',
        example: 'if (condition) { ... } else { ... }',
        icon: '🔀',
      },
    ],
    studentActivity: `
1. Make the Agent check if it can move forward
2. If yes, move forward; if no, turn left
3. Create code that places different blocks based on position
4. Make the Agent react to different block types
5. Create a decision tree with multiple conditions
`,
    teacherTip: 'Use real-world examples: "If it\'s raining, take an umbrella. Else, don\'t."',
    quiz: [
      {
        id: 1,
        question: 'What does an if/else statement do?',
        options: ['Repeats code', 'Makes decisions', 'Moves the Agent', 'Places blocks'],
        correctAnswer: 1,
        explanation: 'If/else statements let code make decisions based on conditions.',
      },
      {
        id: 2,
        question: 'What happens if the condition is false?',
        options: ['Code stops', 'The else block runs', 'Nothing happens', 'Error occurs'],
        correctAnswer: 1,
        explanation: 'If the condition is false, the else block runs.',
      },
      {
        id: 3,
        question: 'Can you have if without else?',
        options: ['No', 'Yes', 'Only sometimes', 'Never'],
        correctAnswer: 1,
        explanation: 'Yes, you can have if without else. The else is optional.',
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
