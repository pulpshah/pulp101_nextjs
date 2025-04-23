import neo4j, { Driver } from "neo4j-driver";

const NEO4J_URI = process.env.NEO4J_URI ?? "";
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? "neo4j";
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? "";

if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
  throw new Error("Missing Neo4j connection environment variables");
}

const driver: Driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export default driver;

export function getSession() {
  return driver.session();
}

export const Neo4jService = {
  getSession: () => driver.session({ defaultAccessMode: neo4j.session.WRITE }),
};
