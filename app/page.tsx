import Link from 'next/link';
import { ArrowRight, Cpu, TrendingUp, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-display text-brand-dark mb-6">
            Kyle Guilfoyle
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Engineering growth, not chasing trends
          </p>
          
          {/* Personal OS Card */}
          <Link href="/open">
            <div className="group relative max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-brand-orange transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-full h-full bg-gradient-to-br from-brand-orange to-brand-green rounded-full blur-3xl" />
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-brand-orange/10 rounded-2xl">
                    <Cpu className="w-8 h-8 text-brand-orange" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-display text-brand-dark mb-4">
                  Personal Operating System
                </h2>
                
                <p className="text-gray-600 mb-6">
                  A real-time dashboard of what I'm building, tracking, and optimizing. 
                  See how I apply restaurant growth systems to personal development.
                </p>
                
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Live Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Daily Updates</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-brand-orange font-medium group-hover:gap-3 transition-all">
                  <span>Explore My OS</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Additional sections can go here */}
        <div className="text-center text-gray-500">
          <p>More coming soon...</p>
        </div>
      </main>
    </div>
  );
}
