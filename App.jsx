import React, { useState, useEffect } from 'react';
import './App.css';
import Cell from './Cell';

const App = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [solving, setSolving] = useState(false); // To track if the solver is running

  const handleInputChange = (row, col, value) => {
    if (!solving && (value === '' || /^[1-9]$/.test(value))) {
      const newGrid = [...grid];
      newGrid[row][col] = value === '' ? '' : parseInt(value, 10);
      setGrid(newGrid);
    }
  };

  // Async backtracking solver with animation
  const solveSudokuWithAnimation = async () => {
    setSolving(true); // Disable interactions
    const newGrid = [...grid];
    if (await solveSudokuHelper(newGrid)) {
      setGrid(newGrid);
    } else {
      alert('No solution exists for the given puzzle!');
    }
    setSolving(false); // Re-enable interactions
  };

  // Function to add delay for animations
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper function for Sudoku solving with animation
  const solveSudokuHelper = async (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === '') {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              setGrid([...grid]); // Update the grid state
              await sleep(100);  // Add delay to simulate animation
              if (await solveSudokuHelper(grid)) {
                return true;
              }
              grid[row][col] = ''; // Backtrack
              setGrid([...grid]); // Update grid state for backtracking
              await sleep(100); // Add delay for backtracking animation
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isSafe = (grid, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (grid[row][x] === num || grid[x][col] === num || grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
        return false;
      }
    }
    return true;
  };

  const resetGrid = () => {
    if (!solving) {
      setGrid(Array(9).fill().map(() => Array(9).fill('')));
    }
  };

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                value={cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={solveSudokuWithAnimation} disabled={solving}>
          {solving ? 'Solving...' : 'Solve'}
        </button>
        <button onClick={resetGrid} disabled={solving}>Reset</button>
      </div>
    </div>
  );
};

export default App;
