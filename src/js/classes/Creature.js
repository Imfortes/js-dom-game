export default class Creature {
  constructor(count = 1) {
    this.element = null;
  }

  createElement() {
    const img = document.createElement('img');
    img.src = 'https://raw.githubusercontent.com/netology-code/ahj-homeworks/AHJ-50/dom/pic/goblin.png';
    img.alt = 'Goblin';
    img.classList.add('creature');
    this.element = img;
    return img;
  }

  insertElement(holeElement) {
    this.clearBoard()

    if (!this.element) {
      this.createElement();
    }

    holeElement.appendChild(this.element);
    this.currentHole = holeElement;
    this.element.style.display = 'block';
  }

  clearBoard() {
    document.querySelectorAll('.creature').forEach((element) => {element.remove()});
  }
}
