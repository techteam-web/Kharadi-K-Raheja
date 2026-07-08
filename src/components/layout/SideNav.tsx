import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { NAV_ITEMS } from '@/data/navigation';
import { useNavigationStore } from '@/stores/useNavigationStore';
import { useThemeStore } from '@/stores/useThemeStore';
import { useMagneticHover } from '@/animations/useMagneticHover';
import kRahejaLogo from '@/assets/k-raheja-logo.svg';
import type { NavItem } from '@/types';

function useActiveNavItem() {
  const location = useLocation();
  return (
    NAV_ITEMS.find((item) =>
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path),
    ) ?? NAV_ITEMS[0]
  );
}

/** Desktop rail item — a subtle macOS-dock-style magnetic pull on hover. */
function SideNavItem({ item }: { item: NavItem }) {
  const magneticRef = useMagneticHover<HTMLAnchorElement>({ strength: 0.35, scale: 1.14 });

  return (
    <NavLink
      ref={magneticRef}
      to={item.path}
      end={item.path === '/'}
      className="group relative flex h-11 w-11 items-center justify-center outline-none"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="side-nav-active-pill"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-full bg-blue shadow-[0_4px_18px_rgba(0,84,166,0.5)]"
            />
          )}
          <item.icon
            size={17}
            strokeWidth={1.7}
            className={clsx(
              'relative z-10 transition-colors duration-300',
              isActive ? 'text-paper' : 'text-ink-muted group-hover:text-ink',
            )}
          />
          <span className="glass-strong pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full px-3.5 py-1.5 label-caps text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:mr-3.5 group-hover:opacity-100">
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );
}

export function SideNav() {
  const isImmersive = useNavigationStore((s) => s.isImmersive);
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const [dimmed, setDimmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activeItem = useActiveNavItem();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const fadeProps = {
    animate: { opacity: isImmersive && !dimmed ? 0.32 : 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    onMouseEnter: () => setDimmed(true),
    onMouseLeave: () => setDimmed(false),
  };

  return (
    <>
      {/* Desktop — floating vertical rail, right edge, vertically centered. Brand mark lives
          at its top so there's a single piece of persistent chrome, clear of every page's
          own top-left/top-right header content. */}
      <motion.nav
        {...fadeProps}
        aria-label="Primary"
        className="glass-strong fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full p-2.5 xl:right-8 lg:flex"
      >
        <div className="flex h-11 w-11 items-center justify-center" title="Kharadi 57">
          <img src={kRahejaLogo} alt="K Raheja Corp" className="h-6 w-auto" />
        </div>
        <div className="my-0.5 h-px w-7 bg-ink/10" />

        {NAV_ITEMS.map((item) => (
          <SideNavItem key={item.id} item={item} />
        ))}

        <div className="my-0.5 h-px w-7 bg-ink/10" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="group relative flex h-11 w-11 items-center justify-center outline-none"
        >
          {theme === 'dark' ? (
            <Sun size={17} strokeWidth={1.7} className="relative z-10 text-ink-muted transition-colors duration-300 group-hover:text-ink" />
          ) : (
            <Moon size={17} strokeWidth={1.7} className="relative z-10 text-ink-muted transition-colors duration-300 group-hover:text-ink" />
          )}
          <span className="glass-strong pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-full px-3.5 py-1.5 label-caps text-ink opacity-0 shadow-lg transition-all duration-300 group-hover:mr-3.5 group-hover:opacity-100">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </motion.nav>

      {/* Mobile / tablet — floating action button, bottom-right corner */}
      <motion.button
        {...fadeProps}
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        className="glass-strong fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full active:scale-95 transition-transform duration-200 lg:hidden"
      >
        <activeItem.icon size={19} strokeWidth={1.7} className="text-blue" />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-end bg-ink/25 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-t-3xl p-5 pb-8"
            >
              <div className="flex items-center justify-between px-1 pb-5">
                <div className="flex items-center gap-2.5">
                  <img src={kRahejaLogo} alt="K Raheja Corp" className="h-7 w-auto" />
                  <span className="font-display text-lg text-ink">Kharadi 57</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  </button>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink"
                    aria-label="Close navigation menu"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="grid max-h-[60svh] grid-cols-3 gap-2.5 overflow-y-auto pb-1 sm:grid-cols-4">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.path === '/'}
                    className="group relative flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl px-3 py-5"
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={clsx(
                            'absolute inset-0 transition-colors duration-300',
                            isActive ? 'bg-blue' : 'glass-soft',
                          )}
                        />
                        <item.icon
                          size={20}
                          strokeWidth={1.6}
                          className={clsx('relative', isActive ? 'text-paper' : 'text-ink-muted')}
                        />
                        <span
                          className={clsx(
                            'label-caps relative text-center',
                            isActive ? 'text-paper' : 'text-ink-muted',
                          )}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
