import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X, Home, Map as MapIcon, BarChart3, Settings } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavItem {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/",              labelKey: "nav.home",         icon: <Home className="w-4 h-4" /> },
  { to: "/archipelago",   labelKey: "nav.archipelagos", icon: <MapIcon className="w-4 h-4" /> },
  { to: "/dashboard",     labelKey: "nav.progress",     icon: <BarChart3 className="w-4 h-4" /> },
  { to: "/about",         labelKey: "navigation.about", icon: <Settings className="w-4 h-4" /> },
  { to: "/login",         labelKey: "nav.settings",     icon: <Settings className="w-4 h-4" /> },
];

interface GlobalHeaderProps {
  /** Show the language switcher on the right (defaults to true). */
  showLanguageSwitcher?: boolean;
  /** Show a CTA button (e.g. "Start Adventure") on the right. */
  ctaLabel?: string;
  ctaHref?: string;
  /** Toggle background blur/translucency. Defaults to true. */
  translucent?: boolean;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  showLanguageSwitcher = true,
  ctaLabel,
  ctaHref,
  translucent = true,
}) => {
  const { t } = useI18n();
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/70 ${
        translucent ? "bg-white/80 backdrop-blur-xl" : "bg-white"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label={t("common.appName")}
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <BookOpen className="w-5 h-5" />
          </span>
          <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
            {t("common.appName")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.to}
              type="button"
              onClick={() => navigate(item.to)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive(item.to)
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.icon}
              {t(item.labelKey)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {showLanguageSwitcher && (
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
          )}
          {ctaLabel && ctaHref && (
            <button
              type="button"
              onClick={() => navigate(ctaHref)}
              className="btn btn-primary btn-md hidden sm:inline-flex"
            >
              {ctaLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden btn btn-ghost btn-sm p-2"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.to}
              type="button"
              onClick={() => {
                navigate(item.to);
                setMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                isActive(item.to)
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.icon}
              {t(item.labelKey)}
            </button>
          ))}
          {showLanguageSwitcher && (
            <div className="pt-2 border-t border-slate-100 sm:hidden">
              <LanguageSwitcher />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;
