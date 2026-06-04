/**
 * i18n Configuration and Translation Loader
 * 
 * This file loads and manages translations for the application.
 * Translations are loaded from JSON files in the public/i18n directory.
 */
type Language = 'en' | 'de' | 'zh-TW';

interface TranslationData {
  [key: string]: any;
}

interface Translations {
  en: TranslationData;
  de: TranslationData;
  'zh-TW': TranslationData;
}

// Mock translations - in production, these would be loaded from JSON files
export const translations: Translations = {
  en: {
    common: {
      welcome: 'Welcome to Insel 1o1',
      appName: 'Insel 1o1 EdTech Platform',
      language: 'Language',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
    },
    auth: {
      loginTitle: 'Login to Insel 1o1',
      registerTitle: 'Create Your Insel 1o1 Account',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      invalidCredentials: 'Invalid email or password',
      emailTaken: 'Email already in use',
      passwordTooShort: 'Password must be at least 8 characters',
    },
    navigation: {
      home: 'Home',
      dashboard: "Captain's Deck",
      profile: 'Profile',
      courses: 'Courses',
      shop: 'Shop',
      settings: 'Settings',
      admin: 'Admin Panel',
      teacher: 'Teacher Dashboard',
      parent: 'Parent Portal',
    },
    gamification: {
      xp: 'Explorer Experience',
      level: 'Level',
      streak: 'Learning Streak',
      archipelago: 'Archipelago',
      island: 'Island',
      mission: 'Mission',
      boss: 'Boss Battle',
      unlock: 'Unlock',
      locked: 'Locked',
      completed: 'Collected',
      inProgress: 'In Progress',
      title: 'Captain\'s Deck',
      continueAdventure: 'Continue Adventure',
      currentVoyage: 'Current Voyage',
      currentIsland: 'Island 1',
      nextIsland: 'Island 2',
      progress: 'Progress',
      timeLeft: 'Time Left',
      quests: {
        title: 'Daily & Weekly Quests',
        daily: 'Daily Quests',
        weekly: 'Weekly Quests',
        adventureGoals: 'Explore new islands and earn XP.',
        dailyDesc: 'Complete today’s learning mission to earn rewards.',
        weeklyDesc: 'Finish weekly challenges for extra treasure.',
        adventureGoals: 'Explore new islands and earn XP.'
      },
      achievements: {
        title: 'Treasure Collection',
        collected: 'Items Collected',
        unlocked: 'Unlocked',
        status: 'Collected',
      },
      motivation: 'Continue your voyage – a new island awaits!'
    },
    shop: {
      buyNow: 'Buy Now',
      price: 'Price',
      subscription: 'Subscription',
      course: 'Course',
      bundle: 'Bundle',
      addToCart: 'Add to Cart',
      checkout: 'Checkout',
      cart: 'Shopping Cart',
      total: 'Total',
    },
    dashboard: {
      overview: 'Overview',
      recentActivity: 'Recent Activity',
      statistics: 'Statistics',
      progress: 'Progress',
      students: 'Students',
      classes: 'Classes',
      assignments: 'Assignments',
      grades: 'Grades',
    },
  },
  de: {
    common: {
      welcome: 'Willkommen bei Insel 1o1',
      appName: 'Insel 1o1 EdTech-Plattform',
      language: 'Sprache',
      logout: 'Abmelden',
      login: 'Anmelden',
      register: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      firstName: 'Vorname',
      lastName: 'Nachname',
      submit: 'Absenden',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Zurück',
      loading: 'Wird geladen...',
      error: 'Fehler',
      success: 'Erfolg',
      warning: 'Warnung',
      info: 'Information',
    },
    auth: {
      loginTitle: 'Bei Insel 1o1 anmelden',
      registerTitle: 'Erstellen Sie Ihr Insel 1o1-Konto',
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Haben Sie noch kein Konto?',
      haveAccount: 'Haben Sie bereits ein Konto?',
      invalidCredentials: 'Ungültige E-Mail oder Passwort',
      emailTaken: 'E-Mail wird bereits verwendet',
      passwordTooShort: 'Das Passwort muss mindestens 8 Zeichen lang sein',
    },
    navigation: {
      home: 'Startseite',
      dashboard: 'Kapitänsdeck',
      profile: 'Profil',
      courses: 'Kurse',
      shop: 'Shop',
      settings: 'Einstellungen',
      admin: 'Admin-Panel',
      teacher: 'Lehrer-Dashboard',
      parent: 'Elternportal',
    },
    gamification: {
      xp: 'Erfahrungspunkte',
      level: 'Stufe',
      streak: 'Lernsträhne',
      archipelago: 'Archipel',
      island: 'Insel',
      mission: 'Mission',
      boss: 'Boss-Kampf',
      unlock: 'Entsperren',
      locked: 'Gesperrt',
      completed: 'Abgeschlossen',
      inProgress: 'In Bearbeitung',
      title: 'Kapitänsdeck',
      continueAdventure: 'Abenteuer fortsetzen',
      currentVoyage: 'Aktuelle Reise',
      currentIsland: 'Insel 1',
      nextIsland: 'Insel 2',
      progress: 'Fortschritt',
      timeLeft: 'Zeit Left',
      quests: {
        title: 'Tägliche & Wöchentliche Quests',
        daily: 'Tägliche Quests',
        weekly: 'Wöchentliche Quests',
        adventureGoals: 'Entdecke neue Inseln und sammle XP.',
        dailyDesc: 'Erfülle heute’s Lernmission für Belohnungen.',
        weeklyDesc: 'Schließe wöchentliche Herausforderungen für Schätze.',
        adventureGoals: 'Entdecke neue Inseln und sammle XP.'
      },
      achievements: {
        title: 'Schatzsammlung',
        collected: 'Gegenstände Gesammelt',
        unlocked: 'Gesperrt',
        status: 'Gesammelt',
      },
      motivation: 'Fortsetze deine Reise – eine neue Insel wartet!'
    },
    shop: {
      buyNow: 'Jetzt Kaufen',
      price: 'Preis',
      subscription: 'Abo',
      course: 'Kurs',
      bundle: 'Bundle',
      addToCart: 'In Den Warenkorb',
      checkout: 'Zur Kasse',
      cart: 'Einkaufswagen',
      total: 'Gesamt',
    },
    dashboard: {
      overview: 'Übersicht',
      recentActivity: 'Letzte Aktivität',
      statistics: 'Statistiken',
      progress: 'Fortschritt',
      students: 'Schüler',
      classes: 'Klassen',
      assignments: 'Aufgaben',
      grades: 'Noten',
    },
  },
  'zh-TW': {
    common: {
      welcome: '歡迎來到 Insel 1o1',
      appName: 'Insel 1o1 教育科技平台',
      language: '語言',
      logout: '登出',
      login: '登入',
      register: '註冊',
      email: '電子郵件',
      password: '密碼',
      firstName: '名字',
      lastName: '姓氏',
      submit: '提交',
      cancel: '取消',
      save: '保存',
      delete: '刪除',
      edit: '編輯',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      loading: '載入中...',
      error: '錯誤',
      success: '成功',
      warning: '警告',
      info: '資訊',
    },
    auth: {
      loginTitle: '登入 Insel 1o1',
      registerTitle: '建立您的 Insel 1o1 帳戶',
      forgotPassword: '忘記密碼?',
      noAccount: '還沒有帳戶?',
      haveAccount: '已有帳戶?',
      invalidCredentials: '無效的電子郵件或密碼',
      emailTaken: '電子郵件已被使用',
      passwordTooShort: '密碼必須至少 8 個字符',
    },
    navigation: {
      home: '首頁',
      dashboard: '舵手deck',
      profile: '個人資料',
      courses: '課程',
      shop: '商店',
      settings: '設定',
      admin: '管理員面板',
      teacher: '教師儀表板',
      parent: '家長入口',
    },
    gamification: {
      xp: '經驗值',
      level: '等級',
      streak: '學習連勝',
      archipelago: '群島',
      island: '島嶼',
      mission: '任務',
      boss: '首領戰鬥',
      unlock: '解鎖',
      locked: '已鎖定',
      completed: '已完成',
      inProgress: '進行中',
      title: '舵手deck',
      continueAdventure: '繼續冒險',
      currentVoyage: '當前航程',
      currentIsland: '島嶼 1',
      nextIsland: '島嶼 2',
      progress: '進度',
      timeLeft: '剩餘時間',
      quests: {
        title: '每日與週期任務',
        daily: '每日任務',
        weekly: '週期任務',
        adventureGoals: '探索新島嶼並獲得 XP.',
        dailyDesc: '完成今天的學習任務以獲得獎勵.',
        weeklyDesc: '完成週期挑戰獲取寶藏.',
        adventureGoals: '探索新島嶼並獲得 XP.'
      },
      achievements: {
        title: '寶物收藏',
        collected: '已收集項目',
        unlocked: '解鎖',
        status: '已收集',
      },
      motivation: '繼續你的航程——新島嶼在等待！'
    },
    shop: {
      buyNow: '現在購買',
      price: '價格',
      subscription: '訂閱',
      course: '課程',
      bundle: '套裝',
      addToCart: '加入購物車',
      checkout: '結帳',
      cart: '購物車',
      total: '總計',
    },
    dashboard: {
      overview: '概覽',
      recentActivity: '最近活動',
      statistics: '統計資料',
      progress: '進度',
      students: '學生',
      classes: '班級',
      assignments: '作業',
      grades: '成績',
    },
  },
};

 /**
  * Load translations from a specific language
  */
export function loadTranslations(language: Language): TranslationData {
  return translations[language];
}

/**
 * Get a specific translation key
 */
export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}