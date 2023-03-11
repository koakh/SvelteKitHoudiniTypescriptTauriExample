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