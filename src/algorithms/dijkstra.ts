import type GridNode from "../models/GridNode";
import Heap from 'heap-js';

export default function dijkstra(grid: GridNode[][], startingNode: GridNode): GridNode[] {
    const visitingOrder = [];
    const axis = [0, 1, 0, -1, 0];
    startingNode.distance = 0;
    const heap = new Heap<GridNode>((a, b) => a.distance - b.distance);
    heap.push(startingNode);
    while (heap.length) {
        const currentNode = heap.pop();
        if (currentNode.iswall || currentNode.isVisited) {
            continue;
        };
        // If the closest node is at a distance of infinity,
        // we must be trapped and should therefore stop.
        if (currentNode.distance === Infinity) return visitingOrder;
        currentNode.isVisited = true;
        visitingOrder.push(currentNode);
        if (currentNode.isEnd) return visitingOrder;
        for (let ax = 0; ax < axis.length - 1; ax++) {
            let xx = currentNode.x + axis[ax];
            let yy = currentNode.y + axis[ax + 1];
            if (xx >= 0 && yy >= 0 && xx < grid.length && yy < grid[0].length && !grid[xx][yy].isVisited) {
                const neighbor = grid[xx][yy];
                neighbor.previousNode = currentNode;
                neighbor.distance = currentNode.distance + 1;
                heap.push(neighbor);
            }
        }
    }
    return visitingOrder;
}
