import { motion } from 'framer-motion';
import { MapPin, Clock, Globe } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

interface LocationCardProps {
  location: {
    city: string;
    timezone: string;
    weather: string;
    mapImageUrl?: string;
    latitude?: number;
    longitude?: number;
  };
}

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

export default function LocationCard({ location }: LocationCardProps) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Toronto', // London, Ontario timezone
    hour: '2-digit',
    minute: '2-digit',
  });

  // Construct Google Maps Static API URL
  const cityForMap = location.city.replace(/ /g, '+'); // URL encode spaces
  const mapZoom = 12;
  const mapWidth = 400;
  const mapHeight = 200;
  // Can add &markers=color:red%7Clabel:L%7C${londonLat},${londonLon} for a marker
  const generatedMapUrl = location.mapImageUrl || 
    `https://maps.googleapis.com/maps/api/staticmap?center=${cityForMap},Ontario&zoom=${mapZoom}&size=${mapWidth}x${mapHeight}&maptype=roadmap&key=${GOOGLE_MAPS_API_KEY}`;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 overflow-hidden"
    >
      {/* Floating elements */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 right-2 text-2xl"
      >
        🌍
      </motion.div>
      
      <motion.div
        animate={{ x: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-2 left-2 text-xl opacity-50"
      >
        ✈️
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Current Location</h3>
        </div>
        
        {/* Interactive Map */}
        <div className="relative w-full h-32 bg-gray-200 rounded-lg overflow-hidden mb-4 border border-blue-300">
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-81.3,42.9,-81.1,43.1&layer=mapnik&marker=42.9849,-81.2453`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '8px' }}
            title={`Interactive map of ${location.city}`}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-bold text-lg text-gray-800">{location.city}</p>
              <p className="text-sm text-gray-600">Building the future, one restaurant at a time</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <Clock className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Local Time</p>
              <p className="font-mono font-bold text-gray-800">{currentTime}</p>
            </div>
            
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <Globe className="w-4 h-4 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600">Weather</p>
              <p className="font-bold text-gray-800">{location.weather}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 