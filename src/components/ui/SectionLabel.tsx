import clsx from 'clsx';

interface SectionLabelProps {
  index?: string;
  children: string;
  tone?: 'ink' | 'blue' | 'green' | 'inverted';
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<SectionLabelProps['tone']>, string> = {
  ink: 'text-ink-muted',
  blue: 'text-blue',
  green: 'text-green',
  inverted: 'text-paper/70',
};

export function SectionLabel({ index, children, tone = 'ink', className }: SectionLabelProps) {
  return (
    <div className={clsx('flex items-center gap-3 label-caps', TONE_CLASSES[tone], className)}>
      {index && <span className="tabular-nums">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" />
      <span>{children}</span>
    </div>
  );
}
