const PopUp = ({ won, x, handlePlayAgain, handleClose }) => {
  // const classname = won ? "won-popup" : "draw-popup"

  const winner = x ? 'X' : 'O';
  const state = won ? `${winner} Won` : 'DRAW'

  return (
    <div className='popup'>
      <span>{state}</span>
      <div className="butt-container">
        <button className={'butt'} onClick={handlePlayAgain}>Play Again</button>
        <button className={'butt'} onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}
export default PopUp