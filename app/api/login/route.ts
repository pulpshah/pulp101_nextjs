import { NextResponse } from 'next/server';
import { driver } from '@/lib/neo4j';
import bcrypt from 'bcrypt';
import { addSession } from '@/lib/session';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const session = driver.session();

  try {
    // Query Neo4j for the user with the provided email
    const result = await session.run(
      `MATCH (u:User {email: $email}) RETURN u.password AS hashedPassword, u.name AS name, u`,
      { email }
    );

    if (result.records.length > 0) {
      const hashedPassword = result.records[0].get('hashedPassword');

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        const user = result.records[0].get('u');
        const name = result.records[0].get('name');

        // Successfully authenticated, now add the session
        const sessionResponse = await addSession(name, email);

        
        console.log('Login successful:', user);

        // Return the session response with cookie set
        return sessionResponse;
      } else {
        console.log('Invalid password');
        return NextResponse.json({ status: 'error', message: 'Invalid password' }, { status: 401 });
      }
    } else {
      console.log('User not found');
      return NextResponse.json({ status: 'error', message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ status: 'error', message: 'Login failed' }, { status: 500 });
  } finally {
    await session.close();
  }
}
function PostHogClient() {
  throw new Error('Function not implemented.');
}

