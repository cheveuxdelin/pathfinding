<script lang="ts">
  import dijkstra, { getNodesInShortestPathOrder } from "./algorithms/dijkstra";
  import "./globals.css";
  import GridNode from "./models/GridNode";
  import GridNodeComponent from "./components/GridNodeComponent.svelte";
  import HeaderComponent from "./components/HeaderComponent.svelte";
  import speeds from "./values/speeds";
  import sizes from "./values/sizes";

  let startingNodeRow = 4;
  let startingNodeCol = 4;
  let endingNodeRow = 9;
  let endingNodeCol = 9;

  let currentSize: keyof typeof sizes = "large";
  let currentSpeed: keyof typeof speeds = "slow";

  let isRunning: boolean;

  function animateDijkstra(
    visitedNodesInOrder: GridNode[],
    nodesInShortestPathOrder: GridNode[]
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, speeds[currentSpeed].visitedSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        grid[node.x][node.y].animationVisited = true;
      }, speeds[currentSpeed].visitedSpeed * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder: GridNode[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        grid[node.x][node.y].animationShortestPath = true;
      }, speeds[currentSpeed].shortestPathSPeed * i);
    }
    setTimeout(() => {
      isRunning = false;
    }, (nodesInShortestPathOrder.length - 1) * speeds[currentSpeed].shortestPathSPeed);
  }

  function createGrid(n: number, m: number): GridNode[][] {
    const grid: GridNode[][] = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < m; j++) {
        row.push(new GridNode(i, j));
      }
      grid.push(row);
    }
    grid[startingNodeRow][startingNodeCol].isStart = true;
    grid[endingNodeRow][endingNodeCol].isEnd = true;
    return grid;
  }

  function clearPath() {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j].animationVisited = false;
        grid[i][j].animationShortestPath = false;
      }
    }
  }
  function resetGrid() {
    grid = createGrid(sizes[currentSize].m, sizes[currentSize].m);
  }

  function runAlgorithm() {
    isRunning = true;
    clearPath();
    const result = dijkstra(
      grid,
      grid[startingNodeRow][startingNodeCol],
      grid[endingNodeRow][endingNodeCol]
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      grid[endingNodeRow][endingNodeCol]
    );
    animateDijkstra(result, nodesInShortestPathOrder);
  }

  function onMouseClick(x: number, y: number) {
    if (!isRunning) {
      grid[x][y].iswall = !grid[x][y].iswall;
    }
  }

  let grid: GridNode[][];
  $: {
    grid = createGrid(sizes[currentSize].n, sizes[currentSize].m);
  }
</script>

<main>
  <HeaderComponent
    {isRunning}
    {runAlgorithm}
    {resetGrid}
    bind:currentSize
    bind:currentSpeed
  />
  <div class="grid">
    {#each grid as row, rowIndex (rowIndex)}
      <div class="row">
        {#each row as gridNode, gridNodeIndex (gridNodeIndex)}
          <GridNodeComponent
            isStart={gridNode.isStart}
            isEnd={gridNode.isEnd}
            visited={gridNode.animationVisited}
            shortestPath={gridNode.animationShortestPath}
            isWall={gridNode.iswall}
            x={gridNode.x}
            y={gridNode.y}
            {onMouseClick}
          />
        {/each}
      </div>
    {/each}
  </div>
  <div />
</main>

<style>
  main {
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
  }

  .grid {
    display: table;
    width: fit-content;
    border: 1px solid slategrey;
    margin: auto;
  }

  .row {
    display: table-row;
    width: 100%;
  }
</style>
