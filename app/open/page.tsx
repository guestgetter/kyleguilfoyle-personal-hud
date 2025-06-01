'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { 
  ChevronLeft, ChevronRight, Calendar, TrendingUp, Heart, BookOpen, Beaker, Music, 
  Camera, Sparkles, Zap, MapPin, Clock, Globe, Target, ClipboardList, CheckSquare, 
  Square, Lightbulb, GraduationCap, Podcast, Newspaper, Edit3, Send, BarChart2, Brain, Users
} from 'lucide-react';
import type { DailyEntry, ContentItem } from '@/types/personal-os';
import sampleDataJson from '@/data/sample-entries.json';
import Image from 'next/image';

// Components
import MetricCard from '@/components/MetricCard';
import ProgressRing from '@/components/ProgressRing';
import StatusBadge from '@/components/StatusBadge';
import AdventureRating from '@/components/AdventureRating';
import DateNavigator from '@/components/DateNavigator';
import MissionCard from '@/components/MissionCard';
import LocationCard from '@/components/LocationCard';
import BookCover from '@/components/BookCover';
import PodcastArtwork from '@/components/PodcastArtwork';
import NewsletterCover from '@/components/NewsletterCover';
import { useRealTimeData } from '@/hooks/useRealTimeData';

// Type the imported JSON data
const sampleData = sampleDataJson as {
  entries: DailyEntry[];
  lastUpdated: string;
};

const Section: React.FC<{ title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string, delay?: number }> = ({ title, icon, children, className = "", delay = 0.1 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3, ease: "easeOut" }}
    className={`bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 will-change-transform ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon && <span className="text-brand-orange">{icon}</span>}
      <h2 className="text-xl font-semibold text-brand-dark font-display">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default function PersonalOS() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 25)); // Month is 0-indexed, so 4 = May
  const [currentEntry, setCurrentEntry] = useState<DailyEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { business: businessData, content: contentData, isLoading: isRealTimeLoading, error: realTimeError } = useRealTimeData();

  useEffect(() => {
    setIsLoading(true);
    // Reduced loading time for smoother transitions
    const timer = setTimeout(() => {
      const entry = sampleData.entries.find(
        (e: DailyEntry) => e.date === format(currentDate, 'yyyy-MM-dd')
      );
      setCurrentEntry(entry || null);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [currentDate]);

  // Check data freshness
  const isDataStale = () => {
    const lastUpdate = parseISO(sampleData.lastUpdated);
    const daysSinceUpdate = Math.floor((new Date().getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    return daysSinceUpdate > 2; // Consider stale after 2 days
  };

  const getDataFreshnessStatus = () => {
    const lastUpdate = parseISO(sampleData.lastUpdated);
    const daysSinceUpdate = Math.floor((new Date().getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceUpdate === 0) return { status: 'live', color: 'green', text: 'LIVE' };
    if (daysSinceUpdate === 1) return { status: 'recent', color: 'yellow', text: 'RECENT' };
    if (daysSinceUpdate <= 3) return { status: 'stale', color: 'orange', text: 'STALE' };
    return { status: 'offline', color: 'red', text: 'OFFLINE' };
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => 
      direction === 'next' ? addDays(prev, 1) : subDays(prev, 1)
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };
  
  const iconVariants = {
    hover: { scale: 1.2, rotate: 5 },
    tap: { scale: 0.9 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-cream via-orange-50 to-green-50 text-gray-700" style={{ scrollBehavior: 'smooth' }}>
      {/* Floating background elements - Optimized */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ x: [0, 100, 0, -100, 0], y: [0, -50, 50, -50, 0] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-orange/3 rounded-full filter blur-2xl will-change-transform"
        />
        <motion.div
          animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0] }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-brand-green/3 rounded-full filter blur-2xl will-change-transform"
        />
         <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 w-16 h-16 border-2 border-brand-orange/15 rounded-full will-change-transform"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-10 h-10 border-t-2 border-r-2 border-brand-green/20 rounded-full will-change-transform"
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-brand-orange/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <motion.div whileHover={{ rotate: [0, 10, -5, 0]}} className="text-3xl">🎮</motion.div>
              <div>
                <h1 className="text-3xl font-display text-brand-dark tracking-tight">Personal OS</h1>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-brand-green font-mono">STATUS: OPERATIONAL</p>
                  <span className="text-xs">•</span>
                  <p className={`text-xs font-mono ${
                    businessData ? 'text-green-600' : 
                    getDataFreshnessStatus().color === 'green' ? 'text-green-600' :
                    getDataFreshnessStatus().color === 'yellow' ? 'text-yellow-600' :
                    getDataFreshnessStatus().color === 'orange' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    DATA: {businessData ? 'LIVE STRIPE' : getDataFreshnessStatus().text}
                  </p>
                </div>
              </div>
            </motion.div>
            <DateNavigator 
              currentDate={currentDate}
              onNavigate={navigateDate}
              onDateSelect={setCurrentDate}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Explanatory Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block text-4xl mb-4"
            >
              🎯
            </motion.div>
            <h2 className="text-2xl font-display font-bold text-brand-dark mb-4">Welcome to my Open Dashboard</h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              I believe that dashboarding and getting all the data that matters in one spot is a hidden unlock for most of us. 
              We're all drowning in data with no way to make it clear, actionable, and dare I say, <strong>FUN</strong>. 
              This is about turning life into a game, a quest. Welcome to my Open Dashboard — a work in progress.
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-96"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-brand-green font-mono text-lg">Booting Personal OS...</p>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-gray-500 text-sm mt-2"
                >
                  Initializing modules...
                </motion.p>
              </div>
            </motion.div>
          ) : currentEntry ? (
            <motion.div
              key={currentEntry.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Mission Card - Full Width Hero */}
              <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0}>
                                  <MissionCard 
                  mission={currentEntry.mission} 
                  currentMRR={businessData?.mrr || currentEntry.business.mrr} 
                />
              </motion.div>
              
              {/* Balanced Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Recent Snapshot */}
                  {currentEntry.photo && (
                    <Section title="Fave Recent Shot" icon={<Camera className="w-6 h-6" />} delay={0.1} className="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200">
                      <div className="space-y-4">
                        {/* Larger Photo */}
                        <motion.div 
                          className="rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                          whileHover={{ scale: 1.02, rotate: 0.5 }}
                          style={{ 
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                            transform: 'rotate(-0.5deg)'
                          }}
                        >
                          <Image 
                            src={currentEntry.photo.url} 
                            alt={currentEntry.photo.caption || 'Recent memory'} 
                            width={600} 
                            height={400} 
                            className="object-cover w-full h-auto" 
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          />
                        </motion.div>
                        
                        {/* Memory Note - Fridge Style */}
                        <div className="relative">
                          <div className="bg-yellow-200 p-6 rounded-lg shadow-md border-l-4 border-yellow-400 relative transform rotate-0.5">
                            {/* Tape effect */}
                            <div className="absolute -top-2 -right-2 w-8 h-6 bg-gray-200 opacity-60 rounded-sm transform rotate-45"></div>
                            <div className="absolute -top-2 -left-2 w-8 h-6 bg-gray-200 opacity-60 rounded-sm transform -rotate-45"></div>
                            
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">💝</span>
                              <div>
                                <p className="text-gray-800 font-medium leading-relaxed mb-2">
                                  "{currentEntry.photo.caption}"
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="font-mono bg-yellow-300/50 px-2 py-1 rounded text-xs">
                                    {format(parseISO(currentEntry.date), "MMM dd, yyyy")}
                                  </span>
                                  <span className="text-yellow-600">•</span>
                                  <span className="italic">Worth remembering ✨</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Section>
                  )}

                  {/* Health */}
                  <Section title="Health" icon={<Heart className="w-6 h-6" />} delay={0.3} className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                     <MetricCard
                        icon={<Heart className="w-5 h-5" />}
                        title="Sleep Score"
                        metric={`${currentEntry.health.sleepScore || 'N/A'} ${currentEntry.health.sleepScoreTarget ? `/ ${currentEntry.health.sleepScoreTarget}` : ''}`}
                        subtitle={`VO₂ Max: ${currentEntry.health.vo2Max || 'N/A'}`}
                        highlight={currentEntry.health.habitTesting}
                        color="green"
                      />
                  </Section>

                  {/* Learning */}
                  <Section title="Learning" icon={<Brain className="w-6 h-6" />} delay={0.4} className="bg-gradient-to-br from-sky-50 to-cyan-100 border-sky-200">
                    <div className="space-y-4">
                      {currentEntry.learning.currentBook && (
                        <div className="p-4 bg-white/80 rounded-lg shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <h4 className="font-semibold text-blue-700 text-sm">Reading:</h4>
                          </div>
                          <div className="flex items-start gap-3">
                            <BookCover 
                              title={currentEntry.learning.currentBook.title}
                              author={currentEntry.learning.currentBook.author}
                            />
                            <div className="flex-1">
                              <a 
                                href={`https://www.google.com/search?q=${encodeURIComponent(currentEntry.learning.currentBook.title + ' ' + (currentEntry.learning.currentBook.author || ''))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                              >
                                {currentEntry.learning.currentBook.title}
                              </a>
                              {currentEntry.learning.currentBook.author && (
                                <p className="text-sm text-gray-600">by {currentEntry.learning.currentBook.author}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {currentEntry.learning.courses && currentEntry.learning.courses.length > 0 && (
                        <div className="p-4 bg-white/80 rounded-lg shadow-sm border border-purple-100">
                           <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-purple-700 text-sm">Courses:</h4>
                          </div>
                          <div className="space-y-4">
                            {currentEntry.learning.courses.map((course: any, idx: number) => (
                              <div key={idx} className="bg-white/90 rounded-lg p-4 border border-purple-200 shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start gap-4">
                                  {/* Course Thumbnail */}
                                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border border-purple-300 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                    <img 
                                      src={course.platform.toLowerCase() === 'udemy' 
                                        ? `https://img-c.udemycdn.com/course/240x135/5158824_7b8e_2.jpg`
                                        : `https://via.placeholder.com/64x64/8B5CF6/FFFFFF?text=${course.platform.charAt(0)}`
                                      }
                                      alt={course.title}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) fallback.style.display = 'flex';
                                      }}
                                    />
                                    <div className="w-full h-full flex items-center justify-center absolute inset-0 hidden">
                                      <GraduationCap className="w-6 h-6 text-purple-600" />
                                    </div>
                                  </div>
                                  
                                  {/* Course Details */}
                                  <div className="flex-1 min-w-0">
                                    <a 
                                      href={course.platform.toLowerCase() === 'udemy' ? `https://www.udemy.com/courses/search/?q=${encodeURIComponent(course.title)}` : `https://www.google.com/search?q=${encodeURIComponent(course.title + ' ' + course.platform)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2"
                                    >
                                      {course.title}
                                    </a>
                                    
                                    {/* Course Meta */}
                                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">{course.platform}</span>
                                      {course.rating && (
                                        <span className="flex items-center gap-1">
                                          <span className="text-yellow-500">★</span>
                                          {course.rating}
                                        </span>
                                      )}
                                      {course.students && (
                                        <span>{course.students} students</span>
                                      )}
                                    </div>
                                    
                                    {/* Instructor */}
                                    {course.instructor && (
                                      <p className="text-xs text-gray-500 mt-1">by {course.instructor}</p>
                                    )}
                                    
                                    {/* Progress Bar */}
                                    {course.progress && (
                                      <div className="mt-2">
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs font-medium text-purple-700">Progress</span>
                                          <span className="text-xs text-purple-600">{course.progress}</span>
                                        </div>
                                        <div className="w-full bg-purple-100 rounded-full h-2">
                                          <div 
                                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: course.progress }}
                                          ></div>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Description */}
                                    {course.description && (
                                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{course.description}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {currentEntry.learning.podcasts && currentEntry.learning.podcasts.length > 0 && (
                         <div className="p-4 bg-white/80 rounded-lg shadow-sm border border-red-100">
                           <div className="flex items-center gap-2 mb-3">
                            <Podcast className="w-4 h-4 text-red-600" />
                            <h4 className="font-semibold text-red-700 text-sm">Podcasts:</h4>
                          </div>
                          <div className="space-y-3">
                            {currentEntry.learning.podcasts.map((podcast: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 hover:bg-red-50/50 p-2 rounded transition-colors">
                                <PodcastArtwork title={podcast.title} />
                                <div className="flex-1">
                                  <a 
                                    href={`https://www.google.com/search?q=${encodeURIComponent(podcast.title + ' podcast')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                                  >
                                    {podcast.title}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {currentEntry.learning.newsletters && currentEntry.learning.newsletters.length > 0 && (
                        <div className="p-4 bg-white/80 rounded-lg shadow-sm border border-teal-100">
                           <div className="flex items-center gap-2 mb-3">
                            <Newspaper className="w-4 h-4 text-teal-600" />
                            <h4 className="font-semibold text-teal-700 text-sm">Newsletters:</h4>
                          </div>
                          <div className="space-y-3">
                            {currentEntry.learning.newsletters.map((newsletter: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-3 hover:bg-teal-50/50 p-2 rounded transition-colors">
                                <NewsletterCover title={newsletter.title} />
                                <div className="flex-1">
                                  <a 
                                    href={`https://www.google.com/search?q=${encodeURIComponent(newsletter.title + ' newsletter')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
                                  >
                                    {newsletter.title}
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {currentEntry.learning.keyTakeaway && (
                        <div className="p-4 bg-yellow-50/80 rounded-lg border border-yellow-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-yellow-600" />
                            <h4 className="font-semibold text-yellow-700 text-sm">Key Takeaway:</h4>
                          </div>
                          <p className="text-sm italic text-gray-700 leading-relaxed">"{currentEntry.learning.keyTakeaway}"</p>
                        </div>
                      )}
                      {currentEntry.learning.latestIdea && (
                         <div className="p-4 bg-indigo-50/80 rounded-lg border border-indigo-200 shadow-sm">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                            <h4 className="font-semibold text-indigo-700 text-sm">Latest Idea:</h4>
                          </div>
                          <p className="text-sm italic text-gray-700 leading-relaxed">"{currentEntry.learning.latestIdea}"</p>
                        </div>
                      )}
                    </div>
                  </Section>

                  {/* Activity Log */}
                  <Section title="Activity Log" icon={<Send className="w-6 h-6" />} delay={0.6} className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
                    <ul className="space-y-2 font-mono text-xs text-gray-600">
                      {currentEntry.changelog.map((log, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-start gap-2 p-2 bg-white/50 rounded-md shadow-sm hover:bg-brand-cream/30 transition-colors"
                          variants={cardVariants} initial="hidden" animate="visible" custom={index + 4}
                        >
                          <span className="text-brand-green pt-0.5">❖</span> 
                          <span>{log}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </Section>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <motion.div variants={cardVariants} initial="hidden" animate="visible" custom={0.1}>
                     <LocationCard location={currentEntry.location} />
                  </motion.div>

                  {/* Content Pipeline */}
                  <Section title="Content Pipeline" icon={<Edit3 className="w-6 h-6" />} delay={0.2}>
                    <div className="space-y-6">
                      {currentEntry.content.map((item: ContentItem, index) => (
                        <motion.div
                          key={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                          className="bg-white/80 p-4 rounded-lg shadow-md border border-slate-200 hover:shadow-xl transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-brand-dark text-lg">{item.title}</h3>
                              {item.subtitle && <p className="text-sm text-gray-600 mb-1">{item.subtitle}</p>}
                            </div>
                            <StatusBadge status={item.status} />
                          </div>
                          {item.deadline && <p className="text-xs text-brand-orange font-mono mb-2">TARGET: {format(parseISO(item.deadline), "MMM dd, yyyy")}</p>}
                          
                          {item.distributionChecklist && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-1 mt-3 flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-brand-green" /> Distribution:
                              </h4>
                              <ul className="space-y-1 text-xs">
                                {item.distributionChecklist.map((checkItem, checkIndex) => (
                                  <li key={checkIndex} className="flex items-center gap-2 text-gray-600">
                                    {checkItem.done ? <CheckSquare className="w-3.5 h-3.5 text-green-500" /> : <Square className="w-3.5 h-3.5 text-gray-400" />}
                                    <span>{checkItem.item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </Section>

                  {/* System Status */}
                  <Section title="System Status" icon={<BarChart2 className="w-6 h-6" />} delay={0.5}>
                     <MetricCard
                        icon={<Beaker className="w-5 h-5" />}
                        title="Experiments"
                        metric={currentEntry.experiments.name}
                        subtitle={`Status: ${currentEntry.experiments.status}`}
                        highlight={currentEntry.experiments.learning}
                        color="teal"
                      />
                      <MetricCard
                        icon={<Music className="w-5 h-5 mt-4" />}
                        title="Now Playing"
                        metric={currentEntry.nowPlaying.title}
                        subtitle={`${currentEntry.nowPlaying.type}`}
                        highlight={`Mood: ${currentEntry.nowPlaying.mood || 'N/A'}`}
                        color="purple"
                      />
                      <div className="mt-4">
                        <AdventureRating adventure={currentEntry.eveningAdventure} />
                      </div>
                  </Section>
                </div>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="no-data"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-96"
            >
              <div className="text-center py-16">
                <Calendar className="w-16 h-16 text-brand-orange mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-brand-dark mb-2">No Data Logged for this Date</h2>
                <p className="text-gray-600">Perhaps the system was offline, or you've ventured into an unrecorded timeline.</p>
                <p className="text-gray-500 text-sm mt-1">Try selecting another date.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center relative z-10">
          <p className="text-xs text-gray-500 font-mono">
            Personal OS v1.0 | Last Synced: {sampleData.lastUpdated ? format(parseISO(sampleData.lastUpdated), "MMM dd, yyyy HH:mm:ss") : 'N/A'}
          </p>
          <p className="text-xs text-gray-500 font-mono mt-1">
            Designed with <Heart className="inline w-3 h-3 text-red-500"/> in London, ON.
          </p>
      </footer>

    </div>
  );
} 