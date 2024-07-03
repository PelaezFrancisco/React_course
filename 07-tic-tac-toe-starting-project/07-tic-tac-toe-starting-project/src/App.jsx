import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const seconfSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === seconfSquareSymbol &&
      seconfSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  //makes a copy of all the other array and chhildren the obj migth have
  let gameBoard = [...INITIALGAMEBOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  //delete redundant state
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //if player X then O and O to X. Calling seAticePlayer to get current player value
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      //deriving active players
      let currentPlayer = deriveActivePlayer(prevTurns);

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      //updated inmutable
      //first item, is the latest turn
      const updatedTurns = [
        //object
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerName}
          ></Player>
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerName}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch}></GameOver>
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
