import { NextResponse } from 'next/server';
import { voteOnComment } from '@/lib/neo4j'; // Adjust path as necessary

export async function POST(req: Request) {
  try {
    const { email, commentId, level } = await req.json();

    // Validate inputs
    if (typeof email !== 'string' || typeof commentId !== 'string' || typeof level !== 'number') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    // Ensure level is between -3 and 3
    if (level < -3 || level > 3) {
      return NextResponse.json({ error: 'Invalid voting level. Must be between -3 and 3.' }, { status: 400 });
    }

    // Call the Neo4j function to store the vote
    await voteOnComment(email, commentId, level);

    return NextResponse.json({ message: 'Vote added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in voting API:', error);
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
}
