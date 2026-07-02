import type { ReactNode } from 'react';
import clsx from 'clsx';

type MediaTone = 'cool' | 'warm' | 'dark' | 'neutral' | 'green';

interface MediaPlateProps {
  tone?: MediaTone;
  label?: string;
  className?: string;
  children?: ReactNode;
  grain?: boolean;
}

/**
 * Stand-in for real photography/renders. Renders an architectural gradient
 * plate rather than a broken-image placeholder, so the prototype reads as
 * "unstyled photography slot" instead of "missing asset".
 */
const TONE_GRADIENTS: Record<MediaTone, string> = {
  cool: 'from-[#0b2540] via-[#123a63] to-[#0054a6]',
  warm: 'from-[#2a2118] via-[#4a382a] to-[#8a6b4a]',
  dark: 'from-[#0d0d0d] via-[#1a1a1a] to-[#2b2b2b]',
  neutral: 'from-[#d8d8d8] via-[#c4c4c4] to-[#a8a8a8]',
  green: 'from-[#052e1a] via-[#0a4c2a] to-[#00a651]',
};

export function MediaPlate({ tone = 'cool', label, className, children, grain = true }: MediaPlateProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden bg-gradient-to-br',
        TONE_GRADIENTS[tone],
        className,
      )}
    >
      {grain && (
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      {label && (
        <span className="absolute bottom-4 right-5 label-caps text-paper/50">{label}</span>
      )}
      {children}
    </div>
  );
}
