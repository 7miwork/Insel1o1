import React, { useEffect, useCallback } from 'react';

export interface LockedResource {
  type: 'course' | 'lesson' | 'region';
  title: string;
  description?: string;
  /** Optional teaser text shown in the modal */
  teaser?: string;
}

interface LockedIslandModalProps {
  resource: LockedResource | null;
  onClose: () => void;
}

/**
 * LockedIslandModal — a pirate-themed overlay modal shown when
 * a user clicks a locked island, course, or world map region.
 *
 * Reusable for all locked states across the archipelago hierarchy.
 */
export default function LockedIslandModal({ resource, onClose }: LockedIslandModalProps) {
  // Close on ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (resource) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [resource, handleKeyDown]);

  if (!resource) return null;

  // ── Title variants ──
  const titles: Record<string, string> = {
    course: 'Shrouded Course',
    lesson: 'Island Locked',
    region: 'Beyond the Fog',
  };

  // ── Message variants ──
  const messages: Record<string, string> = {
    course: 'This course is still hidden in the mist. Complete the previous voyage to chart these waters.',
    lesson: 'This island is shrouded in fog. More insight awaits after unlocking the course.',
    region: 'This realm has not yet been discovered. Future expeditions will reveal its secrets.',
  };

  const title = titles[resource.type] || 'Shrouded Territory';
  const message = resource.teaser || messages[resource.type];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: 'rgba(13, 61, 59, 0.35)' }}
      onClick={handleBackdropClick}
    >
      {/* Fade-in animation container */}
      <div
        className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Parchment-style panel */}
        <div className="relative overflow-hidden rounded-3xl border border-[#c5a57a]/40 bg-gradient-to-br from-[#faf3e8] via-[#f5ead9] to-[#efe0cb] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
          {/* Top decorative wave */}
          <div className="pointer-events-none absolute -top-6 left-0 right-0 h-12 bg-gradient-to-r from-[#5eead4]/10 via-[#8fc5bc]/20 to-[#e8d3a2]/10 blur-xl" />

          {/* Decorative corner flourishes */}
          <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 opacity-10">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M0,0 L64,0 L64,4 L4,4 L4,64 L0,64 Z" fill="#d4a574" />
              <circle cx="8" cy="8" r="3" fill="#d4a574" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 h-16 w-16 rotate-180 opacity-10">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M0,0 L64,0 L64,4 L4,4 L4,64 L0,64 Z" fill="#d4a574" />
              <circle cx="8" cy="8" r="3" fill="#d4a574" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-8 pb-8 pt-10 text-center">
            {/* Lock icon — pirate treasure chest style */}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#c5a57a]/50 bg-gradient-to-br from-[#efe0cb] to-[#e0cbb0] shadow-inner">
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                {/* Chest body */}
                <rect x="8" y="20" width="32" height="22" rx="3" fill="#b88a5c" stroke="#8b6914" strokeWidth="1.5" />
                {/* Chest lid */}
                <path d="M8,20 Q8,10 24,10 Q40,10 40,20" fill="#c49a6c" stroke="#8b6914" strokeWidth="1.5" />
                {/* Keyhole */}
                <circle cx="24" cy="32" r="4" fill="#4a3520" />
                <rect x="22.5" y="32" width="3" height="6" rx="1" fill="#4a3520" />
                {/* Lock shackle */}
                <path d="M18,20 L18,16 Q18,10 24,10 Q30,10 30,16 L30,20" stroke="#b88a5c" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Gold highlight */}
                <rect x="20" y="22" width="8" height="2" rx="1" fill="#fbbf24" opacity="0.6" />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#6b4226]">{title}</h2>

            {/* Resource name */}
            <p className="mt-2 text-base font-semibold text-[#8b6914]">{resource.title}</p>

            {/* Description / teaser */}
            {resource.description && (
              <p className="mt-1 text-xs italic text-[#8a7a6a]">{resource.description}</p>
            )}

            {/* Divider */}
            <div className="my-5 h-px w-32 bg-gradient-to-r from-transparent via-[#c5a57a]/60 to-transparent" />

            {/* Message */}
            <p className="text-sm leading-relaxed text-[#7a6a5a]">{message}</p>

            {/* Action button */}
            <button
              onClick={onClose}
              className="mt-7 w-full rounded-xl border border-[#c5a57a]/50 bg-gradient-to-r from-[#e8d3a2] to-[#d4b88c] px-6 py-2.5 text-sm font-semibold text-[#5a3a1a] shadow-sm transition-all hover:from-[#d4b88c] hover:to-[#c4a87c] hover:shadow-md active:scale-[0.98]"
            >
              Return to Voyage
            </button>

            {/* Future hint */}
            <p className="mt-3 text-[10px] text-[#8a7a6a]/60 italic">
              This territory is not yet accessible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}