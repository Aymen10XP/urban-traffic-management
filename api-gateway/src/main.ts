import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createGateway } from './gateway.config';

const gateway = createGateway();

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
