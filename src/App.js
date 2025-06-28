import React, { useState } from 'react';

function App() {
  const totalCells = 36;        // Total number of boxes
  const columns = 6;            // Number of columns in the grid (6x6)

  // State to track each player's meme choice
  const [player1Choice, setPlayer1Choice] = useState(null); // 'Shrek' or 'Sigma'
  const [player2Choice, setPlayer2Choice] = useState(null); // Automatically set to opposite

  // Whose turn is it currently? Starts with Player 1
  const [currentTurn, setCurrentTurn] = useState('Player 1');

  // Tracks which cells have been clicked (array of booleans)
  const [clickedCells, setClickedCells] = useState(Array(totalCells).fill(false));

  // Holds the randomized meme type ('Shrek' or 'Sigma') for each cell
  const [cellImages, setCellImages] = useState([]);

  // Tracks if someone has already won
  const [winner, setWinner] = useState(null);

  // Function to handle when Player 1 picks a meme at the start
  const handlePlayerChoice = (choice) => {
    setPlayer1Choice(choice);
    setPlayer2Choice(choice === 'Shrek' ? 'Sigma' : 'Shrek');

    // Randomly assign 'Shrek' or 'Sigma' to each cell (50/50 chance)
    const randomImages = Array.from({ length: totalCells }, () =>
      Math.random() < 0.5 ? 'Shrek' : 'Sigma'
    );
    setCellImages(randomImages);
  };

  // Function called when a player clicks a cell on the board
  const handleCellClick = (index) => {
    // If already clicked or game is over, do nothing
    if (clickedCells[index] || winner) return;

    // Get the meme type at the clicked cell
    const imageAtCell = cellImages[index];

    // Mark the cell as clicked
    const newClicked = [...clickedCells];
    newClicked[index] = true;
    setClickedCells(newClicked);

    // Get the current player's meme choice
    const currentPlayerChoice = currentTurn === 'Player 1' ? player1Choice : player2Choice;

    // Check if the current player clicked their own meme
    if (imageAtCell !== currentPlayerChoice) {
      // They clicked the wrong meme — the other player wins
      setWinner(currentTurn === 'Player 1' ? 'Player 2' : 'Player 1');
    } else {
      // If correct, switch turn to the other player
      setCurrentTurn(currentTurn === 'Player 1' ? 'Player 2' : 'Player 1');
    }
  };

  // Helper function to get image URL based on meme type
  const getImageUrl = (type) =>
    type === 'Shrek'
      ? 'https://i.imgflip.com/8ptp2n.png?a486240'
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgK5GoN5KO1N9vBeToEa5dWOt5H4dLbCtJ1g&s';

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>MemeSweeper!</h1>

      {/* Initial screen where Player 1 picks their meme */}
      {!player1Choice ? (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {/* Clickable Shrek Image */}
          <img
            src="https://i.imgflip.com/8ptp2n.png?a486240"
            onClick={() => handlePlayerChoice('Shrek')}
            style={{
              width: '200px',
              height: 'auto',
              cursor: 'pointer',
              border: '4px solid transparent',
              borderRadius: '12px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          {/* Clickable Sigma Image */}
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgK5GoN5KO1N9vBeToEa5dWOt5H4dLbCtJ1g&s"
            onClick={() => handlePlayerChoice('Sigma')}
            style={{
              width: '200px',
              height: 'auto',
              cursor: 'pointer',
              border: '4px solid transparent',
              borderRadius: '12px',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      ) : (
        <div>
          {/* Game status display */}
          <h2>Player 1: {player1Choice} | Player 2: {player2Choice}</h2>
          {winner ? (
            <h2 style={{ color: 'green' }}>{winner} wins!</h2>
          ) : (
            <h3>Current Turn: {currentTurn}</h3>
          )}

          {/* Game board grid */}
          <table
            style={{
              margin: '0 auto',
              borderCollapse: 'collapse',
              border: '2px solid #444',
              fontSize: '24px',
              userSelect: 'none',
            }}
          >
            <tbody>
              {[...Array(totalCells / columns)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(columns)].map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(index)}
                        style={{
                          border: '1px solid #999',
                          padding: '10px',
                          width: '80px',
                          height: '80px',
                          verticalAlign: 'middle',
                          cursor:
                            clickedCells[index] || winner ? 'default' : 'pointer',
                          textAlign: 'center',
                          backgroundColor: clickedCells[index] ? '#fff' : '#ccc',
                        }}
                      >
                        {/* Reveal meme if cell was clicked */}
                        {clickedCells[index] && (
                          <img
                            src={getImageUrl(cellImages[index])}
                            alt={cellImages[index]}
                            style={{ width: '100%', height: 'auto' }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;














/*import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function Welcome(props){
  return <h2>Welcome, {props.name}!</h2>
}

function Counter(){
    const[count, setCount] = useState(0);

    function handleClick(){
        setCount(count + 1);
    }

    return (
    <div>
        <p>You clicked {count} times.</p>
        <button onClick={handleClick}>Click me</button>
    </div>
    );
}

function App() {
  return (
    <div className="App">
      <Welcome name="Dean">
      </Welcome>
      <Welcome name="Kurt"></Welcome>
      <Welcome name="Guil"></Welcome>
      <Counter />
    </div>
  );
}

export default App;
*/