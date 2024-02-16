# svelte-cleanable-store

Custom Svelte store with built-in cleanup support on `subscribe`. Inspired by React's `useEffect` cleanup mechanism.

**While the core functionality is simple and complete, this package is still pre-1.0 until I get feedback on the API shape.** (e.g. Is `cleanable` a confusing name? Do we need a `readable` equivalent as well?)

## Usage

```ts
const state = cleanable(0);

state.subscribe((value) => {
    console.log(`state = ${value}`);
    return () => console.log(`cleaning up ${value}...`);
});
```

Console output:

```cjs
'state = 0'

// $state++
'cleaning up 0...'
'state = 1'

// $state = 5
'cleaning up 1...'
'state = 5'
```

## Example

### Closing a WebSocket connection

```ts
const path = cleanable("https://example.com/stream");
path.subscribe((value) => {
    const webSocket = new WebSocket(value);
    webSocket.onmessage = (event) => console.log(event);

    return () => webSocket.close();
});
```

## But what about Svelte 5's `$effect`?

It's absolutely great! In fact, it inspired me to create this package.

However, Svelte 5 is still in beta now, and while there are many workarounds for Svelte 4, this package provides a clean, store-based solution that works with Svelte 4 (and 5), can be used anywhere (in plain `.js`/`.ts` files!), and is compatible with auto-subscriptions in `.svelte` files (with the `$` prefix), all without feeling like a hack.

## License

[MIT License](./LICENSE.md). Copyright (c) 2024 Houssam Elbadissi.
