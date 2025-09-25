class MemoryGame {
  constructor() {
    this.scoreCard = document.querySelector(".score");
    this.reset = document.querySelector(".reset-btn");
    this.gameBoard = document.querySelector(".board");
    this.checkBox = document.querySelectorAll("input");
    this.score = 0;
  }

  gameMechanics(card) {
    // flip card
    card.classList.toggle("flipped", card.checked);
  }

  shuffleCard(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    for (const card of array) {
      document.querySelector(".board").appendChild(card);
    }
  }
  addEventListeners() {
    this.reset.addEventListener("click", () =>
      this.shuffleCard(Array.from(this.gameBoard.children))
    );

    this.checkBox.forEach((card) => {
      card.addEventListener("change", () => this.gameMechanics(card));
    });
  }
}

const memoryGame = new MemoryGame();
memoryGame.addEventListeners();
