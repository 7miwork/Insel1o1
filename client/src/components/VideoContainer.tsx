import React from "react";
import { Play, Video as VideoIcon, Binoculars, Eye } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface VideoContainerProps {
  /** If the lesson has a video, set to true. Otherwise the "coming soon" placeholder is rendered. */
  enabled?: boolean;
  /** Optional video embed (YouTube, Vimeo, MP4 etc.) */
  embed?: React.ReactNode;
  /** Optional thumbnail URL (used in the placeholder state). */
  thumbnail?: string;
  /** Optional label above the video (e.g. "Lesson Video"). */
  label?: string;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({
  enabled = false,
  embed,
  thumbnail,
  label,
}) => {
  const { t } = useI18n();

  if (!enabled) {
    return (
      <section
        className="lesson-section animate-fadeInUp"
        aria-label={label || t("lesson.videoContainer")}
      >
        <div className="lesson-section-title">
          <span
            className="icon-bubble"
            style={{
              background: "linear-gradient(135deg,#d9f99d,#a3e635)",
              color: "#3f6212",
            }}
            aria-hidden
          >
            <Binoculars className="w-5 h-5" />
          </span>
          <h2>{t("lesson.videoContainer")}</h2>
        </div>
        <div
          className="video-frame"
          role="img"
          aria-label={t("lesson.videoComingSoon")}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          ) : null}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
            <span className="video-play-button" aria-hidden>
              <Eye className="w-7 h-7" />
            </span>
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">
                {t("lesson.videoComingSoon")}
              </p>
              <p className="text-sm text-slate-300 mt-1 max-w-md">
                {t("lesson.videoComingSoonDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="lesson-section animate-fadeInUp"
      aria-label={label || t("lesson.videoContainer")}
    >
      <div className="lesson-section-title">
        <span
          className="icon-bubble"
          style={{
            background: "linear-gradient(135deg,#fde68a,#fbbf24)",
            color: "#92400e",
          }}
          aria-hidden
        >
          <Binoculars className="w-5 h-5" />
        </span>
        <h2>Captain's Briefing</h2>
      </div>
      <div className="video-frame border-2 border-amber-400/30">
        {embed ?? (
          <span className="video-play-button" aria-hidden>
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          </span>
        )}
      </div>
      <p className="mt-3 text-xs text-amber-700 italic flex items-center gap-1.5">
        <Eye className="w-3.5 h-3.5" />
        Observe carefully — this intelligence will guide your expedition.
      </p>
    </section>
  );
};

export default VideoContainer;