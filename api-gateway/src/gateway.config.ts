import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

export interface SubgraphConfig {
  name: string;
  url: string;
}

export function getSubgraphs(env: NodeJS.ProcessEnv = process.env): SubgraphConfig[] {
  return [
    { name: 'auth', url: env.AUTH_SERVICE_URL || 'http://localhost:3001/graphql' },
    { name: 'vehicle', url: env.VEHICLE_SERVICE_URL || 'http://localhost:3002/graphql' },
    { name: 'traffic', url: env.TRAFFIC_SERVICE_URL || 'http://localhost:3003/graphql' },
    { name: 'incident', url: env.INCIDENT_SERVICE_URL || 'http://localhost:3004/graphql' },
    { name: 'notification', url: env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005/graphql' },
  ];
}

export function createGateway() {
  return new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: getSubgraphs(),
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
}
