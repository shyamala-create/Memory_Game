(() => {
  let flipCards = document.querySelector(".flipCards");
  let colorPairs = [
    "red",
    "blue",
    "green",
    "orange",
    "yellow",
    "gray",
    "purple",
    "brown",
    "pink",
    "cyan",
  ];
  let colors = shuffle([...colorPairs, ...colorPairs]);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;

  for (let i = 0; i < 20; i++) {
    let card = document.createElement("button");
    flipCards.appendChild(card);

    card.classList.add("cardLists");
    card.style.width = "150px";
    card.style.height = "150px";
    card.dataset.color = colors[i];

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("flipped") || card === firstCard)
        return;
      card.textContent = card.dataset.color;
      card.style.background = card.dataset.color;
      card.classList.add("flipped");
      if (!firstCard) {
        firstCard = card;
        return;
      }
      secondCard = card;
      lockBoard = true;
      if (firstCard.dataset.color === secondCard.dataset.color) {
        firstCard.classList.add("Matched");
        secondCard.classList.add("Matched");
        firstCard.style.background = "linear-gradient(135deg, #38a169, #9ae6b4)";
        firstCard.style.boxShadow = "0 0 10px 4px rgba(197, 239, 197, 0.6)";
        secondCard.style.background = "linear-gradient(135deg, #38a169, #9ae6b4)";
        secondCard.style.boxShadow = "0 0 10px 4px rgba(197, 239, 197, 0.6)";

        firstCard.textContent = `${firstCard.dataset.color} Matched`;
        secondCard.textContent = `${secondCard.dataset.color} Matched`;

        resetFlip();

        if(document.querySelectorAll(".Matched").length === 20){
          setTimeout(() => {
            alert("You win! all pairs matched");
          }, 3000)
        }
      } else {
        setTimeout(() => {
          firstCard.textContent = "";
          secondCard.textContent = "";
          firstCard.style.background = "";
          secondCard.style.background = "";
          firstCard.classList.remove("flipped");
          secondCard.classList.remove("flipped");
          resetFlip();
        }, 1000);
      }
    });
    flipCards.appendChild(card);
  }
  console.log(flipCards);

  function resetFlip() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
})();

function shuffle(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    const j = Math.floor(Math.random() * (i * 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function restart() {
  let refill = document.querySelector(".flipCards");
  console.log(refill);
  for (let i = 0; i < 20; i++) {
    refill.children[i].textContent = "";
    refill.children[i].style.background = null;
    refill.children[i].classList.remove("matched", "flipped");
  }
}
