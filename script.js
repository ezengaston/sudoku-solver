const board = [
  [4, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 8, 0, 0, 0],
  [0, 0, 6, 7, 9, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 9],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [3, 2, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 2, 3, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 4, 0],
];

function nextEmptyPosition(board) {
  for (let i = 0; i < board.length; i++) {
    for (let y = 0; y < board.length; y++) {
      if (board[i][y] === 0) {
        return [i, y];
      }
    }
  }
  return [-1, -1];
}

function checkRow(board, row, value) {
  for (let i = 0; i < board.length; i++) {
    if (board[row][i] === value) {
      return false;
    }
  }
  return true;
}

function checkColumn(board, column, value) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][column] === value) {
      return false;
    }
  }
  return true;
}

function checkSquare(board, column, row, value) {
  const boxRow = Math.floor(row / 3) * 3;
  const boxColumn = Math.floor(column / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      if (board[i + boxRow][y + boxColumn] === value) {
        return false;
      }
    }
  }
  return true;
}

function checkValue(board, row, column, value) {
  if (
    checkRow(board, row, value) &&
    checkColumn(board, column, value) &&
    checkSquare(board, column, row, value)
  ) {
    return true;
  }
  return false;
}

function solve(board) {
  let emptyPosition = nextEmptyPosition(board);
  let row = emptyPosition[0];
  let column = emptyPosition[1];

  if (row === -1) {
    return;
  }

  for (let i = 1; i <= 9; i++) {
    if (checkValue(board, row, column, i)) {
      board[row][column] = i;
      solve(board);
    }
  }

  if (nextEmptyPosition(board)[0] !== -1) {
    board[row][column] = 0;
  }

  return board;
}

console.log(solve(board));
