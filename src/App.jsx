import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./assets/winning-combination";
import GameOver from "./components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedWinner(playerName, gameBoard) {
  let winner = null;
  for (let comb of WINNING_COMBINATIONS) {
    let firstSquare = gameBoard[comb[0].row][comb[0].column];
    let secondSquare = gameBoard[comb[1].row][comb[1].column];
    let thirdSquare = gameBoard[comb[2].row][comb[2].column];
    if (
      firstSquare &&
      firstSquare == secondSquare &&
      thirdSquare == firstSquare
    ) {
      winner = playerName[firstSquare];
    }
  }
  return winner;
}
function derivedGameBoard(initialBoard, turns) {
  let gameBoard = [...initialBoard.map((arr) => [...arr])];
  if (turns.length > 0) {
    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  }
  return gameBoard;
}
function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function App() {
  const [turns, setTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player1",
    O: "Player2",
  });
  let activePlayer = deriveActivePlayer(turns);
  let gameBoard = derivedGameBoard(initialBoard, turns);
  let winner = derivedWinner(playerName, gameBoard);
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
  const isDraw = turns.length == 9 && !winner;
  function onRematch() {
    setTurns([]);
  }
  function onPlayerNameChange(symbol, newName) {
    setPlayerName((prevNames) => {
      return {
        ...prevNames,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            nameChange={onPlayerNameChange}
          ></Player>
          <Player
            name="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            nameChange={onPlayerNameChange}
          ></Player>
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={onRematch}></GameOver>
        )}
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
