<script lang="ts">
    export let onMouseClick: (x: number, y: number) => void;
    export let x: number;
    export let y: number;
    export let isStart: boolean;
    export let isEnd: boolean;
    export let isWall: boolean;
    export let visited: boolean;
    export let shortestPath: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class={`gridnode 
    ${visited ? "visited" : ""}
    ${shortestPath ? "shortest-path" : ""}
    ${isWall ? "wall" : ""}
    `}
    style={`background-color: ${isStart ? "green" : isEnd ? "red" : ""}`}
    on:click={() => onMouseClick(x, y)}
/>

<style>
    .gridnode {
        display: table-cell;
        width: 30px;
        height: 30px;
        border: 1px solid black;
    }

    .visited {
        animation-name: visitedAnimation;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    .wall {
        background-color: grey;
    }

    @keyframes visitedAnimation {
        0% {
            transform: scale(0.3);
            background-color: rgba(0, 0, 66, 0.75);
            border-radius: 100%;
        }

        50% {
            background-color: rgba(17, 104, 217, 0.75);
        }

        75% {
            transform: scale(1.2);
            background-color: rgba(0, 217, 159, 0.75);
        }

        100% {
            transform: scale(1);
            background-color: rgba(0, 190, 218, 0.75);
        }
    }

    .shortest-path {
        animation-name: shortestPath;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        animation-delay: 0;
        animation-direction: alternate;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-play-state: running;
    }

    @keyframes shortestPath {
        0% {
            transform: scale(0.6);
            background-color: rgb(255, 254, 106);
        }

        50% {
            transform: scale(1.2);
            background-color: rgb(255, 254, 106);
        }

        100% {
            transform: scale(1);
            background-color: rgb(255, 254, 106);
        }
    }
</style>
