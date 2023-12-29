const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = '';

function findBestMove(grid, player) {
  const opponent = (player === PLAYER_X) ? PLAYER_O : PLAYER_X;

  let bestMove = null;
  let bestValue = -Infinity;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === EMPTY) {
        grid[i][j] = player;
        const moveValue = minimax(grid, 5, false, opponent);
        grid[i][j] = EMPTY;

        if (moveValue > bestValue) {
          bestValue = moveValue;
          bestMove = { row: i, col: j };
        }
      }
    }
  }

  return bestMove;
}

function minimax(grid, depth, maximizingPlayer, currentPlayer) {
  const opponent = (currentPlayer === PLAYER_X) ? PLAYER_O : PLAYER_X;

  if (depth === 0 || checkWinner(grid) !== null) {
    return evaluate(grid);
  }

  if (maximizingPlayer && currentPlayer === PLAYER_X) {
    let bestValue = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === EMPTY) {
          grid[i][j] = currentPlayer;
          const value = minimax(grid, depth - 1, false, opponent);
          grid[i][j] = EMPTY;
          bestValue = Math.max(bestValue, value);
        }
      }
    }
    return bestValue;
  } else if (!maximizingPlayer && currentPlayer === PLAYER_O) {
    let bestValue = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === EMPTY) {
          grid[i][j] = currentPlayer;
          const value = minimax(grid, depth - 1, true, opponent);
          grid[i][j] = EMPTY;
          bestValue = Math.min(bestValue, value);
        }
      }
    }
    return bestValue;
  }
}

function checkWinner(grid) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== EMPTY) {
      return grid[i][0];
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j] && grid[0][j] !== EMPTY) {
      return grid[0][j];
    }
  }

  // Check diagonals
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[0][0] !== EMPTY) {
    return grid[0][0];
  }
  if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] && grid[0][2] !== EMPTY) {
    return grid[0][2];
  }

  return null; // No winner yet
}

function evaluate(grid) {
  const winner = checkWinner(grid);
  if (winner === PLAYER_X) {
    return 1;
  } else if (winner === PLAYER_O) {
    return -1;
  } else {
    return 0;
  }
}

// Example usage:
const initialBoard = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

export default findBestMove;
