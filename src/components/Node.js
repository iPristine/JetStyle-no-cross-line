import React, { Component } from "react";

class Node extends Component {
  render() {
    return (
      <circle
        cx={this.props.xPosition}
        cy={this.props.yPosition}
        r={20}
        onMouseDown={this.props.handlerDown}
        onMouseUp={this.props.handlerUp}
        onMouseMove={this.props.handlerMove}
      />
    );
  }
}

export default Node;
