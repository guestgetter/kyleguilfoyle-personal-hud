'use client';

import React, { useState, useEffect } from 'react';
import { Podcast } from 'lucide-react';

interface PodcastArtworkProps {
  title: string;
  className?: string;
}

const PodcastArtwork: React.FC<PodcastArtworkProps> = ({ title, className = '' }) => {
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`/api/media/podcast-artwork?name=${encodeURIComponent(title)}`);
        
        if (response.ok) {
          const data = await response.json();
          setArtworkUrl(data.artworkUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch podcast artwork:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [title]);

  return (
    <div className={`w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full border border-red-300 flex items-center justify-center flex-shrink-0 overflow-hidden relative ${className}`}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : artworkUrl && !error ? (
        <img 
          src={artworkUrl}
          alt={title}
          className="w-full h-full object-cover rounded-full"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Podcast className="w-4 h-4 text-red-600" />
        </div>
      )}
    </div>
  );
};

export default PodcastArtwork; 