import { useNavigate } from 'react-router-dom';
import { HeroSection } from '@/features/home/HeroSection';
import { IntroSection } from '@/features/home/IntroSection';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <HeroSection
        onExplore={() => navigate('/about')}
        onViewLocation={() => navigate('/location')}
        onDownload={() => navigate('/e-brochure')}
      />
      <IntroSection />
    </div>
  );
}
