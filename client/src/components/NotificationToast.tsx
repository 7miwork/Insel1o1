import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, Zap } from "lucide-react";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "info" | "achievement";
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationToastProps {
  notification: ToastNotification;
  onClose: (id: string) => void;
}

export function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (notification.duration === 0) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(notification.id), 300);
    }, notification.duration || 4000);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "achievement":
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "achievement":
        return "bg-yellow-50 border-yellow-200";
      case "info":
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getTitleColor = () => {
    switch (notification.type) {
      case "success":
        return "text-green-900";
      case "error":
        return "text-red-900";
      case "achievement":
        return "text-yellow-900";
      case "info":
      default:
        return "text-blue-900";
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ${
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      }`}
    >
      <div
        className={`rounded-lg border p-4 shadow-lg flex items-start gap-3 ${getBackgroundColor()}`}
      >
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1">
          <p className={`font-semibold ${getTitleColor()}`}>{notification.title}</p>
          {notification.message && (
            <p className={`text-sm mt-1 ${getTitleColor()} opacity-75`}>
              {notification.message}
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onClose(notification.id), 300);
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

interface NotificationContainerProps {
  notifications: ToastNotification[];
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  onClose,
}: NotificationContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
