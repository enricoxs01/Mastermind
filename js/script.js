	/*----- constants -----*/

const maxPegs = 4;     // maximum number of horizontal pegs
const maxKeyPegs = 4   //maximum number of key pegs
const maxGuesses = 12  //maximum number of guesses
const possibleColors = ['red','blue','black','yellow','green','purple']
let   winningCombination = []
	/*----- state variables -----*/


	/*----- cached elements  -----*/
const boardEl = document.querySelector(".board")
const allRowsEl = document.querySelectorAll(".row")
const codeEl = document.querySelector(".code")



	/*----- event listeners -----*/


	/*----- functions -----*/

initialize()

function initialize() {
   resetPegs(maxGuesses, maxPegs);
   resetCode();
}

function resetPegs(numRows, numPegs) {
   for (let i=0; i<numRows; i++) {
        addPegsToRow(allRowsEl[i],i,numPegs,"peg")
   }
}

function addPegsToRow(rowEl,i,pegCount,className) {

   for (let p=0, count=1;p< pegCount;p++) {
        let newPeg = document.createElement("div");
        newPeg.className = className;
        newPeg.id = className + i.toString() + count.toString();
        rowEl.append(newPeg);
        count++;
   } 
}

function resetCode() {
    addPegsToRow(codeEl,0,maxPegs,"code");
    //generate new secret code
    for (let i=0; i<maxPegs; i++) {
        Math.floor(Math.random() * );
    }
}