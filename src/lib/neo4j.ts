import neo4j, { Driver } from "neo4j-driver";

// Load environment variables
const NEO4J_URI = process.env.NEO4J_URI ?? "";
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "";

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error("Missing Neo4j connection environment variables");
}

// Create the Neo4j driver
const driver: Driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

// Export default for use in NextAuth adapter
export default driver;

// Optional: Helper to get sessions manually
export function getSession() {
  return driver.session();
}
