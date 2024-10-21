import { NextResponse } from 'next/server';
import { driver } from '@/lib/neo4j';
import bcrypt from "bcrypt";
import { addSession } from '@/lib/session';

// Define the number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const Neo4jsession = driver.session(); 

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Store the user with the hashed password in Neo4j
    const result = await Neo4jsession.run(
      `CREATE (u:User {name: $name, email: $email, password: $hashedPassword}) RETURN u`,
      { name, email, hashedPassword }
    );

    console.log('User created with hashed password:', result.records[0].get('u'));

    // Create a session and return the response with cookie
    const sessionResponse = await addSession(name, email);

    // Return the session response with user data
    return sessionResponse;  // Return the response containing the session cookie
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to create user' }, { status: 500 });
  } finally {
    await Neo4jsession.close();
  }
}
