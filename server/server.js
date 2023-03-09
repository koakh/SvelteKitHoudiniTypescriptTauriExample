import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema, execute, subscribe } from 'graphql';
// pull in some specific Apollo packages:
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
// cors
import cors from 'cors';

// resolvers
const books = [{
	title: 'Some non sense Title',
	author: 'Mário Monteiro'
}, {
	title: 'Lost imagination',
	author: 'Alexandre Monteiro'
}];
const createBook = (value) => {
	books.push(value);
	return value;
}

// create a server:
const app = express();

// create a schema and a root resolver:
const schema = buildSchema(`#graphql
	type Book {
		title: String!
		author: String!
	}
	type Query {
		books: [Book!]!
	}
  type Mutation {
    createBook(title: String!, author: String!): Book!
  }
	# new: subscribe to all the latest books!
	type Subscription {
		newBooks: Book!
	}
`);

const pubsub = new PubSub();

const rootValue = {
	books,
	createBook,
	newBooks: () => pubsub.asyncIterator('BOOKS_TOPIC')
};

// enable cors
app.use(cors());

// handle incoming HTTP requests as before:
app.use(
	graphqlHTTP({
		schema,
		rootValue,
	})
);

// start the server:
const server = app.listen(8080, () => console.log('server started on port 8080'));

// handle incoming websocket subscriptions too:
SubscriptionServer.create(
	{ schema, rootValue, execute, subscribe },
	{
		// Listens for 'upgrade' websocket events on the raw server
		server
	}
);

// 5sec time later, push updates to subscribers:
setInterval(() => {
	pubsub.publish('BOOKS_TOPIC', {
		title: 'Dreamers Flight',
		author: 'Jorge Monteiro'
	});
}, 5000);
