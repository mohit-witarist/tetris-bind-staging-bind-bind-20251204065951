import React from 'react';
import { Trophy, Layers, Target } from 'lucide-react';

function ScorePanel({ score, level, lines, nextPiece }) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Statistics
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Score</span>
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{score}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Level
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{level}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Lines
            </span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{lines}</span>
          </div>
        </div>
      </div>

      {nextPiece && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Next Piece</h3>
          <div className="flex justify-center">
            <div 
              className="grid gap-1 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              style={{
                gridTemplateColumns: `repeat(4, 1fr)`,
                gridTemplateRows: `repeat(4, 1fr)`
              }}
            >
              {[...Array(4)].map((_, y) =>
                [...Array(4)].map((_, x) => {
                  const cell = nextPiece.shape[y] && nextPiece.shape[y][x];
                  return (
                    <div
                      key={`${y}-${x}`}
                      className={`
                        w-6 h-6 rounded-sm transition-all duration-150
                        ${cell ? `cell-filled cell-${nextPiece.type}` : 'bg-transparent'}
                      `}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScorePanel;
