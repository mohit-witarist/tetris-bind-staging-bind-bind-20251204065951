import React, { useState, useEffect, useCallback, useRef } from 'react';
import Board from './Board';
import Controls from './Controls';
import ScorePanel from './ScorePanel';
import { TETROMINOS, randomTetromino } from '../utils/tetrominos';
import { 
  createBoard, 
  checkCollision, 
  clearLines, 
  rotatePiece 
} from '../utils/gameLogic';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_DROP_TIME = 1000;

function Game() {
  const [board, setBoard] = useState(createBoard(BOARD_WIDTH, BOARD_HEIGHT));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);
  
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const startNewGame = useCallback(() => {
    setBoard(createBoard(BOARD_WIDTH, BOARD_HEIGHT));
    setScore(0);
    setLevel(1);
    setLines(0);
    setIsGameOver(false);
    setIsPaused(false);
    setDropTime(INITIAL_DROP_TIME);
    const piece = randomTetromino();
    const next = randomTetromino();
    setCurrentPiece(piece);
    setNextPiece(next);
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const mergePiece = useCallback(() => {
    const newBoard = board.map(row => [...row]);
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = position.y + y;
          const boardX = position.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            newBoard[boardY][boardX] = { type: currentPiece.type, merged: true };
          }
        }
      });
    });
    return newBoard;
  }, [board, currentPiece, position]);

  const spawnNewPiece = useCallback(() => {
    const newBoard = mergePiece();
    const { clearedBoard, linesCleared } = clearLines(newBoard);
    
    if (linesCleared > 0) {
      const points = [0, 100, 300, 500, 800][linesCleared] * level;
      setScore(prev => prev + points);
      setLines(prev => {
        const newLines = prev + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        if (newLevel > level) {
          setLevel(newLevel);
          setDropTime(Math.max(100, INITIAL_DROP_TIME - (newLevel - 1) * 100));
        }
        return newLines;
      });
    }

    setBoard(clearedBoard);
    setCurrentPiece(nextPiece);
    setNextPiece(randomTetromino());
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });

    if (checkCollision(nextPiece, { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }, clearedBoard)) {
      setIsGameOver(true);
    }
  }, [mergePiece, nextPiece, level]);

  const moveDown = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;

    const newPos = { x: position.x, y: position.y + 1 };
    if (!checkCollision(currentPiece, newPos, board)) {
      setPosition(newPos);
    } else {
      spawnNewPiece();
    }
  }, [currentPiece, position, board, isPaused, isGameOver, spawnNewPiece]);

  const moveHorizontal = useCallback((direction) => {
    if (!currentPiece || isPaused || isGameOver) return;
    
    const newPos = { x: position.x + direction, y: position.y };
    if (!checkCollision(currentPiece, newPos, board)) {
      setPosition(newPos);
    }
  }, [currentPiece, position, board, isPaused, isGameOver]);

  const rotate = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    
    const rotated = rotatePiece(currentPiece);
    if (!checkCollision(rotated, position, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, position, board, isPaused, isGameOver]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || isPaused || isGameOver) return;
    
    let newY = position.y;
    while (!checkCollision(currentPiece, { x: position.x, y: newY + 1 }, board)) {
      newY++;
    }
    setPosition({ x: position.x, y: newY });
    setTimeout(() => spawnNewPiece(), 50);
  }, [currentPiece, position, board, isPaused, isGameOver, spawnNewPiece]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isGameOver) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveHorizontal(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveHorizontal(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveDown();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          rotate();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveHorizontal, moveDown, rotate, isGameOver]);

  const animate = useCallback((time) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time;
    }

    const deltaTime = time - previousTimeRef.current;

    if (deltaTime >= dropTime && !isPaused && !isGameOver) {
      moveDown();
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [dropTime, isPaused, isGameOver, moveDown]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
      <div className="order-2 lg:order-1">
        <ScorePanel 
          score={score} 
          level={level} 
          lines={lines}
          nextPiece={nextPiece}
        />
      </div>

      <div className="order-1 lg:order-2 relative">
        <Board 
          board={board} 
          currentPiece={currentPiece} 
          position={position}
        />
        
        {isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center backdrop-blur-sm rounded-2xl">
            <div className="text-center p-8 animate-pulse-slow">
              <h2 className="text-4xl font-bold text-white mb-4">Game Over!</h2>
              <p className="text-xl text-gray-300 mb-2">Final Score: {score}</p>
              <p className="text-lg text-gray-400 mb-6">Level: {level}</p>
              <button
                onClick={startNewGame}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm rounded-2xl">
            <div className="text-center animate-pulse-slow">
              <h2 className="text-4xl font-bold text-white">Paused</h2>
              <p className="text-gray-300 mt-2">Press P to continue</p>
            </div>
          </div>
        )}
      </div>

      <div className="order-3">
        <Controls 
          onMoveLeft={() => moveHorizontal(-1)}
          onMoveRight={() => moveHorizontal(1)}
          onRotate={rotate}
          onHardDrop={hardDrop}
          onPause={() => setIsPaused(!isPaused)}
          isPaused={isPaused}
          isGameOver={isGameOver}
        />
      </div>
    </div>
  );
}

export default Game;
