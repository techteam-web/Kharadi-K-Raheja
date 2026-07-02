import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: LucideIcon;
  hideDefaultIcon?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-blue text-paper hover:bg-blue-deep',
  accent:
    'bg-green text-paper hover:bg-green-deep',
  secondary:
    'bg-transparent text-ink border border-hairline hover:border-ink',
  ghost:
    'bg-transparent text-ink-muted hover:text-ink',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', icon: Icon, hideDefaultIcon, className, children, ...props }, ref) => {
    const ShownIcon = Icon ?? (variant !== 'ghost' && !hideDefaultIcon ? ArrowRight : undefined);

    return (
      <button
        ref={ref}
        className={clsx(
          'group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md',
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
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
