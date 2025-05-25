'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  title: string;
  author?: string;
  isbn?: string;
  className?: string;
}

const BookCover: React.FC<BookCoverProps> = ({ title, author, isbn, className = '' }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCover = async () => {
      try {
        const params = new URLSearchParams({ title });
        if (author) params.append('author', author);
        if (isbn) params.append('isbn', isbn);

        const response = await fetch(`/api/media/book-cover?${params}`);
        
        if (response.ok) {
          const data = await response.json();
          setCoverUrl(data.coverUrl);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch book cover:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCover();
  }, [title, author, isbn]);

  return (
    <div className={`w-16 h-20 bg-gradient-to-b from-blue-100 to-blue-200 rounded border border-blue-300 flex items-center justify-center flex-shrink-0 overflow-hidden relative ${className}`}>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : coverUrl && !error ? (
        <img 
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default BookCover; 