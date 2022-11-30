<script lang="ts">
    const sizes = {
        small: {
            n: 10,
            m: 10,
        },
        medium: {
            n: 12,
            m: 25,
        },
        large: {
            n: 25,
            m: 50,
        },
    };
    const speeds = {
        slow: {
            visitedSpeed: 50,
            shortestPathSPeed: 100,
        },
        medium: {
            visitedSpeed: 25,
            shortestPathSPeed: 70,
        },
        fast: {
            visitedSpeed: 10,
            shortestPathSPeed: 50,
        },
    };

    export let resetGrid: () => void;
    export let runAlgorithm: () => void;
    export let currentSize: string;
    export let currentSpeed: string;
</script>

<header>
    <h1>Pathfinding Visualizer</h1>
    <button on:click={runAlgorithm}>Run Algorithm</button>
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
        background-color: rebeccapurple;
        color: white;
        padding: 20px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        place-content: center;
    }

    button {
        padding: 10px 30px;
    }
</style>
