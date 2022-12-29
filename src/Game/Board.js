import React from "react";
import Square from "./Square";
import BoardTitle from "./BoardTitle";
import { CSSTransition } from "react-transition-group";

const GameBoard = ({ renderedRow }) => (
  <div className="game-board">{renderedRow.map((row) => row)}</div>
);

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleScreen: true,
      gameBoard: false,
    };
  }
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
      <React.Fragment key={startIdx}>
        {renderingRow.map((row) => row)}
      </React.Fragment>
    );
  }

  startGame(player) {
    this.setState({ titleScreen: false });
    this.props.startPlayer(player);
  }

  render() {
    const gridSize = this.props.gridSize;
    const renderedRow = [];

    for (let i = 0; i < gridSize * gridSize; i += gridSize) {
      renderedRow.push(this.renderSquareRow(i, gridSize));
    }
    return (
      <div className="board">
        <CSSTransition
          in={this.state.titleScreen}
          timeout={{
            appear: 2000,
            exit: 800,
          }}
          classNames="title-screen-"
          unmountOnExit
          appear
          onExited={() => this.setState({ gameBoard: true })}
        >
          <BoardTitle startGame={(player) => this.startGame(player)} />
        </CSSTransition>

        <CSSTransition
          in={this.state.gameBoard}
          timeout={2000}
          mountOnEnter
          classNames="game-board-"
        >
          <GameBoard renderedRow={renderedRow} />
        </CSSTransition>
      </div>
    );
  }
}

export default Board;
