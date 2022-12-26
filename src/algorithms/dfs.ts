import type GridNode from "../models/GridNode";

export default function dfs(grid: GridNode[][], startingNode: GridNode): GridNode[] {
    const visitingOrder = [];
    const axis = [0, 1, 0, -1, 0];

    function ƒ(currentNode: GridNode): boolean {
        currentNode.isVisited = true;
        visitingOrder.push(currentNode);
        if (currentNode.isEnd) {
            return true;
        }
        for (let ax = 0; ax < axis.length - 1; ax++) {
            const xx = currentNode.x + axis[ax];
            const yy = currentNode.y + axis[ax + 1];
            if (xx >= 0 && yy >= 0 && xx < grid.length && yy < grid[0].length && !grid[xx][yy].isVisited) {
                const neighbor = grid[xx][yy];
                neighbor.previousNode = currentNode;
                if (ƒ(neighbor)) return true;
            }
        }
        return false;
    }
    ƒ(startingNode);
    return visitingOrder;
}
