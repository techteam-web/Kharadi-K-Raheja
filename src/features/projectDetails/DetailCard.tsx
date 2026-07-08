import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Plus } from 'lucide-react';
import type { ProjectDetailItem } from '@/types';

interface DetailCardProps {
  item: ProjectDetailItem;
  onOpen: () => void;
}

const MAX_TILT_DEG = 8;

export function DetailCard({ item, onOpen }: DetailCardProps) {
  // Tilt is applied to this inner wrapper, not the layoutId element below — framer-motion
  // drives that element's own `transform` for the shared morph into DetailOverlay, and GSAP
  // writing to the same property would fight it.
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    gsap.set(el, { transformPerspective: 800, transformStyle: 'preserve-3d' });
    const rotateXTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotateYTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rotateXTo(-relY * MAX_TILT_DEG * 2);
      rotateYTo(relX * MAX_TILT_DEG * 2);
    };
    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <motion.button
      layoutId={`card-${item.id}`}
      onClick={onOpen}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl text-left"
    >
      <div ref={tiltRef} className="absolute inset-0">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-6">
          <h3 className="font-display text-base text-paper text-balance max-w-[80%] sm:text-xl lg:text-2xl">{item.title}</h3>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-paper/40 text-paper transition-all duration-300 group-hover:bg-paper group-hover:text-ink sm:h-9 sm:w-9">
            <Plus size={15} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
