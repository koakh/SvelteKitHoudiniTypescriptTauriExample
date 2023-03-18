import { Socket } from 'net'
import { createServer } from 'http'
import { createYoga, createSchema, createPubSub } from 'graphql-yoga'
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse'

import * as dotenv from 'dotenv';

dotenv.config();

const pubSub = createPubSub<{
  // make the event emitter type-safe
  countdown: [countdown: number],
  randomNumber: [randomNumber: number],
  newBooks: [newBooks: Book],
  updatedBooks: [updatedBooks: Book],
  deletedBooks: [deletedBooks: Book]
}>();

let currentId = 1;
const BOOK_IMAGE = 'https://loremflickr.com/640/360';

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  price: number;
}

type BookInput = Omit<Book, 'id'>;

// moke data
let books: Array<Book> = [{
  id: currentId++,
  title: 'Some non sense Title',
  author: 'Mário Monteiro',
  image: BOOK_IMAGE,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin sapien sed...',
  price: 14.28,
}, {
  id: currentId++,
  title: 'Lost imagination',
  author: 'Alexandre Monteiro',
  image: BOOK_IMAGE,
  description: 'Curabitur vel lobortis nunc, at accumsan diam. Nullam in nulla tristique, tincidunt eros pellentesque...',
  price: 28.14,
}];

const createBook = ({ input }) => {
  const book = { id: currentId++, ...input };
  books.push(book);
  return book;
};

const updateBook = ({ id, input }) => {
  const idx = books.findIndex(e => Number(e.id) === Number(id));
  if (idx === -1) {
    throw new Error('book not found');
  };
  books[idx] = { id, ...input };
  return books[idx];
};

const deleteBook = ({ id }) => {
  const idx = books.findIndex(e => Number(e.id) === Number(id));
  if (idx === -1) {
    throw new Error('book not found');
  };
  const deleted = books[idx];
  books = books.filter(e => e.id !== parseInt(id));
  return deleted;
};

// typeDefs
const typeDefs = /* GraphQL */ `
  type Book {
    id: ID!
    title: String!
    author: String!
    image: String!
    description: String!
    price: Float!
  }
  type Query {
    books: [Book!]!
  }
  type Mutation {
    broadcastRandomNumber: Float!
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Book!
  }
  type Subscription {
    countdown(from: Int!): Int!
    randomNumber: Float!
    newBooks: Book!
    updatedBooks: Book!
    deletedBooks: Book!
  }

  # input types
  input BookInput {
    title: String!
    author: String!
    image: String!
    description: String!
    price: Float!
  }
`;

// resolvers
const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    broadcastRandomNumber: () => {
      // publish a random number
      const randomNumber = parseInt(Math.random().toFixed(4));
      pubSub.publish('randomNumber', randomNumber);
      return randomNumber;
    },
    createBook: (parent: unknown, args: { input: BookInput }) => {
      const created = createBook(args);
      pubSub.publish('newBooks', created);
      return created;
    },
    updateBook: (parent: unknown, args: { id: number, input: BookInput }) => {
      const updated = updateBook(args);
      pubSub.publish('updatedBooks', updated);
      return updated;
    },
    deleteBook: (parent: unknown, args: { id: number }) => {
      const deleted = deleteBook(args);
      pubSub.publish('deletedBooks', deleted);
      return deleted;
    },
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
    },
    updatedBooks: {
      // subscribe to the updatedBooks event
      subscribe: () => pubSub.subscribe('updatedBooks'),
      resolve: (payload) => payload,
    }
  }
};

const context = {};

export function buildApp() {
  const yoga = createYoga({
    context,
    schema: createSchema({ typeDefs, resolvers, }),
    graphiql: {
      // Use graphql-sse in GraphiQL.
      subscriptionsProtocol: 'GRAPHQL_SSE'
    },
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