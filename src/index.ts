import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";


const main = async () => {

  await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver],

  });

  const apolloServer = new ApolloServer({
    schema, plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  await apolloServer.start();

  const app = Express();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
};

main().catch((error) => {
  console.error("Error starting server:", error);
});
