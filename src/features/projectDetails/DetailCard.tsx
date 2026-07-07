import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { ProjectDetailItem } from '@/types';

interface DetailCardProps {
  item: ProjectDetailItem;
  onOpen: () => void;
}

export function DetailCard({ item, onOpen }: DetailCardProps) {
  return (
    <motion.button
      layoutId={`card-${item.id}`}
      onClick={onOpen}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl text-left"
    >
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
    </motion.button>
  );
}
