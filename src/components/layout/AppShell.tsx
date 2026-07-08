import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SideNav } from './SideNav';
import { pageTransition } from '@/animations/motion';
import { LoadingScreen } from './LoadingScreen';
import brainwingLogo from '@/assets/images/Brainwing-logo.webp';

export function AppShell() {
  const location = useLocation();

  return (
    <div className="relative h-full w-full">
      <main className="h-full w-full">
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
          <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-full min-h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
      <SideNav />

      {/* Studio watermark — bottom-left on mobile (clear of the nav FAB), bottom-right on
          desktop (clear of the vertically-centered rail). */}
      <img
        src={brainwingLogo}
        alt="Brainwing Innovations"
        className="pointer-events-none fixed bottom-5 left-5 z-30 h-6 w-auto opacity-50 lg:right-6 lg:bottom-6 lg:left-auto lg:h-8"
      />
    </div>
  );
}
