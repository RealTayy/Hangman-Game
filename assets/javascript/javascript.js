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
        // console.log('Generating Dog Name');
        let dogList = ['yorkshire_terrier', 'maltese', 'papillon', 'bulldog', 'labrador_retriever', 'german_shepherd', 'chihuahua', 'siberian_husky', 'poodle', 'golden_retriever'];
        return dogList[Math.floor(Math.random() * 10)];
    },

    genDogHint: function (dogName) {        
        let dogHints = {
            yorkshire_terrier: 'hint about yorkshire_terrier',
            maltese: 'hint about maltese',
            papillon: 'hint about papillo',
            bulldog: 'hint about bulldog',
            labrador_retriever: 'hint about labrador_retriever',
            german_shepherd: 'hint about german_shepherd',
            chihuahua: 'hint about chihuahua',
            siberian_husky: 'hint about siberian_husky',
            poodle: 'hint about poodle',
            golden_retriever: 'hint about golden_retriever'
        }
        return dogHints[dogName];
    },
};

function startHangManGame() {
    hangManGame.resetVariables();
    // Draw Starting Screen?

    document.onkeypress = (e) => {
        if (!hangManGame.hasWonOrLost) {
            // Player tries to guess a letter
            if (hangManGame.guessedLetters.includes(e.key)) {
                // Code that updates the helpMessage to "ALREADY GUESSED BRAH SRRY LOL"
                console.log('Letter already guessed brah...');
            } else {
                hangManGame.guessedLetters.push(e.key);
                console.log(hangManGame.correctLetters);
                console.log(hangManGame.guessedLetters);
                if (hangManGame.correctLetters.includes(e.key)) {
                    console.log('You guessed correctly');
                    // Messages that says wowza you guessed right
                } else {
                    hangManGame.incorrectGuesses++
                    console.log('You guessed incorrectly: ' + hangManGame.incorrectGuesses);
                    // Messages that says srry you guessed wrong
                }
            }

            if (checkIfWon()) {
                console.log('GAME HAS BEEN WON');
                hangManGame.hasWonOrLost = true;
                hangManGame.winCounter++;
                // Draw Win Screen
            } else if (checkIfLost()) {
                console.log('GAME HAS BEEN LOST');
                hangManGame.hasWonOrLost = true;
                hangManGame.loseCounter++;
                // Draw Lose Screen
            } else {
                console.log('Game goes on...');
            }
        } else {
            console.log('Game is already over bro...')
        }
    };

    function checkIfWon() {
        return hangManGame.correctLetters.every(function (letter) {
            return hangManGame.guessedLetters.includes(letter);
        });
    };

    function checkIfLost() {
        return hangManGame.incorrectGuesses > 6;
    };
}

// This makes the Start Button start a new game
document.getElementById("start-button").addEventListener('click', startHangManGame);
