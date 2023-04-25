import { useGraphQLSSE } from "@graphql-yoga/plugin-graphql-sse";
import * as dotenv from "dotenv";
import { createPubSub, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "http";
import { Socket } from "net";
import * as fs from "fs";
import * as sharp from "sharp";

dotenv.config();

const pubSub = createPubSub<{
	// make the event emitter type-safe
	countdown: [countdown: number];
	randomNumber: [randomNumber: number];
	newBooks: [newBooks: Book];
	updatedBooks: [updatedBooks: Book];
	deletedBooks: [deletedBooks: Book];
}>();

let currentId = 1;
const BOOK_IMAGE = "https://loremflickr.com/640/360";

interface Book {
	id: number;
	title: string;
	author: string;
	image: string;
	description: string;
	price: number;
}

type BookInput = Omit<Book, "id">;

// moke data
let books: Array<Book> = [
	{
		id: currentId++,
		title: "Some non sense Title",
		author: "Mário Monteiro",
		image: BOOK_IMAGE,
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin sapien sed...",
		price: 14.28,
	},
	{
		id: currentId++,
		title: "Lost imagination",
		author: "Alexandre Monteiro",
		image: BOOK_IMAGE,
		description:
			"Curabitur vel lobortis nunc, at accumsan diam. Nullam in nulla tristique, tincidunt eros pellentesque...",
		price: 28.14,
	},
];

const createBook = ({ input }) => {
	const book = { id: currentId++, ...input };
	books.push(book);
	return book;
};

const updateBook = ({ id, input }) => {
	const idx = books.findIndex((e) => Number(e.id) === Number(id));
	if (idx === -1) {
		throw new Error("book not found");
	}
	books[idx] = { id, ...input };
	return books[idx];
};

const deleteBook = ({ id }) => {
	const idx = books.findIndex((e) => Number(e.id) === Number(id));
	if (idx === -1) {
		throw new Error("book not found");
	}
	const deleted = books[idx];
	books = books.filter((e) => Number(e.id) !== Number(id));
	return deleted;
};

// typeDefs
const typeDefs = /* GraphQL */ `
  # scalars
  scalar File
  
  # types
  type Book {
    id: ID!
    title: String!
    author: String!
    image: String!
    description: String!
    price: Float!
  }
  # queries
  type Query {
    books: [Book!]!
  }
  # mutations
  type Mutation {
    broadcastRandomNumber: Float!
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Book!
    readTextFile(file: File!): String!
  }
  # subscriptions
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
			pubSub.publish("randomNumber", randomNumber);
			return randomNumber;
		},
		createBook: (parent: unknown, args: { input: BookInput }) => {
			const created = createBook(args);
			pubSub.publish("newBooks", created);
			return created;
		},
		updateBook: (parent: unknown, args: { id: number; input: BookInput }) => {
			const updated = updateBook(args);
			pubSub.publish("updatedBooks", updated);
			return updated;
		},
		deleteBook: (parent: unknown, args: { id: number }) => {
			const deleted = deleteBook(args);
			pubSub.publish("deletedBooks", deleted);
			return deleted;
		},
		readTextFile: async (parent: unknown, { file }: { file: File }, ctx) => {
			// const textContent = await file.text();
			// return textContent;

			const filePath = `/tmp/${file.name}`;

			console.log(
				`file: [${JSON.stringify(
					{ ...file, blobParts: undefined },
					undefined,
					2,
				)}]`,
			);

			// try #1: any file with async
			const _file = Buffer.from(await file.arrayBuffer());
			const { stream, mimetype } = await file;
			
				console.log(`stream: [${JSON.stringify(stream, undefined, 2)}]`);
				console.log(`mimetype: [${mimetype}]`);
			// Now use stream to either write file at local disk or CDN
			if (_file) {
				try {
					// fs.writeFileSync(filePath, _file)
					await fs.promises.writeFile(filePath, _file);
				} catch (error) {
					console.error(error);
				}
			}

			// try #1: any file without async
			// https://stackoverflow.com/questions/74797614/upload-file-with-apollo-upload-client-and-graphql-yoga-3-x
			// const _file = Buffer.from(await file.arrayBuffer());
			// if (_file) {
			//   try {
			//     fs.writeFileSync(filePath, _file)
			//   }
			//   catch (error) {
			//     console.error(error)
			//   }
			// }

			// # try #2 : using sharp image process
			// https://stackoverflow.com/questions/74797614/upload-file-with-apollo-upload-client-and-graphql-yoga-3-x
			// const _file = Buffer.from(await file.arrayBuffer());
			// if (_file) {
			// 	const image = sharp(_file);
			// 	const metadata = await image.metadata();
			// 	console.log(metadata, "metadata");
			// 	try {
			// 		const image = await sharp(_file).resize(600, 600) //.webp().toBuffer();
			//       .jpeg({ mozjpeg: true });
			// 		fs.writeFileSync(filePath, image);
			// 		console.log(image, "image");
			// 	} catch (error) {
			// 		console.error(error);
			// 	}
			// };

			// # try #1
			// https://gist.github.com/bberak/4ab2abee49e5f3e7be3143415e52bae5
			// const kb = 32 * 1024;
			// const buf = Buffer.alloc(kb);
			// const ws = fs.createWriteStream(filePath);
			// buf.fill(0xea);
			// ws.write(buf);
			// ws.end();

			return `write to file 'file.name' to '${filePath}'`;
		},
	},
	Subscription: {
		countdown: {
			// This will return the value on every 1 sec until it reaches 0
			subscribe: async function* (_, { from }) {
				for (let i = from; i >= 0; i--) {
					await new Promise((resolve) => setTimeout(resolve, 1000));
					yield { countdown: i };
				}
			},
		},
		randomNumber: {
			// subscribe to the randomNumber event
			subscribe: () => pubSub.subscribe("randomNumber"),
			resolve: (payload) => payload,
		},
		newBooks: {
			// subscribe to the newBooks event
			subscribe: () => pubSub.subscribe("newBooks"),
			resolve: (payload) => payload,
		},
		updatedBooks: {
			// subscribe to the updatedBooks event
			subscribe: () => pubSub.subscribe("updatedBooks"),
			resolve: (payload) => payload,
		},
	},
};

// const context = async ({req}) => {
//   // console.log(req.headers);
// };

export function buildApp() {
	const yoga = createYoga({
		// Remove "context" entirely from "createServer".
		// Whenever you need authorization headers use this: ctx.request.headers.get('your-header-name-from-the-frontend').
		// https://github.com/dotansimha/graphql-yoga/issues/163#issuecomment-1412402804
		// context,
		schema: createSchema({ typeDefs, resolvers }),
		graphiql: {
			// Use graphql-sse in GraphiQL.
			subscriptionsProtocol: "GRAPHQL_SSE",
		},
		plugins: [useGraphQLSSE()],
	});

	const server = createServer(yoga);

	// for termination
	const sockets = new Set<Socket>();
	server.on("connection", (socket) => {
		sockets.add(socket);
		server.once("close", () => sockets.delete(socket));
	});

	return {
		start: (port: number) =>
			new Promise<void>((resolve, reject) => {
				server.on("error", (err) => reject(err));
				server.on("listening", () => resolve());
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
	};
}
