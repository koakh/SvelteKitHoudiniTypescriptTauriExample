const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, execute, subscribe } = require('graphql');
// Pull in some specific Apollo packages:
const { PubSub } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');
// cors
const cors = require('cors')

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(`#graphql
	type Book {
		title: String!
		author: String!
	}

	type Query {
		books: [Book]
	}

	# new: subscribe to all the latest books!
	type Subscription {
		newBooks: Book!
	}
`);

const pubsub = new PubSub();
const rootValue = {
	books: [
		{
			title: "Some non sense Title",
			author: "Mário Monteiro",
		},
		{
			title: "Lost imagination",
			author: "Alexandre Monteiro",
		}
	],
	newBooks: () => pubsub.asyncIterator("BOOKS_TOPIC")
};

// enable cors
app.use(cors())

// handle incoming HTTP requests as before:
app.use(graphqlHTTP({
	schema,
	rootValue
}));

// start the server:
const server = app.listen(8080, () => console.log("Server started on port 8080"));

// handle incoming websocket subscriptions too:
SubscriptionServer.create({ schema, rootValue, execute, subscribe }, {
	// Listens for 'upgrade' websocket events on the raw server
	server
});

// ...some time later, push updates to subscribers:
pubsub.publish("BOOKS_TOPIC", {
	title: 'The Doors of Stone',
	author: 'Patrick Rothfuss',
});
