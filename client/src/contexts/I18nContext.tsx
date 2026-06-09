import React, { createContext, useContext, useState, useEffect } from "react";
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enNavigation from "@/locales/en/navigation.json";
import enArchipelago from "@/locales/en/archipelago.json";
import enAuth from "@/locales/en/auth.json";
import enCourses from "@/locales/en/courses.json";
import enDashboard from "@/locales/en/dashboard.json";
import enErrors from "@/locales/en/errors.json";
import enFooter from "@/locales/en/footer.json";
import enLeaderboard from "@/locales/en/leaderboard.json";
import enNotifications from "@/locales/en/notifications.json";
import enQuests from "@/locales/en/quests.json";
import enPricing from "@/locales/en/pricing.json";
import enShop from "@/locales/en/shop.json";
import enAbout from "@/locales/en/about.json";
import enSecurity from "@/locales/en/security.json";

import deCommon from "@/locales/de/common.json";
import deHome from "@/locales/de/home.json";
import deNavigation from "@/locales/de/navigation.json";
import deArchipelago from "@/locales/de/archipelago.json";
import deAuth from "@/locales/de/auth.json";
import deCourses from "@/locales/de/courses.json";
import deDashboard from "@/locales/de/dashboard.json";
import deErrors from "@/locales/de/errors.json";
import deFooter from "@/locales/de/footer.json";
import deLeaderboard from "@/locales/de/leaderboard.json";
import deNotifications from "@/locales/de/notifications.json";
import deQuests from "@/locales/de/quests.json";
import dePricing from "@/locales/de/pricing.json";
import deShop from "@/locales/de/shop.json";
import deSecurity from "@/locales/de/security.json";
import deAbout from "@/locales/de/about.json";

import zhTwCommon from "@/locales/zh-TW/common.json";
import zhTwHome from "@/locales/zh-TW/home.json";
import zhTwNavigation from "@/locales/zh-TW/navigation.json";
import zhTwArchipelago from "@/locales/zh-TW/archipelago.json";
import zhTwAuth from "@/locales/zh-TW/auth.json";
import zhTwCourses from "@/locales/zh-TW/courses.json";
import zhTwDashboard from "@/locales/zh-TW/dashboard.json";
import zhTwErrors from "@/locales/zh-TW/errors.json";
import zhTwFooter from "@/locales/zh-TW/footer.json";
import zhTwLeaderboard from "@/locales/zh-TW/leaderboard.json";
import zhTwNotifications from "@/locales/zh-TW/notifications.json";
import zhTwQuests from "@/locales/zh-TW/quests.json";
import zhTwPricing from "@/locales/zh-TW/pricing.json";
import zhTwShop from "@/locales/zh-TW/shop.json";
import zhTwSecurity from "@/locales/zh-TW/security.json";
import zhTwAbout from "@/locales/zh-TW/about.json";

type Language = "en" | "de" | "zh-TW";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  languages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, any> = {
  en: {
    ...enCommon,
    ...enHome,
    ...enNavigation,
    ...enArchipelago,
    ...enAuth,
    ...enCourses,
    ...enDashboard,
    ...enErrors,
    ...enFooter,
    ...enLeaderboard,
    ...enNotifications,
    ...enQuests,
    ...enPricing,
    ...enShop,
    ...enAbout,
    ...enSecurity,
  },
  de: {
    ...deCommon,
    ...deHome,
    ...deNavigation,
    ...deArchipelago,
    ...deAuth,
    ...deCourses,
    ...deDashboard,
    ...deErrors,
    ...deFooter,
    ...deLeaderboard,
    ...deNotifications,
    ...deQuests,
    ...dePricing,
    ...deShop,
    ...deAbout,
    ...deSecurity,
  },
  "zh-TW": {
    ...zhTwCommon,
    ...zhTwHome,
    ...zhTwNavigation,
    ...zhTwArchipelago,
    ...zhTwAuth,
    ...zhTwCourses,
    ...zhTwDashboard,
    ...zhTwErrors,
    ...zhTwFooter,
    ...zhTwLeaderboard,
    ...zhTwNotifications,
    ...zhTwQuests,
    ...zhTwPricing,
    ...zhTwShop,
    ...zhTwAbout,
    ...zhTwSecurity,
  },
};

/**
 * Helper: resolve a dotted key against a translations object.
 * Returns undefined if any segment is missing.
 */
function resolveKey(obj: any, keys: string[]): any {
  let value: any = obj;
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  return value;
}

/**
 * Helper: convert a dotted key into a human-readable label
 * (used only as the final safety fallback for missing keys).
 *   "common.signIn"      -> "Sign in"
 *   "home.heroTitle"     -> "Hero title"
 *   "footer.allRightsReserved" -> "All rights reserved"
 */
function humanizeKey(key: string): string {
  const last = key.split(".").pop() ?? key;
  return last
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (s) => s.toUpperCase());
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get from localStorage
    try {
      const saved = localStorage.getItem("language") as Language | null;
      if (saved && saved in translations) {
        return saved;
      }
    } catch {
      // localStorage not available
    }
    // Try to get from browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("de")) return "de";
    if (browserLang.startsWith("zh")) return "zh-TW";
    return "en";
  });

  useEffect(() => {
    try {
      localStorage.setItem("language", language);
    } catch {
      // localStorage not available
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (lang in translations) {
      setLanguageState(lang);
    }
  };

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // SAFETY FALLBACK: never show raw key in UI
        // Try the default value, then English, then humanize the last segment
        if (defaultValue) return defaultValue;
        const enValue = resolveKey(translations.en, keys);
        if (typeof enValue === "string") return enValue;
        return humanizeKey(key);
      }
    }

    if (typeof value === "string") return value;
    // SAFETY FALLBACK: also covers non-string (object/number) at the resolved path
    if (defaultValue) return defaultValue;
    return humanizeKey(key);
  };

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "de", name: "Deutsch" },
    { code: "zh-TW", name: "繁體中文" },
  ];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
