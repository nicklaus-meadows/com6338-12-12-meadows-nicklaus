const words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

class Word {
  constructor(word) {
    this.word = word;
    this.displayWord = word.replaceAll(/[\w]/g, "_");
    this.remainingGuesses = 10;
    this.incorrectLetters = [];
    this.correctLetters = [];
  }

  // Implement the guessLetter method
  guessLetter(letter) {
    if (this.correctLetters.includes(letter) || this.incorrectLetters.includes(letter)) return;

    if (this.word.includes(letter)) {
      this.correctLetters.push(letter);
      this.updateDisplayWord();
    } else {
      this.incorrectLetters.push(letter);
      this.remainingGuesses--;
    }
  }

  // Method to update the display word
  updateDisplayWord() {
    this.displayWord = [...this.word].map(char =>
      this.correctLetters.includes(char) ? char : '_'
    ).join('');
  }

  // Check if the game is over
  isGameOver() {
    return this.remainingGuesses <= 0 || this.displayWord === this.word;
  }

  // Get win or loss status
  getWinOrLoss() {
    if (this.displayWord === this.word && this.remainingGuesses > 0) {
      return 'win';
    } else if (this.remainingGuesses <= 0) {
      return 'loss';
    }
    return null;
  }
}

class Game {
  constructor(wordList) {
    this.wordList = wordList;
    this.wins = 0;
    this.losses = 0;
    this.currentWord = null;
    this.init();
  }

  // Initialize the game by binding keyboard events
  init() {
    this.bindKeyboard();
    this.newGame();
  }

  // Bind the keyboard input for guesses
  bindKeyboard() {
    document.onkeyup = (e) => {
      const key = e.key.toLowerCase();
      if (!/^[a-z]{1}$/.test(key)) return;

      this.handleGuess(key);
    };
  }

  // Handle the letter guess
  handleGuess(letter) {
    this.currentWord.guessLetter(letter);
    this.updateScreen();

    if (this.currentWord.isGameOver()) {
      this.endGame();
      this.newGame();
    }
  }

  // Start a new game
  newGame() {
    const randomWord = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.currentWord = new Word(randomWord);
    this.updateScreen(true);
  }

  // End the current game
  endGame() {
    const result = this.currentWord.getWinOrLoss();
    const previousWord = document.getElementById('previous-word');

    if (result === 'win') {
      this.wins++;
      document.getElementById('wins').textContent = this.wins;
    } else if (result === 'loss') {
      this.losses++;
      document.getElementById('losses').textContent = this.losses;
    }

    previousWord.textContent = this.currentWord.word;
  }

  // Update the screen with the current game status
  updateScreen(reset = false) {
    document.getElementById('remaining-guesses').textContent = this.currentWord.remainingGuesses;
    document.getElementById('incorrect-letters').textContent = this.currentWord.incorrectLetters.join(', ');
    document.getElementById('word-to-guess').textContent = this.currentWord.displayWord;
  }
}

// Initialize the game
const gameOverLoss = new Game(words);
