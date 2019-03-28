import React, { Component } from "react";
import Node from "../components/Node";
import Edge from "../components/Edge";
import "./Canvas.css";
import config from "../config";

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
      nodes: config.nodes.map((nodeCoord, i) => ({
        selected: false,
        xPosition: nodeCoord.x,
        yPosition: nodeCoord.y,
        neiborEdges: config.edges.reduce((res, currentEdge, indexEdge) => {
          if (currentEdge.startNode === i || currentEdge.endNode === i) {
            return [
              ...res,
              { index: indexEdge, isStart: currentEdge.startNode === i }
            ];
          } else {
            return res;
          }
        }, [])
      })),
      edges: config.edges.map(edge => ({
        startX: config.nodes[edge.startNode].x,
        startY: config.nodes[edge.startNode].y,
        endX: config.nodes[edge.endNode].x,
        endY: config.nodes[edge.endNode].y
      }))
    };
  }

  handlerMouseDown(i) {
    const newNodes = [...this.state.nodes];
    newNodes[i].selected = true;
    this.setState({ nodes: newNodes });
  }
  handlerMouseUp(i) {
    const newNodes = [...this.state.nodes];
    newNodes[i].selected = false;
    this.setState({ nodes: newNodes });
    console.log(this.checkIntersection());
  }
  handlerMouseMove(e, i) {
    const x =
      (e.clientX - e.target.getScreenCTM().e) / e.target.getScreenCTM().a;
    const y =
      (e.clientY - e.target.getScreenCTM().f) / e.target.getScreenCTM().d;

    if (this.state.nodes[i].selected) {
      const newNodes = [...this.state.nodes];
      const newEdges = [...this.state.edges];
      this.state.nodes[i].neiborEdges.forEach(edge => {
        if (edge.isStart) {
          newEdges[edge.index].startX = x;
          newEdges[edge.index].startY = y;
        } else {
          newEdges[edge.index].endX = x;
          newEdges[edge.index].endY = y;
        }
      });
      newNodes[i].xPosition = x;
      newNodes[i].yPosition = y;
      this.setState({ nodes: newNodes });
    }
  }

  checkIntersection() {
    let edges = this.state.edges;
    for (let i = 0; i < edges.length - 1; i++) {
      for (let j = i + 1; j < this.state.edges.length; j++) {
        function vektorMulti(ax, ay, bx, by) {
          return ax * by - bx * ay;
        }
        let x1 = edges[i].startX;
        let y1 = edges[i].startY;
        let x2 = edges[i].endX;
        let y2 = edges[i].endY;
        let x3 = edges[j].startX;
        let y3 = edges[j].startY;
        let x4 = edges[j].endX;
        let y4 = edges[j].endY;

        let v1 = vektorMulti(x4 - x3, y4 - y3, x1 - x3, y1 - y3);
        let v2 = vektorMulti(x4 - x3, y4 - y3, x2 - x3, y2 - y3);
        let v3 = vektorMulti(x2 - x1, y2 - y1, x3 - x1, y3 - y1);
        let v4 = vektorMulti(x2 - x1, y2 - y1, x4 - x1, y4 - y1);
        if (v1 * v2 < 0 && v3 * v4 < 0) return false;
      }
    }
    return true;
  }

  render() {
    return (
      <svg id="no-cross-lines" width={config.width} height={config.height}>
        {this.state.edges.map((edge, i) => (
          <Edge
            key={i}
            startX={edge.startX}
            startY={edge.startY}
            endX={edge.endX}
            endY={edge.endY}
          />
        ))}
        {this.state.nodes.map((node, i) => (
          <Node
            key={i}
            index={i}
            xPosition={node.xPosition}
            yPosition={node.yPosition}
            handlerDown={() => this.handlerMouseDown(i)}
            handlerUp={() => this.handlerMouseUp(i)}
            handlerMove={e => this.handlerMouseMove(e, i)}
          />
        ))}
      </svg>
    );
  }
}
export default Canvas;
