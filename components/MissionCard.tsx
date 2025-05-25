import { motion } from 'framer-motion';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface MissionCardProps {
  mission: {
    title: string;
    description: string;
    progress: number;
    target: number;
    deadline: string;
  };
  currentMRR: number;
}

export default function MissionCard({ mission, currentMRR }: MissionCardProps) {
  // Calculate progress based on revenue: current MRR vs $100K target
  const revenueTarget = 100000; // $100K/mo target
  const progressPercentage = (currentMRR / revenueTarget) * 100;
  const daysLeft = Math.ceil((new Date(mission.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      className="relative bg-gradient-to-br from-brand-orange/20 via-brand-orange/10 to-brand-green/10 rounded-3xl p-8 border-2 border-brand-orange/30 overflow-hidden"
    >
      {/* Animated background elements - REMOVED */}
      {/* <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-green"
        />
      </div> */}
      
      {/* Quest badge */}
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold"
        >
          🎯 ACTIVE MISSION
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-orange/50 shadow-lg flex-shrink-0">
            <Image 
              src="/images/kyle-profile.jpg" 
              alt="Kyle Guilfoyle" 
              width={64} 
              height={64} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl font-display font-bold text-brand-dark">{mission.title}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">{mission.description}</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-brand-dark">Progress</span>
            <span className="text-sm font-mono text-brand-orange">${(currentMRR/1000).toFixed(0)}K/${revenueTarget/1000}K</span>
          </div>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-orange to-brand-green rounded-full"
            />
            {/* Animated sparkles on progress bar */}
            <motion.div
              animate={{ x: [-10, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-full w-2 bg-white/50 rounded-full"
              style={{ left: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Started</span>
            <span className="font-semibold">{progressPercentage.toFixed(1)}% Complete</span>
            <span>Victory</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/50 rounded-xl p-3 text-center">
            <TrendingUp className="w-4 h-4 text-brand-green mx-auto mb-1" />
            <p className="text-xs text-gray-600">Current MRR</p>
            <p className="font-bold text-brand-dark">${currentMRR.toLocaleString()}</p>
          </div>
          <div className="bg-white/50 rounded-xl p-3 text-center">
            <Calendar className="w-4 h-4 text-brand-orange mx-auto mb-1" />
            <p className="text-xs text-gray-600">Days Left</p>
            <p className="font-bold text-brand-dark">{daysLeft}</p>
          </div>
          <div className="bg-white/50 rounded-xl p-3 text-center">
            <Target className="w-4 h-4 text-brand-orange mx-auto mb-1" />
            <p className="text-xs text-gray-600">Revenue Target</p>
            <p className="font-bold text-brand-dark">$100K/mo</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 