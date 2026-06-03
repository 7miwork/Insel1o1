import React from "react";
import { Sparkles, Inbox } from "lucide-react";

/**
 * Reusable empty state for dashboards. Always render a friendly placeholder
 * when there is no data — never leave lists, cards or charts empty.
 */
export const EmptyState: React.FC<{
  title: string;
  description?: string;
  icon?: React.ReactNode;
}> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
      {icon ?? <Inbox className="h-5 w-5" />}
    </span>
    <p className="text-sm font-semibold text-slate-700">{title}</p>
    {description && (
      <p className="max-w-xs text-xs text-slate-500">{description}</p>
    )}
  </div>
);

/**
 * Generic stat card with icon, label and value, used in dashboard
 * quick-stats grids. Optional accent color and trend badge.
 */
export const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  accent?: string;
  trend?: { value: string; positive?: boolean };
}> = ({ label, value, icon, accent = "from-cyan-500 to-teal-600", trend }) => (
  <div className="card p-5">
    <div className="flex items-center justify-between">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-sm`}
      >
        {icon}
      </span>
      {trend && (
        <span
          className={`text-xs font-bold ${
            trend.positive === false
              ? "text-rose-600"
              : trend.positive === true
              ? "text-emerald-600"
              : "text-slate-500"
          }`}
        >
          {trend.value}
        </span>
      )}
    </div>
    <p className="mt-3 text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-extrabold text-slate-900">{value}</p>
  </div>
);

/**
 * Section heading used across all dashboards.
 */
export const SectionHeading: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => (
  <div className="mb-4 flex items-end justify-between gap-3">
    <div>
      <h2 className="flex items-center gap-2 text-base font-extrabold text-slate-900 sm:text-lg">
        {icon && (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-50 text-cyan-700">
            {icon}
          </span>
        )}
        {title}
      </h2>
      {description && (
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{description}</p>
      )}
    </div>
    {action}
  </div>
);

/**
 * Page-loading skeleton used by dashboards while data is fetched.
 */
export const DashboardSkeleton: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-slate-500">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
      <Sparkles className="h-5 w-5 animate-pulse" />
    </span>
    <p className="text-sm font-medium">{label ?? "Loading…"}</p>
  </div>
);
