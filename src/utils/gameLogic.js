export function createBoard(width, height) {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => null)
  );
}

export function checkCollision(piece, position, board) {
  if (!piece) return true;

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = position.y + y;
        const boardX = position.x + x;

        if (
          boardY < 0 ||
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length ||
          (board[boardY][boardX] && board[boardY][boardX].merged)
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

export function clearLines(board) {
  let linesCleared = 0;
  const newBoard = board.reduce((acc, row) => {
    if (row.every(cell => cell && cell.merged)) {
      linesCleared++;
      acc.unshift(Array(board[0].length).fill(null));
    } else {
      acc.push(row);
    }
    return acc;
  }, []);

  return { clearedBoard: newBoard, linesCleared };
}

export function rotatePiece(piece) {
  const rotated = {
    ...piece,
    shape: piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    )
  };
  return rotated;
}
