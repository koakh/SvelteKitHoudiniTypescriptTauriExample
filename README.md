# README

## Git Init

```shell
$ git init
$ git add .
$ git -am "first commit"
```

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
✔ What should the window title be? · SvelteKitHoudiniTypescriptTauriExample
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

## Install Skeleton + Tailwind Css

```
$ pnpm add -D @skeletonlabs/skeleton 
$ npx svelte-add@latest tailwindcss
$ pnpm i

```


## Setup Houdini

- [Houdini - Setting Up Your Project](https://www.houdinigraphql.com/guides/setting-up-your-project)

```shell
$ npx houdini@latest init
```
