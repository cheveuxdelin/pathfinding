import GridNode from "./GridNode";

export class Grid {
    private grid: GridNode[][];
    constructor(n: number, m: number, startingNodeRow: number, startingNodeCol: number, endingNodeRow: number, endingNodeCol: number) {
        for (let i = 0; i < n; i++) {
            const row = [];
            for (let j = 0; j < m; j++) {
                this.grid[i][j] = new GridNode(i, j);
            }
            this.grid.push(row);
        }
        this.grid[startingNodeRow][startingNodeCol].isStart = true;
        this.grid[endingNodeRow][endingNodeCol].isEnd = true;
    }
}