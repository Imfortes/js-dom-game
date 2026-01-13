export default class Board {
  constructor(size = 4) {
    this.size = size;
  }

  create() {
    const boardEl = document.createElement("div");
    boardEl.className = "board";

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const holeEl = document.createElement("div");
        holeEl.className = "hole";
        holeEl.dataset.x = j;
        holeEl.dataset.y = i;
        boardEl.appendChild(holeEl);
      }
    }

    return boardEl;
  }
}
