export default class Creature {
  constructor() {
    this.element = null;
    this.currentHole = null;
  }

  createElement() {
    if (!this.element) {
      const img = document.createElement("img");
      img.src =
        "https://raw.githubusercontent.com/netology-code/ahj-homeworks/AHJ-50/dom/pic/goblin.png";
      img.alt = "Goblin";
      img.classList.add("creature");
      this.element = img;
      return img;
    }
    return this.element;
  }

  insertElement(holeElement) {
    this.createElement();

    if (this.currentHole && this.currentHole !== holeElement) {
      this.hideElement();
    }

    holeElement.appendChild(this.element);

    this.currentHole = holeElement;
    this.element.style.display = "block";
  }

  hideElement() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }

  isVisible() {
    return this.element && this.element.style.display === "block";
  }
}
