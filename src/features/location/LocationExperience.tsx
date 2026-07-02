import { CategoryTabs } from './CategoryTabs';
import { PoiList } from './PoiList';
import { MapboxMap } from './MapboxMap';

export function LocationExperience() {
  return (
    <div className="relative h-full w-full bg-[#eef0f1]">
      <MapboxMap />

      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between gap-3 p-4 sm:p-6 lg:gap-0 lg:p-10">
        <div className="pointer-events-auto flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="hidden sm:block">
            <div className="label-caps text-ink-muted">Kharadi 57 — Location Intelligence</div>
            <h1 className="mt-2 font-display text-xl text-ink lg:mt-3 lg:text-3xl">Positioned for what matters.</h1>
          </div>
          <CategoryTabs />
        </div>

        <div className="pointer-events-auto self-stretch lg:self-start">
          <PoiList />
        </div>
      </div>
    </div>
  );
}
