// Tetromino shapes and colors for the Tetris game

export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    type: 'I'
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 'J'
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 'L'
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    type: 'O'
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    type: 'S'
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    type: 'T'
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    type: 'Z'
  }
};

export const TETROMINO_COLORS = {
  I: '#00f5ff',
  J: '#0066ff',
  L: '#ff9900',
  O: '#ffff00',
  S: '#00ff00',
  T: '#aa00ff',
  Z: '#ff0000'
};

const TETROMINO_KEYS = Object.keys(TETROMINOS);

export const randomTetromino = () => {
  const randomKey = TETROMINO_KEYS[Math.floor(Math.random() * TETROMINO_KEYS.length)];
  return { ...TETROMINOS[randomKey] };
};

export default TETROMINOS;
