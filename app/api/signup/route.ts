import { NextResponse } from 'next/server';
import { driver } from '@/lib/neo4j';
import bcrypt from "bcrypt";

// Define the number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  const session = driver.session();

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Store the user with the hashed password in Neo4j
    const result = await session.run(
      `CREATE (u:User {name: $name, email: $email, password: $hashedPassword}) RETURN u`,
      { name, email, hashedPassword }
    );

    console.log('User created with hashed password:', result.records[0].get('u'));
    return NextResponse.json({ status: 'success', user: result.records[0].get('u') });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ status: 'error', message: 'Failed to create user' }, { status: 500 });
  } finally {
    await session.close();
  }
}
