import { motion } from 'framer-motion';

type ContentStatus = 'Drafting' | 'Editing' | 'Published' | 'Scheduled' | 'Outlining' | 'Idea';
type ExperimentStatus = 'Running' | 'Paused' | 'Complete' | 'Planning';

interface StatusBadgeProps {
  status: ContentStatus | ExperimentStatus;
}

interface StatusStyle {
  bg: string;
  text: string;
  dot: string;
  pulse?: boolean;
}

const statusStyles: Record<ContentStatus | ExperimentStatus, StatusStyle> = {
  // Content statuses
  Drafting: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
  },
  Editing: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    dot: 'bg-yellow-400',
  },
  Published: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-400',
  },
  Scheduled: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    dot: 'bg-blue-400',
  },
  Outlining: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-700',
    dot: 'bg-indigo-400',
  },
  Idea: {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    dot: 'bg-pink-400',
  },
  // Experiment statuses
  Running: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-400',
    pulse: true,
  },
  Paused: {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    dot: 'bg-orange-400',
  },
  Complete: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    dot: 'bg-purple-400',
  },
  Planning: {
    bg: 'bg-sky-100',
    text: 'text-sky-700',
    dot: 'bg-sky-400',
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = statusStyles[status];

  if (!styles) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-500">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
        {status}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text}`}
    >
      <span className="relative flex h-2 w-2">
        {styles.pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${styles.dot} opacity-75`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot}`}></span>
      </span>
      {status}
    </motion.span>
  );
} 