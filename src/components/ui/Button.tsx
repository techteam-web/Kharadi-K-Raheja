import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { useMagneticHover } from '@/animations/useMagneticHover';

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  iconClassName?: string;
  hideDefaultIcon?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue text-paper shadow-[0_8px_24px_rgba(0,84,166,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-blue-deep',
  accent:
    'bg-green text-paper shadow-[0_8px_24px_rgba(0,166,81,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-green-deep',
  secondary:
    'glass text-ink hover:bg-white/70',
  ghost:
    'bg-transparent text-ink-muted hover:text-ink',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', icon: Icon, iconClassName, hideDefaultIcon, className, children, onMouseDown, onMouseUp, onMouseLeave, ...props }, ref) => {
    const ShownIcon = Icon ?? (variant !== 'ghost' && !hideDefaultIcon ? ArrowRight : undefined);
    const magneticRef = useMagneticHover<HTMLButtonElement>({ strength: 0.25, scale: 1.04 });

    return (
      <button
        ref={(node) => {
          magneticRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onMouseDown={(e) => {
          gsap.to(e.currentTarget, { scale: 0.96, duration: 0.15, ease: 'power2.out' });
          onMouseDown?.(e);
        }}
        onMouseUp={(e) => {
          gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3, ease: 'back.out(2)' });
          onMouseUp?.(e);
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power3.out' });
          onMouseLeave?.(e);
        }}
        className={clsx(
          'group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full',
          'label-caps transition-colors duration-300',
          VARIANT_CLASSES[variant],
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {ShownIcon && (
          <ShownIcon
            size={14}
            strokeWidth={2}
            className={clsx('transition-transform duration-300 group-hover:translate-x-0.5', iconClassName)}
          />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
