import { useState, useEffect } from 'react';
import './App.css';




const PopUp = ({ won, x, hanldeClick }) => {
  const classname = won ? "won-popup" : "draw-popup"

  const winner = x ? 'X' : 'O';
  const state = won ? `${winner} Won` : 'DRAW'

  return (
    <div className={classname}>
      <span>{state}</span>
      <button onClick={hanldeClick}>Play Again</button>
    </div>
  )
}
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

function App() {
  const [grid, setGrid] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [playerX, setPlayerX] = useState(true)
  const [draw, setDraw] = useState(false)
  const [won, setWon] = useState(false)


  const handlePlayAgain = () => {
    setGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    console.log(defaultGrid)
    setPlayerX(true)
    setDraw(false)
    setWon(false)
  }


  const handlePlay = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex]) return
    const newGrid = [...grid];
    const play = playerX ? 'X' : 'O'
    newGrid[rowIndex][colIndex] = play

    setGrid(newGrid)

    if (calcWin(newGrid, rowIndex, colIndex)) setWon(true)
    setPlayerX((prevplayer) => !prevplayer)
  }



  useEffect(() => {
    const checkDraw = () => {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (grid[i][j] === '') {
            return false; // Return false if there is still room to play
          }
        }
      }

      return true; // Return tru if no availabel spots
    }
    setTimeout(() => {
      let draw = checkDraw()
      if (draw && !won) {
        setDraw(true)
      }
    }, 120)


  }, [grid])



  return (
    <div className="App">

      <div className='grid'>
        {won ? (
          <PopUp won={won} x={!playerX} hanldeClick={handlePlayAgain} />
        ) : draw ? (
          <PopUp won={won} x={!playerX} hanldeClick={handlePlayAgain} />
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
