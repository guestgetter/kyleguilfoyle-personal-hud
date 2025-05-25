import { NextRequest, NextResponse } from 'next/server';

// Simple fetch-based Notion integration (no external dependencies)
export async function GET(request: NextRequest) {
  try {
    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_TOKEN || !DATABASE_ID) {
      return NextResponse.json(
        { error: 'Missing Notion credentials' },
        { status: 500 }
      );
    }

    // Fetch pages from Notion database
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          or: [
            {
              property: 'Status',
              select: { equals: 'In Progress' }
            },
            {
              property: 'Status', 
              select: { equals: 'Planning' }
            },
            {
              property: 'Status',
              select: { equals: 'Published' }
            }
          ]
        },
        sorts: [
          {
            property: 'Deadline',
            direction: 'ascending'
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Notion data to our format
    const contentItems = data.results.map((page: any) => {
      const properties = page.properties;
      
      return {
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        subtitle: properties.Subtitle?.rich_text?.[0]?.plain_text || '',
        status: properties.Status?.select?.name || 'Planning',
        deadline: properties.Deadline?.date?.start || null,
        distributionChecklist: [
          { 
            item: 'LinkedIn Article', 
            done: properties['LinkedIn']?.checkbox || false 
          },
          { 
            item: 'Medium Publication', 
            done: properties['Medium']?.checkbox || false 
          },
          { 
            item: 'Twitter Thread', 
            done: properties['Twitter']?.checkbox || false 
          },
          { 
            item: 'Website Blog', 
            done: properties['Website']?.checkbox || false 
          }
        ]
      };
    });

    return NextResponse.json({
      content: contentItems,
      totalItems: contentItems.length,
      lastUpdated: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Notion API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion data' },
      { status: 500 }
    );
  }
} 