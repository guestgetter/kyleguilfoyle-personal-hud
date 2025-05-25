import { motion } from 'framer-motion';
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  subtitle?: string | React.ReactNode;
  highlight?: string;
  color?: 'orange' | 'green' | 'blue' | 'teal' | 'purple' | 'pink' | 'gray';
  className?: string;
}

const colorClasses = {
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconText: 'text-orange-500',
    highlightBg: 'bg-orange-100',
    highlightText: 'text-orange-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconText: 'text-green-500',
    highlightBg: 'bg-green-100',
    highlightText: 'text-green-700',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconText: 'text-blue-500',
    highlightBg: 'bg-blue-100',
    highlightText: 'text-blue-700',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    iconText: 'text-teal-500',
    highlightBg: 'bg-teal-100',
    highlightText: 'text-teal-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconText: 'text-purple-500',
    highlightBg: 'bg-purple-100',
    highlightText: 'text-purple-700',
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    iconText: 'text-pink-500',
    highlightBg: 'bg-pink-100',
    highlightText: 'text-pink-700',
  },
  gray: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    iconText: 'text-slate-500',
    highlightBg: 'bg-slate-100',
    highlightText: 'text-slate-700',
  },
};

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon, 
  title, 
  metric, 
  subtitle, 
  highlight, 
  color = 'gray', 
  className = '' 
}) => {
  const selectedColor = colorClasses[color] || colorClasses.gray;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`p-4 rounded-xl shadow-sm border ${selectedColor.bg} ${selectedColor.border} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${selectedColor.highlightBg} ${selectedColor.iconText}`}>
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">{title}</h4>
          <p className="text-xl font-bold text-gray-800">{metric}</p>
          {typeof subtitle === 'string' ? (
            <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>
          ) : (
            <div className="text-xs text-gray-600 mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {highlight && (
        <div className={`mt-3 p-2 rounded-md text-xs ${selectedColor.highlightBg} ${selectedColor.highlightText} font-mono`}>
          {highlight}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
export { MetricCard }; 