import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { authService } from "@/lib/auth-service";

// --- Types ---

export interface RoleCount {
  role: string;
  count: number;
}

export interface RecentUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar_url: string | null;
  created_at: string;
}

export interface SchoolClassData {
  id: string;
  name: string;
  teacher_id: string | null;
  course_id: string | null;
  student_count: number;
  created_at: string;
}

export interface AdminDashboardData {
  loading: boolean;
  error: string | null;
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalAdmins: number;
  totalCourses: number;
  publishedCourses: number;
  totalClasses: number;
  lessonsCompleted: number;
  lessonsCompleted7d: number;
  recentUsers: RecentUser[];
  classes: SchoolClassData[];
}

export function useAdminDashboardData(): AdminDashboardData {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalParents, setTotalParents] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [publishedCourses, setPublishedCourses] = useState(0);
  const [totalClasses, setTotalClasses] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [lessonsCompleted7d, setLessonsCompleted7d] = useState(0);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [classes, setClasses] = useState<SchoolClassData[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        // 0) Auth check: try Supabase session, fall back to localStorage
        let userId: string | null = null;
        const { data: supabaseSession } = await supabase.auth.getSession();
        if (supabaseSession?.session?.user) {
          userId = supabaseSession.session.user.id;
        } else {
          const localUser = authService.getCurrentUser();
          if (!localUser) {
            console.error("[useAdminDashboardData] No user found");
            setError("Not authenticated");
            setLoading(false);
            return;
          }
          userId = localUser.id;
        }

        // 1) User counts per role
        console.log("[useAdminDashboardData] Fetching user counts...");
        const { data: roleCounts, error: roleError } = await supabase
          .from("profiles")
          .select("role");

        if (roleError) {
          console.error("[useAdminDashboardData] profiles count error:", roleError);
          throw roleError;
        }

        const counts: Record<string, number> = {
          student: 0,
          teacher: 0,
          parent: 0,
          admin: 0,
        };
        for (const row of roleCounts || []) {
          const r = (row as any).role;
          if (r && r in counts) counts[r as keyof typeof counts]++;
        }

        const total = Object.values(counts).reduce((a, b) => a + b, 0);

        // 2) Course counts
        console.log("[useAdminDashboardData] Fetching courses...");
        const { data: courses, error: coursesError } = await supabase
          .from("courses")
          .select("id, published");

        if (coursesError) {
          console.error("[useAdminDashboardData] courses error:", coursesError);
          throw coursesError;
        }

        const courseTotal = courses?.length || 0;
        const publishedTotal = courses?.filter((c: any) => c.published === true).length || 0;

        // 3) Class count (table may not exist yet)
        console.log("[useAdminDashboardData] Fetching classes...");
        let classCount = 0;
        let classList: SchoolClassData[] = [];
        try {
          const { data: clsData, error: clsError } = await supabase
            .from("classes")
            .select("id, name, teacher_id, course_id, created_at");

          if (!clsError && clsData) {
            classCount = clsData.length;
            // For each class, count students
            for (const cls of clsData) {
              const { count: sc, error: scError } = await supabase
                .from("class_students")
                .select("id", { count: "exact", head: true })
                .eq("class_id", cls.id);

              classList.push({
                id: cls.id,
                name: cls.name,
                teacher_id: cls.teacher_id,
                course_id: cls.course_id,
                student_count: scError ? 0 : (sc || 0),
                created_at: cls.created_at,
              });
            }
          } else if (clsError) {
            // Table doesn't exist or no access - that's ok
            console.log("[useAdminDashboardData] classes table not available:", clsError.message);
          }
        } catch (e) {
          console.log("[useAdminDashboardData] classes query skipped (table likely missing)");
        }

        // 4) Completed lessons count
        console.log("[useAdminDashboardData] Fetching student_progress...");
        const { count: completedAll, error: spError } = await supabase
          .from("student_progress")
          .select("id", { count: "exact", head: true })
          .eq("completed", true);

        if (spError) {
          console.error("[useAdminDashboardData] student_progress count error:", spError);
          // Non-fatal - table may be empty
        }

        // 5) Completed last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const { count: completed7d, error: sp7dError } = await supabase
          .from("student_progress")
          .select("id", { count: "exact", head: true })
          .eq("completed", true)
          .gte("completed_at", sevenDaysAgo.toISOString());

        if (sp7dError) {
          console.log("[useAdminDashboardData] 7d progress count not available");
        }

        // 6) Recent users (last 10)
        console.log("[useAdminDashboardData] Fetching recent users...");
        const { data: users, error: usersError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, email, role, avatar_url, created_at")
          .order("created_at", { ascending: false })
          .limit(10);

        if (usersError) {
          console.error("[useAdminDashboardData] recent users error:", usersError);
          throw usersError;
        }

        if (!cancelled) {
          setTotalUsers(total);
          setTotalStudents(counts.student);
          setTotalTeachers(counts.teacher);
          setTotalParents(counts.parent);
          setTotalAdmins(counts.admin);
          setTotalCourses(courseTotal);
          setPublishedCourses(publishedTotal);
          setTotalClasses(classCount);
          setLessonsCompleted(completedAll || 0);
          setLessonsCompleted7d(completed7d || 0);
          setRecentUsers((users || []) as RecentUser[]);
          setClasses(classList);
        }
      } catch (err) {
        console.error("[useAdminDashboardData] Caught error:", err);
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load admin data",
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
    totalUsers,
    totalStudents,
    totalTeachers,
    totalParents,
    totalAdmins,
    totalCourses,
    publishedCourses,
    totalClasses,
    lessonsCompleted,
    lessonsCompleted7d,
    recentUsers,
    classes,
  };
}