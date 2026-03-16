'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  value: number | null;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md';
}

export function StarRating({ value, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value || 0;
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn('transition-colors', readonly ? 'cursor-default' : 'cursor-pointer')}
        >
          <svg
            className={cn(starSize, 'transition-colors')}
            fill={star <= active ? '#f97316' : 'none'}
            stroke={star <= active ? '#f97316' : '#cbd5e1'}
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
