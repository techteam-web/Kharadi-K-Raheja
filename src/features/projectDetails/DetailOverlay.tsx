import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ProjectDetailItem } from '@/types';

interface DetailOverlayProps {
  item: ProjectDetailItem;
  onClose: () => void;
}

export function DetailOverlay({ item, onClose }: DetailOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm sm:p-8 lg:p-14"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${item.id}`}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative flex h-full w-full max-w-6xl flex-col overflow-y-auto rounded-3xl lg:grid lg:grid-cols-2 lg:overflow-hidden"
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-40 w-full shrink-0 object-cover sm:h-56 lg:h-full"
        />
        <div className="flex flex-1 flex-col justify-center p-6 sm:p-10 lg:p-14">
          <span className="label-caps text-blue">Project Details</span>
          <h2 className="mt-3 font-display text-2xl leading-tight text-ink text-balance sm:mt-4 sm:text-3xl lg:mt-5 lg:text-4xl">
            {item.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-base lg:mt-6 lg:text-lg">
            {item.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="glass absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-white/70 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}
