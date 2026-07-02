import clsx from 'clsx';
import { LOCATION_CATEGORIES } from '@/data/location';
import { useLocationStore } from '@/stores/useLocationStore';
import { ACCENT_HEX } from './accent';

export function CategoryTabs() {
  const activeCategory = useLocationStore((s) => s.activeCategory);
  const setCategory = useLocationStore((s) => s.setCategory);

  return (
    <div className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-hairline bg-paper p-1.5 shadow-sm lg:w-auto">
      {LOCATION_CATEGORIES.map((category) => {
        const isActive = category.id === activeCategory;
        return (
          <button
            key={category.id}
            onClick={() => setCategory(category.id)}
            className={clsx(
              'relative shrink-0 whitespace-nowrap rounded-md px-3 py-2 label-caps transition-colors duration-300 sm:px-4 sm:py-2.5',
              isActive ? 'text-paper' : 'text-ink-muted hover:text-ink',
            )}
          >
            {isActive && (
              <span
                className="absolute inset-0 rounded-md transition-colors duration-300"
                style={{ backgroundColor: ACCENT_HEX[category.accent] }}
              />
            )}
            <span className="relative">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
