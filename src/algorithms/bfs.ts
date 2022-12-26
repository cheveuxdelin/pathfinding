import type GridNode from "../models/GridNode";

class QueueNode<T> {
    value: T;
    next?: QueueNode<T>;
    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

class Queue<T> {
    head?: QueueNode<T>;
    tail?: QueueNode<T>;
    length: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(value: T) {
        const newNode = new QueueNode<T>(value);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }
    pop(): T | null {
        let rtn: T | null;
        if (this.head) {
            rtn = this.head.value;
            this.head = this.head.next;
            this.length--;
            if (!this.head) {
                this.tail = null;
            }
        } else {
            rtn = null;
        };
        return rtn;
    }
}

export default function bfs(grid: GridNode[][], startingNode: GridNode): GridNode[] {
    const visitingOrder = [];
    const axis = [0, 1, 0, -1, 0];
    const queue = new Queue<GridNode>();
    queue.push(startingNode);
    while (queue.length) {
        const currentNode = queue.pop();
        if (!currentNode.isVisited && !currentNode.iswall) {
            currentNode.isVisited = true;
            visitingOrder.push(currentNode);
            if (currentNode.isEnd) {
                return visitingOrder;
            };
            for (let ax = 0; ax < axis.length - 1; ax++) {
                const xx = currentNode.x + axis[ax];
                const yy = currentNode.y + axis[ax + 1];
                if (xx >= 0 && yy >= 0 && xx < grid.length && yy < grid[0].length && !grid[xx][yy].isVisited) {
                    const neighbor = grid[xx][yy];
                    neighbor.previousNode = currentNode;
                    queue.push(neighbor);
                }
            }
        }
    }
    // stuck
    return visitingOrder;
}