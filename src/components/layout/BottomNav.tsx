import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { NAV_ITEMS } from '@/data/navigation';
import { useNavigationStore } from '@/stores/useNavigationStore';
import kRahejaLogo from '@/assets/k-raheja-logo.svg';

export const NAV_HEIGHT_PX = 96;

function useActiveNavItem() {
  const location = useLocation();
  return (
    NAV_ITEMS.find((item) =>
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path),
    ) ?? NAV_ITEMS[0]
  );
}

export function BottomNav() {
  const isImmersive = useNavigationStore((s) => s.isImmersive);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeItem = useActiveNavItem();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        animate={{ opacity: isImmersive ? 0.3 : 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: NAV_HEIGHT_PX }}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center border-t border-hairline bg-paper"
        onMouseEnter={(e) => {
          if (isImmersive) e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          if (isImmersive) e.currentTarget.style.opacity = '0.3';
        }}
      >
        {/* Brand */}
        <div className="flex h-full shrink-0 items-center gap-2 border-r border-hairline pl-4 pr-4 sm:gap-3 sm:pl-8 sm:pr-8">
          <img src={kRahejaLogo} alt="K Raheja Corp" className="h-7 w-auto sm:h-9" />
          <span className="hidden font-display text-lg text-ink sm:inline">Kharadi 57</span>
        </div>

        {/* Desktop nav items */}
        <ul className="hidden h-full flex-1 items-center justify-center lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="h-full">
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className="group relative flex h-full min-w-[100px] flex-col items-center justify-center gap-2 px-3"
              >
                {({ isActive }) => (
                  <>
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, width: isActive ? 28 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-1/2 h-[3px] -translate-x-1/2 bg-blue"
                    />
                    <item.icon
                      size={18}
                      strokeWidth={1.6}
                      className={clsx(
                        'transition-colors duration-300',
                        isActive ? 'text-blue' : 'text-ink-muted group-hover:text-ink',
                      )}
                    />
                    <span
                      className={clsx(
                        'label-caps whitespace-nowrap tracking-[0.08em] transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
                      )}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile/tablet: current page + menu trigger */}
        <div className="flex h-full flex-1 items-center justify-between px-4 lg:hidden">
          <span className="flex items-center gap-2 label-caps text-ink">
            <activeItem.icon size={16} strokeWidth={1.6} className="text-blue" />
            {activeItem.label}
          </span>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 rounded-md border border-hairline px-3.5 py-2.5 label-caps text-ink-muted transition-colors duration-300 hover:text-ink"
            aria-label="Open navigation menu"
          >
            <Menu size={16} strokeWidth={1.6} />
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-6">
              <div className="flex items-center gap-3">
                <img src={kRahejaLogo} alt="K Raheja Corp" className="h-8 w-auto" />
                <span className="font-display text-lg text-ink">Kharadi 57</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:text-ink"
                aria-label="Close navigation menu"
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid flex-1 auto-rows-min grid-cols-2 gap-3 overflow-y-auto p-6 sm:grid-cols-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/'}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-lg border border-hairline bg-surface px-4 py-7"
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        size={22}
                        strokeWidth={1.6}
                        className={clsx(isActive ? 'text-blue' : 'text-ink-muted')}
                      />
                      <span className={clsx('label-caps text-center', isActive ? 'text-ink' : 'text-ink-muted')}>
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
