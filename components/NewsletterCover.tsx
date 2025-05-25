import { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsletterCoverProps {
  title: string;
  className?: string;
}

interface NewsletterData {
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  url: string;
}

export default function NewsletterCover({ title, className = "" }: NewsletterCoverProps) {
  const [newsletterData, setNewsletterData] = useState<NewsletterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNewsletterCover = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/media/newsletter-cover?title=${encodeURIComponent(title)}`);
        
        if (response.ok) {
          const data = await response.json();
          setNewsletterData(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch newsletter cover:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (title) {
      fetchNewsletterCover();
    }
  }, [title]);

  if (isLoading) {
    return (
      <div className={`w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded border border-teal-300 flex items-center justify-center flex-shrink-0 ${className}`}>
        <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !newsletterData) {
    return (
      <div className={`w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded border border-teal-300 flex items-center justify-center flex-shrink-0 ${className}`}>
        <Newspaper className="w-4 h-4 text-teal-600" />
      </div>
    );
  }

  return (
    <div className={`w-12 h-12 rounded border border-teal-300 flex items-center justify-center flex-shrink-0 overflow-hidden relative ${className}`}>
      <img 
        src={newsletterData.imageUrl}
        alt={`${title} newsletter cover`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center absolute inset-0 hidden">
        <Newspaper className="w-4 h-4 text-teal-600" />
      </div>
    </div>
  );
} 