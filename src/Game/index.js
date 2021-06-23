import React from "react";
import Board from "./Board";
import { calculateWinner } from "./Functions";
import GameInfo from "./GameInfo";
import { CSSTransition } from "react-transition-group";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentMoveLocation: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      prevButton: undefined,
      allMovesButton: [],
    };
    this.gridSize = 3;
    this.buttonLocHashKeys = {};
  }

  startPlayer(player) {
    this.setState({ xIsNext: player === "cross" });
  }

  handleClick(i) {
    const moveLocations = {
      1: [1, 1],
      2: [2, 1],
      3: [3, 1],
      4: [1, 2],
      5: [2, 2],
      6: [3, 2],
      7: [1, 3],
      8: [2, 3],
      9: [3, 3],
    };
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)[0] || squares[i]) return;
    squares[i] = this.state.xIsNext ? "X" : "O";

    const allMovesButton = this.updateMoves(history, moveLocations);
    this.setState({
      history: history.concat([
        {
          squares: squares,
          currentMoveLocation: i + 1,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      allMovesButton: allMovesButton,
    });
  }

  updateMoves(history, moveLocations) {
    const allMovesButton = history.map(({ currentMoveLocation }, move) => {
      let row, col, desc;
      if (currentMoveLocation != null) {
        [col, row] = moveLocations[currentMoveLocation];
        desc = `Go to move (${col},${row})`;
      } else {
        desc = "Go to game start";
      }
      this.buttonLocHashKeys[currentMoveLocation] = move;
      return (
        <li key={move}>
          <button
            className="move-btn"
            onClick={(e) => this.jumpToEvents(e, move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    return allMovesButton;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !step % 2,
    });
  }

  jumpToEvents(e, step) {
    this.jumpTo(step);
    this.setState({
      prevButton: e.target,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner, winLine] = calculateWinner(current.squares);
    let allMovesButton = this.state.allMovesButton.map((btn) => btn);

    let status;
    status = winner
      ? `Winner: ${winner}`
      : this.state.stepNumber === this.gridSize ** 2
      ? "Game over, it is a draw."
      : `Next player: ${this.state.xIsNext ? "X" : "O"}`;

    return (
      <div className="game-container">
        <CSSTransition
          in={this.state.xIsNext === undefined}
          timeout={1000}
          classNames="fade"
          unmountOnExit
        >
          <h1 className="head">Pick a side</h1>
        </CSSTransition>
        <div className="game">
          <Board
            winline={winLine}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            gridSize={this.gridSize}
            startPlayer={(player) => this.startPlayer(player)}
          />
          <CSSTransition
            in={this.state.xIsNext !== undefined}
            timeout={1000}
            mountOnEnter
            classNames="fade"
          >
            <GameInfo allMovesButton={allMovesButton} status={status} />
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default Game;
