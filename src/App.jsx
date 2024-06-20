import { useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  console.log(`Board rendered`);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xisNext, setXisNext] = useState(true);

  const currentSquares = history[stepNumber];

  function handleClick(i) {
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    const updatedSquares = currentSquares.slice();

    updatedSquares[i] = xisNext ? "X" : "O";

    setHistory(history.slice(0, stepNumber + 1).concat([updatedSquares]));
    setStepNumber(stepNumber + 1);
    setXisNext(!xisNext);
  }

  const winner = calculateWinner(currentSquares);

  let status;
  if (winner) {
    status = `Winner is : ${winner}`;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = `Next player is : ${xisNext ? "X" : "O"}`;
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button className="btn" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <div className="status">{status} </div>
      <button
        onClick={() => {
          setHistory([Array(9).fill(null)]);
          setStepNumber(0);
          setXisNext(true);
        }}
        style={{
          margin: "10px 0",
        }}
      >
        Reset
      </button>
      <div className="board-row">
        <Square value={currentSquares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={currentSquares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={currentSquares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={currentSquares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={currentSquares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={currentSquares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={currentSquares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={currentSquares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div>
        <h3>History</h3>
        <ul>{moves}</ul>
      </div>
    </>
  );
}

function App() {
  let gameHeading = "Tic Tac Toe";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="h1">{gameHeading}</h1>
      <Board />
    </div>
  );
}

export default App;
