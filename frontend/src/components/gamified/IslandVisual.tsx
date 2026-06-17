'use client';

import React, { useState } from 'react';
import { getIslandAsset, getFallbackIsland } from '@/lib/island-assets';

interface IslandVisualProps {
  course: string;
  lesson: number;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

/**
 * IslandVisual renders an SVG island asset for a given course and lesson.
 * Falls back to a placeholder SVG if the asset is missing.
 */
export default function IslandVisual({
  course,
  lesson,
  alt = 'Island',
  className = '',
  width = 400,
  height = 320,
}: IslandVisualProps) {
  const [imgSrc, setImgSrc] = useState<string>(getIslandAsset(course, lesson));

  const handleError = () => {
    setImgSrc(getFallbackIsland());
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}