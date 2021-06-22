import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        winline={this.props.winline}
        key={i}
        id={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquareRow(startIdx, gridSize) {
    const endIdx = startIdx + gridSize;
    const renderingRow = [];

    for (let i = startIdx; i < endIdx; i++) {
      renderingRow.push(this.renderSquare(i));
    }
    return (
      <div key={startIdx} className="board-row">
        {renderingRow.map((row) => row)}
      </div>
    );
  }

  render() {
    const gridSize = this.props.gridSize;
    const renderedRow = [];

    for (let i = 0; i < gridSize * gridSize; i += gridSize) {
      renderedRow.push(this.renderSquareRow(i, gridSize));
    }
    return <div>{renderedRow.map((row) => row)}</div>;
  }
}

export default Board;
