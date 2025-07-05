import React, { useState } from 'react';

function App() {
  // Number of total grid boxes (6x6 = 36)
  const totalCells = 36;
  const columns = 6;

  // Image URLs for each meme
  const shrekUrl = 'https://i.imgflip.com/8ptp2n.png?a486240';
  const sigmaUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgK5GoN5KO1N9vBeToEa5dWOt5H4dLbCtJ1g&s';

  // Creates a random list of 'Shrek' or 'Sigma' for each cell
  const generateRandomGrid = () =>
    Array.from({ length: totalCells }, () =>
      Math.random() < 0.5 ? 'Shrek' : 'Sigma'
    );

  // Returns the image URL based on the meme type
  const getImageUrl = (type) => (type === 'Shrek' ? shrekUrl : sigmaUrl);

  // Holds what meme is in each cell (Shrek or Sigma)
  const [cellImages, setCellImages] = useState(generateRandomGrid());

  // Keeps track of which cells have been clicked already
  const [clickedCells, setClickedCells] = useState(Array(totalCells).fill(false));

  // Stores the player's chosen meme type
  const [playerChoice, setPlayerChoice] = useState(null);

  // Tracks if the game is over (player clicked wrong meme)
  const [gameOver, setGameOver] = useState(false);

  // When the player chooses either Shrek or Sigma
  const handleChoice = (choice) => {
    setPlayerChoice(choice); // Save the chosen meme
    setCellImages(generateRandomGrid()); // Shuffle meme types on the board
    setClickedCells(Array(totalCells).fill(false)); // Reset clicked cells
    setGameOver(false); // Start new game
  };

  // When a cell is clicked
  const handleCellClick = (index) => {
    // If it's already clicked or game is over, do nothing
    if (clickedCells[index] || gameOver) return;

    // Mark the cell as clicked
    const updated = [...clickedCells];
    updated[index] = true;
    setClickedCells(updated);

    // If player clicked the wrong meme, end the game
    if (cellImages[index] !== playerChoice) {
      setGameOver(true);
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Meme Game!</h1>

      {/* Show meme choices at the start */}
      {!playerChoice && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          {/* Clickable Shrek image */}
          <img
            src={shrekUrl}
            alt="Choose Shrek"
            onClick={() => handleChoice('Shrek')}
            style={{ width: '200px', cursor: 'pointer', borderRadius: '12px' }}
          />
          {/* Clickable Sigma image */}
          <img
            src={sigmaUrl}
            alt="Choose Sigma"
            onClick={() => handleChoice('Sigma')}
            style={{ width: '200px', cursor: 'pointer', borderRadius: '12px' }}
          />
        </div>
      )}

      {/* Once meme is chosen, show the game board */}
      {playerChoice && (
        <>
          {/* Show result or status */}
          {gameOver ? (
            <h2 style={{ color: 'red' }}>Game Over! You clicked the wrong meme.</h2>
          ) : (
            <h2>You chose: {playerChoice}</h2>
          )}

          {/* Grid of meme cells */}
          <table
            style={{
              margin: '0 auto',
              borderCollapse: 'collapse',
              border: '2px solid #444',
            }}
          >
            <tbody>
              {/* Loop over rows */}
              {[...Array(totalCells / columns)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Loop over columns in each row */}
                  {[...Array(columns)].map((_, colIndex) => {
                    const index = rowIndex * columns + colIndex;
                    return (
                      <td
                        key={colIndex}
                        onClick={() => handleCellClick(index)}
                        style={{
                          border: '1px solid #999',
                          width: '80px',
                          height: '80px',
                          backgroundColor: clickedCells[index] ? '#fff' : '#ccc',
                          cursor: clickedCells[index] || gameOver ? 'default' : 'pointer',
                          position: 'relative',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                        }}
                      >
                        {/* Show cell number in the center BEFORE it is clicked */}
                        {!clickedCells[index] && (
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                              fontSize: '20px',
                              fontWeight: 'bold',
                              color: '#333',
                              pointerEvents: 'none',
                            }}
                          >
                            {index + 1}
                          </div>
                        )}

                        {/* Show meme image AFTER cell is clicked */}
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

          {/* Show replay button if game ended */}
          {gameOver && (
            <button
              onClick={() => setPlayerChoice(null)} // Go back to meme selection
              style={{ marginTop: '20px', padding: '10px 20px' }}
            >
              Play Again
            </button>
          )}
        </>
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
