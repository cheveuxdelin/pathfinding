import astar from "../algorithms/astar";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import dijkstra from "../algorithms/dijkstra";
import type GridNode from "../models/GridNode";
export type algorithm = (grid: GridNode[][], startingNode: GridNode, endingNode?: GridNode) => GridNode[];

export default {
    dijkstra: dijkstra as algorithm,
    dfs: dfs as algorithm,
    bfs: bfs as algorithm,
    "a*": astar as algorithm
};