import Timer from './Timer'
import Board from './Board'
import Creature from './Creature'

export default class Game {
  constructor() {
    this.activeCreature = null;
    this.score = 0;
    this.timer = null;
    this.board = null;
    this.spawnInterval = null;
    this.timeDisplay = null;
    this.scoreDisplay = null;
  }

  createUI() {
    const app = document.getElementById('app');

    const hud = document.createElement('div');
    hud.className = 'game-hud';

    this.scoreDisplay = document.createElement('div');
    this.scoreDisplay.className = 'score';
    this.scoreDisplay.textContent = 'Счёт: 0';

    this.timeDisplay = document.createElement('div');
    this.timeDisplay.className = 'timer';
    this.timeDisplay.textContent = 'Время: 60';

    hud.appendChild(this.scoreDisplay);
    hud.appendChild(this.timeDisplay);
    app.appendChild(hud);
  }

  updateScoreUI() {
    if (this.scoreDisplay) {
      this.scoreDisplay.textContent = `Счёт: ${this.score}`;
    }
  }

  updateTimeUI(seconds) {
    if (this.timeDisplay) {
      this.timeDisplay.textContent = `Время: ${seconds}`;
    }
  }

  getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
  }

  isHoleWithCreature(holeElement) {
    return holeElement.querySelector('.creature') !== null;
  }

  getRandomEmptyHole() {
    const holes = Array.from(document.querySelectorAll('.hole'));
    const emptyHoles = holes.filter(hole => !this.isHoleWithCreature(hole));
    if (emptyHoles.length === 0) {
      return holes[Math.floor(Math.random() * holes.length)];
    }
    return emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
  }


  startGame() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    this.createUI();

    this.board = new Board();
    const boardEl = this.board.create();
    app.appendChild(boardEl);

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
    }, 2000);
  }

  spawnRandomCreature() {
    this.activeCreature.hideElement();

    const newHole = this.getRandomEmptyHole();

    this.activeCreature.insertElement(newHole);

    setTimeout(() => {
      if (this.activeCreature && this.activeCreature.currentHole === newHole) {
        this.activeCreature.hideElement();
      }
    }, 1500);
  }

  handleClick() {
    if (this.activeCreature && this.activeCreature.isVisible()) {
      this.activeCreature.hideElement();
      this.score += 10;
      console.log('Попадание! Счёт:', this.score);

      this.updateScoreUI()

      // this.spawnRandomCreature();
    }
  }

  endGame() {
    if (this.spawnInterval) {
      clearInterval(this.spawnInterval);
    }
    if (this.timer) {
      this.timer.stop();
    }
    alert(`Игра окончена! Ваш счёт: ${this.score}`);
  }


}
