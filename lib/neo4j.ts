import neo4j from 'neo4j-driver';

// Use environment variables to get the Neo4j Aura connection details
const NEO4J_URI = process.env.NEO4J_URI ?? '';   // Replace with your Aura's URI
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? '';

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error('Missing Neo4j Aura connection environment variables');
}

// Create the Neo4j driver instance without specifying additional encryption configuration
export const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);
