import Game from "./classes/Game.js";

if (typeof window !== "undefined" && document.readyState !== "loading") {
  initGame();
} else {
  document.addEventListener("DOMContentLoaded", initGame);
}

function initGame() {
  const game = new Game();
  game.startGame();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("creature")) {
      game.handleClick();
    }
  });
}
