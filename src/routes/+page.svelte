<!-- Library Demo -->
<script lang="ts">
    import { cleanable } from "$lib/index.js";

    const parent = cleanable(0);

    parent.subscribe((value) => {
        console.log("parent changed", value);
        return () => console.log(`cleaning up old parent ${value}...`);
    });
</script>

<h1>Parent: {$parent}</h1>
<button on:click={() => $parent++}>Increment</button>
