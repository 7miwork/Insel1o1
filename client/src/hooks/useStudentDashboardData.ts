import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { authService } from "@/lib/auth-service";

// --- Types matching the StudentDashboard interface ---

export interface Voyage {
  archipelago: string;
  currentIsland: string;
  nextIsland: string;
  progress: number;
}

export interface Activity {
  type: "lesson" | "island" | "xp" | "treasure";
  title: string;
  value?: number;
  timestamp: string;
}

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  status: "locked" | "discovered" | "collected";
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

export interface DashboardData {
  loading: boolean;
  error: string | null;
  hasNoCourses: boolean;
  level: number;
  xp: number;
  maxXp: number;
  rank: string;
  voyage: Voyage;
  activities: Activity[];
  achievements: Achievement[];
}

const RANK_THRESHOLDS = [
  { minXp: 0, title: "Navigator" },
  { minXp: 1000, title: "Explorer" },
  { minXp: 2500, title: "Adventurer" },
  { minXp: 5000, title: "Captain" },
  { minXp: 10000, title: "Commodore" },
  { minXp: 20000, title: "Admiral" },
  { minXp: 50000, title: "Legend" },
];

function getRank(totalXp: number): string {
  let rank = RANK_THRESHOLDS[0].title;
  for (const t of RANK_THRESHOLDS) {
    if (totalXp >= t.minXp) rank = t.title;
  }
  return rank;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? "s" : ""} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function useStudentDashboardData(): DashboardData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNoCourses, setHasNoCourses] = useState(false);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [maxXp, setMaxXp] = useState(500);
  const [rank, setRank] = useState("Navigator");
  const [voyage, setVoyage] = useState<Voyage>({
    archipelago: "—",
    currentIsland: "—",
    nextIsland: "—",
    progress: 0,
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // 1) Get current user - first try Supabase session, then fall back to localStorage demo user
        let userId: string | null = null;
        let userEmail: string | null = null;

        const { data: supabaseSession, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) {
          console.error(
            "[useStudentDashboardData] getSession error:",
            sessionError,
          );
        }

        if (supabaseSession?.session?.user) {
          userId = supabaseSession.session.user.id;
          userEmail = supabaseSession.session.user.email;
          console.log(
            "[useStudentDashboardData] Using Supabase session for user:",
            userId,
          );
        } else {
          // Fallback: use localStorage user (demo accounts)
          const localUser = authService.getCurrentUser();
          if (localUser && localUser.id) {
            userId = localUser.id;
            userEmail = localUser.email;
            console.log(
              "[useStudentDashboardData] Using localStorage demo user:",
              userId,
            );
          } else {
            console.error(
              "[useStudentDashboardData] No user found - neither Supabase session nor localStorage user",
            );
            setError("Not authenticated");
            setLoading(false);
            return;
          }
        }

        // 2) Fetch courses (published)
        console.log("[useStudentDashboardData] Fetching courses...");
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select("id, title, category")
          .eq("published", true)
          .order("created_at", { ascending: true });

        if (coursesError) {
          console.error(
            "[useStudentDashboardData] courses query error:",
            coursesError,
          );
          throw coursesError;
        }

        console.log(
          "[useStudentDashboardData] Courses found:",
          courses?.length || 0,
        );

        if (!courses || courses.length === 0) {
          console.log(
            "[useStudentDashboardData] No courses found - setting hasNoCourses=true",
          );
          setHasNoCourses(true);
          setLoading(false);
          return;
        }

        // 3) Pick the first course as the "active" one
        const activeCourse = courses[0];
        console.log(
          "[useStudentDashboardData] Active course:",
          activeCourse.title,
        );

        // 4) Fetch lessons for the active course
        console.log(
          "[useStudentDashboardData] Fetching lessons for course:",
          activeCourse.id,
        );
        const { data: lessons, error: lessonsError } = await supabase
          .from("lessons")
          .select("id, title, order_index")
          .eq("course_id", activeCourse.id)
          .order("order_index", { ascending: true });

        if (lessonsError) {
          console.error(
            "[useStudentDashboardData] lessons query error:",
            lessonsError,
          );
          throw lessonsError;
        }

        console.log(
          "[useStudentDashboardData] Lessons found:",
          lessons?.length || 0,
        );

        if (!lessons || lessons.length === 0) {
          console.log(
            "[useStudentDashboardData] No lessons for active course - setting hasNoCourses=true",
          );
          setHasNoCourses(true);
          setLoading(false);
          return;
        }

        // 5) Fetch student_progress for this user + this course's lessons
        const lessonIds = lessons.map((l) => l.id);
        console.log(
          "[useStudentDashboardData] Fetching student_progress for user:",
          userId,
          "lessonIds:",
          lessonIds,
        );
        const { data: progress, error: progressError } = await supabase
          .from("student_progress")
          .select("lesson_id, completed, score, completed_at")
          .eq("user_id", userId)
          .in("lesson_id", lessonIds);

        if (progressError) {
          console.error(
            "[useStudentDashboardData] student_progress query error:",
            progressError,
          );
          throw progressError;
        }

        console.log(
          "[useStudentDashboardData] Progress entries:",
          progress?.length || 0,
        );

        // 6) Calculate voyage progress
        const completedLessons = (progress || []).filter((p) => p.completed);
        const voyageProgressPercent =
          lessons.length > 0
            ? Math.round((completedLessons.length / lessons.length) * 100)
            : 0;

        console.log(
          "[useStudentDashboardData] Voyage progress:",
          voyageProgressPercent,
          "%",
        );

        // 7) Determine current island (last completed) and next island (first incomplete)
        const completedLessonIds = new Set(
          completedLessons.map((p) => p.lesson_id),
        );
        let currentIslandTitle = "—";
        let nextIslandTitle = "—";
        for (const lesson of lessons) {
          if (completedLessonIds.has(lesson.id)) {
            currentIslandTitle = lesson.title;
          } else {
            if (nextIslandTitle === "—") {
              nextIslandTitle = lesson.title;
            }
          }
        }

        // 8) Calculate total XP from student_progress scores
        const progressXp = (progress || []).reduce(
          (sum, p) => sum + (p.score || 0),
          0,
        );

        // 9) Fetch user_achievements + achievements for XP and treasure list
        console.log(
          "[useStudentDashboardData] Fetching user_achievements for user:",
          userId,
        );
        const { data: userAchievements, error: uaError } = await supabase
          .from("user_achievements")
          .select("achievement_id, earned_at")
          .eq("user_id", userId);

        if (uaError) {
          console.error(
            "[useStudentDashboardData] user_achievements query error:",
            uaError,
          );
          throw uaError;
        }

        console.log(
          "[useStudentDashboardData] User achievements:",
          userAchievements?.length || 0,
        );

        const earnedAchievementIds = new Set(
          (userAchievements || []).map((ua) => ua.achievement_id),
        );

        console.log(
          "[useStudentDashboardData] Fetching all achievements...",
        );
        const { data: allAchievements, error: achError } = await supabase
          .from("achievements")
          .select("id, title, description, icon_url, xp_reward, criteria")
          .order("created_at", { ascending: true });

        if (achError) {
          console.error(
            "[useStudentDashboardData] achievements query error:",
            achError,
          );
          throw achError;
        }

        console.log(
          "[useStudentDashboardData] All achievements:",
          allAchievements?.length || 0,
        );

        // XP from achievements
        const achievementXp = (allAchievements || [])
          .filter((a) => earnedAchievementIds.has(a.id))
          .reduce((sum, a) => sum + (a.xp_reward || 0), 0);

        const totalXp = progressXp + achievementXp;
        const calculatedLevel = Math.floor(totalXp / 500) + 1;
        const calculatedMaxXp = calculatedLevel * 500;
        const calculatedRank = getRank(totalXp);

        // 10) Build treasure list (achievements)
        const treasureList: Achievement[] = (allAchievements || []).map(
          (a, idx) => {
            const isEarned = earnedAchievementIds.has(a.id);
            let status: "locked" | "discovered" | "collected" = "locked";
            let rarity: "common" | "uncommon" | "rare" | "legendary" =
              "common";

            if (isEarned) {
              status = "collected";
            } else {
              status = "discovered";
            }

            // Determine rarity from criteria JSONB field
            if (a.criteria && typeof a.criteria === "object" && a.criteria !== null) {
              const r = (a.criteria as any).rarity;
              if (["common", "uncommon", "rare", "legendary"].includes(r)) {
                rarity = r;
              }
            }

            return {
              id: idx + 1,
              name: a.title,
              icon: a.icon_url || "🏆",
              status,
              rarity,
            };
          },
        );

        // 11) Build Captain's Log (last 5 activities)
        type LogEntry = { date: string; activity: Activity };
        const logEntries: LogEntry[] = [];

        // Add completed lessons
        for (const p of completedLessons) {
          if (p.completed_at) {
            const lesson = lessons.find((l) => l.id === p.lesson_id);
            logEntries.push({
              date: p.completed_at,
              activity: {
                type: "lesson",
                title: `Completed lesson: ${lesson?.title || "Unknown"}`,
                timestamp: timeAgo(p.completed_at),
              },
            });
          }
        }

        // Add earned achievements
        for (const ua of userAchievements || []) {
          if (ua.earned_at) {
            const ach = (allAchievements || []).find(
              (a) => a.id === ua.achievement_id,
            );
            logEntries.push({
              date: ua.earned_at,
              activity: {
                type: "treasure",
                title: `Unlocked treasure: ${ach?.title || "Unknown"}`,
                timestamp: timeAgo(ua.earned_at),
              },
            });
          }
        }

        // Sort by date descending, take last 5
        logEntries.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        const recentLog = logEntries.slice(0, 5).map((e) => e.activity);

        if (!cancelled) {
          setLevel(calculatedLevel);
          setXp(totalXp);
          setMaxXp(calculatedMaxXp);
          setRank(calculatedRank);
          setVoyage({
            archipelago: activeCourse.title,
            currentIsland: currentIslandTitle,
            nextIsland: nextIslandTitle,
            progress: voyageProgressPercent,
          });
          setActivities(recentLog);
          setAchievements(treasureList);
          setHasNoCourses(false);
        }
      } catch (err) {
        console.error("[useStudentDashboardData] Caught error:", err);
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load dashboard data",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loading,
    error,
    hasNoCourses,
    level,
    xp,
    maxXp,
    rank,
    voyage,
    activities,
    achievements,
  };
}