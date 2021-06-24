const GameInfo = ({ allMovesButton, status }) => {
  return (
    <div className="game-info">
      <h2 className="player-turn">{status}</h2>
      <div className="moves">
        <h3>Previous Moves</h3>
        {allMovesButton.length > 0 ? (
          <ol>{allMovesButton}</ol>
        ) : (
          <p>Nothing to be shown</p>
        )}
      </div>
    </div>
  );
};

export default GameInfo;
