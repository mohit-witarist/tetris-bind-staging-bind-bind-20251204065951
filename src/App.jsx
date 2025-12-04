import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import ThemeToggle from './components/ThemeToggle';
import { Gamepad2 } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-bounce-slow" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
              Tetris
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Classic puzzle game with modern design
          </p>
        </header>

        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        <Game />

        <footer className="text-center mt-12 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Use Arrow Keys to move, Space to rotate, P to pause
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
