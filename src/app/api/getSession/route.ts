// /pages/api/getSession.ts

import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';  // Assuming `getSession` is the function to get the session

export async function GET() {
  try {
    const session = await getSession();
    if (session?.user?.email) {
      return NextResponse.json({ user: session.user });
    } else {
      return NextResponse.json({ error: 'User not found in session' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching session' }, { status: 500 });
  }
}
