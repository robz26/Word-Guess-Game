// List of variables needed
const Words = ['pikachu', 'gengar', 'bulbasaur', 'cubone',
    'charmander', 'squirtle', 'eevee', 'butterfree', 'diglett',
    'onyx', 'snorlax', 'zapdos', 'moltres', 'articuno', 'arcanine',
    'mewtwo', 'rhydon', 'dragonite', 'jigglypuff', 'mrmime'];
var randomWord = Math.floor(Math.random() * Words.length);
var ChosenWord = Words[randomWord];
var blanks = [];
var Correct = [];
var Wrong = [];
var wins = 0;
var Music;
var GameOver = true;
var remainingGuesses = 10;
const Tries = 9; // Number of Tries

// defining html variables
var dispWins = document.getElementsByClassName("Wins");
var dispGuessesLeft = document.getElementsByClassName("GuessesLeft");
var dispChosenWord = document.getElementsByClassName("CurrentWord");
var dispLettersUsed = document.getElementsByClassName("LettersUsed");

// Making Underscores for word
var CreateUnderscores = () => {
    for (var i = 0; i < ChosenWord.length; i++) {
        blanks.push('_');
    }
    return blanks;
}

//listen to keypress
var UserChoice = '';
Display();
PressSpaceToStart();

document.onkeyup = function (event) {
    UserChoice = event.key.toLowerCase();
    
    if (event.keyCode >= 65 && event.keyCode <= 90) //check if entry is a-z
    {
        if (ChosenWord.indexOf(UserChoice) > -1) //correct guess
        {
            Correct.push(UserChoice); //add to correct array
            evaluateGuess(UserChoice);
            dispChosenWord[0].innerHTML = blanks.join(' ');
            blanks[ChosenWord.indexOf(UserChoice)] = UserChoice; //replace _ with correct letter guessed

            if (blanks.join('') == ChosenWord) {
                wins++;
                dispWins[0].innerHTML = "Wins:  " + wins;
                setTimeout(Winner, 700);
                GameOver = true;
                setTimeout(PressSpaceToStart, 2500);
            }
        }
        else {
            if (Wrong.indexOf(UserChoice) === -1) {
                Wrong.push(UserChoice);
                dispLettersUsed[0].innerHTML = "Wrong Letters:  " + Wrong.join(' ');
                remainingGuesses--;
                dispGuessesLeft[0].innerHTML = "Guesses Left:  " + remainingGuesses;
                ckLoss();
            }
        }
    }
}
function Display() {
    dispChosenWord[0].innerHTML = CreateUnderscores().join(' ');
}

//Checks if there's multiple instances of letter in ChosenWord array
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < ChosenWord.length; i++) {
        if (ChosenWord[i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies remove a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    }
    else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            blanks[positions[i]] = letter;
        }
    }
};

//game reset
function resetGame() {
    remainingGuesses = Tries;

    // Use Math.floor to round the random number down to the nearest whole.
    randomWord = Math.floor(Math.random() * Words.length);
    ChosenWord = Words[randomWord];

    // Clear out arrays
    Wrong = [];
    blanks = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < ChosenWord.length; i++) {
        blanks.push("_");
    }
    GameOver = false;
    dispChosenWord[0].innerHTML = blanks.join(' ');
    // Hide game over and win images/text
    document.getElementById("main").style.display = "none";
    document.getElementById("jumbo").style.display = "block";
    document.getElementById("Winner").style.display = "none";
    document.getElementById("Loser").style.display = "none";
    dispGuessesLeft[0].innerHTML = "Guesses Left: " + remainingGuesses;
    dispLettersUsed[0].innerHTML = "Wrong Letters: " + Wrong.join(' ');
}

//Check for loss
function ckLoss() {
    if (remainingGuesses <= 0) {
        GameOver = true;
        Loser();
        setTimeout(PressSpaceToStart, 2500);
    }
}

//Intro Screen and set to Space key to start
function PressSpaceToStart() {
    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            document.getElementById("jumbo").style.display = "none";
            document.getElementById("main").style.display = "block";
            document.getElementById("Winner").style.display = "none";
            document.getElementById("Loser").style.display = "none";
        }
    }
   
    if (GameOver === true) {
        resetGame();
    }
}

//Hint Image Section
document.getElementById("Hint").onclick = function () {
    switch (ChosenWord) {
        case "pikachu":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/pika.jpg";
            break;
        case "gengar":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/gengar.jpg";
            break;
        case "bulbasaur":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/bulbasaur.png";
            break;
        case "cubone":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/cube.jpg";
            break;
        case "charmander":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/charman.jpg";
            break;
        case "squirtle":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/squirt.jpg";
            break;
        case "eevee":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/eevee.png";
            break;
        case "butterfree":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/butter.png";
            break;
        case "diglett":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/diglett.jpg";
            break;
        case "onyx":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/onyx.png";
            break;
        case "snorlax":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/snorlax.png";
            break;
        case "zapdos":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/zapdos.png";
            break;
        case "articuno":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/articuno.jpg";
            break;
        case "moltres":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/moltres.jpg";
            break;
        case "arcanine":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/arcanine.jpg";
            break;
        case "mewtwo":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/mewtwo.jpg";
            break;
        case "rhydon":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/rhydon.jpg";
            break;
        case "dragonite":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/Dragonite.jpg";
            break;
        case "jigglypuff":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/jiggly.jpg";
            break;
        case "mrmime":
            document.getElementById("Pokemon").src = "../Word-Guess-Game/assets/images/mrmime.jpg";
            break;
        default:
            console.log("default");
    }
}
//Win Display
function Winner() {
    document.getElementById("main").style.display = "none";
    document.getElementById("Winner").style.display = "block";
    document.getElementById("jumbo").style.display = "none";
    document.getElementById("Loser").style.display = "none";
}
//Loss Display
function Loser() {
    document.getElementById("main").style.display = "none";
    document.getElementById("Loser").style.display = "block";
    document.getElementById("jumbo").style.display = "none";
    document.getElementById("Winner").style.display = "none";
}

//BGM section
var soundFile = document.createElement("audio");
soundFile.preload = "auto";

//Load the sound file (using a source element for expandability)
var src = document.createElement("source");
var volume;
src.src = "Vermillion.mp3";
soundFile.appendChild(src);

//Load the audio tag
//It auto plays as a fallback
soundFile.load();
soundFile.volume = 1;
soundFile.play();

//Plays the sound
function play() {
   //Set the current time for the audio file to the beginning
   soundFile.currentTime = 0.01;
   soundFile.volume = 1;

   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){soundFile.play();},1);
   setTimeout(play, 62000);
}
play();