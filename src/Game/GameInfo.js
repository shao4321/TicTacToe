import {FaUndo, FaRedo} from "react-icons/fa"

const GameInfo = ({ revertable, redoable, status, revertMove, redoMove }) => {
  return (
    <div className="game-info flex-col">
      <h2 className="player-turn">{status}</h2>
      <div className="flex-row">
        <button className="action-btn" onClick={revertMove} disabled={!revertable}><FaUndo/></button>
        <button className="action-btn" onClick={redoMove} disabled={!redoable}><FaRedo/></button>
        </div>
    </div>
  );
};

export default GameInfo;
