import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const podcastName = searchParams.get('name');

  if (!podcastName) {
    return NextResponse.json({ error: 'Podcast name is required' }, { status: 400 });
  }

  try {
    // iTunes Search API - completely free, no registration required
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(podcastName)}&media=podcast&limit=1&entity=podcast`,
      {
        headers: {
          'User-Agent': 'Personal-OS/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('iTunes API request failed');
    }

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const podcast = data.results[0];
      return NextResponse.json({
        artworkUrl: podcast.artworkUrl600 || podcast.artworkUrl100,
        podcastName: podcast.collectionName,
        artistName: podcast.artistName,
        feedUrl: podcast.feedUrl,
      });
    } else {
      return NextResponse.json({ error: 'Podcast not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching podcast artwork:', error);
    return NextResponse.json({ error: 'Failed to fetch podcast artwork' }, { status: 500 });
  }
} 