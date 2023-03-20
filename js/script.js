	/*----- constants -----*/

const maxPegs = 4;     // maximum number of horizontal pegs
const maxGuesses = 12  //maximum number of guesses
const possibleColors = ['red','blue','black','yellow','green','purple']
let winningCombination = [];
let rowInPlay = 0;
let rowColorSequence =[-1,-1,-1,-1]
	/*----- state variables -----*/


	/*----- cached elements  -----*/
const boardEl = document.querySelector(".board")
const allRowsEl = document.querySelectorAll(".row")
const codeEl = document.querySelector(".code")
let codePegsEls =[];
let pegsRowEls = [[],[]];
const playButtonEl = document.getElementById("buttonPlay")
const submitButtonEl = document.getElementById("buttonSubmit")
const revealButtonEl = document.getElementById("buttonReveal")



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

    //then attach listeners to each event
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
    rowColorSequence = [-1,-1,-1,-1]

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
    console.log("play was pressed")
    // add event handlers to first row of pegs
    for (let p=0; p<maxPegs;p++) {
        pegsRowEls[0][p].addEventListener('click', handlePegClick)
    }
    //enable submit and reveal
    submitButtonEl.disable=false;
    revealButtonEl.disable=false;
    playButtonEl.disable = true;
}

function handleReveal(target) {
    console.log("reveal was pressed")
    //game ends 
}

function handleSubmit(target) {
    console.log("submit was pressed")
    //remove event handler from rowInPlay
    // commit compare against winningCombination
    // if winning combination is successfully matched the game ends
    // with a corresponding message
    // otherwise if the rowInPlay plus one is less than maxguesses
    //      rowInPlay is augmented by one and event handlers are added to the new row of pegs
}

function handlePegClick(event) {
    //get peg's index on the board
    pegPressed = event.target.id;
    pegPressedIndex = pegPressed[pegPressed.length-1];

    //evaluate current color selection and new one
    currColor = possibleColors[pegPressedIndex]
    console.log(currColor)

    if (rowColorSequence[pegPressedIndex] < possibleColors.length) {
        rowColorSequence[pegPressedIndex] += 1;
    } else { 
        rowColorSequence[pegPressedIndex]= 0;
        }
    console.log(rowColorSequence[pegPressedIndex])
    event.target.backgroundColor = possibleColors[rowInPlay][rowColorSequence[pegPressedIndex]];

    
}