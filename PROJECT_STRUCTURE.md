# Project Structure — I-Land1o1

This document explains the file organization of the project.

## Content Layer (`src/content/`)

All educational and marketing content lives here. **Never hardcode content inside React components.**

| File | Purpose |
|------|---------|
| `islands.ts` | Island/course definitions, map positions, lesson references |
| `lessons.ts` | Lesson data: titles, descriptions, video URLs, quiz content |
| `features.ts` | Homepage feature card definitions (title, description, video) |
| `videos.ts` | Showcase/review/timelapse video URLs for the homepage |
| `achievements.ts` | Achievement badge definitions (icons, XP rewards, conditions) |

### Example: Adding a video

```ts
// src/content/videos.ts
export const featureVideos: FeatureVideo[] = [
  // ...existing entries...
  {
    id: "new-video",
    title: "My New Video",
    url: "https://youtu.be/abc123",
    description: "Short description",
    category: "tutorial",
  },
];
```

## Data Layer (`src/data/`)

Technical data structures and configurations used by the app:

| File | Purpose |
|------|---------|
| `archipelago-config.ts` | Converts island data to ArchipelagoCourse shape for the map |
| `minecraft-island.ts` | Minecraft lesson details (quiz, code blocks, activities) |

## Pages (`src/pages/`)

Each file is a top-level route:

| File | Route |
|------|-------|
| `Home.tsx` | `/` |
| `Dashboard.tsx` | `/dashboard` |
| `StudentDashboard.tsx` | `/student` |
| `TeacherDashboard.tsx` | `/teacher` |
| `ArchipelagoMap.tsx` | `/archipelago` |
| `MinecraftLessonPage.tsx` | `/lesson/:id` |
| `Login.tsx` | `/login` |
| `Register.tsx` | `/register` |
| `Pricing.tsx` | `/pricing` |
| `Blog.tsx` | `/blog` |

## Components (`src/components/`)

| Directory | Purpose |
|-----------|---------|
| `ui/` | Shared UI primitives (buttons, cards, modals, dropdowns) |
| Root `.tsx` files | Page-level layout components (GlobalHeader, Footer, etc.) |

## Translations (`src/locales/`)

| Directory | Purpose |
|-----------|---------|
| `de/` | German translations |
| `en/` | English translations |
| `zh-TW/` | Traditional Chinese translations |

Each locale has files matching page sections: `home.json`, `common.json`, `lesson.json`, etc.

## Contexts (`src/contexts/`)

| File | Purpose |
|------|---------|
| `I18nContext.tsx` | Internationalization (language switching) |
| `ThemeContext.tsx` | Dark/light mode theming |

## Assets

| Directory | Purpose |
|-----------|---------|
| `public/` | Static files served directly (images, favicon, etc.) |
| `src/assets/` | Imported assets (images used in components) |

## Server (`server/`)

Backend code for authentication, database, and API routes.
