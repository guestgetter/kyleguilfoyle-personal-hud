import React, { useState } from 'react';
import { BookOpen, GraduationCap, Podcast, Newspaper } from 'lucide-react';

interface MediaThumbnailProps {
  type: 'book' | 'course' | 'podcast' | 'newsletter';
  title: string;
  author?: string;
  platform?: string;
  className?: string;
}

const MediaThumbnail: React.FC<MediaThumbnailProps> = ({ 
  type, 
  title, 
  author, 
  platform, 
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    switch (type) {
      case 'book':
        // Try multiple book cover APIs
        return `https://covers.openlibrary.org/b/title/${encodeURIComponent(title.toLowerCase())}-M.jpg`;
      
      case 'course':
        if (platform?.toLowerCase() === 'udemy') {
          // Udemy course thumbnails (may not work for all courses)
          return `https://img-c.udemycdn.com/course/240x135/${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        }
        return `https://via.placeholder.com/32x32/8B5CF6/FFFFFF?text=${platform?.charAt(0) || 'C'}`;
      
      case 'podcast':
        // For now, use placeholder - could integrate with iTunes API later
        return `https://via.placeholder.com/32x32/DC2626/FFFFFF?text=${title.charAt(0)}`;
      
      case 'newsletter':
        // Use first letter as placeholder
        return `https://via.placeholder.com/32x32/0D9488/FFFFFF?text=${title.charAt(0)}`;
      
      default:
        return `https://via.placeholder.com/32x32/6B7280/FFFFFF?text=?`;
    }
  };

  const getFallbackIcon = () => {
    const iconProps = { className: "w-4 h-4" };
    switch (type) {
      case 'book': return <BookOpen {...iconProps} className="w-4 h-4 text-blue-600" />;
      case 'course': return <GraduationCap {...iconProps} className="w-4 h-4 text-purple-600" />;
      case 'podcast': return <Podcast {...iconProps} className="w-4 h-4 text-red-600" />;
      case 'newsletter': return <Newspaper {...iconProps} className="w-4 h-4 text-teal-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded" />;
    }
  };

  const getContainerClasses = () => {
    const baseClasses = "flex items-center justify-center flex-shrink-0 overflow-hidden relative";
    switch (type) {
      case 'book': return `${baseClasses} w-12 h-16 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-300`;
      case 'course': return `${baseClasses} w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded border border-purple-300`;
      case 'podcast': return `${baseClasses} w-8 h-8 bg-gradient-to-br from-red-100 to-red-200 rounded-full border border-red-300`;
      case 'newsletter': return `${baseClasses} w-8 h-8 bg-gradient-to-br from-teal-100 to-teal-200 rounded border border-teal-300`;
      default: return `${baseClasses} w-8 h-8 bg-gray-100 rounded border border-gray-300`;
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {!imageError ? (
        <>
          <img 
            src={getImageUrl()}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          <div className="w-full h-full flex items-center justify-center absolute inset-0 hidden">
            {getFallbackIcon()}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {getFallbackIcon()}
        </div>
      )}
    </div>
  );
};

export default MediaThumbnail; 