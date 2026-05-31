import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { NotificationContainer } from "./components/NotificationToast";
import { useNotification } from "./contexts/NotificationContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardRouter from "./components/DashboardRouter";
import Courses from "./pages/Courses";
import ArchipelagoMap from "./pages/ArchipelagoMap";
import LessonPage from "./pages/LessonPage";
import MinecraftLessonPage from "./pages/MinecraftLessonPage";
import SchoolDashboard from "./pages/SchoolDashboard";
import Leaderboard from "./pages/Leaderboard";

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/dashboard"} component={DashboardRouter} />
      <Route path={"/courses"} component={Courses} />
      <Route path={"/archipelago"} component={ArchipelagoMap} />
      <Route path={"/lesson/:id"} component={MinecraftLessonPage} />
      <Route path={"/minecraft-lesson/:id"} component={MinecraftLessonPage} />
      <Route path={"/school-dashboard"} component={SchoolDashboard} />
      <Route path={"/leaderboard"} component={Leaderboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function AppContent() {
  const { notifications, removeNotification } = useNotification();
  return (
    <>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
          <NotificationContainer notifications={notifications} onClose={removeNotification} />
      </TooltipProvider>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <NotificationProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <AppContent />
          </ThemeProvider>
        </NotificationProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}

export default App;
