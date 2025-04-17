import { NextRequest, NextResponse } from 'next/server';
import { addReplyToBlog } from '@/lib/neo4j';

export async function POST(req: NextRequest) {
  try {
    const { slug, text, email } = await req.json();

    if (!slug || !text || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await addReplyToBlog(slug, text, email);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add comment to blog' }, { status: 500 });
  }
}
