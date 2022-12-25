import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import path from "path";
import { buildSchema } from "type-graphql";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";

import UserResolver from "./graphql/resolvers/User";
import { TCtx } from "./graphql/types";
import WorkerResolver from "./graphql/resolvers/Job";

async function main() {
  dotenv.config({ path: path.join(__dirname, "../.env") });

  await createConnection();

  const corsOpts: CorsOptions = {
    credentials: true,
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
  };

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver, WorkerResolver] }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }): TCtx => ({ req, res }),
  });
  await server.start();

  // app.use(cors(corsOpts));
  app.use(cookieParser());
  server.applyMiddleware({ app, cors: corsOpts });

  const port = process.env.PORT;
  httpServer.listen(port, () => {
    console.log(
      `\nExpress Server - http://localhost:${port}\nGraphql Server - http://localhost:${port}${server.graphqlPath}`
    );
  });
}

main();
