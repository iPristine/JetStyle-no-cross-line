export default {
    width: 600,
    height: 400,
    //Coords of nodes
    nodes: [
        {x:30, y:20, incEdges:[1, 3, 4]}, 
        {x:100, y:30, incEdges:[]}, 
        {x:200, y:100, incEdges:[]}, 
        {x:40, y:300, incEdges:[]}, 
        {x:500, y:350, incEdges:[]}],
    //Edges {firstNode, secondNode}
    edges: [
        {startNode:0, endNode:1},
        {startNode:0, endNode:4},
        {startNode:1, endNode:3},
        {startNode:3, endNode:4},
        {startNode:2, endNode:3},
        {startNode:3, endNode:2},
    ]
}