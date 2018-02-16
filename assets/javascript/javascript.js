let hangManGame = {
    winCounter: 0,
    loseCounter: 0,
    resetVariables: function () {
        console.log('Reseting Variables...');
        this.curDog = this.genDogName();
        this.curHint = this.genDogHint(this.curDog);
        this.wantsToPlay = true;
        this.hasWonOrLost = false;
        this.correctLetters = Array.from(new Set(this.curDog));
        this.guessedLetters = ['_'];
        this.incorrectGuesses = 0;
        console.log('All Variables reset!')
    },

    genDogName: function () {
        let dogList = ['yorkshire_terrier', 'maltese', 'papillon', 'bulldog', 'labrador_retriever', 'german_shepherd', 'chihuahua', 'siberian_husky', 'poodle', 'golden_retriever'];
        return dogList[Math.floor(Math.random() * 10)];
    },

    genDogHint: function (dogName) {
        let dogHints = {
            yorkshire_terrier: 'This dog\'s orgins started in Yorkshire, England',
            maltese: 'This dog\'s name comes from the mediterranean island of Malta',
            papillon: 'This dog\'s ears are said resemble butterflys',
            bulldog: 'This dog is known for being muscular, hefty with a wrinkled face and a pushed in nose',
            labrador_retriever: 'This is one of the most popular dogs in the US and make greate guide dogs',
            german_shepherd: 'If this dog had a job it would be a police officer',
            chihuahua: 'This taco bell dog was this kind of dog',
            siberian_husky: 'This dog loves the cold weather',
            poodle: 'This fancy looking dog is ranked the secodn most intelligent dog breed',
            golden_retriever: 'The famous dog from Air Bud was this kind of dog'
        }
        return dogHints[dogName];
    },
};

function startHangManGame() {
    hangManGame.resetVariables();
    helpMessage = document.getElementById('help-msg');
    helpMessage.innerHTML = "Alright let's get started! Guess a letter and I'll see if it's in my word..."
    drawEverything();
    document.onkeypress = (e) => {
        if (!hangManGame.hasWonOrLost) {
            // Player tries to guess a letter
            if (hangManGame.guessedLetters.includes(e.key)) {
                helpMessage.innerHTML = '\'' + e.key + '\' has already been guessed. Try a different Letter!';
                console.log('Letter already guessed brah...');
            } else {
                hangManGame.guessedLetters.push(e.key);
                console.log(hangManGame.correctLetters);
                console.log(hangManGame.guessedLetters);
                if (hangManGame.correctLetters.includes(e.key)) {
                    console.log('You guessed correctly');
                    helpMessage.innerHTML = 'Nice! \'' + e.key + '\' is in the word!';
                } else {
                    hangManGame.incorrectGuesses++
                    console.log('You guessed incorrectly: ' + hangManGame.incorrectGuesses);
                    helpMessage.innerHTML = '\'' + e.key + '\' is not a correct letter :('
                }
            }
            if (checkIfWon()) {
                console.log('GAME HAS BEEN WON');
                hangManGame.hasWonOrLost = true;
                hangManGame.winCounter++;
                helpMessage.innerHTML = 'You WON! You did it! You guessed the correct word!';
                // Draw Win Screen
            } else if (checkIfLost()) {
                console.log('GAME HAS BEEN LOST');
                hangManGame.hasWonOrLost = true;
                hangManGame.loseCounter++;
                helpMessage.innerHTML = 'Oh no! You lost... The correct word was ' + hangManGame.curDog;
                // Draw Lose Screen
            } else {
                console.log('Game goes on...');
            }
            drawEverything();
        } else {
            helpMessage = 'This game is already over... click "Start New Game" to play again!'
        };
    };

    function checkIfWon() {
        return hangManGame.correctLetters.every(function (letter) {
            return hangManGame.guessedLetters.includes(letter);
        });
    };

    function checkIfLost() {
        return hangManGame.incorrectGuesses > 6;
    };

    function drawEverything() {
        drawGuessedLetters();
        drawGuessCounter();
        drawHint();
        drawWord();
        drawWinLose();
    };

    function drawGuessedLetters() {
        document.getElementById('guessed-arr').innerHTML = '';
        for (let i = 1; i < hangManGame.guessedLetters.length; i++) {
            document.getElementById('guessed-arr').innerHTML += hangManGame.guessedLetters[i] + ' ';
        }
    };

    function drawGuessCounter() {
        document.getElementById('wrong-counter').innerHTML = "Wrong Guesses Left: " + (7 - hangManGame.incorrectGuesses);
    };

    function drawHint() {
        document.getElementById('hint').innerHTML = "Hint: " + hangManGame.genDogHint(hangManGame.curDog);
    };

    function drawWord() {
        let dogName = hangManGame.curDog;
        let word = document.getElementById('word-blanks');
        word.innerHTML = '';
        for (let i = 0; i < dogName.length; i++) {
            if (dogName.charAt(i) == '_') {                
                word.innerHTML += "\xa0\xa0\xa0";
            } else if (hangManGame.guessedLetters.includes(dogName.charAt(i))) {
                word.innerHTML += (dogName.charAt(i) + " ").toUpperCase();
            } else {
                word.innerHTML += "_ ";
            }
        };
    };

    function drawWinLose() {
        document.getElementById('win-counter').innerHTML = "Win: " + hangManGame.winCounter;
        document.getElementById('lose-counter').innerHTML = "Lose: " + hangManGame.loseCounter;

    };
};

// This makes the Start Button start a new game
document.getElementById("start-button").addEventListener('click', startHangManGame);