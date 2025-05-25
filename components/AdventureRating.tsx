import { motion } from 'framer-motion';
import { Star, AlignLeft, MountainSnow } from 'lucide-react';

export interface EveningAdventureData {
  activity: string;
  rating: number;
  notes?: string;
}

interface AdventureRatingProps {
  adventure: EveningAdventureData;
  maxRating?: number;
}

export default function AdventureRating({ adventure, maxRating = 10 }: AdventureRatingProps) {
  const { activity, rating, notes } = adventure;
  const stars = Math.round((rating / Math.min(maxRating, 10)) * 5);
  
  return (
    <div className="p-3 bg-white/60 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-2">
        <MountainSnow className="w-5 h-5 text-cyan-600" />
        <h5 className="font-semibold text-sm text-cyan-700">Evening Adventure</h5>
      </div>
      <p className="text-gray-800 font-medium text-sm mb-1">{activity}</p>
      <div className="flex items-center gap-1 mb-1.5">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                index < stars
                  ? 'fill-brand-orange text-brand-orange'
                  : 'fill-gray-300 text-gray-300'
              }`}
            />
          </motion.div>
        ))}
        <span className="ml-1 text-xs font-mono text-gray-600">
          {rating}/{Math.min(maxRating, 10)} rating
        </span>
      </div>
      {notes && (
        <div className="flex items-start gap-1.5 mt-1 pt-1 border-t border-slate-200/70">
          <AlignLeft className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 italic">{notes}</p>
        </div>
      )}
    </div>
  );
} 