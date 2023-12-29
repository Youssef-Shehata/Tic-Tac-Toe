const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';

function minimax(board, depth, maximizingPlayer) {


  if (maximizingPlayer) {
    let bestValue = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = PLAYER_X;
          const value = minimax(board, depth - 1, false);
          board[i][j] = EMPTY;
          bestValue = Math.max(bestValue, value);
        }
      }
    }
    return bestValue;
  } else {
    let bestValue = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === EMPTY) {
          board[i][j] = PLAYER_O;
          const value = minimax(board, depth - 1, true);
          board[i][j] = EMPTY;
          bestValue = Math.min(bestValue, value);
        }
      }
    }
    return bestValue;
  }
}



// Example usage:
const initialBoard = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

const bestMove = findBestMove(initialBoard);
console.log('Best Move:', bestMove);

function findBestMove(board) {
  let bestMove = null;
  let bestValue = -Infinity;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === EMPTY) {
        board[i][j] = PLAYER_X;
        const moveValue = minimax(board, 5, false);
        board[i][j] = EMPTY;

        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  return bestMove;
}


export default findBestMove;