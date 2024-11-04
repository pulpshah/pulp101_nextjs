// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/lib/session'; // Adjust the import path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession();
    if (session) {
      res.status(200).json(session);
    } else {
      res.status(401).json({ error: 'User not logged in' });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
}
