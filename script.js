"use strict";
let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 30;
let highscore = window.localStorage.getItem("highscore");
document.querySelector(".highscore").textContent = highscore;
let tips = document.querySelector(".tips");
//Clear the tips after 5.5 sec
setTimeout(() => {
  tips.style.display = "none";
}, 5500);

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
      window.localStorage.setItem("highscore", highscore);
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? guess - 5 > secretNumber
            ? "📈 Too high!"
            : "📈 high!"
          : guess + 5 < secretNumber
          ? "📉 Too low!"
          : "📉 low!"
      );
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").textContent = secretNumber;
      document.querySelector("body").style.backgroundColor = "#ee0000";
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  score = 30;
  secretNumber = Math.trunc(Math.random() * 30) + 1;

  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
});
