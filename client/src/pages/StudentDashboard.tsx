import React, { useState } from "react";
import { useLocation } from "wouter";
import {
  Compass,
  Flame,
  Map as MapIcon,
  Star,
  Target,
  Lock,
  CheckCircle2,
  ArrowRight,
  Clock,
  Shield,
  Eye,
  Sparkles,
  Zap,
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";

/* ────────────────────────────────────────
   Data definitions & sample data
   (Replace with real API later)
   ──────────────────────────────────────── */

interface Island {
  id: number;