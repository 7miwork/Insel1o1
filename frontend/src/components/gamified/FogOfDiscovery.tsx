import React from 'react';

export type FogState = 'unknown' | 'locked' | 'discovered';

export interface FogOfDiscoveryProps {
  /** Visual intensity of the fog */
  state?: FogState;
  /** Optional tooltip text shown on hover for unknown regions */
  tooltip?: string;
  /** Additional CSS classes for the container */
  className?: string;
  /** Children to render under the fog */
  children: React.ReactNode;
}

/**
 * FogOfDiscovery — a lightweight visual overlay that conveys
 * exploration state without heavy rendering cost.
 *
 * States:
 * - discovered: no fog, full opacity, fully interactive
 * - locked: light haze, slightly reduced opacity, interactive for modal
 * - unknown: soft white/blue fog, reduced opacity, blur, not clickable
 */
export default function FogOfDiscovery({ state = 'discovered', tooltip, className = '', children }: FogOfDiscoveryProps) {
  if (state === 'discovered') {
    return <>{children}</>;
  }

  const isLocked = state === 'locked';

  // Opacity: locked is clearer than unknown
  const opacity = isLocked ? 'opacity-80' : 'opacity-55';
  // Blur: unknown gets more blur than locked
  const blur = isLocked ? 'backdrop-blur-[2px]' : 'backdrop-blur-[3px]';
  // Desaturation: unknown is more desaturated
  const grayscale = isLocked ? 'grayscale-[0.15]' : 'grayscale-[0.35]';

  return (
    <div className={`relative ${className}`}>
      {/* Content layer */}
      <div className={`relative z-10 transition-all duration-500 ${opacity} ${grayscale}`}>
        {children}
      </div>

      {/* Fog overlay layer */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 ${blur} transition-all duration-500`}
        aria-hidden="true"
      >
        {/* Soft white/blue haze gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/30" />

        {/* Subtle cloud/fog SVG pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-30">
          <defs>
            <pattern id="fog-waves" x="0" y="0" width="120" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0,10 Q30,2 60,10 Q90,18 120,10"
                stroke="#e2e8f0"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fog-waves)" />
        </svg>

        {/* Soft vignette at edges */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(255,255,255,0.35)_100%)]" />
      </div>

      {/* Optional tooltip for unknown regions */}
      {tooltip && (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2">
          <span className="rounded-full border border-[#c5d8d5]/60 bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#7a9a98] backdrop-blur-sm">
            {tooltip}
          </span>
        </div>
      )}
    </div>
  );
}