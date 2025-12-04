import React from 'react';

function Board({ board, currentPiece, position }) {
  const renderBoard = () => {
    const displayBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            const boardY = position.y + y;
            const boardX = position.x + x;
            if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
              displayBoard[boardY][boardX] = { type: currentPiece.type, merged: false };
            }
          }
        });
      });
    }

    return displayBoard;
  };

  const displayBoard = renderBoard();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl transition-all duration-300">
      <div 
        className="grid gap-[2px] p-2 bg-gray-200 dark:bg-gray-700 rounded-xl"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`
                w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-sm transition-all duration-150
                ${cell.type ? `cell-filled cell-${cell.type}` : 'cell-empty'}
                ${cell.merged ? 'shadow-inner' : 'shadow-sm'}
              `}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
