<!-- Library Demo -->
<script lang="ts">
    import { cleanable } from "$lib/index.js";

    let logs: string[] = [];
    const state = cleanable(0);

    state.subscribe((value) => {
        log(`state = ${value}`);
        return () => log(`cleaning up ${value}...`);
    });

    function log(msg: string) {
        console.log(msg);
        logs = [msg, ...logs];
    }

    function increment() {
        logs = ["$state++", "", ...logs];
        $state++;
    }
</script>

<h1>state = {$state}</h1>
<button on:click={increment}>Increment</button>
{#each logs as log}
    <p class={log === "$state++" ? "highlighted" : ""}>{log}</p>
{/each}

<style>
    .highlighted {
        color: green;
    }
</style>
