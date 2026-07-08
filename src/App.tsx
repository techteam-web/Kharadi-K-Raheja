import { lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { IntroLoader } from '@/components/layout/IntroLoader';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const LocationPage = lazy(() => import('@/pages/LocationPage'));
const PanoramaPage = lazy(() => import('@/pages/PanoramaPage'));
const ProjectDetailsPage = lazy(() => import('@/pages/ProjectDetailsPage'));
const PlansPage = lazy(() => import('@/pages/PlansPage'));
const OfficeFloorsPage = lazy(() => import('@/pages/OfficeFloorsPage'));
const EsgPage = lazy(() => import('@/pages/EsgPage'));
const BrochurePage = lazy(() => import('@/pages/BrochurePage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="location" element={<LocationPage />} />
            <Route path="360-views" element={<PanoramaPage />} />
            <Route path="project-details" element={<ProjectDetailsPage />} />
            <Route path="plans" element={<PlansPage />} />
            <Route path="office-floors" element={<OfficeFloorsPage />} />
            <Route path="esg" element={<EsgPage />} />
            <Route path="e-brochure" element={<BrochurePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Runs once per app load, on top of the real app underneath — so route chunks and
          the home orbit viewer's frames load for free during the 3s window, not after it. */}
      <AnimatePresence>{showIntro && <IntroLoader onDone={() => setShowIntro(false)} />}</AnimatePresence>
    </>
  );
}
