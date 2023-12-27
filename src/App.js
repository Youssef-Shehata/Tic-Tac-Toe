import { useState, useEffect } from 'react';
import './App.css';
import PopUp from './Components/PopUp';


const defaultGrid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];




const calcWin = (grid, i, j) => {
  const current = grid[i][j];
  if (current === '') return false

  if (current === grid[i][(j + 1) % 3] &&
    current === grid[i][(j + 2) % 3] &&
    current === grid[i][(j + 3) % 3]) return true
  if (current === grid[(i + 1) % 3][j] &&
    current === grid[(i + 2) % 3][j] &&
    current === grid[(i + 3) % 3][j]) return true
  const center = grid[1][1]
  if (center) {
    if (grid[0][2] === grid[2][0] && grid[2][0] === center) return true
    if (grid[0][0] === grid[2][2] && grid[2][2] === center) return true
  }
}
const checkDraw = (grid) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === '') {
        return false; // Return false if there is still room to play
      }
    }
  }

  return true; // Return tru if no availabel spots
}

function App() {
  const [playerX, setPlayerX] = useState(true)
  const [draw, setDraw] = useState(false)
  const [won, setWon] = useState(false)
  const [locked, setLocked] = useState(false)

  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);


  const handlePlayAgain = () => {
    // reset everything 
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setPlayerX(true)
    setDraw(false)
    setWon(false)
    setLocked(false)
  }
  const handleClose = () => {
    setDraw(false)
    setWon(false)

  }

  const handlePlay = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex]) return
    if (locked) return
    const newGrid = [...grid];
    const play = playerX ? 'X' : 'O'
    newGrid[rowIndex][colIndex] = play

    setGrid(newGrid)
    // check if won 
    if (calcWin(newGrid, rowIndex, colIndex)) {
      setWon(true)
      setLocked(true)
    }
    // next player turn 
    setPlayerX((prevplayer) => !prevplayer)
  }



  useEffect(() => {
    if (checkDraw(grid) && !won) {
      setDraw(true)
      setLocked(true)
    }


  }, [grid])



  return (
    <div className="App">

      <div className='grid'>
        {won ? (
          <PopUp won={won} x={!playerX} handlePlayAgain={handlePlayAgain} handleClose={handleClose} />
        ) : draw ? (
          <PopUp won={won} x={!playerX} handlePlayAgain={handlePlayAgain} handleClose={handleClose} />
        ) : null}


        {grid && grid.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row && row.map((cell, colIndex) => (
              <div key={colIndex} className='cell' onClick={() => handlePlay(rowIndex, colIndex)}>
                {cell ? cell : " "}

              </div>

            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
