// Game logic utilities for the Tetris game

export const createBoard = (width, height) => {
  return Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ type: null, merged: false }))
  );
};

export const checkCollision = (piece, position, board) => {
  if (!piece || !piece.shape) return false;
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = position.y + y;
        const boardX = position.x + x;
        
        // Check boundaries
        if (
          boardX < 0 ||
          boardX >= board[0].length ||
          boardY >= board.length
        ) {
          return true;
        }
        
        // Check collision with merged pieces (only if within board)
        if (boardY >= 0 && board[boardY][boardX] && board[boardY][boardX].merged) {
          return true;
        }
      }
    }
  }
  
  return false;
};

export const clearLines = (board) => {
  let linesCleared = 0;
  const clearedBoard = board.filter(row => {
    const isComplete = row.every(cell => cell.type !== null && cell.merged);
    if (isComplete) {
      linesCleared++;
      return false;
    }
    return true;
  });
  
  // Add empty rows at the top
  while (clearedBoard.length < board.length) {
    clearedBoard.unshift(
      Array.from({ length: board[0].length }, () => ({ type: null, merged: false }))
    );
  }
  
  return { clearedBoard, linesCleared };
};

export const rotatePiece = (piece) => {
  if (!piece || !piece.shape) return piece;
  
  const shape = piece.shape;
  const rows = shape.length;
  const cols = shape[0].length;
  
  // Create rotated shape (90 degrees clockwise)
  const rotated = [];
  for (let x = 0; x < cols; x++) {
    const newRow = [];
    for (let y = rows - 1; y >= 0; y--) {
      newRow.push(shape[y][x]);
    }
    rotated.push(newRow);
  }
  
  return {
    ...piece,
    shape: rotated
  };
};

export default {
  createBoard,
  checkCollision,
  clearLines,
  rotatePiece
};
