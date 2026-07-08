import { OrbitViewer } from '@/features/panorama/OrbitViewer';

export default function PanoramaPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6 lg:pt-16 lg:pb-8 lg:pl-20 lg:pr-28 xl:pr-32">
        <div className="label-caps text-blue">360 Experience</div>
        <h1 className="mt-2 font-display text-2xl text-ink sm:text-3xl lg:mt-4 lg:text-4xl">
          Walk around it, without leaving the page.
        </h1>
        <p className="mt-2 hidden max-w-xl text-sm leading-relaxed text-ink-muted sm:block sm:mt-4 sm:text-base">
          Drag anywhere on the frame to spin the building through a full 360° orbit.
        </p>
      </div>
      <div className="flex-1 px-4 pb-4 sm:px-8 sm:pb-6 lg:pb-16 lg:pl-20 lg:pr-28 xl:pr-32">
        <div className="h-full w-full overflow-hidden rounded-3xl border border-white/40 shadow-xl">
          <OrbitViewer framePath="/orbit-frames" frameCount={72} autoRotate />
        </div>
      </div>
    </div>
  );
}
