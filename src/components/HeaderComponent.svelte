<script lang="ts">
    import sizes from "../values/sizes";
    import speeds from "../values/speeds";

    export let isRunning: boolean;
    export let resetGrid: () => void;
    export let runAlgorithm: () => void;
    export let currentSize: string;
    export let currentSpeed: string;
</script>

<header>
    <h1>Pathfinding Visualizer</h1>
    <button disabled={isRunning} on:click={runAlgorithm} class="button-run"
        >{isRunning ? "Running..." : "Run Algorithm"}</button
    >
    <div style="text-align: right; align-self: center;">
        <select bind:value={currentSize}>
            {#each Object.keys(sizes) as size}
                <option value={size}>{size}</option>
            {/each}
        </select>
        <select bind:value={currentSpeed}>
            {#each Object.keys(speeds) as speed}
                <option value={speed}>{speed}</option>
            {/each}
        </select>
        <button on:click={resetGrid}>reset</button>
    </div>
</header>

<style>
    header {
        background-color: rgb(0, 30, 50);
        color: white;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        place-content: center;
    }

    button {
        padding: 10px 30px;
    }

    .button-run {
        background-color: green;
        color: white;
        border: none;
        border-radius: 30px;
    }
</style>
