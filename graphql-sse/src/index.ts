import { buildApp } from './app'

async function main() {
  const port = 5001;
  const app = buildApp();
  await app.start(port);
  console.log(`Server is running on http://localhost:${port}/graphql`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})
