import type GridNode from "../models/GridNode";
import Heap from 'heap-js';


function getAllNodes(grid: GridNode[][]): GridNode[] {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes: GridNode[]) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
    const neighbors = [];
    const { y, x } = node;
    if (x > 0) neighbors.push(grid[x - 1][y]);
    if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
    if (y > 0) neighbors.push(grid[x][y - 1]);
    if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function updateUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

// Let's make a sample breath first or somethin
export default function dijkstra(grid: GridNode[][], startingNode: GridNode, endingNode: GridNode): GridNode[] {
    const visitingOrder = [];
    startingNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.iswall) {
            continue
        };
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (closestNode.distance === Infinity) {
            return visitingOrder;
        }
        closestNode.isVisited = true;
        visitingOrder.push(closestNode);
        if (closestNode === endingNode) {
            return visitingOrder;
        }
        updateUnvisitedNeighbors(closestNode, grid);
    }
    return visitingOrder;
}


// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: GridNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
