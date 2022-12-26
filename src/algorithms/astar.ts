import type GridNode from "../models/GridNode";
import Heap from 'heap-js';


// https://www.youtube.com/watch?v=-L-WgKMFuhE
export default function astar(grid: GridNode[][], startingNode: GridNode, endingNode: GridNode): GridNode[] {
    const axis = [0, 1, 0, -1, 0];
    const visitingOrder = [];
    const heap = new Heap<[number, GridNode]>((a, b) => (a[0] + a[1].distance) - (b[0] + b[1].distance) || a[0] - b[0]);
    startingNode.distance = 0;
    heap.push([0, startingNode]);
    while (heap.length) {
        const [_, currentNode] = heap.pop();
        if (!currentNode.isVisited) {
            currentNode.isVisited = true;
            visitingOrder.push(currentNode);
            if (currentNode.isEnd) break;
            for (let ax = 0; ax < axis.length - 1; ax++) {
                const xx = currentNode.x + axis[ax];
                const yy = currentNode.y + axis[ax + 1];
                if (xx >= 0 && yy >= 0 && xx < grid.length && yy < grid[0].length && !grid[xx][yy].isVisited && !grid[xx][yy].iswall) {
                    const neighbor = grid[xx][yy];
                    if (currentNode.distance + 1 <= neighbor.distance) {
                        neighbor.distance = currentNode.distance + 1;
                        neighbor.previousNode = currentNode;
                    }
                    const distanceFromEnd = Math.abs(neighbor.x - endingNode.x) + Math.abs(neighbor.y - endingNode.y);
                    heap.push([distanceFromEnd, neighbor]);
                }
            }
        }
    }
    return visitingOrder;
}


/*
const heap = new Heap<[number, GridNode]>((a, b) => (a[0] + a[1].distance) - (b[0] + b[1].distance) || a[0] - b[0]);
const fCostA = a[0] + a[1].distance;
        const fCostB = b[0] + b[1].distance;
        if (fCostA < fCostB) {
            return -1;
        } else if (fCostA > fCostB) {
            return 1;
        } else {
            if (a[0] < b[0]) {
                return -1;
            } else if (a[0] > b[0]) {
                return 1;
            } else {
                return 0;
            }
        }
*/