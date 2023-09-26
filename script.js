"use strict";

// two ways to reference IDs
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

let current0El = document.querySelector("#current--0");
let current1El = document.querySelector("#current--1");

const diceEL = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const btnReset = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting Conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling dice functionality
const rollDice = function () {
  if (playing) {
    // 1. Generate Random Dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};

// Holds score
const holdDice = function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEL.classList.add("hidden");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
};

btnReset.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdDice);
