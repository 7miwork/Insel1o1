import { useState } from "react";
import { useLocation } from "wouter";
import {
  LogOut,
  Menu,
  X,
  Building2,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Award,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { authService, User } from "@/lib/auth-service";
import { useI18n } from "@/contexts/I18nContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  BarChart,
  Bar,
  PieChart as RechartsChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for school dashboard
const mockSchoolData = {
  name: "Riverside Academy",
  totalStudents: 450,
  totalTeachers: 35,
  totalClasses: 18,
  activeSubscription: "Premium",
  subscriptionEndDate: "2025-12-31",
  totalRevenue: 45000,
  averageStudentProgress: 72,
  coursesOffered: 24,
  completedCourses: 156,
  ongoingCourses: 89,
};

const classPerformanceData = [
  { class: "9A", avgScore: 78, students: 32 },
  { class: "9B", avgScore: 82, students: 30 },
  { class: "10A", avgScore: 75, students: 28 },
  { class: "10B", avgScore: 85, students: 29 },
  { class: "11A", avgScore: 88, students: 31 },
];

const studentProgressData = [
  { month: "Jan", completed: 45, inProgress: 120, notStarted: 285 },
  { month: "Feb", completed: 78, inProgress: 145, notStarted: 227 },
  { month: "Mar", completed: 112, inProgress: 168, notStarted: 170 },
  { month: "Apr", completed: 156, inProgress: 189, notStarted: 105 },
];

const subjectEnrollmentData = [
  { name: "Mathematics", value: 450 },
  { name: "English", value: 420 },
  { name: "Science", value: 380 },
  { name: "History", value: 290 },
  { name: "Geography", value: 310 },
  { name: "Programming", value: 200 },
];

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];

const recentActivityData = [
  {
    id: 1,
    type: "course_completion",
    description: "Class 9A completed Mathematics Module 5",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    type: "teacher_added",
    description: "Dr. Sarah Johnson joined as Science Teacher",
    timestamp: "5 hours ago",
    status: "success",
  },
  {
    id: 3,
    type: "alert",
    description: "Class 10B has low engagement this week",
    timestamp: "1 day ago",
    status: "alert",
  },
  {
    id: 4,
    type: "subscription",
    description: "Subscription renewed for 12 months",
    timestamp: "3 days ago",
    status: "success",
  },
  {
    id: 5,
    type: "course_added",
    description: "Advanced Programming Course added to catalog",
    timestamp: "1 week ago",
    status: "success",
  },
];

export default function SchoolDashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { t, language } = useI18n();

  const handleLogout = async () => {
    await authService.logout();
    setLocation("/");
  };

  const tabs = [
    { id: "overview", label: t("school_overview", "School Overview"), icon: Building2 },
    { id: "classes", label: t("classes", "Classes"), icon: Users },
    { id: "analytics", label: t("analytics", "Analytics"), icon: BarChart3 },
    { id: "courses", label: t("courses", "Courses"), icon: BookOpen },
    { id: "settings", label: t("settings", "Settings"), icon: Settings },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {t("total_students", "Total Students")}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockSchoolData.totalStudents}
              </p>
            </div>
            <Users className="w-12 h-12 text-indigo-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {t("total_teachers", "Total Teachers")}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockSchoolData.totalTeachers}
              </p>
            </div>
            <Users className="w-12 h-12 text-purple-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {t("active_classes", "Active Classes")}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockSchoolData.totalClasses}
              </p>
            </div>
            <Building2 className="w-12 h-12 text-blue-100" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {t("avg_progress", "Avg Progress")}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockSchoolData.averageStudentProgress}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-100" />
          </div>
        </div>
      </div>

      {/* School Info & Subscription */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("school_information", "School Information")}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">{t("school_name", "School Name")}:</span>
              <span className="font-semibold text-gray-900">{mockSchoolData.name}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">{t("courses_offered", "Courses Offered")}:</span>
              <span className="font-semibold text-gray-900">{mockSchoolData.coursesOffered}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">{t("completed_courses", "Completed Courses")}:</span>
              <span className="font-semibold text-gray-900">{mockSchoolData.completedCourses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{t("ongoing_courses", "Ongoing Courses")}:</span>
              <span className="font-semibold text-gray-900">{mockSchoolData.ongoingCourses}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("subscription", "Subscription")}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">{t("plan", "Plan")}</p>
              <p className="text-2xl font-bold text-indigo-600">
                {mockSchoolData.activeSubscription}
              </p>
            </div>
            <div className="bg-white rounded p-3">
              <p className="text-xs text-gray-600">{t("expires", "Expires")}</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockSchoolData.subscriptionEndDate}
              </p>
            </div>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
              {t("renew_subscription", "Renew Subscription")}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("recent_activity", "Recent Activity")}
        </h3>
        <div className="space-y-3">
          {recentActivityData.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="mt-1">
                {activity.status === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderClassesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("class_performance", "Class Performance")}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("class", "Class")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("students", "Students")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("avg_score", "Avg Score")}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {t("progress", "Progress")}
                </th>
              </tr>
            </thead>
            <tbody>
              {classPerformanceData.map((cls) => (
                <tr key={cls.class} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{cls.class}</td>
                  <td className="px-6 py-4 text-gray-600">{cls.students}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {cls.avgScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${cls.avgScore}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("class_management", "Class Management")}
        </h3>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          {t("add_class", "Add New Class")}
        </button>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Progress Over Time */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("student_progress_trend", "Student Progress Trend")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={studentProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
                name={t("completed", "Completed")}
              />
              <Line
                type="monotone"
                dataKey="inProgress"
                stroke="#f59e0b"
                strokeWidth={2}
                name={t("in_progress", "In Progress")}
              />
              <Line
                type="monotone"
                dataKey="notStarted"
                stroke="#ef4444"
                strokeWidth={2}
                name={t("not_started", "Not Started")}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Enrollment Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("subject_enrollment", "Subject Enrollment")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsChart>
              <Pie
                data={subjectEnrollmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {subjectEnrollmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Class Performance Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("class_performance_comparison", "Class Performance Comparison")}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={classPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="class" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="avgScore"
              fill="#6366f1"
              name={t("avg_score", "Avg Score")}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("course_catalog", "Course Catalog")}
          </h3>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            {t("add_course", "Add Course")}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Mathematics Fundamentals",
              students: 120,
              progress: 65,
            },
            {
              title: "English Literature",
              students: 95,
              progress: 58,
            },
            {
              title: "Science Exploration",
              students: 110,
              progress: 72,
            },
            {
              title: "History & Culture",
              students: 75,
              progress: 55,
            },
            {
              title: "Geography Basics",
              students: 85,
              progress: 68,
            },
            {
              title: "Programming 101",
              students: 60,
              progress: 80,
            },
          ].map((course, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("students", "Students")}:</span>
                  <span className="font-medium text-gray-900">{course.students}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("progress", "Progress")}:</span>
                  <span className="font-medium text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {t("school_settings", "School Settings")}
        </h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t("school_name", "School Name")}
            </label>
            <input
              type="text"
              defaultValue={mockSchoolData.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t("contact_email", "Contact Email")}
            </label>
            <input
              type="email"
              placeholder="contact@school.edu"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t("phone", "Phone Number")}
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t("address", "Address")}
            </label>
            <input
              type="text"
              placeholder="123 School Street"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              {t("notification_settings", "Notification Settings")}
            </h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-gray-700">{t("email_alerts", "Email Alerts")}</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                <span className="text-gray-700">
                  {t("weekly_reports", "Weekly Reports")}
                </span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-gray-700">
                  {t("course_updates", "Course Updates")}
                </span>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex gap-3">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              {t("save_changes", "Save Changes")}
            </button>
            <button className="bg-gray-200 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              {t("cancel", "Cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                {t("school_dashboard", "School Dashboard")}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">{t("logout", "Logout")}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "overview" && renderOverviewTab()}
          {activeTab === "classes" && renderClassesTab()}
          {activeTab === "analytics" && renderAnalyticsTab()}
          {activeTab === "courses" && renderCoursesTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>
    </div>
  );
}
