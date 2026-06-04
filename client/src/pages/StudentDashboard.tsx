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
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import { authService } from "@/lib/auth-service";

/* ────────────────────────────────────────
   Data definitions & sample data
   (Replace with real API later)
   ──────────────────────────────────────── */

interface Island {
  id: number;
  name: string;
  emoji: string;
  status: "visited" | "current" | "coming";
  progress: number; // 0‑100
  difficulty: string;
  lessons: { name: string; status: "done" | "active" | "locked" }[];
}

interface Quest {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
  icon: React.ReactNode;
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  status: "unlocked" | "in-progress" | "locked";
  progress: number;
  description: string;
}

interface Reward {
  id: number;
  icon: string;
  name: string;
  time: string;
}

/* Sample data – feel free to replace with real backend data */
const JOURNEY: Island[] = [
  {
    id: 1,
    name: "Mathematics Kingdom",
    emoji: "🏝️",
    status: "visited",
    progress: 100,
    difficulty: "Beginner",
    lessons: [
      { name: "Movement Basics", status: "done" },
      { name: "Block Coding Intro", status: "done" },
      { name: "Your First Program", status: "done" },
    ],
  },
  {
    id: 2,
    name: "Science Lab",
    emoji: "🔬",
    status: "current",
    progress: 40,
    difficulty: "Beginner",
    lessons: [
      { name: "Lab Safety", status: "done" },
      { name: "First Experiment", status: "active" },
      { name: "Cell Biology", status: "locked" },
    ],
  },
  {
    id: 3,
    name: "History Voyage",
    emoji: "⚓",
    status: "coming",
    progress: 0,
    difficulty: "Intermediate",
    lessons: [{ name: "Ancient Civilizations", status: "locked" }],
  },
  {
    id: 4,
    name: "Art Studio",
    emoji: "🎨",
    status: "coming",
    progress: 0,
    difficulty: "Intermediate",
    lessons: [{ name: "Color Theory",