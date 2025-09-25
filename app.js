class MemoryGame {
  constructor() {
    this.scoreCard = document.querySelector(".score");
    this.reset = document.querySelector(".reset-btn");
    this.gameBoard = document.querySelector(".board");
    this.checkBox = document.querySelectorAll("input");
    this.score = 0;
    this.firstPick = null;
  }

  gameMechanics(card) {
    // flip card
    card.classList.toggle("flipped", card.checked);

    // compare click card
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
      card.addEventListener("change", (e) => {
        this.gameMechanics(card);
        const targetCard = e.target.closest(".card").dataset.card;

        if (this.firstPick === null) {
          this.firstPick = { element: card, value: targetCard };
        } else {
          if (this.firstPick.value === targetCard) {
            console.log("Match");
            this.score++;
            this.scoreCard.textContent = this.score;
          } else {
            console.log("Not a match");

            // keep a local copy of the first card before nulling it
            const firstPickElement = this.firstPick.element;

            setTimeout(() => {
              firstPickElement.classList.remove("flipped");
              firstPickElement.checked = false;
              card.classList.remove("flipped");
              card.checked = false;
            }, 1500);
          }
          this.firstPick = null;
        }
      });
    });
  }
}

const memoryGame = new MemoryGame();
memoryGame.addEventListeners();
