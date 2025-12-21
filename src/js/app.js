import Game from "./classes/Game.js";

let game = new Game();
game.startGame()

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('creature')) {
    game.handleClick();
  }
});
