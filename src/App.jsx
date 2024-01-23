import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/winning-combination";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [turns, setTurns] = useState([]);
  let activePlayer = deriveActivePlayer(turns);
  let gameBoard = initialBoard;
  if (turns.length > 0) {
    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  }
  let winner = null;
  for (let comb of WINNING_COMBINATIONS) {
    console.log("gameBoard", gameBoard);
    console.log("row", gameBoard[0]);
    console.log("comb", comb);
    console.log("button", gameBoard[comb[0].row][comb[0].column]);
    let firstSquare = gameBoard[comb[0].row][comb[0].column];
    let secondSquare = gameBoard[comb[1].row][comb[1].column];
    let thirdSquare = gameBoard[comb[2].row][comb[2].column];
    if (
      firstSquare &&
      firstSquare == secondSquare &&
      thirdSquare == firstSquare
    ) {
      winner = firstSquare;
    }
  }
  const handleSquareSelect = (rowIndex, colIndex) => {
    setTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
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
        {winner && `'You won: '${winner}`}
        <GameBoard
          onSquareSelect={handleSquareSelect}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={turns}></Log>
    </main>
  );
}

export default App;
