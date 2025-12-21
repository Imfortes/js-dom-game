import Game from "./classes/Game.js";

describe("Game", () => {
  beforeEach(() => {
    const appDiv = document.createElement("div");
    appDiv.id = "app";
    document.body.appendChild(appDiv);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  test("should create board with 16 holes", () => {
    const game = new Game();
    game.startGame();
    expect(document.querySelectorAll(".hole").length).toBe(16);
  });

  test("should spawn creature", () => {
    const game = new Game();
    game.startGame();
    expect(document.querySelector(".creature")).not.toBeNull();
  });
});
