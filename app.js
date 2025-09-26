class MemoryGame {
  constructor() {
    this.scoreCard = document.querySelector(".score");
    this.reset = document.querySelector(".reset-btn");
    this.gameBoard = document.querySelector(".board");
    this.checkBox = document.querySelectorAll("input");
    this.score = 0;
    this.firstPick = null;
  }

  gameMechanics(e, card) {
    // flip card
    card.classList.toggle("flipped", card.checked);

    // compare click card
    const targetCard = e.target.closest(".card").dataset.card;

    if (this.firstPick === null) {
      this.firstPick = { element: card, value: targetCard };
    } else {
      if (this.firstPick.value === targetCard) {
        console.log("Match");
        this.firstPick.element.disabled = true;
        card.disabled = true;

        this.score++;
        this.scoreCard.textContent = `Score: ${this.score}`;
      } else {
        console.log("Not a match");

        // keep a local copy of the first card before nulling it
        const firstPickElement = this.firstPick.element;

        setTimeout(() => {
          firstPickElement.classList.remove("flipped");
          firstPickElement.checked = false;
          card.classList.remove("flipped");
          card.checked = false;
        }, 1000);
      }
      this.firstPick = null;
    }
  }

  shuffleCard(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    const board = document.querySelector(".board");
    for (const card of array) {
      board.appendChild(card);
      card.firstElementChild.checked = false;
      card.firstElementChild.disabled = false;
      card.classList.remove("flipped");
      const input = card.querySelector("input");

      input.checked = false;

      input.classList.remove("flipped");

      card.classList.remove("flipped");

      input.disabled;
      this.score = 0;
      this.scoreCard.textContent = `Score: ${this.score}`;
    }
  }

  addEventListeners() {
    this.reset.addEventListener("click", () =>
      this.shuffleCard(Array.from(this.gameBoard.children))
    );

    this.checkBox.forEach((card) => {
      card.addEventListener("change", (e) => {
        this.gameMechanics(e, card);
      });
    });
  }
}

const memoryGame = new MemoryGame();
memoryGame.addEventListeners();
