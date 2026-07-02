import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomNav, NAV_HEIGHT_PX } from './BottomNav';
import { pageTransition } from '@/animations/motion';
import { LoadingScreen } from './LoadingScreen';

export function AppShell() {
  const location = useLocation();

  return (
    <div className="relative h-full w-full bg-paper">
      <main className="h-full w-full" style={{ paddingBottom: NAV_HEIGHT_PX }}>
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
      <BottomNav />
    </div>
  );
}
