/**
 * Central Video Library — Insel 1o1
 *
 * The ONLY place where video links are stored.
 * All components import from this file.
 *
 * Naming Convention:
 *   {subject}{level}L{lesson}
 *
 *   Examples:
 *     code1L1  = Coding, Level 1, Lesson 1
 *     code1L2  = Coding, Level 1, Lesson 2
 *     code2L1  = Coding, Level 2, Lesson 1
 *     science1L1 = Science, Level 1, Lesson 1
 *     math3L4    = Math, Level 3, Lesson 4
 *     language2L1 = Language, Level 2, Lesson 1
 *
 *   Special keys:
 *     preview  = introductory/hero video on homepage
 *
 * Supported providers:
 *   - YouTube (youtu.be, youtube.com/watch?v=, youtube.com/embed/)
 *   - Vimeo
 *   - Direct mp4 (future)
 */

export type VideoProvider = "youtube" | "vimeo" | "mp4" | "";

export interface VideoEntry {
  /** Video URL — YouTube, Vimeo, or direct mp4 */
  url: string;
  /** Display title */
  title: string;
  /** Optional provider override (auto-detected if omitted) */
  provider?: VideoProvider;
}

/**
 * All project video links.
 *
 * Add new videos here. The UI reads from this single source.
 *
 * @example
 *   code1L1: {
 *     url: "https://youtu.be/example",
 *     title: "Variables Introduction"
 *   },
 */
export const videos: Record<string, VideoEntry> = {
  // ─── Homepage / Marketing ───
  preview: {
    url: "https://youtu.be/2TStogXT1lc",
    title: "Island Building Timelapse",
  },

  // ─── Coding — Level 1 ───
  code1L1: {
    url: "",
    title: "Coding 1.1 — Grundlagen der Steuerung",
  },
  code1L2: {
    url: "",
    title: "Coding 1.2",
  },
  code1L3: {
    url: "",
    title: "Coding 1.3",
  },

  // ─── Coding — Level 2 ───
  code2L1: {
    url: "",
    title: "Coding 2.1",
  },
  code2L2: {
    url: "",
    title: "Coding 2.2",
  },

  // ─── Science ───
  science1L1: {
    url: "",
    title: "Science 1.1",
  },
  science1L2: {
    url: "",
    title: "Science 1.2",
  },

  // ─── Math ───
  math1L1: {
    url: "",
    title: "Math 1.1",
  },

  // ─── Language ───
  language1L1: {
    url: "",
    title: "Language 1.1",
  },
  language2L1: {
    url: "",
    title: "Language 2.1",
  },
};