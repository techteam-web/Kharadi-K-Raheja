import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

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
  ({ variant = 'primary', icon: Icon, iconClassName, hideDefaultIcon, className, children, ...props }, ref) => {
    const ShownIcon = Icon ?? (variant !== 'ghost' && !hideDefaultIcon ? ArrowRight : undefined);

    return (
      <button
        ref={ref}
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
