import { useState, useEffect } from 'react';

interface RealTimeData {
  business: {
    mrr: number;
    monthlyRevenue: number;
    activeSubscriptions: number;
    lastUpdated: string;
  } | null;
  content: {
    items: any[];
    totalItems: number;
    lastUpdated: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

export const useRealTimeData = () => {
  const [data, setData] = useState<RealTimeData>({
    business: null,
    content: null,
    isLoading: true,
    error: null,
  });

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('/api/business/stripe');
      if (!response.ok) throw new Error('Failed to fetch business data');
      const businessData = await response.json();
      
      setData(prev => ({
        ...prev,
        business: businessData,
        error: null,
      }));
    } catch (error) {
      console.error('Business data fetch error:', error);
      setData(prev => ({
        ...prev,
        error: 'Failed to load business data',
      }));
    }
  };

  const fetchContentData = async () => {
    try {
      const response = await fetch('/api/content/notion');
      if (!response.ok) {
        // If Notion isn't configured (401/500), just skip content data
        console.log('Notion integration not available, using sample data');
        return;
      }
      const contentData = await response.json();
      
      setData(prev => ({
        ...prev,
        content: contentData,
        error: null,
      }));
    } catch (error) {
      // Don't set error for missing Notion integration
      console.log('Content data fetch skipped:', error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setData(prev => ({ ...prev, isLoading: true }));
      
      await Promise.all([
        fetchBusinessData(),
        fetchContentData(),
      ]);
      
      setData(prev => ({ ...prev, isLoading: false }));
    };

    fetchAllData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...data,
    refetch: () => {
      fetchBusinessData();
      fetchContentData();
    },
  };
}; 