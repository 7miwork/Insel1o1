import { useState, useCallback, useRef } from "react";

export type ZoomLevel = "world" | "subject" | "archipelago" | "island" | "lesson";

export interface NavigationState {
  level: ZoomLevel;
  subjectId?: string;
  archipelagoId?: string;
  islandId?: string;
  lessonId?: string;
  zoomOrigin?: { x: number; y: number };
}

interface UseZoomNavigationOptions {
  onLevelChange?: (from: ZoomLevel, to: ZoomLevel) => void;
  animationDuration?: number;
}

export function useZoomNavigation(options: UseZoomNavigationOptions = {}) {
  const { onLevelChange, animationDuration = 700 } = options;
  const [navState, setNavState] = useState<NavigationState>({ level: "world" });
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState<NavigationState[]>({ level: "world" });
  const historyIndex = useRef(0);

  const navigateToSubject = useCallback((subjectId: string, origin: { x: number; y: number }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNavState({ level: "subject", subjectId, zoomOrigin: origin });
    onLevelChange?.("world", "subject");
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, onLevelChange, animationDuration]);

  const navigateToArchipelago = useCallback((archipelagoId: string, origin: { x: number; y: number }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNavState(prev => ({ ...prev, level: "archipelago", archipelagoId, zoomOrigin: origin }));
    onLevelChange?.("subject", "archipelago");
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, onLevelChange, animationDuration]);

  const navigateToIsland = useCallback((islandId: string, origin: { x: number; y: number }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNavState(prev => ({ ...prev, level: "island", islandId, zoomOrigin: origin }));
    onLevelChange?.("archipelago", "island");
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, onLevelChange, animationDuration]);

  const navigateToLesson = useCallback((lessonId: string, origin?: { x: number; y: number }) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setNavState({ level: "lesson", lessonId, zoomOrigin: origin });
    onLevelChange?.("island", "lesson");
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, onLevelChange, animationDuration]);

  const goBack = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setNavState(prev => {
      switch (prev.level) {
        case "lesson":
          return { level: "island", islandId: prev.islandId, zoomOrigin: undefined };
        case "island":
          return { level: "archipelago", archipelagoId: prev.archipelagoId, zoomOrigin: undefined };
        case "archipelago":
          return { level: "subject", subjectId: prev.subjectId, zoomOrigin: undefined };
        case "subject":
          return { level: "world", zoomOrigin: undefined };
        default:
          return prev;
      }
    });
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, animationDuration]);

  const canGoBack = navState.level !== "world";

  return {
    navState,
    isAnimating,
    navigateToSubject,
    navigateToArchipelago,
    navigateToIsland,
    navigateToLesson,
    goBack,
    canGoBack,
  };
}