/**
 * Central Video Library — I-Land1o1
 *
 * The ONLY place where video links are stored.
 * All components import from this file.
 *
 * Each video supports multiple languages.
 * getVideo() selects the right video for the current locale.
 *
 * Naming Convention: {subject}{level}L{lesson}
 *   code1L1, code1L2, code2L1, science1L1, math1L1, language1L1, etc.
 *
 * Special keys:
 *   preview = introductory/hero video on homepage
 */

// ─── Types ────────────────────────────────────────────────────────────

export type LanguageCode = "de" | "en" | "zhTW";

export interface LocalizedVideo {
  /** Localized display title */
  title: string;
  /** Video URL — YouTube, Vimeo, or direct mp4 (empty string = not yet added) */
  url: string;
}

/** One video entry, keyed by language code */
export type LocalizedVideoEntry = Partial<Record<LanguageCode, LocalizedVideo>>;

/** Fallback order: de → en */
const FALLBACK_ORDER: LanguageCode[] = ["de", "en"];

// ─── Video Data ───────────────────────────────────────────────────────

/**
 * All project video links.
 *
 * Language keys: "de", "en", "zhTW"
 * Prepare for future languages by adding a new key.
 *
 * If a language does not have a video, getVideo() falls back:
 *   current → de → en
 */
export const videos: Record<string, LocalizedVideoEntry> = {

  // ─── Homepage / Marketing ───

  preview: {
    de: { title: "Zeitraffer Inselbau", url: "https://youtu.be/2TStogXT1lc" },
    en: { title: "Island Building Timelapse", url: "https://youtu.be/2TStogXT1lc" },
    zhTW: { title: "島嶼建造縮時影片", url: "" },
  },

  // ─── Coding — Level 1 ───

  code1L1: {
    de: { title: "Grundlagen der Steuerung", url: "" },
    en: { title: "Control Basics", url: "" },
    zhTW: { title: "控制基礎", url: "" },
  },
  code1L2: {
    de: { title: "Einführung in Block Coding", url: "" },
    en: { title: "Introduction to Block Coding", url: "" },
    zhTW: { title: "積木編碼入門", url: "" },
  },
  code1L3: {
    de: { title: "Der Agent und seine ersten Befehle", url: "" },
    en: { title: "The Agent and Its First Commands", url: "" },
    zhTW: { title: "Agent 的第一個指令", url: "" },
  },
  code1L4: {
    de: { title: "Bewegung und Navigation", url: "" },
    en: { title: "Movement and Navigation", url: "" },
    zhTW: { title: "移動與導航", url: "" },
  },
  code1L5: {
    de: { title: "Bauen mit dem Agenten", url: "" },
    en: { title: "Building with the Agent", url: "" },
    zhTW: { title: "用 Agent 建造", url: "" },
  },
  code1L6: {
    de: { title: "Schleifen", url: "" },
    en: { title: "Loops", url: "" },
    zhTW: { title: "迴圈", url: "" },
  },
  code1L7: {
    de: { title: "Bedingungen und Entscheidungen", url: "" },
    en: { title: "Conditions and Decisions", url: "" },
    zhTW: { title: "條件與決策", url: "" },
  },
  code1L8: {
    de: { title: "Ereignisse und Chat-Befehle", url: "" },
    en: { title: "Events and Chat Commands", url: "" },
    zhTW: { title: "事件與聊天指令", url: "" },
  },
  code1L9: {
    de: { title: "Variablen und Daten speichern", url: "" },
    en: { title: "Variables and Data Storage", url: "" },
    zhTW: { title: "變數與資料儲存", url: "" },
  },
  code1L10: {
    de: { title: "Eigenes Projekt und Abschluss", url: "" },
    en: { title: "Final Project", url: "" },
    zhTW: { title: "專案與結業", url: "" },
  },
  code1L11: {
    de: { title: "Die letzte Insel", url: "" },
    en: { title: "The Last Island", url: "" },
    zhTW: { title: "最後的島嶼", url: "" },
  },

  // ─── Coding — Level 2: Bedingungen & Funktionen ───

  code2L1: {
    de: { title: "Einfache Bedingungen", url: "" },
    en: { title: "Simple Conditions", url: "" },
    zhTW: { title: "簡單條件判斷", url: "" },
  },
  code2L2: {
    de: { title: "Mehrfach-Bedingungen", url: "" },
    en: { title: "Multiple Conditions", url: "" },
    zhTW: { title: "多重條件判斷", url: "" },
  },
  code2L3: {
    de: { title: "Variablen & Zähler", url: "" },
    en: { title: "Variables & Counters", url: "" },
    zhTW: { title: "變數與計數器", url: "" },
  },
  code2L4: {
    de: { title: "Funktionen mit Parametern", url: "" },
    en: { title: "Functions with Parameters", url: "" },
    zhTW: { title: "帶參數的函式", url: "" },
  },
  code2L5: {
    de: { title: "Bedingungen in Funktionen", url: "" },
    en: { title: "Conditions in Functions", url: "" },
    zhTW: { title: "函式中的條件", url: "" },
  },
  code2L6: {
    de: { title: "Komplexe Muster", url: "" },
    en: { title: "Complex Patterns", url: "" },
    zhTW: { title: "複雜圖樣", url: "" },
  },
  code2L7: {
    de: { title: "Umgebungs-Checks", url: "" },
    en: { title: "Environment Checks", url: "" },
    zhTW: { title: "環境偵測", url: "" },
  },
  code2L8: {
    de: { title: "Redstone-Interaktionen", url: "" },
    en: { title: "Redstone Interactions", url: "" },
    zhTW: { title: "紅石互動", url: "" },
  },
  code2L9: {
    de: { title: "Mini-Spiele", url: "" },
    en: { title: "Mini Games", url: "" },
    zhTW: { title: "小遊戲", url: "" },
  },
  code2L10: {
    de: { title: "Projekt: Interaktive Stadt", url: "" },
    en: { title: "Project: Interactive City", url: "" },
    zhTW: { title: "專案：互動城市", url: "" },
  },
  code2L11: {
    de: { title: "Sandbox Bay", url: "" },
    en: { title: "Sandbox Bay", url: "" },
    zhTW: { title: "沙盒灣", url: "" },
  },

  // ─── Science ───

  science1L1: {
    de: { title: "Wissenschaft 1.1", url: "" },
    en: { title: "Science 1.1", url: "" },
    zhTW: { title: "科學 1.1", url: "" },
  },
  science1L2: {
    de: { title: "Wissenschaft 1.2", url: "" },
    en: { title: "Science 1.2", url: "" },
    zhTW: { title: "科學 1.2", url: "" },
  },

  // ─── Math ───

  math1L1: {
    de: { title: "Mathematik 1.1", url: "" },
    en: { title: "Math 1.1", url: "" },
    zhTW: { title: "數學 1.1", url: "" },
  },

  // ─── Language ───

  language1L1: {
    de: { title: "Sprache 1.1", url: "" },
    en: { title: "Language 1.1", url: "" },
    zhTW: { title: "語言 1.1", url: "" },
  },
  language2L1: {
    de: { title: "Sprache 2.1", url: "" },
    en: { title: "Language 2.1", url: "" },
    zhTW: { title: "語言 2.1", url: "" },
  },
};

// ─── Helper: getVideo ─────────────────────────────────────────────────

/**
 * Retrieve a video for the given ID and language.
 *
 * Fallback order:
 *   1. current language
 *   2. German (de)
 *   3. English (en)
 *
 * @returns LocalizedVideo with title and url, or null if the ID does not exist.
 */
export function getVideo(
  videoId: string,
  language: LanguageCode
): LocalizedVideo | null {
  const entry = videos[videoId];
  if (!entry) return null;

  // 1. Try current language
  if (entry[language]) return entry[language]!;

  // 2. Try fallback languages
  for (const fb of FALLBACK_ORDER) {
    if (entry[fb]) return entry[fb]!;
  }

  // 3. Try any available language
  const anyLang = Object.keys(entry)[0] as LanguageCode | undefined;
  if (anyLang) return entry[anyLang]!;

  return null;
}
