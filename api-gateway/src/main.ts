import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'auth', url: process.env.AUTH_SERVICE_URL || 'http://localhost:3001/graphql' },
      { name: 'vehicle', url: process.env.VEHICLE_SERVICE_URL || 'http://localhost:3002/graphql' },
      { name: 'traffic', url: process.env.TRAFFIC_SERVICE_URL || 'http://localhost:3003/graphql' },
      { name: 'incident', url: process.env.INCIDENT_SERVICE_URL || 'http://localhost:3004/graphql' },
      { name: 'notification', url: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005/graphql' },
    ],
  }),
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        if (context.authorization) {
          request.http?.headers.set('authorization', context.authorization);
        }
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(process.env.PORT) || 4000, host: '0.0.0.0' },
    context: async ({ req }) => ({
      authorization: req.headers.authorization,
    }),
  });

  console.log(`API Gateway ready at ${url}`);
}

startServer();
