// TODO: write code here

// comment this to pass build
const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
    return `Demo: ${value}`;
}

console.log("app.js included");


import Game from "./classes/Game.js";

if (typeof window !== 'undefined' && document.readyState !== 'loading') {
  initGame();
} else {
  document.addEventListener('DOMContentLoaded', initGame);
}

function initGame() {
  const game = new Game();
  game.startGame();

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('creature')) {
      game.handleClick();
    }
  });
}
