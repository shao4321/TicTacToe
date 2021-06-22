function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}
// sortMoveAscending() {
//     let buttonsLoc = [];
//     for (let { currentMoveLocation } of this.state.history) {
//       buttonsLoc.push(currentMoveLocation);
//     }
//     buttonsLoc.sort((a, b) => a - b);
//     const allMovesButton = this.state.allMovesButton;
//     let sortedAllMovesButton = [];
//     console.log(this.buttonLocHashKeys);
//     console.log(buttonsLoc);
//     for (let key of buttonsLoc) {
//       const liKey = this.buttonLocHashKeys[key];
//       for (let btn of allMovesButton) {
//         if (btn.key === liKey) {
//           sortedAllMovesButton.push(btn);
//           break;
//         }
//       }
//     }
//     console.log(sortedAllMovesButton);
//     this.setState({
//       allMovesButton: sortedAllMovesButton,
//     });
//   }

//   sortMoveDescending() {
//     let buttonsLoc = [];
//     for (let { currentMoveLocation } of this.state.history) {
//       buttonsLoc.push(currentMoveLocation);
//     }
//     buttonsLoc.sort((a, b) => b - a);
//     const allMovesButton = this.state.allMovesButton;
//     let sortedAllMovesButton = [];
//     for (let key of buttonsLoc) {
//       const liKey = this.buttonLocHashKeys[key];
//       for (let btn of allMovesButton) {
//         if (btn.key === liKey) {
//           sortedAllMovesButton.push(btn);
//           break;
//         }
//       }
//     }
//     this.setState({
//       allMovesButton: sortedAllMovesButton,
//     });
//   }

export { calculateWinner };
