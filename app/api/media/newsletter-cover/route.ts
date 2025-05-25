import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  if (!title) {
    return NextResponse.json({ error: 'Title parameter required' }, { status: 400 });
  }

  try {
    // Method 1: Check for known newsletters first
    const knownNewsletters: { [key: string]: string } = {
      'Marketing Accountability Council': 'https://marketingaccountability.substack.com/',
      'AI Supremacy': 'https://substack.com/@aisupremacy'
    };

    // Check if this is a known newsletter
    const knownUrl = knownNewsletters[title];
    if (knownUrl) {
      try {
        const response = await fetch(knownUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PersonalOS/1.0)',
          },
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          const html = await response.text();
          
          // Extract logo/cover image from HTML - improved regex patterns
          const logoMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || 
                           html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
          const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i) || 
                            html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:title"/i);
          const descMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || 
                           html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:description"/i);
          
          if (logoMatch) {
            return NextResponse.json({
              title: titleMatch?.[1] || title,
              description: descMatch?.[1] || '',
              imageUrl: logoMatch[1],
              source: 'known-substack',
              url: knownUrl
            });
          }
        }
      } catch (error) {
        console.log(`Failed to fetch known newsletter ${title}:`, error);
      }
    }

    // Method 2: Try multiple approaches to find the newsletter
    const searchQueries = [
      title,
      title.replace(/\s+/g, '-').toLowerCase(),
      title.split(' ')[0] // First word only as fallback
    ];

    for (const query of searchQueries) {
      try {
        // Try direct Substack subdomain
        const substackUrl = `https://${query.replace(/\s+/g, '-').toLowerCase()}.substack.com`;
        const response = await fetch(substackUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; PersonalOS/1.0)',
          },
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          const html = await response.text();
          
          // Extract logo/cover image from HTML - improved regex patterns
          const logoMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i) || 
                           html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:image"/i);
          const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i) || 
                            html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:title"/i);
          const descMatch = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]+)"/i) || 
                           html.match(/<meta[^>]*content="([^"]+)"[^>]*property="og:description"/i);
          
          if (logoMatch) {
            return NextResponse.json({
              title: titleMatch?.[1] || title,
              description: descMatch?.[1] || '',
              imageUrl: logoMatch[1],
              source: 'substack',
              url: substackUrl
            });
          }
        }
      } catch (error) {
        // Continue to next method
        console.log(`Failed to fetch from ${query}:`, error);
      }
    }

    // Method 3: Search Substack's public directory
    try {
      const searchResponse = await fetch(`https://substack.com/api/v1/publications/search?q=${encodeURIComponent(title)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PersonalOS/1.0)',
        },
        signal: AbortSignal.timeout(5000)
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const publication = searchData.publications?.[0];
        
        if (publication) {
          return NextResponse.json({
            title: publication.name || title,
            description: publication.description || '',
            imageUrl: publication.logo_url || publication.cover_photo_url,
            source: 'substack-search',
            url: `https://${publication.subdomain}.substack.com`
          });
        }
      }
    } catch (error) {
      console.log('Substack search failed:', error);
    }

    // Method 4: Generate a branded placeholder
    const fallbackImageUrl = `https://via.placeholder.com/64x64/FF6719/FFFFFF?text=${encodeURIComponent(title.charAt(0).toUpperCase())}`;
    
    return NextResponse.json({
      title,
      description: 'Newsletter',
      imageUrl: fallbackImageUrl,
      source: 'placeholder',
      url: `https://www.google.com/search?q=${encodeURIComponent(title + ' newsletter substack')}`
    });

  } catch (error) {
    console.error('Newsletter cover fetch error:', error);
    
    // Return fallback
    return NextResponse.json({
      title,
      description: 'Newsletter',
      imageUrl: `https://via.placeholder.com/64x64/0D9488/FFFFFF?text=${encodeURIComponent(title.charAt(0))}`,
      source: 'error-fallback',
      url: `https://www.google.com/search?q=${encodeURIComponent(title + ' newsletter')}`
    });
  }
} 