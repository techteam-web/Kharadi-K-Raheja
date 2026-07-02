import { CompareSlider } from '@/features/officeFloors/CompareSlider';

export default function OfficeFloorsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6 lg:px-20 lg:pt-16 lg:pb-8">
        <div className="label-caps text-blue">Office Floors</div>
        <h1 className="mt-2 font-display text-2xl text-ink sm:text-3xl lg:mt-4 lg:text-4xl">
          Vacant. Furnished. Yours to imagine.
        </h1>
        <p className="mt-2 hidden max-w-xl text-sm text-ink-muted leading-relaxed sm:block sm:mt-4 sm:text-base">
          Drag the divider to compare a shell-and-core floor plate against a
          fully furnished, move-in-ready fit-out.
        </p>
      </div>
      <div className="flex-1 px-4 pb-4 sm:px-8 sm:pb-6 lg:px-20 lg:pb-16">
        <div className="h-full w-full overflow-hidden rounded-lg border border-hairline">
          <CompareSlider />
        </div>
      </div>
    </div>
  );
}
