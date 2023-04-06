# README

- [README](#readme)
	- [Install Rust](#install-rust)
	- [Boostrap Tauri App](#boostrap-tauri-app)
	- [Add Scripts to Package.json](#add-scripts-to-packagejson)
	- [SvelteKit in SSG mode](#sveltekit-in-ssg-mode)
	- [Create the Rust Project](#create-the-rust-project)
	- [Test App](#test-app)
	- [Git Init](#git-init)
	- [Install Skeleton + Tailwind Css + Theme + Skeleton QuickStart](#install-skeleton--tailwind-css--theme--skeleton-quickstart)
		- [Tailwind CSS](#tailwind-css)
		- [Stylesheets](#stylesheets)
		- [Themes](#themes)
		- [Follow Skeleton Quickstart to add some Stuff to our App](#follow-skeleton-quickstart-to-add-some-stuff-to-our-app)
			- [add `AppShell` to `+layout.svelte`](#add-appshell-to-layoutsvelte)
			- [Add Sidebar Navigation](#add-sidebar-navigation)
			- [Layout Page Setup and Add a Component](#layout-page-setup-and-add-a-component)
			- [Add a Component to HomePage](#add-a-component-to-homepage)
	- [Add @tabler/icons-svelte and Add a Test Icon to HomePage](#add-tablericons-svelte-and-add-a-test-icon-to-homepage)
	- [Final HomePage +page.svelte](#final-homepage-pagesvelte)
	- [Tweak Skeleton Css](#tweak-skeleton-css)
	- [Add No Selection to Css](#add-no-selection-to-css)
	- [Add LightSwitch to Layout +layout.svelte](#add-lightswitch-to-layout-layoutsvelte)
	- [Add Sidebar Navigation Routes](#add-sidebar-navigation-routes)
	- [Commit Project](#commit-project)
	- [Start InMemory Minimal GraphQL Server with SSE](#start-inmemory-minimal-graphql-server-with-sse)
	- [Setup Houdini](#setup-houdini)
		- [Check Houdini Magic Dirs/Files](#check-houdini-magic-dirsfiles)
		- [Tweak Houdini Config](#tweak-houdini-config)
		- [Create Queries Page](#create-queries-page)
		- [Add Faker and Create Mutations Page](#add-faker-and-create-mutations-page)
		- [Create Subscriptions Page](#create-subscriptions-page)
		- [Play with App and Test Queries, Mutations and Subscriptions until This Point](#play-with-app-and-test-queries-mutations-and-subscriptions-until-this-point)
	- [Setup SuperForms and ZOD and Create some Forms for Create and Update Mutations](#setup-superforms-and-zod-and-create-some-forms-for-create-and-update-mutations)
		- [Create Book Form](#create-book-form)
			- [TODO: Create Book Server Page](#todo-create-book-server-page)
			- [TODO: Create Book Client Page](#todo-create-book-client-page)
			- [TODO: Create Book +page.ts](#todo-create-book-pagets)
		- [TODO: Update Book Form](#todo-update-book-form)

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
import adapter from '@sveltejs/adapter-static';
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

## Install Skeleton + Tailwind Css + Theme + Skeleton QuickStart

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

Then open your global stylesheet in `/src/app.css` and **remove** the following three `@tailwind` directives introduced by Svelte-Add. These will be redudant.

`src/app.css`


```css
- @tailwind base;
- @tailwind components;
- @tailwind utilities;
```

leave `src/app.css` empty for now, we will use in later to tweak skeleton and other stuff

Apply these following three changes to your `tailwind.config.cjs`, found in the root of your project.

```js
const config = {
	// apply the dark mode class setting:
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// append the path for the Skeleton NPM package and files:
		require('path').join(require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}')
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
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// this contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';
</script>

<slot />
```

### Themes

Select a theme, then copy the import statement into your root layout in `/src/routes/+layout.svelte`. Replace any existing theme.

we select `crimson`, ex `@skeletonlabs/skeleton/themes/theme-${THEME}.css`, where ${THEME} is the desired selected theme

```ts
import '@skeletonlabs/skeleton/themes/theme-crimson.css';
```

To enable bonus features (ex: fonts and backgrounds) for preset themes, apply the following attribute in `app.html`.

`app.html`

add `data-theme="crimson` into `app.html` `body`

```html
<body data-sveltekit-preload-data="hover" data-theme="crimson">
```

test skeleton and tailwind

```shell
$ pnpm dev
```

### Follow Skeleton Quickstart to add some Stuff to our App

- [Skeleton — UI Toolkit for Svelte + Tailwind](https://www.skeleton.dev/docs/quickstart)

#### add `AppShell` to `+layout.svelte`

`+layout.svelte`

```svelte
<script>
  // skeleton: Make sure each of these stylesheets are present and in the order shown.
	// your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// this contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/all.css';
	// finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-filled-primary"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-filled-secondary"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-filled-tertiary"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
```

#### Add Sidebar Navigation

Let's customize our App Shell's sidebar slot. Open `/src/routes/+layout.svelte` and add the following Tailwind utility classes to the `AppShell` `slotSidebarLeft` prop.

`AppShell`

change

```svelte
<AppShell>
```

to

```svelte
<AppShell slotSidebarLeft="bg-surface-500/5 w-56 p-4">
```

Next, let's implement a navigation list within the App Shell's left sidebar slot. Append this slot fragement alongside any other fragment within the `AppShell`.

```svelte
<svelte:fragment slot="sidebarLeft">
	<!-- Insert the list: -->
	<nav class="list-nav">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/queries">Queries</a></li>
			<li><a href="/mutations">Mutations</a></li>
			<li><a href="/subscriptions">Subscriptions</a></li>
		</ul>
	</nav>
	<!-- --- -->
</svelte:fragment>
```

> note: /queries, /mutations and /subscriptions routes will be configured in bellow sections

#### Layout Page Setup and Add a Component

Let's add some basic content to our homepage. Open `/src/routes/+page.svelte` and replace the contents with the following. This will **provide multiple elements automatically** styled by the `all.css` stylesheet in our root layout.

> `all.css` is imported from `@skeletonlabs/skeleton/styles/all.css`

`src/routes/+layout.svelte`

```svelte
<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
	import { IconHeart } from '@tabler/icons-svelte';
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1>Hello Skeleton</h1>
	<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae soluta maxime enim facilis id dolore nobis laborum asperiores qui tenetur deleniti vitae consectetur dignissimos quibusdam, at amet. Earum, vitae delectus!</p>
	<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, cumque consequatur. Debitis at maiores velit repellat! Odit aliquid alias voluptatum delectus? Voluptate inventore laudantium ab commodi alias quos ipsam adipisci.</p>
	<section>
		<a class="btn variant-filled-primary" href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">SvelteKit</a>
		<a class="btn variant-filled-secondary" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a>
		<a class="btn variant-filled-tertiary" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
	</section>
  <Avatar src="https://i.pravatar.cc/" />
  <IconHeart size={48} stroke={1} />
</div>
```

#### Add a Component to HomePage

Finally let's implement Skeleton's `Avatar` component. First, import the component, then add it anywhere within your page, we recommend within the `.container` element.

`src/routes/+page.svelte`

```svelte
<script lang="ts">
	...
  import { Avatar } from '@skeletonlabs/skeleton';
	...
</script>
		...
	</section>
  <Avatar src="https://i.pravatar.cc/" />
</div>
```

## Add @tabler/icons-svelte and Add a Test Icon to HomePage

add `@tabler/icons-svelte` dependency

```shell
$ pnpm add @tabler/icons-svelte
```

add `<IconHeart size={48} stroke={1} />` tabler icon to `+page.svelte`

`src/routes/+page.svelte`

```svelte
<script lang="ts">
	...
	import { IconHeart } from '@tabler/icons-svelte';
	...
</script>
	...
  <Avatar src="https://i.pravatar.cc/" />
  <IconHeart size={48} stroke={1} />
</div>
```

## Final HomePage +page.svelte

bellow is the full HomePage

`src/routes/+page.svelte`

```svelte
<script lang="ts">
  import { Avatar } from '@skeletonlabs/skeleton';
	import { IconHeart } from '@tabler/icons-svelte';
</script>

<div class="container mx-auto p-8 space-y-8">
	<h1>Hello Skeleton</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
	<section>
		<a class="btn variant-filled-primary" href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">SvelteKit</a>
		<a class="btn variant-filled-secondary" href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a>
		<a class="btn variant-filled-tertiary" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
	</section>
  <Avatar src="https://i.pravatar.cc/" />
  <IconHeart size={48} stroke={1} />
</div>
```

## Tweak Skeleton Css

currently skeleton buttons and cards, have big rounded corners, let's tweak it in our `app.css` to have small rounded corners, and to test **how skeleton styles override works**

`src/app.css`

```css
/* Write your global styles here, in PostCSS syntax */
:root {
	--theme-rounded-container: theme(borderRadius.md);
	--theme-rounded-base: theme(borderRadius.md);
}
```

## Add No Selection to Css

to prevent user select text in tauri apps, in my opinion this is not a good desktop UX

add to bottom of `app.css`

`src/app.css`

```css
body {
	/* iOS Safari */
	-webkit-touch-callout: none;
	/* Safari */
	-webkit-user-select: none;
	/* Konqueror HTML */
	-khtml-user-select: none;
	/* Firefox */
	-moz-user-select: none;
	/* Internet Explorer/Edge */
	-ms-user-select: none;
	/* Non-prefixed version, currently supported by Chrome and Opera */
	user-select: none;
}
```

## Add LightSwitch to Layout +layout.svelte

- [Skeleton — UI Toolkit for Svelte + Tailwind](https://www.skeleton.dev/utilities/lightswitches)

add `LightSwitch` component to toggle from light to dark theme

`src/routes/+layout.svelte`

add `LightSwitch, autoModeWatcher` to existing skeleton imports

then add the following in your root layout template markup.

```html
<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
```

```svelte
<script>
	...
	// skeleton imports
	import { AppShell, AppBar, LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton';
	...
</script>

<svelte:head>{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head>
					...	
					GitHub
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
		...
```

awesome, now we have one `<Avatar />`, one `<IconHeart />` and one <LightSwitch /> test components, to assert that everything is working

> Note: currently lightswitch don't work has expected, in my linux system, with OS define in dark, the lightswitch start in dark, but theme shows in light. If we toggle, it works as expected, only the initial start mode is not the correct, it should start in dark and not in light, the problem is in `src/routes/+layout.ts` in line `export const ssr = false;`, if we comment that line it start work has expected, but tauri recommend that we [disable SSR](https://tauri.app/v1/guides/getting-started/setup/sveltekit/#sveltekit-in-ssg-mode)

> try to figure it out asap, if anyone know how to fix it, please tell me, really appreciate it

to temporary fix the problem we force the dark mode ate start adding `setModeCurrent` to imports and use `setModeCurrent(false);`

```svelte
<script>
	...
	// skeleton imports
	import { AppShell, AppBar, LightSwitch, autoModeWatcher, setModeCurrent } from '@skeletonlabs/skeleton';

	// force darkMode, until we find how to use autoModeWatcher with SSR disabled
	setModeCurrent(false);
	...
</script>
```

## Add Sidebar Navigation Routes

create bellow pages to be used with houdini demo

`src/routes/queries/+page.svelte`

```svelte
<script lang="ts">
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
    <h1>Queries</h1>
		<p>page stub</p>
	</section>
</div>
```

`src/routes/mutations/+page.svelte`

```svelte
<script lang="ts">
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
    <h1>Mutations</h1>
		<p>page stub</p>
	</section>
</div>
```

`src/routes/subscriptions/+page.svelte`

<script lang="ts">
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
    <h1>Subscriptions</h1>
		<p>page stub</p>
	</section>
</div>

## Commit Project

```shell
$ git add .
$ git commit -am "before add graphql server"
```

## Start InMemory Minimal GraphQL Server with SSE

run in one window, and leave it open, houdini require it running to do it's magic

```shell
$ cd graphql-sse/ && pnpm dev
```

check running graphql server url at `http://localhost:5001/graphql`

## Setup Houdini

- [Houdini - Setting Up Your Project](https://www.houdinigraphql.com/guides/setting-up-your-project)

```shell
$ pnpm dlx houdini@latest init

✔ Will you use a remote GraphQL API? … yes
✔ What's the URL for your api? … http://localhost:5001/graphql

🔎 Here's what we found:
✨ SvelteKit
📦 ES Modules
🟦 TypeScript

🚧 Generating project files...

🎩 Welcome to Houdini!

👉 Next Steps
1️⃣  Finalize your installation: pnpm i
2️⃣  Start your application:     pnpm dev

# finalize your installation
$ pnpm i

devDependencies:
+ houdini 1.0.7
+ houdini-svelte 1.0.7

# start your application:
$ pnpm dev

  VITE v4.1.4  ready in 2400 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
1:27:25 AM [vite-plugin-svelte] ssr compile done.
package                                 files     time     avg
sveltekithoudinitypescripttauriexample      1   71.7ms  71.7ms
```

### Check Houdini Magic Dirs/Files

inspect bellow created and updated files

- `src/client.ts`
- `$houdini`
- `.graphqlrc.yaml`
- `houdini.config.js`
- `schema.graphql`
- `svelte.config.js`
- `tsconfig.json`
- `vite.config.js`

```shell
$ tree '$houdini' -L 2

$houdini
├── artifacts
│   └── index.js
├── graphql
│   ├── documents.gql
│   ├── enums.d.ts
│   ├── enums.js
│   ├── index.d.ts
│   ├── index.js
│   └── schema.graphql
├── index.d.ts
├── index.js
├── plugins
│   ├── houdini-svelte
│   ├── index.d.ts
│   └── index.js
├── runtime
│   ├── cache
│   ├── client
│   ├── generated.d.ts
│   ├── generated.js
│   ├── imports
│   ├── index.d.ts
│   ├── index.js
│   ├── lib
│   ├── package.json
│   └── public
└── types
    └── src
```

above `pnpm dlx houdini@latest init` command, makes some **black magic** on our app, creates client, houdini config, types and many other good things

### Tweak Houdini Config

we opted to don't use cache, for this we add `defaultCachePolicy: 'NetworkOnly'` in config, to define `defaultCachePolicy` globally to whole project

```js
/// <references types="houdini-svelte">

/// docs https://houdinigraphql.com/api/config

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'http://localhost:5001/graphql'
	},
	plugins: {
		'houdini-svelte': {}
	},
	defaultCachePolicy: 'NetworkOnly',
};

export default config;
```

### Create Queries Page

to see how houdini simplify our lifes, let's populate our recent created pages, but first create `BookCard` component needed by queries page

`src/components/BookCard.svelte`

```svelte
<script lang='ts'>
	import type { Book } from "$lib/types";

  export let book: Book;
</script>

<div class="card">
	<header class="card-header">{book.title}</header>
	<section class="p-4">
    <p>{book.description}</p>
    <p>author: {book.author}</p>
  </section>
	<footer class="card-footer">(footer)</footer>
</div>
```

now replace our queries

`src/routes/queries/+page.svelte`

```svelte
<script lang="ts">
	import type { PageData } from './$houdini';
	import { cache, graphql } from '$houdini';
	import { BookCard } from '../../components';

	export let data: PageData;

	$: ({ Books } = data);
	$: console.log(JSON.stringify($Books.data, undefined, 2));
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1 class="mb-5">Queries</h1>
	</section>
	<main>
		<div class="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
			{#if $Books?.data?.books}
				{#each $Books.data.books as book}
					{#if book}
						<BookCard {book} />
					{/if}
				{/each}
			{/if}
		</div>
	</main>
</div>
```

add graphql query

`src/routes/queries/+page.gql`

```gql
query Books {
	books {
		id
		title
		author
		image
		description
		price
	}
}
```

with that minimal changes, we have a **server side rendering page** with a houdini query working, without need to create a `+page.server.ts`, it simply works

run app and check results in `http://localhost:5173/queries` page, we should see the query result with tow cards

### Add Faker and Create Mutations Page

add `faker` dependency

```shell
$ pnpm add @faker-js/faker
```

now create mutation `+page.svelte` with some minimal CRUD GraphQL operations to test **Create, Update and Delete Book's**

`src/routes/mutations/+page.svelte`

```svelte
<script lang="ts">
	import { graphql } from '$houdini';
	import { faker } from '@faker-js/faker';

	const createBook = graphql(`
		mutation CreateBook($input: BookInput!) {
			createBook(input: $input) {
				id
				title
				author
				image
				description
				price
			}
		}
	`);

	const updateBook = graphql(`
		mutation UpdateBook($id: ID!, $input: BookInput!) {
			updateBook(id: $id, input: $input) {
				id
				title
				author
				image
				description
				price
			}
		}
	`);

	const deleteBook = graphql(`
		mutation DeleteBook($id: ID!) {
			deleteBook(id: $id) {
				id
				title
				author
				image
				description
				price
			}
		}
	`);
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1>Mutations</h1>
	</section>
	<main>
		<button
			class="btn btn-sm variant-filled-tertiary"
			on:click={() =>
				createBook.mutate({
					input: {
						title: faker.word.adjective(2),
						author: faker.word.adjective(2),
						image: faker.image.abstract(640, 360, true),
						description: faker.lorem.sentence(5),
						price: parseInt(faker.random.numeric(42))
					}
				})}>Create Book</button
		>
		<button
			class="btn btn-sm variant-filled-tertiary"
			on:click={() =>
				updateBook.mutate({
					id: '3',
					input: {
						title: faker.word.adjective(2),
						author: faker.word.adjective(2),
						image: faker.image.abstract(640, 360, true),
						description: faker.lorem.sentence(5),
						price: parseInt(faker.random.numeric(42))
					}
				})}>Update Book</button
		>
		<button
			class="btn btn-sm variant-filled-primary"
			on:click={() =>
				deleteBook.mutate({
					id: '3'
				})}>Delete Book</button
		>
	</main>
</div>
```

### Create Subscriptions Page

change `src/client.ts` to

```ts
import { HoudiniClient, subscription } from '$houdini';

function sseSockets() {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe(payload: any, handlers: any) {
      const url = new URL('/graphql', 'http://localhost:5001');
      url.searchParams.append('query', payload.query);
      url.searchParams.append('variables', JSON.stringify(payload.variables));

      const eventSource = new EventSource(url);
			console.log(`connect to ${url}`);

      eventSource.addEventListener('message', (ev) => handlers.next(JSON.parse(ev.data)));

      return () => eventSource.close();
    },
  }
}

export default new HoudiniClient({
  url: "http://localhost:5001/graphql",
  plugins: [
    subscription(sseSockets),
  ]
})
```

create subscriptions page `+page.svelte`

`src/routes/subscriptions/+page.svelte`

```svelte
<script lang="ts">
	import { graphql } from '$houdini';

	// will start listening onMount (browser only)
	const updates = graphql(`
		subscription NewBooks {
			newBooks {
				title
				author
			}
		}
	`);

	$: updates.listen();
	$: console.log(`$updates.data: [${JSON.stringify($updates.data)}]`);
</script>

<div class="container mx-auto p-8 space-y-8">
	<section>
		<h1>Subscriptions</h1>
	</section>
	<main>
		<ul class="li">Last created book</ul>
		<ul class="li">title: {$updates?.data?.newBooks.title || 'none'}</ul>
		<ul class="li">author: {$updates?.data?.newBooks.author || 'none'}</ul>
	</main>
</div>
```

### Play with App and Test Queries, Mutations and Subscriptions until This Point

run app and server if not already running

```shell
# run server in terminal window 1
$ cd graphql-sse/ && pnpm dev
# run app in terminal window 2
$ pnpm dev
```

open two browser windows one with <http://localhost:5173/subscriptions> page and the other with <http://localhost:5173/mutations> to test subscriptions, when click **Create Book** you should see subscrptions page update with the new created book

## Setup SuperForms and ZOD and Create some Forms for Create and Update Mutations

install `sveltekit-superforms` dependency

```shell
$ pnpm add sveltekit-superforms zod
```

### Create Book Form

add link to NavBar

`src/routes/+layout.svelte`

```svelte
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				...
				<li><a href="/create-book">Create Book</a></li>
			</ul>
		</nav>
```

#### TODO: Create Book Server Page

`src/routes/create-book/+page.server.ts`

#### TODO: Create Book Client Page

`src/routes/create-book/+page.svelte`

#### TODO: Create Book +page.ts

`src/routes/create-book/+page.ts`

```ts
// prevent Error: Cannot prerender pages with actions
export const prerender = false;
```

see:

- [Why actions in SveltKit give &quot;Error: Cannot prerender pages with actions&quot;?](https://stackoverflow.com/questions/75044874/why-actions-in-sveltkit-give-error-cannot-prerender-pages-with-actions)
- [SvelteKit docs](https://kit.svelte.dev/docs/page-options#prerender-when-not-to-prerender)

### TODO: Update Book Form
