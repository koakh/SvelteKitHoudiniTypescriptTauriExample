# README

## Install Rust

- [rustup.rs - The Rust toolchain installer](https://rustup.rs/)

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Boostrap Tauri App

- [SvelteKit | Tauri Apps](https://tauri.app/v1/guides/getting-started/setup/sveltekit/)

```shell
$ pnpm create svelte@latest

┌  Welcome to SvelteKit!
│
◇  Where should we create your project?
│    (hit Enter to use current directory)
│
◇  Directory not empty. Continue?
│  Yes
│
◇  Which Svelte app template?
│  Skeleton project
│
◇  Add type checking with TypeScript?
│  Yes, using TypeScript syntax
│
◇  Select additional options
│  Add ESLint for code linting, Add Prettier for code formatting
│
└  Your project is ready!

✔ Typescript
  Inside Svelte components, use <script lang="ts">

✔ ESLint
  https://github.com/sveltejs/eslint-plugin-svelte3

✔ Prettier
  https://prettier.io/docs/en/options.html
  https://github.com/sveltejs/prettier-plugin-svelte#options

Install community-maintained integrations:
  https://github.com/svelte-add/svelte-add

Next steps:
  1: npm install (or pnpm install, etc)
  2: git init && git add -A && git commit -m "Initial commit" (optional)
  3: npm run dev -- --open

To close the dev server, hit Ctrl-C

Stuck? Visit us at https://svelte.dev/chat
```

## Add Scripts to Package.json

```json
{
	"scripts": {
    "tauri": "cargo tauri dev"
  }
}
```

## SvelteKit in SSG mode

```shell
$ pnpm add -D @sveltejs/adapter-static@next
```

Then update the adapter import in the `svelte.config.js` file:

change

```js
import adapter from '@sveltejs/adapter-auto';
```

with

```js
// This was changed from adapter-auto
import adapter from '@sveltejs/adapter-static'
```

Lastly, we need to **disable SSR and enable prerendering** by adding a root `+layout.ts` file (or `+layout.js` if you are not using TypeScript) with these contents:

`src/routes/+layout.ts`

```ts
export const prerender = true;
export const ssr = false;
```

## Create the Rust Project

```shell
$ cargo install tauri-cli
```

To scaffold a minimal Rust project that is pre-configured to use Tauri, open a terminal and run the following command:

`cargo tauri init` will walk you through a series of questions:

What is your app name?
This will be the name of your final bundle and what the OS will call your app. You can use any name you want here.

What should the window title be?
This will be the title of the default main window. You can use any title you want here.

Where are your web assets (HTML/CSS/JS) located relative to the `<current dir>/src-tauri/tauri.conf.json` file that will be created?
This is the path that Tauri will load your frontend assets from when building for production.
Use `../build` for this value.

What is the URL of your dev server?
This can be either a URL or a file path that Tauri will load during development.
Use <http://localhost:5173> for this value.

What is your frontend dev command?
This is the command used to start your frontend dev server.
Use `pnpm dev` (be sure to adapt to use your package manager of choice).

What is your frontend build command?
This is the command to build your frontend files.
Use `pnpm build` (be sure to adapt to use your package manager of choice).

```shell
$ cargo tauri init

❯ cargo tauri init
✔ What is your app name? · svelte-kit-houdini-typescript-tauri-example
✔ What should the window title be? · sveltekit-houdini-typescript-tauri-example
✔ Where are your web assets (HTML/CSS/JS) located, relative to the "<current dir>/src-tauri/tauri.conf.json" file that will be created? · ../build
✔ What is the url of your dev server? · http://localhost:5173
✔ What is your frontend dev command? · pnpm dev
✔ What is your frontend build command? · pnpm build
```

## Test App

```shell
$ cargo tauri dev
# or
$ pnpm tauri dev
```

## Git Init

```shell
$ git init
$ git add .
$ git commit -am "first commit"
```

## Install Skeleton + Tailwind Css

- [Install Tailwind CSS with SvelteKit - Tailwind CSS](https://tailwindcss.com/docs/guides/sveltekit)
- [Skeleton — UI Toolkit for Svelte + Tailwind](https://www.skeleton.dev/docs/get-started)

### Tailwind CSS

```shell
$ pnpm add -D @skeletonlabs/skeleton 
$ pnpm dlx svelte-add@latest tailwindcss

PostCSS
 ✅ successfully set up!
Create or find an existing issue at https://github.com/svelte-add/svelte-add/issues if this is wrong.

Tailwind CSS
 ✅ successfully set up!
Create or find an existing issue at https://github.com/svelte-add/svelte-add/issues if this is wrong.

$ pnpm i

devDependencies:
+ autoprefixer 10.4.13
+ postcss 8.4.21
+ postcss-load-config 4.0.1
+ svelte-preprocess 4.10.7 (5.0.1 is available)
+ tailwindcss 3.2.7
```

Then open your global stylesheet in `/src/app.postcss` and remove the following three `@tailwind` directives introduced by Svelte-Add. These will be redudant.

`src/app.postcss`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Apply these following three changes to your `tailwind.config.cjs`, found in the root of your project.

```js
const config = {
	// apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// append the path for the Skeleton NPM package and files:
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
	],
	theme: {
		extend: {}
	},
	plugins: [
		// append the Skeleton plugin to the end of this list
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
};

module.exports = config;
```

### Stylesheets

Ensure the following stylesheets are added to your root layout in `src/routes/+layout.svelte`

Make sure each of these stylesheets are present and in the order shown.

```ts
<script>
  // skeleton: Make sure each of these stylesheets are present and in the order shown.
	// your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// this contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
</script>

<slot />
```

### Themes

Select a theme, then copy the import statement into your root layout in `/src/routes/+layout.svelte`. Replace any existing theme.

```ts
import '@skeletonlabs/skeleton/themes/theme-rocket.css';
```

To enable bonus features (ex: fonts and backgrounds) for preset themes, apply the following attribute in `app.html`.

`app.html`

```html
<body data-theme="rocket">
```

final

```html
<body data-sveltekit-preload-data="hover" data-theme="rocket">
```

test skeleton and tailwind

```shell
$ pnpm tauri
```

## Commit Project

```shell
$ git add .
```

## Add Simple GraphQL Server

```shell
$ mkdir server
```

create `server/package.json`

```json
{
	"dependencies": {
		"cors": "^2.8.5",
		"express": "^4.18.2",
		"express-graphql": "^0.12.0",
		"graphql": "^16.6.0",
		"graphql-subscriptions": "^2.0.0",
		"subscriptions-transport-ws": "^0.11.0"
	}
}
```

### Install dependencies

```shell
$ cd server && pnpm i && cd ..
```

create `server/server.js`

```js
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
```

### Add Scripts to Package.json

```json
{
	"scripts": {
    "server": "cd server && node server.js"
  }
}
```

### Run Server

in a new terminal run:

```shell
$ pnpm server
Server started on port 8080
```

> leave server running, houdini require a running server to create runtime ate boot app, and to work with hot reload and graphql changes

## Setup Houdini

- [Houdini - Setting Up Your Project](https://www.houdinigraphql.com/guides/setting-up-your-project)

```shell
$ pnpm dlx houdini@latest init
```

### Gener
