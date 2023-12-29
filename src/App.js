import { useState, useEffect } from 'react';
import './App.css';
import PopUp from './Components/PopUp';
import findBestMove from './MinMax';


const defaultGrid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];




const calcWin = (grid, i, j) => {
  const current = grid[i][j];
  if (current === '') return false


  // check for 3 repeating values in each row or column
  if (current === grid[i][(j + 1) % 3] &&
    current === grid[i][(j + 2) % 3] &&
    current === grid[i][(j + 3) % 3]) return true
  if (current === grid[(i + 1) % 3][j] &&
    current === grid[(i + 2) % 3][j] &&
    current === grid[(i + 3) % 3][j]) return true

  // check for if there is a value in the centere and if so check the corners for 3 repeating valiues 

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
  const [playerX, setPlayerX] = useState(false)
  const [draw, setDraw] = useState(false)
  const [won, setWon] = useState(false)
  const [locked, setLocked] = useState(false)
  const [playing, setPlaying] = useState(false)


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
    setPlaying(false)
  }

  const handleClose = () => {
    setDraw(false)
    setWon(false)
  }

  const handlePlay = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex]) return

    if (locked) return
    setPlaying(true)
    const newGrid = [...grid];
    const play = playerX ? 'X' : 'O'
    newGrid[rowIndex][colIndex] = play

    setGrid(newGrid)
    // check if won 
    if (calcWin(newGrid, rowIndex, colIndex)) {
      setWon(true)
      setLocked(true)
    }



    // check if draw  
    if (checkDraw(grid) && !won) {
      setDraw(true)
      setLocked(true)
    }
    // next player turn 
    // let move = findBestMove(grid)
    // console.log(move)
    setPlayerX((prevplayer) => !prevplayer)
  }

  const handleSwitch = () => {
    if (playing) return

    setPlayerX((prevplayer) => !prevplayer)

  }


  return (
    <div>
      <div className='header'>
        <span className={"char" + (playerX ? ' active' : '')} onClick={handleSwitch}>X</span>/
        <span className={"char" + (!playerX ? ' active' : '')} onClick={handleSwitch}>O</span>


      </div>
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
    </div>
  );
}

export default App;
