'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateNavigatorProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDateSelect: (date: Date) => void;
}

export default function DateNavigator({ 
  currentDate, 
  onNavigate, 
  onDateSelect 
}: DateNavigatorProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('prev')}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-brand-orange transition-colors"
      >
        <Calendar className="w-4 h-4 text-brand-orange" />
        <span className="font-medium text-gray-700">
          {format(currentDate, 'MMMM d, yyyy')}
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('next')}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Next day"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </motion.button>

      {/* Calendar dropdown (simplified for now) */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50"
          >
            <div className="text-center mb-3">
              <p className="text-sm text-gray-600">Select a date</p>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {/* Simplified calendar - in production, you'd use a proper date picker */}
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center font-medium text-gray-500 p-1">
                  {day}
                </div>
              ))}
              {/* Sample dates */}
              {[...Array(31)].map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setDate(i + 1);
                    onDateSelect(newDate);
                    setShowCalendar(false);
                  }}
                  className={`p-2 rounded hover:bg-brand-orange/10 transition-colors ${
                    i + 1 === currentDate.getDate() 
                      ? 'bg-brand-orange text-white' 
                      : 'text-gray-700'
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 