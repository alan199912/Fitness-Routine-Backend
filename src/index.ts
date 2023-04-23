import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { typeDefs } from './graphql/typeDef/index';
import { resolvers } from './graphql/resolvers';
import { AppDataSource } from './db/data-source';
dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
  })
  .catch((error) => console.log(error));

(async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const app = express();
  const httpServer = createServer(app);

  const ws = new WebSocketServer({ server: httpServer });
  const serverCleanup = useServer({ schema }, ws);

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 8000;

  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.graphqlPath}`);
  });
})();
