/**
 * CREW DATA CONFIGURATION
 * =======================
 * Centralized configuration file for the Insel1o1 crew members.
 *
 * To add, remove, or modify crew members, edit the CREW_MEMBERS array below.
 * No UI component changes are needed.
 *
 * @file client/src/data/crew.ts
 *
 * Each crew member object requires:
 * - id: Unique identifier
 * - name: Display name
 * - role: Role/title
 * - roleKey: Translation key for the role
 * - descriptionKey: Translation key for the description
 * - icon: Lucide icon component name (string)
 * - color: Tailwind gradient class (e.g., "from-amber-400 to-orange-500")
 */

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  roleKey: string;
  descriptionKey: string;
  icon: string;
  color: string;
}

export const CREW_MEMBERS: CrewMember[] = [
  {
    id: "captain-learning-worlds",
    name: "Captain of Learning Worlds",
    role: "Captain of Learning Worlds",
    roleKey: "crew.captainLearningWorlds",
    descriptionKey: "crew.captainLearningWorldsDesc",
    icon: "Crown",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "learning-navigator",
    name: "Learning Navigator",
    role: "Learning Navigator",
    roleKey: "crew.learningNavigator",
    descriptionKey: "crew.learningNavigatorDesc",
    icon: "Compass",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "pobbie",
    name: "Pobbie",
    role: "Pobbie – The Code Rabbit",
    roleKey: "crew.pobbie",
    descriptionKey: "crew.pobbieDesc",
    icon: "Code",
    color: "from-emerald-500 to-teal-500",
  },
];