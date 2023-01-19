<script lang="ts">
    import sizes from "../values/sizes";
    import speeds from "../values/speeds";
    import algorithms from "../values/algorithms";
    export let isRunning: boolean;
    export let clearPath: () => void;
    export let resetGrid: () => void;
    export let runAlgorithm: () => void;
    export let selectedSize: keyof typeof sizes;
    export let selectedSpeed: keyof typeof speeds;
    export let selectedAlgorithm: keyof typeof algorithms;
</script>

<header>
    <h1>Pathfinding Visualizer</h1>
    <button disabled={isRunning} on:click={runAlgorithm} class="button-run"
        >{isRunning ? "Running..." : "Run Algorithm"}</button
    >
    <div style="text-align: right; align-self: center;">
        <select bind:value={selectedSize}>
            {#each Object.keys(sizes) as size}
                <option value={size}>{size}</option>
            {/each}
        </select>
        <select bind:value={selectedSpeed}>
            {#each Object.keys(speeds) as speed}
                <option value={speed}>{speed}</option>
            {/each}
        </select>
        <select bind:value={selectedAlgorithm}>
            {#each Object.keys(algorithms) as algorithm}
                <option value={algorithm}>{algorithm}</option>
            {/each}
        </select>
        <button on:click={clearPath}>clear path</button>
        <button on:click={resetGrid}>reset grid</button>
    </div>
</header>

<style>
    header {
        color: white;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        place-content: center;
        height: 100px;
    }

    button,
    select {
        background-color: slategrey;
        color: white;
        border: none;
        width: 100px;
        height: 30px;
    }

    .button-run {
        background-color: rgb(0, 90, 70);
        width: 150px;
        height: 30px;
        border-radius: 10px;
    }
</style>
