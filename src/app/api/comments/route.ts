import { getCommentsData, getCommentsDataWithVotes } from '@/lib/neo4j';
import { NextResponse } from 'next/server';

// The `slug` is extracted from the URL params
export async function POST(request: Request) {
  const { slug, userEmail } = await request.json();

  try {
    let commentsData;
    if(userEmail)
    {
      commentsData = await getCommentsDataWithVotes(slug,userEmail); 
    }else
    {
      commentsData = await getCommentsData(slug);
    }
    

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
