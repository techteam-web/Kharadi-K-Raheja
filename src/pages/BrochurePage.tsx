import { PageHeader } from '@/components/ui/PageHeader';
import { BrochureViewer } from '@/features/brochure/BrochureViewer';

export default function BrochurePage() {
  return (
    <div className="flex h-full flex-col px-4 py-6 sm:px-8 sm:py-10 lg:px-20 lg:py-20">
      <PageHeader eyebrow="E-Brochure" title="Take Kharadi 57 with you." />
      <div className="mt-4 flex flex-1 items-center justify-center sm:mt-8 lg:mt-16">
        <BrochureViewer />
      </div>
    </div>
  );
}
