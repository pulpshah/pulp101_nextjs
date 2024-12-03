import { NextRequest, NextResponse } from 'next/server';
import { getUserName } from '@/lib/neo4j';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const name = await getUserName(email);
    return NextResponse.json({ name }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch username' }, { status: 500 });
  }
}