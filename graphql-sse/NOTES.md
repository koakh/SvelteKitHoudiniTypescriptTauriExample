# NOTES

- [graphql-yoga/app.ts at main · dotansimha/graphql-yoga](https://github.com/dotansimha/graphql-yoga/blob/main/examples/graphql-sse/src/app.ts)

## Yoga

- [Quick Start with simple Server-Sent Events (SSE)](https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#quick-start-with-simple-server-sent-events-sse)
- [PubSub](https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions#pubsub)

### Yoga Error Masking

- [Error Handling – GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/tutorial/basic/09-error-handling#yoga-error-masking)

`NODE_ENV=development` exposes graphql errors `originalError`

## GraphQL Subscriptions: Max Listeners Exceeded Warning

- [Attention Required! | Cloudflare](https://copyprogramming.com/howto/graphql-subscriptions-max-listeners-exceeded-warning)
- [Subscriptions – GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions)

The simple EventEmitter pubsub library included in graphql-subscriptions is only **intended for demo purposes**. EventEmitters don't really scale to large numbers, they're in-memory, and they'll only work as long as you have no more than a single server.

For anyone trying to run GraphQL subscriptions in production, I strongly recommend using a different system, for example Redis or MQTT through graphql-redis-subscriptions or graphql-mqtt-subscriptions

## Yoga 3 File Uploads

- [File Uploads – GraphQL Yoga](https://the-guild.dev/graphql/yoga-server/docs/features/file-uploads)
- [https://javascript.plainenglish.io/how-to-implement-a-file-upload-server-with-node-js-83043bc180fc](https://javascript.plainenglish.io/how-to-implement-a-file-upload-server-with-node-js-83043bc180fc)

```shell
# generate a random file : 10000000 = 10mb
$ base64 /dev/urandom | head -c 10000000 > /tmp/file.txt

$ curl localhost:5001/graphql \
  -F operations='{ "query": "mutation ($file: File!) { readTextFile(file: $file) }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@/tmp/file.txt
```

### Extend with Binnary Files and Async fs.promises.writeFile

- [Upload file with apollo-upload-client and graphql-yoga 3.x](https://stackoverflow.com/questions/74797614/upload-file-with-apollo-upload-client-and-graphql-yoga-3-x)
- [Node.js fsPromises.writeFile() Method - GeeksforGeeks](https://www.geeksforgeeks.org/node-js-fspromises-writefile-method/)
