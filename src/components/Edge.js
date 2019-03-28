import React, { Component } from "react";
import "../components/Edge.css";

class Edge extends Component {
  render() {
    return (
      <line
        x1={this.props.startX}
        y1={this.props.startY}
        x2={this.props.endX}
        y2={this.props.endY}
      />
    );
  }
}

export default Edge;
