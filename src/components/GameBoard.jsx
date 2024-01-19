const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSquareSelect, turns }) {
  let gameBoard = initialBoard;
  if (turns.length > 0) {
    for (const turn of turns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  }

  //   const [gameBoard, setGameBoard] = useState(initialBoard);

  //   const handleClick = (rowIndex, colIndex) => {
  //     setGameBoard((prevBoard) => {
  //       const updatedBoard = [...prevBoard.map((innerRow) => [...innerRow])];
  //       updatedBoard[rowIndex][colIndex] = playerSymbol;
  //       return updatedBoard;
  //     });
  //     onSquareSelect();
  //   };
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => {
                    onSquareSelect(rowIndex, colIndex);
                  }}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
