import goblin from "../../img/goblin.png";

export default class Creature {
  constructor() {
    this.element = null;
    this.currentHole = null;
    this.wasHit = false;
  }

  createElement() {
    if (!this.element) {
      const img = document.createElement("img");
      img.src = goblin;
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

    holeElement.append(this.element);

    this.currentHole = holeElement;
    this.element.style.display = "block";
    this.wasHit = false;
  }

  hideElement() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }

  hit() {
    this.wasHit = true;
    this.hideElement();
  }

  isVisible() {
    return this.element && this.element.style.display === "block";
  }
}
