import Timer from "./Timer";
import Board from "./Board";
import Creature from "./Creature";

export default class Game {
  constructor() {
    this.activeCreature = null;
    this.score = 0;
    this.misses = 0;
    this.timer = null;
    this.board = null;
    this.spawnInterval = null;
    this.timeDisplay = null;
    this.scoreDisplay = null;
  }

  createUI() {
    const app = document.getElementById("app");

    const hud = document.createElement("div");
    hud.className = "game-hud";

    this.scoreDisplay = document.createElement("div");
    this.scoreDisplay.className = "score";
    this.scoreDisplay.textContent = "Счёт: 0";

    this.missesDisplay = document.createElement("div");
    this.missesDisplay.className = "misses";
    this.missesDisplay.textContent = "Промахи: 0";

    this.timeDisplay = document.createElement("div");
    this.timeDisplay.className = "timer";
    this.timeDisplay.textContent = "Время: 60";

    hud.append(this.scoreDisplay);
    hud.append(this.missesDisplay);
    hud.append(this.timeDisplay);
    app.append(hud);
  }

  updateScoreUI() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = `Счёт: ${this.score}`;
    }
  }

  updateMissesUI() {
    if (this.missesDisplay) {
      this.missesDisplay.textContent = `Промахи: ${this.misses}`;
    }
  }

  updateTimeUI(seconds) {
    if (this.timeDisplay) {
      this.timeDisplay.textContent = `Время: ${seconds}`;
    }
  }

  isHoleWithCreature(holeElement) {
    return holeElement.querySelector(".creature") !== null;
  }

  getRandomEmptyHole() {
    const holes = Array.from(document.querySelectorAll(".hole"));
    const emptyHoles = holes.filter((hole) => !this.isHoleWithCreature(hole));
    if (emptyHoles.length === 0) {
      return holes[Math.floor(Math.random() * holes.length)];
    }
    return emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
  }

  startGame() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    this.createUI();

    this.board = new Board();
    const boardEl = this.board.create();

    boardEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('creature')) {
        this.handleHit();
      }
    });

    app.append(boardEl);

    this.activeCreature = new Creature();
    const firstHole = this.getRandomEmptyHole();
    this.activeCreature.insertElement(firstHole);

    this.timer = new Timer();
    this.timer.start(60);

    this.timer.onTick((remaining) => {
      this.updateTimeUI(remaining);
    });

    this.timer.onTimeUp(() => {
      this.endGame();
    });

    this.spawnInterval = setInterval(() => {
      this.spawnRandomCreature();
    }, 1000);
  }

  spawnRandomCreature() {
    if (this.activeCreature) {
      if (this.activeCreature.isVisible() && !this.activeCreature.wasHit) {
        this.registerMiss();
      }
    }

    if (!this.activeCreature) {
      this.activeCreature = new Creature();
    }

    const newHole = this.getRandomEmptyHole();
    this.activeCreature.insertElement(newHole);

    setTimeout(() => {
      if (this.activeCreature && this.activeCreature.currentHole === newHole) {
        if (!this.activeCreature.wasHit) {
          this.registerMiss();
        }
        this.activeCreature.hideElement();
      }
    }, 1000);
  }

  handleClick() {
    if (this.activeCreature && this.activeCreature.isVisible()) {
      this.activeCreature.hideElement();
      this.score += 1;
      console.log("Попадание! Счёт:", this.score);

      this.updateScoreUI();
    } else {

    }
  }

  handleHit() {
    if (this.activeCreature && this.activeCreature.isVisible()) {
      this.activeCreature.hit();
      this.score += 1;
      this.updateScoreUI();
    }
  }

  registerMiss() {
    this.misses += 1;
    this.updateMissesUI();

    if (this.misses >= 5) {
      this.endGame('misses');
    }
  }

  endGame() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
    if (this.timer) {
      this.timer.stop();
    }
    alert(`Игра окончена! Ваш счёт: ${this.score}! Количество промахов: ${this.misses}`);
  }
}
