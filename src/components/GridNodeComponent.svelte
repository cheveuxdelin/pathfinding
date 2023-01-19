<script lang="ts">
    export let onMouseClick: (x: number, y: number) => void;
    export let x: number;
    export let y: number;
    export let isStart: boolean;
    export let isEnd: boolean;
    export let isWall: boolean;
    export let visited: boolean;
    export let shortestPath: boolean;
    export let isSelectingStartingNode: boolean;
    export let isSelectingEndingNode: boolean;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    on:click={() => onMouseClick(x, y)}
    class="table-cell w-[30px] h-[30px] border-slate-300 border"
    class:isStart
    class:isEnd
    class:isWall
    class:visited
    class:shortestPath
    class:isSelectingStartingNode
    class:isSelectingEndingNode
/>

<style>
    .isStart {
        background-color: green;
    }

    .isEnd {
        background-color: red;
    }

    .isWall {
        background-color: grey;
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

    .isSelectingStartingNode:hover {
        background-color: rgb(0, 150, 0);
    }

    .isSelectingEndingNode:hover {
        background-color: rgb(150, 0, 0);
    }

    .shortestPath {
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
