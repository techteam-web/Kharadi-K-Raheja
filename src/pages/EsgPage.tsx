import { PageHeader } from '@/components/ui/PageHeader';
import { EsgStory } from '@/features/esg/EsgStory';
import { ESG_SECTIONS } from '@/data/misc';

export default function EsgPage() {
  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:py-20 lg:pl-20 lg:pr-28 xl:pr-32">
      <PageHeader
        eyebrow="ESG"
        title="Built with planet consciousness."
        description="Sustainability at Kharadi 57 is a design discipline, not an afterthought — carried through material, system and site."
      />

      <div className="mt-8 sm:mt-12 lg:mt-16">
        {ESG_SECTIONS.map((section, i) => (
          <EsgStory key={section.id} section={section} index={i + 1} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
