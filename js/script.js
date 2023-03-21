	/*----- constants -----*/

const maxPegs = 4;     // maximum number of horizontal pegs
const maxGuesses = 12  //maximum number of guesses
const possibleColors = ['red','blue','black','yellow','green','purple']
let winningCombination = [];
let rowInPlay = 0;
let rowGuess =[0,0,0,0]
	/*----- state variables -----*/


	/*----- cached elements  -----*/
const allRowsEl = document.querySelectorAll(".row")
const codeEl = document.querySelector(".code")
let codePegsEls =[];
let pegsRowEls = [[],[]];
let keyPegsRowEls = [[],[]];
const playButtonEl = document.getElementById("buttonPlay");
const submitButtonEl = document.getElementById("buttonSubmit");
const revealButtonEl = document.getElementById("buttonReveal");
const messageEl = document.getElementById("message")



	/*----- event listeners -----*/


	/*----- functions -----*/

initialize();
resetGame();

//the main purpose of this function is to layout and obtain all necessary global elements of the game
function initialize() {

    //first create the main pegs board by row
    for (let i=0; i<maxGuesses; i++) {
        pegsRowEls[i] = addPegsToRow(allRowsEl[i],i,maxPegs,"peg")
    }
    //then create the code pegs at the bottom of the board
    codePegsEls = addPegsToRow(codeEl,0,maxPegs,"code");

    //then attach listeners to each button
    playButtonEl.addEventListener('click',handlePlay);
    submitButtonEl.addEventListener('click',handleSubmit);
    revealButtonEl.addEventListener('click', handleReveal)
}

function addPegsToRow(rowEl,i,pegCount,className) {
   let pegsArr = []
   for (let p=0, count=1;p< pegCount;p++) {
        let newPeg = document.createElement("div");
        newPeg.className = className;
        newPeg.id = className + i.toString() + count.toString();
        pegsArr[p] = newPeg;
        rowEl.append(newPeg);
        count++;
   } 
   return pegsArr;
}

function resetGame () {
    //disable Submit and Reveal
    submitButtonEl.disable = true;
    revealButtonEl.disable = true;

    //reset the board by changing colors and silencing event click for all rows
    for (let i=0; i<maxGuesses; i++) {
        for(let p=0; p<maxPegs; p++) {
            pegsRowEls[i][p].style.backgroundColor = "grey"; 
        }
    }
    rowGuess = [0,0,0,0]

    //blank out the code
    for(let p=0; p<maxPegs; p++) {
        codePegsEls[p].style.backgroundColor = "grey"; 
    }
    //create new code eventually the coloring goes away once i figured the css out
    for (let i=0; i<maxPegs; i++) {
        newColor = Math.floor(Math.random() * possibleColors.length);
        codePegsEls[i].style.backgroundColor = possibleColors[newColor]; 
        codePegsEls[i].innerHTML = i;
        winningCombination[i]=newColor;
     }
    //enable Play
    playButtonEl.disabled = false;
    rowInPlay = 0;
}

function handlePlay(target) {
    // reset the game
    resetGame();
    // add event handlers to first row of pegs
    allRowsEl[rowInPlay].style.border = "thick solid #0000FF"
    
    for (let p=0; p<maxPegs;p++) {
        pegsRowEls[rowInPlay][p].addEventListener('click', handlePegClick)
    }
    //enable submit and reveal
    submitButtonEl.disable=false;
    revealButtonEl.disable=false;
    playButtonEl.disable = true;
    addKeyPegsToRow(allRowsEl[rowInPlay]);

}

function handleReveal(target) {
    console.log("reveal was pressed")
    //game ends 
}

function handleSubmit(target) {
    //remove event handler from rowInPlay 
    allRowsEl[rowInPlay].style.backgroundColor = "white";

    for (let p=0; p<maxPegs;p++) {
            pegsRowEls[rowInPlay][p].removeEventListener('click',handlePegClick);
        }
    // commit compare against winningCombination
    let weHaveWinner = (rowGuess.length == winningCombination.length) && rowGuess.every(function(element, index) {
        return element === winningCombination[index]; });

    if ( weHaveWinner) { //matched combination - game won
        console.log("we have a winner");
        return
    }
    else if (rowInPlay === (maxGuesses-1)) {   //the maximum number of tries has been reached - game lost
        console.log("you have lost")
        return
    } 
    else { //try again - game still in play
        allRowsEl[rowInPlay].style.border = ""   
        rowInPlay = rowInPlay + 1;
        allRowsEl[rowInPlay].style.border = "thick solid #0000FF"

        for (let p=0; p<maxPegs;p++) {
            pegsRowEls[rowInPlay][p].addEventListener('click',handlePegClick);
        }
        addKeyPegsToRow(allRowsEl[rowInPlay]);
        allRowsEl[rowInPlay].style.backgroundColor = "grey";
    }
}

function handlePegClick(event) {
    //get peg's index on the board and then get the corresponding array index in the rowGuess
    let pegIndex = event.target.id[event.target.id.length-1]-1;
    //evaluate current color selection and new one
    let currColorValue = rowGuess[pegIndex]
    if (rowGuess[pegIndex] < (possibleColors.length-1)) {
        rowGuess[pegIndex] += 1;
    } else { 
        rowGuess[pegIndex]= 0;
        }
    event.target.style.backgroundColor = possibleColors[rowGuess[pegIndex]];
}

function addKeyPegsToRow ( rowEl) {
    const rowSquareEl = document.createElement("div");
    rowSquareEl.style.width = "60px"
    rowSquareEl.style.height = "60px"
    rowSquareEl.style.border = "thin solid #0000FF"
    rowSquareEl.style.display = "inline-block"
    rowSquareEl.style.margin = "10px 5px 0px 20px"
    rowEl.append(rowSquareEl)
    for (let i=0; i<maxPegs; i++) {
        let keyPegEl = document.createAttribute("div");
        keyPegEl.className = "keyPeg"//+toString(i);
        rowSquareEl.append(keyPegEl);
        keyPegsRowEls[rowInPlay][i]=keyPegEl;
    }
}