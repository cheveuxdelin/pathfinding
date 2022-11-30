export default class GridNode {
    isStart: boolean;
    isEnd: boolean;
    iswall: boolean;
    x: number;
    y: number;
    distance: number;
    isVisited: boolean;
    previousNode: GridNode;
    animationVisited: boolean;
    animationShortestPath: boolean;

    constructor(x: number, y: number) {
        this.isStart = false;
        this.isEnd = false;
        this.x = x;
        this.y = y;
        this.distance = Infinity;
        this.previousNode = null;
        this.animationVisited = false;
        this.animationShortestPath = false;
    }
}
