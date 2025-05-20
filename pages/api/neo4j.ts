// ============================================
// File Purpose: API route to store NDA details in Neo4j database
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 03/25/2025
// ============================================

import type { NextApiRequest, NextApiResponse } from 'next';
import neo4j from 'neo4j-driver';

const uri = process.env.NEO4J_URI!;
const user = process.env.NEO4J_USER!;
const password = process.env.NEO4J_PASSWORD!;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, address, date, s3Link } = req.body;

        if (!name || !address || !date || !s3Link) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const session = driver.session();

        try {
            const query = `
                MERGE (u:User {name: $name})
                ON CREATE SET u.address = $address, u.date = $date, u.s3Link = $s3Link
                ON MATCH SET u.address = $address, u.date = $date, u.s3Link = $s3Link
            `;

            await session.run(query, { name, address, date, s3Link });

            console.log(`Stored in Neo4j: ${name}, ${address}, ${date}, ${s3Link}`);

            return res.status(200).json({ message: 'NDA data stored successfully in Neo4j' });
        } catch (error) {
            console.error('Error storing NDA data in Neo4j:', error);
            return res.status(500).json({ error: 'Failed to store NDA data in Neo4j' });
        } finally {
            await session.close();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
