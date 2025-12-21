import Game from './classes/Game.js';

describe('Game', () => {
  test('should create board with 16 holes', () => {
    const game = new Game();
    game.startGame();
    const holes = document.querySelectorAll('.hole');
    expect(holes.length).toBe(16);
  });

  test('should spawn creature in random hole', () => {
    const game = new Game();
    game.startGame();
  });
});
