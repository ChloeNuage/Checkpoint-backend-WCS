import "reflect-metadata"; 
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import DataSource  from "./config/db";
import { CountryResolver } from "./resolvers/CountryResolver";

async function main() {
  await DataSource.initialize();
  console.log("✅ Database connected");

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });

   const server = new ApolloServer({
    schema,
    // Désactiver CSRF en dev
    csrfPrevention: false,
  } as any);

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server is running at ${url}`);
}
