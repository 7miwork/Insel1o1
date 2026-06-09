import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X, Home, GraduationCap, School } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavItem {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/", labelKey: "nav.home", icon: <Home className="w-4 h-4" /> },
  { to: "/about", labelKey: "navigation.about", icon: <BookOpen className="w-4 h-4" /> },
];

interface GlobalHeaderProps {
  showLanguageSwitcher?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label={t("common.appName")}
        >
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </span>
          <span className="text-sm font-bold text-slate-900 tracking-tight">
            {t("common.appName")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.to}
              type="button"
              onClick={() => navigate(item.to)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive(item.to)
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
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
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition-colors hidden sm:inline-flex"
            >
              {ctaLabel}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
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
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {t(item.labelKey)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              navigate("/student");
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-amber-700 bg-amber-50 hover:bg-amber-100 mt-2"
          >
            <GraduationCap className="w-4 h-4" />
            {t("common.startLearning")}
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-slate-900 bg-slate-100 hover:bg-slate-200"
          >
            <School className="w-4 h-4" />
            {t("navigation.signIn")}
          </button>
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