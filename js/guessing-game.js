/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
  let num = Math.floor(Math.random() * 100 + 1);

  return num;
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Game {
  constructor() {
    this.myStr = "";
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference = function () {
    return Math.abs(this.winningNumber - this.playersGuess);
  };

  isLower = function () {
    return this.playersGuess < this.winningNumber ? true : false;
  };

  playersGuessSubmission = function (number) {
    if (number > 0 && number < 101) {
      this.playersGuess = number;
    } else {
      throw "That is an invalid guess.";
    }

    return this.checkGuess();
  };
}

Game.prototype.checkGuess = function () {
  if (this.pastGuesses.includes(this.playersGuess))
    this.myStr = "You have already guessed that number.";
  else {
    if (this.playersGuess === this.winningNumber) this.myStr = "You Win!";
    else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length === 5) {
        this.myStr = "You Lose.";
      } else {
        if (this.difference() < 10) this.myStr = "You're burning up!";
        else if (this.difference() < 25) this.myStr = "You're lukewarm.";
        else if (this.difference() < 50) this.myStr = "You're a bit chilly.";
        else this.myStr = "You're ice cold!";
      }
    }
  }

  document.querySelector("#my-response").innerHTML = this.myStr;
  document.querySelector(
    `#guess-list li:nth-child(${this.pastGuesses.length})`
  ).innerHTML = this.playersGuess;

  return this.myStr;
};

Game.prototype.provideHint = function () {
  return shuffle([
    this.winningNumber,
    generateWinningNumber(),
    generateWinningNumber(),
  ]);
};

newGame = function () {
  let game = new Game();
  return game;
};

let playGame = function () {
  let game = newGame();

  let submitBtn = document.querySelector("#submit");

  submitBtn.addEventListener("click", function () {
    let guessedNumber = +document.querySelector("#number").value;

    document.querySelector("#number").value = "";
    game.playersGuessSubmission(guessedNumber);
  });
  document.querySelector("#play-again").addEventListener("click", function () {
    location.reload();
  });
  document.querySelector("#hint").addEventListener("click", function () {
    let hints = game.provideHint();
    document.querySelector("#hints").innerHTML = hints;
  });
};

playGame();
