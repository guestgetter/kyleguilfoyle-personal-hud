import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const author = searchParams.get('author');
  const isbn = searchParams.get('isbn');

  if (!title) {
    return NextResponse.json({ error: 'Book title is required' }, { status: 400 });
  }

  try {
    let coverUrl: string | null = null;

    // Try multiple sources in order of reliability
    
    // 1. Try Open Library by ISBN (most reliable)
    if (isbn) {
      coverUrl = await tryOpenLibraryByISBN(isbn);
    }

    // 2. Try Open Library by title
    if (!coverUrl) {
      coverUrl = await tryOpenLibraryByTitle(title);
    }

    // 3. Try Google Books API (no key required for basic search)
    if (!coverUrl) {
      coverUrl = await tryGoogleBooks(title, author);
    }

    if (coverUrl) {
      return NextResponse.json({ coverUrl, source: 'found' });
    } else {
      return NextResponse.json({ error: 'Book cover not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return NextResponse.json({ error: 'Failed to fetch book cover' }, { status: 500 });
  }
}

async function tryOpenLibraryByISBN(isbn: string): Promise<string | null> {
  try {
    const cleanISBN = isbn.replace(/[^0-9X]/g, '');
    const url = `https://covers.openlibrary.org/b/isbn/${cleanISBN}-L.jpg`;
    
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok && response.headers.get('content-type')?.includes('image')) {
      return url;
    }
  } catch (error) {
    console.error('Open Library ISBN lookup failed:', error);
  }
  return null;
}

async function tryOpenLibraryByTitle(title: string): Promise<string | null> {
  try {
    // Clean the title for better matching
    const cleanTitle = title.toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove special characters
      .replace(/\s+/g, ' ')    // Normalize spaces
      .trim();
    
    const url = `https://covers.openlibrary.org/b/title/${encodeURIComponent(cleanTitle)}-L.jpg`;
    
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok && response.headers.get('content-type')?.includes('image')) {
      return url;
    }
  } catch (error) {
    console.error('Open Library title lookup failed:', error);
  }
  return null;
}

async function tryGoogleBooks(title: string, author?: string | null): Promise<string | null> {
  try {
    let query = title;
    if (author) {
      query += ` inauthor:${author}`;
    }

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1`,
      {
        headers: {
          'User-Agent': 'Personal-OS/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Google Books API request failed');
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const book = data.items[0];
      const imageLinks = book.volumeInfo?.imageLinks;
      
      // Prefer larger images
      return imageLinks?.large || 
             imageLinks?.medium || 
             imageLinks?.thumbnail || 
             null;
    }
  } catch (error) {
    console.error('Google Books lookup failed:', error);
  }
  return null;
} 