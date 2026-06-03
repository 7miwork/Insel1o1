import React from "react";
import { Lock, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export type LessonStatus = "locked" | "available" | "in-progress" | "completed";

interface StatusBadgeProps {
  status: LessonStatus;
  className?: string;
}

const variantMap: Record<
  LessonStatus,
  { className: string; icon: React.ReactNode }
> = {
  locked:    { className: "badge-locked",    icon: <Lock className="w-3 h-3" /> },
  available: { className: "badge-available", icon: <Sparkles className="w-3 h-3" /> },
  "in-progress": { className: "badge-progress", icon: <PlayCircle className="w-3 h-3" /> },
  completed: { className: "badge-completed", icon: <CheckCircle2 className="w-3 h-3" /> },
};

const labelKeys: Record<LessonStatus, string> = {
  locked: "status.locked",
  available: "status.available",
  "in-progress": "status.inProgress",
  completed: "status.completed",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const { t } = useI18n();
  const variant = variantMap[status];
  return (
    <span className={`badge ${variant.className} ${className}`} role="status" aria-label={t(labelKeys[status])}>
      {variant.icon}
      {t(labelKeys[status])}
    </span>
  );
};

export default StatusBadge;
