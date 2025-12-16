import Timer from './Timer'
import Board from './Board'
import Creature from './Creature'

export default class Game {
  constructor() {

  }

  getRandomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
  }

  startGame() {
    this.counter = 0
    this.timer = new Timer();
    this.board = new Board();
    const board = this.board.create()

    const app = document.getElementById('app');
    app.append(board);
    console.log(board)

    let activeCreature = new Creature();

    const randomHole = this.getRandomHole();
    activeCreature.insertElement(randomHole);
  }

  updateBoard() {
    let activeCreature = new Creature();
    setInterval(() => {
      const randomHole = this.getRandomHole();
      activeCreature.insertElement(randomHole);
    }, 4000)
  }








}
