import { NextResponse } from 'next/server';
import { driver } from '@/lib/neo4j'; // Adjust path as needed

export async function POST(req: Request) {
  try {
    const { email, commentId } = await req.json();

    if (!email || !commentId) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const session = driver.session();

    const query = `
      MATCH (u:User {email: $email})-[v:VOTED]->(c:Comment {id: $commentId})
      DELETE v
    `;

    await session.run(query, { email, commentId });
    await session.close();

    return NextResponse.json({ message: 'Vote removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing vote:', error);
    return NextResponse.json({ error: 'Failed to remove vote' }, { status: 500 });
  }
}
