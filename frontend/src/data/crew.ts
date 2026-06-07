// Crew data for the About page
// This file provides role-based crew member information used by the About page.
// All visible strings are translation keys; the UI will resolve them via the i18n system.

export interface CrewMember {
  id: string;
  titleKey: string; // translation key for the role title
  descriptionKey: string; // translation key for the description
  icon: string; // emoji or icon representation
}

export const crew: CrewMember[] = [
  {
    id: 'captain',
    titleKey: 'crew.captain.title',
    descriptionKey: 'crew.captain.description',
    icon: '🏴‍☠️',
  },
  {
    id: 'navigator',
    titleKey: 'crew.navigator.title',
    descriptionKey: 'crew.navigator.description',
    icon: '🧭',
  },
  {
    id: 'pobbie',
    titleKey: 'crew.pobbie.title',
    descriptionKey: 'crew.pobbie.description',
    icon: '🐰',
  },
];
