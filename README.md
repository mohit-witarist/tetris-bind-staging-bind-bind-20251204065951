# 🎮 Tetris Game

A modern, fully-featured Tetris game built with React, featuring smooth animations, dark mode, and responsive design.

![Tetris Game](https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=600&fit=crop&q=80)

## ✨ Features

- 🎯 **Classic Tetris Gameplay** - All 7 standard tetromino pieces (I, O, T, S, Z, J, L)
- 🌓 **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- 📊 **Score & Level System** - Progressive difficulty with increasing speed
- 🎨 **Modern UI/UX** - Clean design with Tailwind CSS
- ⌨️ **Keyboard Controls** - Intuitive arrow key and space bar controls
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- ⏸️ **Pause Functionality** - Pause and resume gameplay anytime
- 🔄 **Smooth Animations** - Polished animations and transitions
- 🎵 **Next Piece Preview** - See what's coming next

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tetris-game.git
cd tetris-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎮 How to Play

### Keyboard Controls

- **Arrow Left (←)** - Move piece left
- **Arrow Right (→)** - Move piece right
- **Arrow Up (↑) / Space** - Rotate piece
- **Arrow Down (↓)** - Soft drop (move piece down faster)
- **P** - Pause/Resume game

### Game Rules

1. Tetromino pieces fall from the top of the board
2. Arrange pieces to create complete horizontal lines
3. Complete lines are cleared and earn you points
4. Game speed increases with each level
5. Game ends when pieces stack to the top

### Scoring System

- **Single Line**: 100 × Level
- **Double Lines**: 300 × Level
- **Triple Lines**: 500 × Level
- **Tetris (4 Lines)**: 800 × Level

## 🛠️ Built With

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
tetris-game/
├── src/
│   ├── components/
│   │   ├── Game.jsx          # Main game logic and state
│   │   ├── Board.jsx          # Game board rendering
│   │   ├── Controls.jsx       # Control buttons
│   │   ├── ScorePanel.jsx     # Score, level, and next piece display
│   │   └── ThemeToggle.jsx    # Dark/light mode toggle
│   ├── utils/
│   │   ├── tetrominos.js      # Tetromino definitions
│   │   └── gameLogic.js       # Core game logic functions
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Customization

### Changing Colors

Edit the Tailwind CSS classes in `src/index.css` to customize piece colors:

```css
.cell-I { @apply bg-cyan-400 border-cyan-500; }
.cell-O { @apply bg-yellow-400 border-yellow-500; }
/* Add your custom colors here */
```

### Adjusting Difficulty

Modify game parameters in `src/components/Game.jsx`:

```javascript
const INITIAL_DROP_TIME = 1000; // Starting drop speed in ms
const BOARD_WIDTH = 10;         // Board width
const BOARD_HEIGHT = 20;        // Board height
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
npm run build
vercel --prod
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/tetris-game](https://github.com/yourusername/tetris-game)

## 🙏 Acknowledgments

- Classic Tetris game design
- React community for excellent tools
- Tailwind CSS for beautiful styling
- Lucide React for clean icons

---

Made with ❤️ and React
