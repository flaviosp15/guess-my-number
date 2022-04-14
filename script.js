'use strict';
// ============================== VARIABLES ==============================
const minLength = 1;
const maxLength = 20;
let secretNumber = Math.trunc(Math.random() * Number(maxLength)) + 1;
let score = 20;
let highscore = 0;

// ============================== FUNCTIONS ==============================
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const disabledButton = function () {
  document.querySelector('.guess').disabled = true;
  document.querySelector('.btn-check').disabled = true;
};
const enabledButton = function () {
  document.querySelector('.guess').disabled = false;
  document.querySelector('.btn-check').disabled = false;
};
const showCorrectAnswer = function () {
  displayMessage('Correct Number!');
  disabledButton();
  document.querySelector('.span-score').textContent = score;
  document.querySelector('.span-highscore').textContent =
    score > highscore ? (highscore = score) : highscore;
  document.querySelector('body').classList.add('correct-answer');
  document.querySelector('.number').textContent = secretNumber;
};
const showWrongAnswer = function (guess) {
  displayMessage(guess > secretNumber ? '↑ Too High!' : '↓ Too Low!');
  score--;
  document.querySelector('.span-score').textContent = score < 0 ? 0 : score;
  if (!score) gameOver();
};
const gameOver = function () {
  displayMessage('Game Over!');
  disabledButton();
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('.guess').value = '';
  document.querySelector('body').classList.add('game-over');
};
const resetGame = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  enabledButton();
  document.querySelector('.span-score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').classList.remove('correct-answer');
  document.querySelector('body').classList.remove('game-over');
};

// ============================== EVENTS ==============================
document.querySelector('.btn-check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  guess === secretNumber ? showCorrectAnswer() : showWrongAnswer(guess);
});
document.querySelector('.btn-restart').addEventListener('click', function () {
  resetGame();
});
document.querySelector('.guess').addEventListener('keyup', function () {
  let numberTyped = Number(document.querySelector('.guess').value);
  if (numberTyped < minLength || numberTyped > maxLength) {
    displayMessage(`Choose a number between ${minLength} and ${maxLength}!`);
    document.querySelector('.guess').value = '';
  }
});
