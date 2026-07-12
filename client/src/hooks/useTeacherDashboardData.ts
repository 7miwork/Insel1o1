import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { authService } from "@/lib/auth-service";

export interface ClassData {
  id: string;
  name: string;
  subject: string;
  studentCount: number;
  avgCompletion: number;
  avgGrade: string;
  openAssignments: number;
  studentsNeedingHelp: number;
  lastActivity: string;
  color: string;
}

export interface StudentData {
  id: string;
  name: string;
  initials: string;
  className: string;
  avgGrade: number;
  completion: number;
  lastActive: string;
  status: "on-track" | "needs-attention" | "at-risk";
  avatarGradient: string;
  issues: string[];
}

export interface ActivityItem {
  id: string;
  type: "lesson" | "quiz" | "achievement" | "submission";
  student: string;
  title: string;
  detail: string;
  time: string;
  icon: string;
  score?: number;
}

export interface TeacherDashboardData {
  loading: boolean;
  error: string | null;
  classes: ClassData[];
  students: StudentData[];
  activities: ActivityItem[];
}

export function useTeacherDashboardData(): TeacherDashboardData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [totalDistinctStudents, setTotalDistinctStudents] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // 0) Resolve current user
        let userId: string | null = null;
        const { data: session } = await supabase.auth.getSession();
        if (session?.session?.user) {
          userId = session.session.user.id;
        } else {
          const local = authService.getCurrentUser();
          if (!local) {
            console.error("[useTeacherDashboardData] Not authenticated");
            setError("Not authenticated");
            setLoading(false);
            return;
          }
          userId = local.id;
        }

        console.log("[useTeacherDashboardData] Loading data for teacher:", userId);

        // 1) Load classes for this teacher
        const { data: teacherClasses, error: classesError } = await supabase
          .from("classes")
          .select("id, name, course_id, created_at")
          .eq("teacher_id", userId)
          .order("created_at", { ascending: true });

        if (classesError) {
          console.error("[useTeacherDashboardData] classes error:", classesError);
          // classes table may not exist yet
        }

        const classList = teacherClasses || [];

        // 2) For each class: count students + avg completion from student_progress
        const classDataPromises = classList.map(async (cls: any) => {
          const { count: studentCount, error: scError } = await supabase
            .from("class_students")
            .select("id", { count: "exact", head: true })
            .eq("class_id", cls.id);

          // Get lesson ids for the course to compute completion
          const { data: lessons } = await supabase
            .from("lessons")
            .select("id")
            .eq("course_id", cls.course_id);

          const lessonIds = (lessons || []).map((l: any) => l.id);

          let avgCompletion = 0;
          if (lessonIds.length > 0 && studentCount && studentCount > 0) {
            const { data: progressRows } = await supabase
              .from("student_progress")
              .select("lesson_id, completed")
              .in("lesson_id", lessonIds)
              .eq("completed", true);

            const completedCount = (progressRows || []).length;
            avgCompletion = Math.round((completedCount / (lessonIds.length * (studentCount || 1))) * 100);
          }

          return {
            id: cls.id,
            name: cls.name,
            subject: cls.course_id ? "Course" : "General",
            studentCount: scError ? 0 : (studentCount || 0),
            avgCompletion,
            avgGrade: "—",
            openAssignments: 0,
            studentsNeedingHelp: 0,
            lastActivity: cls.created_at ? new Date(cls.created_at).toLocaleString() : "—",
            color: "from-cyan-500 to-teal-600",
          };
        });

        const resolvedClasses = await Promise.all(classDataPromises);

        // Deduplicate classes by id
        const uniqueClasses = Array.from(
          new Map(resolvedClasses.map((c: any) => [c.id, c])).values()
        );

        // 3) Load students for these classes with completion %
        const classIds = uniqueClasses.map((c: any) => c.id);
        let studentRows: any[] = [];
        let totalDistinctStudents = 0;
        if (classIds.length > 0) {
          const { data: classStudents, error: csError } = await supabase
            .from("class_students")
            .select("student_id, class_id")
            .in("class_id", classIds);

          if (!csError && classStudents) {
            const uniqueStudentIds = Array.from(
              new Set((classStudents || []).map((cs: any) => cs.student_id))
            );
            totalDistinctStudents = uniqueStudentIds.length;

            const { data: profiles, error: profilesError } = await supabase
              .from("profiles")
              .select("id, first_name, last_name")
              .in("id", uniqueStudentIds);

            if (!profilesError && profiles) {
              for (const profile of profiles) {
                const studentId = profile.id;
                const name =
                  `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
                  "Unknown";

                const { data: sp, error: spError } = await supabase
                  .from("student_progress")
                  .select("lesson_id, completed")
                  .eq("user_id", studentId);

                const totalCompleted = (sp || []).filter((p: any) => p.completed).length;
                const totalLessons = (sp || []).length;
                const completionPercent =
                  totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

                const status =
                  completionPercent >= 70
                    ? "on-track"
                    : completionPercent >= 40
                      ? "needs-attention"
                      : "at-risk";

                const issues: string[] = [];
                if (completionPercent < 40) {
                  issues.push("Low completion");
                }
                if (totalCompleted === 0 && totalLessons === 0) {
                  issues.push("No activity yet");
                }

                studentRows.push({
                  id: studentId,
                  name,
                  initials: name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase(),
                  className: "",
                  avgGrade: 0,
                  completion: completionPercent,
                  lastActive: "—",
                  status: status as StudentData["status"],
                  avatarGradient:
                    status === "on-track"
                      ? "from-emerald-500 to-teal-500"
                      : status === "needs-attention"
                        ? "from-amber-400 to-orange-500"
                        : "from-rose-400 to-rose-500",
                  issues,
                });
              }
            }
          }
        }

        // Sort students: at-risk first, then needs-attention, then on-track
        studentRows.sort((a, b) => {
          const order = { "at-risk": 0, "needs-attention": 1, "on-track": 2 };
          return (order[a.status] || 1) - (order[b.status] || 1);
        });

        // 4) Build activity feed from student_progress + user_achievements for students in these classes
        const activityEntries: { date: string; activity: ActivityItem }[] = [];

        for (const s of studentRows) {
          const { data: sp } = await supabase
            .from("student_progress")
            .select("lesson_id, completed, completed_at")
            .eq("user_id", s.id)
            .order("completed_at", { ascending: false })
            .limit(5);

          for (const p of sp || []) {
            if (p.completed && p.completed_at) {
              activityEntries.push({
                date: p.completed_at,
                activity: {
                  id: `sp_${s.id}_${p.lesson_id}`,
                  type: "lesson",
                  student: s.name,
                  title: "Completed a lesson",
                  detail: `Lesson ${p.lesson_id}`,
                  time: new Date(p.completed_at).toLocaleString(),
                  icon: "📚",
                },
              });
            }
          }
        }

        activityEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const recentActivities = activityEntries.slice(0, 10).map((e) => e.activity);

        if (!cancelled) {
          setClasses(uniqueClasses);
          setStudents(studentRows);
          setActivities(recentActivities);
          setTotalDistinctStudents(totalDistinctStudents);
        }
      } catch (err) {
        console.error("[useTeacherDashboardData] Caught error:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load teacher data");
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
    classes,
    students,
    activities,
    totalDistinctStudents,
  };
}
