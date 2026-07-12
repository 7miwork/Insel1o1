import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { authService } from "@/lib/auth-service";

export interface ChildData {
  id: string;
  name: string;
  initials: string;
  overallProgress: number;
  weeklyMinutes: number;
  lastActivity: string;
  lastActivityTime: string;
  avatarGradient: string;
  recentActivities: Activity[];
  insights: {
    completedLessonsThisWeek: number;
    totalLessonsThisWeek: number;
    avgQuizScore: number;
    weeklyMinutes: number;
    weeklyMinutesGoal: number;
    weeklyGoalProgress: number;
    consistencyScore: number;
  };
}

export interface Activity {
  id: string;
  type: "quiz" | "lesson" | "feedback" | "milestone" | "streak";
  title: string;
  detail: string;
  time: string;
  icon: string;
}

export interface ParentDashboardData {
  loading: boolean;
  error: string | null;
  children: ChildData[];
  hasNoChildren: boolean;
}

function getInitials(firstName: string, lastName: string): string {
  const first = firstName ? firstName[0].toUpperCase() : "";
  const last = lastName ? lastName[0].toUpperCase() : "";
  return (first + last) || "??";
}

function getGradient(status: string): string {
  if (status === "on-track") return "from-cyan-500 to-teal-600";
  if (status === "needs-attention") return "from-amber-400 to-orange-500";
  return "from-rose-400 to-rose-500";
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? "s" : ""} ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString();
}

export function useParentDashboardData(): ParentDashboardData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [children, setChildren] = useState<ChildData[]>([]);
  const [hasNoChildren, setHasNoChildren] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // 0) Resolve current user
        let parentId: string | null = null;
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          parentId = session.session.user.id;
        } else {
          const local = authService.getCurrentUser();
          if (!local) {
            console.error("[useParentDashboardData] Not authenticated");
            setError("Not authenticated");
            setLoading(false);
            return;
          }
          parentId = local.id;
        }

        console.log("[useParentDashboardData] Loading data for parent:", parentId);

        // 1) Load linked children from parent_child_links
        const { data: links, error: linksError } = await supabase
          .from("parent_child_links")
          .select("child_id")
          .eq("parent_id", parentId);

        if (linksError) {
          console.error("[useParentDashboardData] parent_child_links error:", linksError);
          setHasNoChildren(true);
          setLoading(false);
          return;
        }

        const childIds = (links || []).map((l: any) => l.child_id);

        if (childIds.length === 0) {
          console.log("[useParentDashboardData] No children linked");
          setHasNoChildren(true);
          setLoading(false);
          return;
        }

        setHasNoChildren(false);

        // 2) Load profiles for children
        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name")
          .in("id", childIds);

        if (profilesError) {
          console.error("[useParentDashboardData] profiles error:", profilesError);
        }

        const profileMap = new Map(
          (profiles || []).map((p: any) => [p.id, p]),
        );

        // 3) For each child, compute progress + activities
        const childDataPromises = childIds.map(async (childId) => {
          const profile = profileMap.get(childId);
          const firstName = profile?.first_name || "";
          const lastName = profile?.last_name || "";
          const name = `${firstName} ${lastName}`.trim() || "Unknown Child";
          const initials = getInitials(firstName, lastName);

          // Load all student_progress for this child
          const { data: progress, error: progressError } = await supabase
            .from("student_progress")
            .select("lesson_id, completed, score, completed_at")
            .eq("user_id", childId);

          if (progressError) {
            console.error(`[useParentDashboardData] progress error for ${childId}:`, progressError);
          }

          const progressRows = progress || [];
          const totalCompleted = progressRows.filter((p: any) => p.completed).length;
          const totalLessons = progressRows.length;
          const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

          // Weekly minutes (last 7 days)
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const weeklyProgress = progressRows.filter((p: any) => {
            if (!p.completed_at) return false;
            const d = new Date(p.completed_at);
            const completedAt = new Date(d.getTime() + Math.abs(d.getTimezoneOffset() * 60000));
            return completedAt >= sevenDaysAgo;
          });

          const weeklyMinutes = weeklyProgress.length * 15; // assume ~15 min per lesson

          // Last activity
          const completedWithDate = progressRows
            .filter((p: any) => p.completed && p.completed_at)
            .sort((a: any, b: any) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());

          let lastActivity = "No activity yet";
          let lastActivityTime = "—";
          if (completedWithDate.length > 0) {
            lastActivityTime = completedWithDate[0].completed_at;
            // Find lesson title
            const lessonId = completedWithDate[0].lesson_id;
            const { data: lesson } = await supabase
              .from("lessons")
              .select("title")
              .eq("id", lessonId)
              .single();
            lastActivity = lesson?.title || "Completed a lesson";
          }

          // Recent activities (last 5 from student_progress)
          const recentActivities: Activity[] = completedWithDate.slice(0, 5).map((p: any, idx) => {
            const lessonId = p.lesson_id;
            const { data: lesson } = supabase
              .from("lessons")
              .select("title")
              .eq("id", lessonId)
              .single();
            return {
              id: `sp_${childId}_${p.lesson_id}_${idx}`,
              type: "lesson",
              title: lesson?.title || "Completed a lesson",
              detail: `Lesson ${p.lesson_id}`,
              time: timeAgo(p.completed_at),
              icon: "📚",
            };
          });

          // Load user_achievements for this child
          const { data: userAchievements } = await supabase
            .from("user_achievements")
            .select("achievement_id, earned_at")
            .eq("user_id", childId)
            .order("earned_at", { ascending: false })
            .limit(5);

          for (const ua of userAchievements || []) {
            if (recentActivities.length >= 5) break;
            const { data: achievement } = await supabase
              .from("achievements")
              .select("title, icon_url")
              .eq("id", ua.achievement_id)
              .single();
            recentActivities.push({
              id: `ach_${childId}_${ua.achievement_id}`,
              type: "milestone",
              title: achievement?.title || "Unlocked treasure",
              detail: `Earned ${achievement?.icon_url || "🏆"}`,
              time: timeAgo(ua.earned_at),
              icon: achievement?.icon_url || "🏆",
            });
          }

          // Sort by recency (approximate since timeAgo is string)
          const activityWithDates = recentActivities.map((a, idx) => ({
            ...a,
            sortKey: completedWithDate[idx]?.completed_at || new Date(Date.now() - idx * 60000).toISOString(),
          }));
          activityWithDates.sort((a, b) => new Date(b.sortKey).getTime() - new Date(a.sortKey).getTime());
          const sortedActivities = activityWithDates.map(({ sortKey: _, ...a }) => a);

          // Insights: completedLessonsThisWeek, totalLessonsThisWeek, avgQuizScore
          const completedThisWeek = weeklyProgress.length;
          const totalThisWeek = 10; // approximate target (not in DB)
          const scores = progressRows.filter((p: any) => p.score && p.completed).map((p: any) => p.score);
          const avgQuizScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

          const consistencyScore = Math.min(100, Math.round((weeklyMinutes / 300) * 100));

          return {
            id: childId,
            name,
            initials,
            overallProgress,
            weeklyMinutes,
            lastActivity,
            lastActivityTime,
            avatarGradient: getGradient(overallProgress >= 70 ? "on-track" : overallProgress >= 40 ? "needs-attention" : "at-risk"),
            recentActivities: sortedActivities.slice(0, 5),
            insights: {
              completedLessonsThisWeek: completedThisWeek,
              totalLessonsThisWeek: totalThisWeek,
              avgQuizScore,
              weeklyMinutes,
              weeklyMinutesGoal: 300,
              weeklyGoalProgress: Math.min(100, Math.round((weeklyMinutes / 300) * 100)),
              consistencyScore,
            },
          };
        });

        const resolvedChildren = await Promise.all(childDataPromises);

        if (!cancelled) {
          setChildren(resolvedChildren);
        }
      } catch (err) {
        console.error("[useParentDashboardData] Caught error:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load parent data");
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
    children,
    hasNoChildren,
  };
}