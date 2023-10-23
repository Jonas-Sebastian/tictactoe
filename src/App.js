import { useState } from 'react'; //imports the "Use State" coding functionalities like recording clicks

function Square({ value, onSquareClick }) { //when you call function Square() it will ask for two values/inputs to work
  //{value} is the String variable used to display X or O
  return (
    
    //className="square" takes the design called ".square" in the styles.CSS file
    //onClick passes its "True" or "False" 'clicked' state/value to the Function/Variable named {onSquareClick}
    //<button className="square" onDoubleClick={onSquareClick} >
    <button className="square" onClick={onSquareClick}> 
      {value} {/* {value} is the String variable used to display X or O */}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) { //export default is the main/first function being run when you load the webpage
  //const [xIsNext, setXIsNext] = useState(true); //this is used so that "X" and "O" can alternate turns
  /*sets 'setXIsNext' useState to true which means it satisfies the if condition inside function handleClick(i)
    It also means that the letter that will appear when clicked is "Xs"
  */
  //declare the constant 'squares', then set the state of the constant 'square'
  //const [squares, setSquares] = useState(Array(9).fill(null)); //The Array(9) creates nine sets of two values.
  /* The const above is an example of a 2D array or 2 values per array
  Example:
  [(1, true), (2, false), (3, false), (4, true), (5, false)]
  */
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { /* this condition is to check if there is a winner or
      an existing value in the array */
      return; //return nothing if there is already an existing value
    }
    const nextSquares = squares.slice(); 
    /* ^^ creates a duplicate array of 'const [squares]' so that 
    you can change the value that is shown 
    without actually changing the original copy
    */
    nextSquares[i] = xIsNext ? "X" : "O"
    
    if (xIsNext) {
      nextSquares[i] = "X";//sets the clicked index of nextSquares from "null" to "X"
    } else {
      nextSquares[i] = "O";//sets the clicked index of nextSquares from "null" to "O"
    }

    onPlay(nextSquares);
  }

  //This part calculates the winner of the game
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else { //This part calculates which player will play next
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //Creating the board using two loops
  const boardRows = [...Array(3)].map((a, i) => { // The (...) is called the Spread Operator 
    //which iterates or enumerates items or values inside an array
    const boardSquares = [...Array(3)].map((a, j) => { // (.map) iterates the whole array including the values and index
      return (
        <Square key={3 * i + j} value={squares[3 * i + j]} onSquareClick={() => handleClick(3 * i + j)}/>
        //{3 * i + j}, for example: i=0, j=0
        //{3 * 0 + 0} = 0, so the first key is 0
        //since variable j will loop first, the next values would be {3 * 0 + 1}=1 so the 2nd key is 1 
      );
    });
    
    //Every 3 loops of boardSquares, adds a division and the 3 squares returned in boardSquares
    return (
      <div key={i} className="board-row">
        {boardSquares}
      </div>
    );
  });
  
  //Displays all the squares created
  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );

// const arr1 = ["A", "B", "C"];

// return (
//  <div className="row">
//     {
//       [Array(3)].map((obj,num,abc) => <div className="col">{obj + num + abc}</div>)
//   //arr1.map((obj,num,abc) => <div className="col">{obj + num + abc}</div>)
//     }
//   </div>
// );

}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() { //export default is the main/first function being run when you load the webpage
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  let arrange = "Sort"
  

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  
  //sorts the moves in ascending or descending order
  function sorting(){
    let toSort = document.getElementById('moves').children;
    toSort = Array.prototype.slice.call(toSort);

    toSort.sort(function (a, b) {
        var aord = +a.id.split('-')[1];
        var bord = +b.id.split('-')[1];
        return (aord > bord) ? 1 : -1;
    });

    let parent = document.getElementById('moves');

    for (let i = 0, l = toSort.length; i < l; i++) {
        parent.appendChild(toSort[i]);
    }
  }

  const moves = history.map((squares, move) => {
  let description;
  if (move > 0) {
    description = 'Go to move #' + move;
  } else {
    description = 'Go to game start';
  }
  if (move == currentMove){
    if (move == 0){
      return ( 
        <li key={move}> 
          You are at game start
        </li>
      );
    }
    else {
      return ( 
        <li key={move}> 
          You are at move #{move}
        </li>
      );
    }
  }
  else {
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }
});

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => sorting()}>{arrange}</button>
        <ol id="moves">{moves}</ol>
      </div>
    </div>
  );
}