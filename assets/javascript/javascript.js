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
    // Draw Starting Screen?
    document.onkeypress = (e) => {
        if (!hangManGame.hasWonOrLost) {
            // Player tries to guess a letter
            if (hangManGame.guessedLetters.includes(e.key)) {
                document.getElementById('help-msg').innerHTML = '\'' + e.key + '\' has already been guessed. Try a different Letter!';
                console.log('Letter already guessed brah...');
            } else {
                hangManGame.guessedLetters.push(e.key);
                console.log(hangManGame.correctLetters);
                console.log(hangManGame.guessedLetters);
                if (hangManGame.correctLetters.includes(e.key)) {
                    console.log('You guessed correctly');
                    document.getElementById('help-msg').innerHTML = 'Nice! \'' + e.key + '\' is in the word!' ;
                } else {
                    hangManGame.incorrectGuesses++
                    console.log('You guessed incorrectly: ' + hangManGame.incorrectGuesses);
                    document.getElementById('help-msg').innerHTML = '\'' + e.key + '\' is not a correct letter :('
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
            document.getElementById('help-msg').innerHTML = 'This game is already over... click "Start New Game" to play again!'
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
