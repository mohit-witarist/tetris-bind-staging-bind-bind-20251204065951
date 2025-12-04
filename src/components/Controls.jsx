import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw, ArrowDown, Pause, Play } from 'lucide-react';

function Controls({ onMoveLeft, onMoveRight, onRotate, onHardDrop, onPause, isPaused, isGameOver }) {
  const buttonClass = "p-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
        Controls
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onClick={onRotate}
            disabled={isGameOver}
            className={buttonClass}
            aria-label="Rotate"
          >
            <RotateCw className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
          </button>
          <div></div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={onMoveLeft}
            disabled={isGameOver}
            className={buttonClass}
            aria-label="Move Left"
          >
            <ArrowLeft className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
          </button>
          <button
            onClick={onHardDrop}
            disabled={isGameOver}
            className={buttonClass}
            aria-label="Hard Drop"
          >
            <ArrowDown className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto" />
          </button>
          <button
            onClick={onMoveRight}
            disabled={isGameOver}
            className={buttonClass}
            aria-label="Move Right"
          >
            <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
          </button>
        </div>

        <button
          onClick={onPause}
          disabled={isGameOver}
          className={`${buttonClass} w-full flex items-center justify-center gap-2`}
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? (
            <>
              <Play className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-gray-800 dark:text-white font-medium">Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-gray-800 dark:text-white font-medium">Pause</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Keyboard Shortcuts
        </h4>
        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <li>← → Move horizontally</li>
          <li>↑ / Space: Rotate</li>
          <li>↓ Soft drop</li>
          <li>P: Pause/Resume</li>
        </ul>
      </div>
    </div>
  );
}

export default Controls;
