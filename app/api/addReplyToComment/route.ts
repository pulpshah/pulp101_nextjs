import { NextRequest, NextResponse } from 'next/server';
import { addReplyToComment } from '@/lib/neo4j';

export async function POST(req: NextRequest) {
  try {
    const { commentId, text, email } = await req.json();

    if (!commentId || !text || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await addReplyToComment(commentId, text, email);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add reply to comment' }, { status: 500 });
  }
}
