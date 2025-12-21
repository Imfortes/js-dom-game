export default class Board {
  constructor() {}

  create(size = 4) {
    const boardEl = document.createElement("div");
    boardEl.className = "board";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
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
