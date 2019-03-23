

'use strict';

//Lista de las variables en este caso son nombres de los cantantes
var listWords =           
    [
        "PEDRO",
        "JUSTIN",
        "JUANES",
        "GIANM",
        "SHAK",
        "JLO",
        
    ];
// Maximum number of tries player has
const maxTries = 11;            
// Stores the letters the user guessed
var guessedLetters = []; 
// Index of the current word in the array       
var currentWordIndex;   
// This will be the word we actually build to match the current word        
var guessingWord = [];       
// How many tries the player has left   
var remainingGuesses = 0;       
// Flag for 'press any key to try again
var hasFinished = false;        
// How many wins has the player racked up    
var wins = 0;                   

// Game sounds
var keySound = new Audio('./assets/musics/Firework.m4a');
var winSound = new Audio('./assets/musics/GoodFeeling.m4a');
var loseSound = new Audio('./assets/musics/SingleLadies.m4a');

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random() * (listWords.length));
    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];
    // Make sure the music love is cleared
    document.getElementById("musicLove").src = "";

    // Build the guessing word and clear it out
    for (var i = 0; i < listWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   
    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    // this code makes the sounds stop and let to start the other music 
    keySound.pause();
    winSound.pause();
    loseSound.pause();
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < listWords[currentWordIndex].length; i++) {
        if(listWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the images
    if (positions.length <= 0) {
        remainingGuesses--;
        updatemusicLove();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        // keySound.stop();
        winSound.play();
        hasFinished = true;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
       
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);

        }
    }
    
};

// This event makes sound when the player start
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }

    }
};



















