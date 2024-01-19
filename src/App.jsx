import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [turns, setTurns] = useState([]);
  const handleSquareSelect = (rowIndex, colIndex) => {
    setActivePlayer((prevState) => (prevState === "X" ? "O" : "X"));
    setTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns.length > 0 && prevTurns[0].player == "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></Player>
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        <GameBoard
          onSquareSelect={handleSquareSelect}
          turns={turns}
        ></GameBoard>
      </div>
    </main>
  );
}

export default App;
