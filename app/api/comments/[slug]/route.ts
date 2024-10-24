import { getCommentsData } from '@/lib/neo4j';
import { NextResponse } from 'next/server';

// The `slug` is extracted from the URL params
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // Call the getCommentsData function to fetch data from Neo4j
    const commentsData = await getCommentsData(slug);

    if (!commentsData) {
      return NextResponse.json({ error: 'No comments found' }, { status: 404 });
    }

    // Return the comments data as JSON
    return NextResponse.json(commentsData, { status: 200 });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
