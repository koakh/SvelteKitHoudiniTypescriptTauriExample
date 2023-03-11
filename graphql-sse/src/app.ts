import { Socket } from 'net'
import { createServer } from 'http'
import { createYoga, createSchema, createPubSub } from 'graphql-yoga'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'

// Quick Start with simple Server-Sent Events (SSE)
// https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#quick-start-with-simple-server-sent-events-sse
// PubSub
// https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#pubsub

const pubSub = createPubSub();

const books = [{
  title: 'Some non sense Title',
  author: 'Mário Monteiro'
}, {
  title: 'Lost imagination',
  author: 'Alexandre Monteiro'
}];

const createBook = (value) => {
  console.log(value);
  books.push(value);
  return value;
}

// typeDefs
const typeDefs = /* GraphQL */ `
  type Book {
    title: String!
    author: String!
  }
  type Query {
    books: [Book!]!
  }
  type Mutation {
    createBook(title: String!, author: String!): Book!
    broadcastRandomNumber: Float!
  }
  type Subscription {
    countdown(from: Int!): Int!
    randomNumber: Float!
    newBooks: Book!
  }
`;

// resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook: (parent: unknown, args: { title: string; author: string }) => {
      const newBooks = createBook(args);
      pubSub.publish('newBooks', newBooks);
      return newBooks;
    },
    broadcastRandomNumber: () => {
      // publish a random number
      const randomNumber = Math.random().toFixed(4);
      pubSub.publish('randomNumber', randomNumber);
      return randomNumber;
    }
  },
  Subscription: {
    countdown: {
      // This will return the value on every 1 sec until it reaches 0
      subscribe: async function* (_, { from }) {
        for (let i = from; i >= 0; i--) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          yield { countdown: i }
        }
      }
    },
    randomNumber: {
      // subscribe to the randomNumber event
      subscribe: () => pubSub.subscribe('randomNumber'),
      resolve: (payload) => payload,
    },
    newBooks: {
      // subscribe to the newBooks event
      subscribe: () => pubSub.subscribe('newBooks'),
      resolve: (payload) => payload,
    }
  }
};

const context = {};

export function buildApp() {
  const yoga = createYoga({
    // graphiql: true,
    context,
    schema: createSchema({ typeDefs, resolvers, }),
    plugins: [useGraphQLSSE()],
  })

  const server = createServer(yoga)

  // for termination
  const sockets = new Set<Socket>()
  server.on('connection', (socket) => {
    sockets.add(socket);
    server.once('close', () => sockets.delete(socket));
  })

  return {
    start: (port: number) =>
      new Promise<void>((resolve, reject) => {
        server.on('error', (err) => reject(err));
        server.on('listening', () => resolve());
        server.listen(port);
      }),
    stop: () =>
      new Promise<void>((resolve) => {
        for (const socket of sockets) {
          socket.destroy();
          sockets.delete(socket);
        }
        server.close(() => resolve());
      }),
  }
}
