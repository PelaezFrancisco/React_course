// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

export default function GameBoard({ onSelectSquare, board }) {
  // let gameBoard = initialGameBoard;

  // for (const turn of turns) {
  //   const { square, player } = turn;
  //   const { row, col } = square;

  //   gameBoard[row][col] = player;
  // }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex) {
  //   setGameBoard((previousGameBoard) => {
  //     //Este es un array padre, que tiene los hijos de array previousGameBoard
  //     const updatedBoard = [
  //       ...previousGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   //Llama al prompt que se llama en la funcion App
  //   onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
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
