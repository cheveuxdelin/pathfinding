<script lang="ts">
  import dijkstra, { getNodesInShortestPathOrder } from "./algorithms/dijkstra";
  import "./globals.css";
  import GridNode from "./GridNode";
  import GridNodeComponent from "./GridNodeComponent.svelte";
  import HeaderComponent from "./HeaderComponent.svelte";
  let startingNodeRow = 4;
  let startingNodeCol = 4;
  let endingNodeRow = 9;
  let endingNodeCol = 9;

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

  let currentSize: string = "small";

  function animateDijkstra(
    visitedNodesInOrder: GridNode[],
    nodesInShortestPathOrder: GridNode[]
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        grid[node.x][node.y].animationVisited = true;
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder: GridNode[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        grid[node.x][node.y].animationShortestPath = true;
      }, 50 * i);
    }
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

  function runAlgorithm() {
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
    grid[x][y].iswall = !grid[x][y].iswall;
  }

  let grid;
  $: {
    grid = createGrid(sizes[currentSize].n, sizes[currentSize].m);
  }
</script>

<HeaderComponent />

<select bind:value={currentSize}>
  {#each Object.keys(sizes) as size}
    <option value={size}>{size}</option>
  {/each}
</select>

<main>
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
  <button on:click={runAlgorithm}>generate path</button>
</main>

<style>
  .grid {
    display: table;
    width: fit-content;
    border: 1px solid black;
    margin: auto;
  }

  .row {
    display: table-row;
    width: 100%;
  }
</style>
