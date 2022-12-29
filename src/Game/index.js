import React from 'react';
import Board from './Board';
import { calculateWinner } from './Functions';
import GameInfo from './GameInfo';
import { CSSTransition } from 'react-transition-group';
import Swal from 'sweetalert2';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          currentMoveLocation: null
        }
      ],
      stepNumber: 0,
      xIsNext: undefined,
      prevButton: undefined,
      allMovesButton: []
    };
    this.gridSize = 3;
    this.buttonLocHashKeys = {};
    this.gameEnd = false;
  }

  startPlayer(player) {
    this.setState({ xIsNext: player === 'cross' });
  }

  handleClick(i) {
    if (this.state.gameEnd) {
      return;
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)[0] || squares[i]) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([
        {
          squares: squares,
          currentMoveLocation: i + 1
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  revertMove() {
    this.jumpTo(this.state.stepNumber - 1);
  }

  redoMove() {
    this.jumpTo(this.state.stepNumber + 1);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: !step % 2
    });
  }

  jumpToEvents(e, step) {
    this.jumpTo(step);
    this.setState({
      prevButton: e.target
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const [winner, winLine] = calculateWinner(current.squares);

    let status,
      gameDraw = this.state.stepNumber === this.gridSize ** 2;
    const gameEnd = winner || gameDraw;

    status = gameEnd
      ? 'Refresh the page to restart game'
      : `Current player: ${this.state.xIsNext ? 'X' : 'O'}`;

    if (!this.state.gameEnd) {
      if (winner) {
        Swal.fire(`Congratulations ${winner}! You have won.`).then(() =>
          this.setState({ gameEnd })
        );
      } else if (gameDraw) {
        Swal.fire('Game over, it is a draw.').then(() =>
          this.setState({ gameEnd })
        );
      }
    }

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
        <div className="game flex-col">
          <CSSTransition
            in={this.state.xIsNext !== undefined}
            timeout={1000}
            mountOnEnter
            classNames="fade"
          >
            <GameInfo
              revertable={this.state.stepNumber > 0 && !gameEnd}
              revertMove={() => this.revertMove()}
              redoable={
                this.state.stepNumber < this.state.history.length - 1 &&
                !gameEnd
              }
              redoMove={() => this.redoMove()}
              status={status}
            />
          </CSSTransition>
          <Board
            winline={winLine}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            gridSize={this.gridSize}
            startPlayer={(player) => this.startPlayer(player)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
