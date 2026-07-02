import { useState } from 'react';
import clsx from 'clsx';
import { PlanViewer } from '@/features/plans/PlanViewer';
import { PLAN_VIEWS } from '@/data/misc';
import type { PlanId } from '@/types';

export default function PlansPage() {
  const [activePlan, setActivePlan] = useState<PlanId>('master');
  const plan = PLAN_VIEWS.find((p) => p.id === activePlan)!;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-3 px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6 lg:flex-row lg:items-start lg:justify-between lg:px-20 lg:pt-16 lg:pb-8">
        <div>
          <div className="label-caps text-blue">Plans</div>
          <h1 className="mt-2 font-display text-2xl text-ink sm:text-3xl lg:mt-4 lg:text-4xl">Architecture, laid bare.</h1>
        </div>
        <div className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-hairline p-1.5 lg:w-auto">
          {PLAN_VIEWS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlan(p.id)}
              className={clsx(
                'shrink-0 whitespace-nowrap rounded-md px-3 py-2 label-caps transition-colors duration-300 sm:px-5 sm:py-2.5',
                activePlan === p.id ? 'bg-blue text-paper' : 'text-ink-muted hover:text-ink',
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 pb-4 sm:px-8 sm:pb-6 lg:px-20 lg:pb-16">
        <div className="h-full w-full overflow-hidden rounded-lg border border-hairline">
          <PlanViewer key={plan.id} plan={plan} />
        </div>
      </div>
    </div>
  );
}
