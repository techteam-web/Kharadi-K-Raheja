import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideStepperProps {
  count: number;
  active: number;
  onChange: (index: number) => void;
}

export function SlideStepper({ count, active, onChange }: SlideStepperProps) {
  if (count <= 1) return null;

  return (
    <div className="flex items-center gap-6">
      <button
        onClick={() => onChange(Math.max(0, active - 1))}
        disabled={active === 0}
        className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30"
      >
        <ChevronLeft size={15} />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className="p-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={clsx(
                'block rounded-full transition-all duration-300',
                i === active ? 'h-1.5 w-6 bg-blue' : 'h-1.5 w-1.5 bg-ink-muted/25',
              )}
            />
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(Math.min(count - 1, active + 1))}
        disabled={active === count - 1}
        className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
