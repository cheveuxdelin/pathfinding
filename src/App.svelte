<script lang="ts">
  import GridNode from "./models/GridNode";
  import GridNodeComponent from "./components/GridNodeComponent.svelte";
  import HeaderComponent from "./components/HeaderComponent.svelte";
  import speeds from "./values/speeds";
  import sizes from "./values/sizes";
  import algorithms from "./values/algorithms";

  let startingNodeRow = 0;
  let startingNodeCol = 0;
  let endingNodeRow = 9;
  let endingNodeCol = 9;
  const timeouts = [];

  let selectedSize: keyof typeof sizes = "small";
  let selectedSpeed: keyof typeof speeds = "fast";
  let selectedAlgorithm: keyof typeof algorithms = "a*";

  let isRunning: boolean = false;
  let isSelectingStartingNode: boolean = false;
  let isSelectingEndingNode: boolean = false;

  function getNodesInShortestPathOrder(finishNode: GridNode): GridNode[] {
    if (finishNode.previousNode === null) {
      return [];
    }
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  function animateVisitedNodes(
    visitedNodesInOrder: GridNode[],
    nodesInShortestPathOrder: GridNode[]
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        timeouts.push(
          setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
          }, speeds[selectedSpeed].visitedSpeed * i)
        );
      } else {
        timeouts.push(
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            grid[node.x][node.y].animationVisited = true;
          }, speeds[selectedSpeed].visitedSpeed * i)
        );
      }
    }
  }

  function animateShortestPath(nodesInShortestPathOrder: GridNode[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      timeouts.push(
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          grid[node.x][node.y].animationShortestPath = true;
        }, speeds[selectedSpeed].shortestPathSPeed * i)
      );
    }
    timeouts.push(
      setTimeout(() => {
        isRunning = false;
      }, nodesInShortestPathOrder.length * speeds[selectedSpeed].shortestPathSPeed)
    );
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
    while (timeouts.length) {
      clearInterval(timeouts[timeouts.length - 1]);
      timeouts.pop();
    }
    //grid = createGrid(sizes[selectedSize].m, sizes[selectedSize].m);
    clearPath();

    for (let i = 0; i < sizes[selectedSize].m; i++) {
      for (let j = 0; j < sizes[selectedSize].m; j++) {
        grid[i][j].isVisited = false;
      }
    }
    isRunning = false;
  }

  function runAlgorithm() {
    isRunning = true;
    clearPath();
    for (let i = 0; i < sizes[selectedSize].m; i++) {
      for (let j = 0; j < sizes[selectedSize].m; j++) {
        grid[i][j].isVisited = false;
        grid[i][j].previousNode = null;
      }
    }
    const result = algorithms[selectedAlgorithm](
      grid,
      grid[startingNodeRow][startingNodeCol],
      grid[endingNodeRow][endingNodeCol]
    );
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(
      grid[endingNodeRow][endingNodeCol]
    );
    animateVisitedNodes(result, nodesInShortestPathOrder);
  }

  function onMouseClick(x: number, y: number) {
    if (!isRunning) {
      if (isSelectingStartingNode) {
        if (!grid[x][y].iswall) {
          isSelectingStartingNode = false;
          grid[x][y].isStart = true;
          startingNodeRow = x;
          startingNodeCol = y;
        }
      } else if (isSelectingEndingNode) {
        if (!grid[x][y].iswall) {
          isSelectingEndingNode = false;
          grid[x][y].isEnd = true;
          endingNodeRow = x;
          endingNodeCol = y;
        }
      } else if (grid[x][y].isStart) {
        isSelectingStartingNode = true;
        grid[x][y].isStart = false;
      } else if (grid[x][y].isEnd) {
        isSelectingEndingNode = true;
        grid[x][y].isEnd = false;
      } else {
        grid[x][y].iswall = !grid[x][y].iswall;
      }
    }
  }
  let grid: GridNode[][];
  $: grid = createGrid(sizes[selectedSize].n, sizes[selectedSize].m);
</script>

<main class="h-screen grid" style="grid-template-rows: 1fr auto 1fr;">
  <HeaderComponent
    {isRunning}
    {runAlgorithm}
    {resetGrid}
    {clearPath}
    bind:selectedSize
    bind:selectedSpeed
    bind:selectedAlgorithm
  />
  <div class="table w-fit border-slate-300 border m-auto">
    {#each grid as row, rowIndex (rowIndex)}
      <div class="table-row w-full">
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
            {isSelectingStartingNode}
            {isSelectingEndingNode}
          />
        {/each}
      </div>
    {/each}
  </div>
  <div />
</main>
