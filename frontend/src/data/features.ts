export interface Feature {
  key: string;
  icon: string;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    key: 'pace',
    icon: '🧭',
    title: 'Your Pace, Your Path',
    description: 'You choose which islands to explore and when. The adventure adapts to your level.',
  },
  {
    key: 'skills',
    icon: '💎',
    title: 'Real Skills, Real Rewards',
    description: 'Every achievement earns you treasure. Every completed island adds a gem to your crown.',
  },
  {
    key: 'world',
    icon: '🗺️',
    title: 'A World That Grows',
    description: 'New islands appear regularly. The map is always expanding.',
  },
];