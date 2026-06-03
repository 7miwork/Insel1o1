import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Menu,
  X,
  Home,
  Map as MapIcon,
  BookOpen,
  Trophy,
  Star,
  BarChart3,
  Settings,
  User as UserIcon,
  Search,
  Bell,
  LogOut,
  Sun,
  Moon,
  ChevronDown,
  Compass,
  Inbox,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService, type User } from "@/lib/auth-service";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export type DashboardNavItem = {
  to?: string;
  id?: string;
  labelKey: string;
  icon: React.ReactNode;
  badge?: number | string;
};

interface DashboardLayoutProps {
  titleKey: string;
  subtitleKey?: string;
  /** Items shown in the sidebar. Provide `to` for routes or `id` for internal tabs. */
  navItems: DashboardNavItem[];
  /** Active item key (`to` or `id`). */
  activeKey: string;
  /** Called when a sidebar item is clicked. */
  onNavigate: (item: DashboardNavItem) => void;
  /** When true, hides the global search field (e.g. on smaller pages). */
  hideSearch?: boolean;
  /** Right-aligned quick actions rendered next to the profile menu. */
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Shared layout for all role-based dashboards.
 *
 * Renders:
 *  • Sticky top header with title, search, language switcher, theme toggle
 *    and profile menu.
 *  • Collapsible sidebar with role-specific navigation (icons from lucide).
 *  • Main content slot for stats, cards, tables, charts.
 *  • Empty-state helpers, mobile drawer, focus-visible rings.
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  titleKey,
  subtitleKey,
  navItems,
  activeKey,
  onNavigate,
  hideSearch = false,
  headerActions,
  children,
}) => {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");

  const user = (authService.getCurrentUser?.() as User | null) ?? null;
  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName ?? ""}`.trim()
    : t("common.appName");
  const userRole = user?.role ?? "student";
  const initials = (user?.firstName?.[0] ?? "I").toUpperCase() +
    (user?.lastName?.[0] ?? "1").toUpperCase();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label={t("dashboard.sidebar")}
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center gap-2.5 border-b border-slate-200 px-5 py-4">
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2.5 group"
              aria-label={t("common.appName")}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-sm">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-base font-extrabold bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
                {t("common.appName")}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="ml-auto rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
            {navItems.map((item) => {
              const key = item.to ?? item.id ?? item.labelKey;
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onNavigate(item);
                    setSidebarOpen(false);
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-cyan-50 text-cyan-800 ring-1 ring-cyan-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{t(item.labelKey)}</span>
                  {item.badge != null && (
                    <span
                      className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                        isActive ? "bg-white text-cyan-700" : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom user card */}
          <div className="border-t border-slate-200 p-3 space-y-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
            >
              <LogOut className="h-4 w-4" />
              {t("common.logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Header */}
        <header
          className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur"
          role="banner"
        >
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label={t("dashboard.toggleMenu")}
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                {t(titleKey)}
              </h1>
              {subtitleKey && (
                <p className="truncate text-xs text-slate-500 sm:text-sm">
                  {t(subtitleKey)}
                </p>
              )}
            </div>

            {!hideSearch && (
              <div className="hidden flex-1 md:flex md:max-w-md">
                <label className="relative block w-full">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("dashboard.searchPlaceholder")}
                    className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    aria-label={t("dashboard.searchPlaceholder")}
                  />
                </label>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              {headerActions}

              <button
                type="button"
                onClick={toggleTheme}
                className="hidden h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 sm:inline-flex"
                aria-label={t("dashboard.toggleTheme")}
                title={t("dashboard.toggleTheme")}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </button>

              <button
                type="button"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
                aria-label={t("dashboard.notifications")}
                title={t("dashboard.notifications")}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="hidden sm:inline">{userName}</span>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-lg"
                    role="menu"
                  >
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                      <p className="text-xs text-slate-500 capitalize">{userRole}</p>
                    </div>
                    <hr className="my-1 border-slate-100" />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setLocation("/dashboard");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <UserIcon className="h-4 w-4" />
                      {t("nav.profile")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setLocation("/dashboard");
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="h-4 w-4" />
                      {t("nav.settings")}
                    </button>
                    <hr className="my-1 border-slate-100" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      {t("common.logout")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
