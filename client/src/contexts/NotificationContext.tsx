import { createContext, useContext, useState, useCallback } from "react";
import { ToastNotification } from "@/components/NotificationToast";

interface NotificationContextType {
  notifications: ToastNotification[];
  addNotification: (notification: Omit<ToastNotification, "id">) => string;
  removeNotification: (id: string) => void;
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
  showAchievement: (title: string, message?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<ToastNotification, "id">) => {
      const id = `notification-${Date.now()}-${Math.random()}`;
      const newNotification: ToastNotification = {
        ...notification,
        id,
      };
      setNotifications((prev) => [...prev, newNotification]);
      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      addNotification({
        type: "success",
        title,
        message,
        duration: 3000,
      });
    },
    [addNotification]
  );

  const showError = useCallback(
    (title: string, message?: string) => {
      addNotification({
        type: "error",
        title,
        message,
        duration: 5000,
      });
    },
    [addNotification]
  );

  const showInfo = useCallback(
    (title: string, message?: string) => {
      addNotification({
        type: "info",
        title,
        message,
        duration: 3000,
      });
    },
    [addNotification]
  );

  const showAchievement = useCallback(
    (title: string, message?: string) => {
      addNotification({
        type: "achievement",
        title,
        message,
        duration: 4000,
      });
    },
    [addNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError,
        showInfo,
        showAchievement,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
}
