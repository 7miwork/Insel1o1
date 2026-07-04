# Content Guide — I-Land1o1

This guide shows how to add and manage content **without touching React code**.

---

## How to Add a New YouTube Video

Open `src/content/videos.ts` and add an entry to the `videos` object.

### Naming Convention

```
{subject}{level}L{lesson}
```

| Key | Meaning |
|-----|---------|
| `code1L1` | Coding, Level 1, Lesson 1 |
| `code1L2` | Coding, Level 1, Lesson 2 |
| `code2L1` | Coding, Level 2, Lesson 1 |
| `science1L1` | Science, Level 1, Lesson 1 |
| `math3L4` | Math, Level 3, Lesson 4 |
| `language2L1` | Language, Level 2, Lesson 1 |
| `preview` | Hero/preview video on homepage |

**Pattern:** `subject + level + L + lesson`

### Adding a Video Entry

```ts
// In src/content/videos.ts
code1L1: {
  url: "https://youtu.be/example",
  title: "Variables Introduction"
},
```

**Supported URL formats:**
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://vimeo.com/VIDEO_ID`

Leave `url: ""` for lessons that don't have videos yet. The UI handles empty URLs gracefully.

---

## How to Add a New Homepage Feature Card

Open `src/content/features.ts` and add an entry:

```ts
{
  id: "new-feature",
  titleKey: "home.feature_newFeature",     // i18n key in locale files
  descriptionKey: "home.feature_newFeatureDesc",
  order: 6,                                // position in the features list
}
```

Then add the translations in all locale files:

**`src/locales/en/home.json`:**
```json
"feature_newFeature": "New Feature Title",
"feature_newFeatureDesc": "Description of the new feature."
```

**`src/locales/de/home.json`:**
```json
"feature_newFeature": "Neue Funktion",
"feature_newFeatureDesc": "Beschreibung der neuen Funktion."
```

**`src/locales/zh-TW/home.json`:**
```json
"feature_newFeature": "新功能",
"feature_newFeatureDesc": "新功能的描述。"
```

### With a Video

Add `videoUrl` to include an inline video player:

```ts
{
  id: "timelapse-video",
  titleKey: "home.feature_islandTimelapse",
  descriptionKey: "home.feature_islandTimelapseDesc",
  videoUrl: "https://youtu.be/VIDEO_ID",
  videoTitle: "Island Building Timelapse",
  order: 5,
}
```

---

## How to Add a New Island

Open `src/content/islands.ts` and add an island object:

```ts
{
  id: "new-island",
  nameKey: "islands.newIsland.name",       // i18n key
  descriptionKey: "islands.newIsland.description",
  subject: "math",                         // used for styling/filtering
  lessonIds: ["lesson-1", "lesson-2"],     // references to lesson IDs
  mapPosition: { x: 400, y: 250 },        // position on the Archipelago Map
  icon: "📐",                              // emoji shown on the map
}
```

Then add translations for the island name and description in all locale files.

---

## How to Add a New Lesson

Open `src/content/lessons.ts` and add a lesson object:

```ts
{
  id: "lesson-id",
  titleKey: "lessons.lessonTitle",         // i18n key
  descriptionKey: "lessons.lessonDescription",
  type: "text",                            // "text" | "quiz" | "video"
  islandId: "island-id",                   // parent island reference
  order: 1,                                // position within the island
}
```

Then add translations in the lesson locale files.

---

## How to Add a New Achievement

Open `src/content/achievements.ts` and add an entry:

```ts
{
  id: "new-achievement",
  title: "Achievement Title",
  description: "What the student must do",
  icon: "🎯",
  category: "exploration",                 // "completion" | "streak" | "mastery" | "exploration"
  xpReward: 500,
  condition: "Complete all hidden lessons",
}
```

---

## How to Add a New Translation

1. Open the locale directory: `src/locales/{lang}/`
2. Add or update the relevant JSON file (e.g., `home.json`)
3. The key must match what's referenced in the content file

Example for a new feature in `en/home.json`:
```json
"feature_newFeature": "My Feature",
"feature_newFeatureDesc": "This is my new feature description."
```

---

## File Quick Reference

| Task | File to Edit |
|------|-------------|
| Add a video | `src/content/videos.ts` |
| Add a feature card | `src/content/features.ts` |
| Add an island | `src/content/islands.ts` |
| Add a lesson | `src/content/lessons.ts` |
| Add an achievement | `src/content/achievements.ts` |
| Add translations | `src/locales/{lang}/{section}.json` |
| Change page layout | `src/pages/{PageName}.tsx` |
| Add a new page | `src/pages/{PageName}.tsx` + add route in `App.tsx` |

---

## Rules

1. **Never hardcode content in React components** — use the `src/content/` files
2. **Always add translations** — content uses i18n keys, not hardcoded strings
3. **Test after changes** — run `pnpm build` to verify no broken imports
4. **Commit content changes separately** — makes rollback easier
