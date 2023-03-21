	/*----- constants -----*/
const maxPegs = 4;     // maximum number of horizontal pegs
const maxGuesses = 12  //maximum number of guesses
const possibleColors = ['red','blue','black','yellow','green','purple']
const debug = true;

	/*----- state variables -----*/
let winningCombination = [];
let rowInPlay = 0;
let rowGuess =[0,0,0,0]
let codePegsEls =[];
let pegsRowEls = [[],[]];
let keyPegsRowEls = [[],[]];

	/*----- cached elements  -----*/
const allRowsEl = document.querySelectorAll(".row")
const codeEl = document.querySelector(".code")
const playButtonEl = document.getElementById("buttonPlay");
const submitButtonEl = document.getElementById("buttonSubmit");
const revealButtonEl = document.getElementById("buttonReveal");
const messageEl = document.getElementById("message")

	/*----- event listeners -----*/


	/*----- functions -----*/

initialize();
resetGame();

//the main purpose of Initialize is to layout and obtain the necessary global elements of the game
function initialize() {
    document.getElementById("message").innerText = "To start the game press the button Play"
    //first create the main pegs board by row
    for (let i=0; i<maxGuesses; i++) {
        pegsRowEls[i] = addPegsToRow(allRowsEl[i],i,maxPegs,"peg")
    }
    //then create the code pegs at the bottom of the board
    codePegsEls = addPegsToRow(codeEl,0,maxPegs,"peg");

    //then attach listeners to each button
    playButtonEl.addEventListener('click',handlePlay);
    submitButtonEl.addEventListener('click',handleSubmit);
    revealButtonEl.addEventListener('click', handleReveal);
    submitButtonEl.style.backgroundColor = "grey";
    revealButtonEl.style.backgroundColor = "grey";
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

    //remove any currently highlighted row and feedback box
    allRowsEl[rowInPlay].style.border = ""   
//    if (feedbackEl !== undefined ) {
      if (allRowsEl[rowInPlay].children.length > maxPegs){
        for (let i=0;i<=rowInPlay;i++) {
            console.log(allRowsEl[i].childElementCount)
            allRowsEl[i].removeChild(allRowsEl[i].children[4]);
        }
    }

    // clear out any messages
    messageEl.innerText ="";

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
        if (debug) {
            codePegsEls[i].style.backgroundColor = possibleColors[newColor]; 
            codePegsEls[i].innerHTML = i;    
        }   
        winningCombination[i]=newColor;        
     }

    //Obscure code if not in debug mode and reset to first row
    if (!debug) { codeEl.style.c = "grey"}
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

    // add the feedback small window
   // feedbackEl = addKeyPegsDiv(allRowsEl[rowInPlay]);

    //diasble Play and enable Submit and Reveal
    submitButtonEl.removeAttribute("disabled");
    submitButtonEl.style.backgroundColor = "blue";
    revealButtonEl.removeAttribute("disabled");
    revealButtonEl.style.backgroundColor = "blue"
    playButtonEl.setAttribute("disabled",true);
    playButtonEl.style.backgroundColor = "grey"


}

function handleReveal(target) {
    console.log("reveal was pressed")
    for (let p=0; p<maxPegs;p++) {
        pegsRowEls[rowInPlay][p].removeEventListener('click',handlePegClick);
    }
    if (!debug) {
        console.log("not debugging")
        codeEl.style.backgroundColor ="";
        for (let i=0;i<maxPegs;i++) {
            console.log(codePegsEls[i])
            codePegsEls[i].style.backgroundColor = possibleColors[winningCombination[i]];  
            console.log(winningCombination[i])
            console.log(codePegsEls[i])

        }
    }
    submitButtonEl.setAttribute("disabled",true);
    submitButtonEl.style.backgroundColor = "grey";
    revealButtonEl.setAttribute("disabled",true);
    revealButtonEl.style.backgroundColor = "grey"
    playButtonEl.removeAttribute("disabled");
    playButtonEl.style.backgroundColor = "blue"
    messageEl.innerText = " Giving up so easily?\n Give it another try by pressing Play"
    //game ends 
}

function handleSubmit(target) {
    //remove event handler from rowInPlay 
    for (let p=0; p<maxPegs;p++) {
            pegsRowEls[rowInPlay][p].removeEventListener('click',handlePegClick);
        }
    // compare guess against winningCombination
    let weHaveWinner = (rowGuess.length == winningCombination.length) && rowGuess.every(function(element, index) {
        return element === winningCombination[index]; });

    if ( weHaveWinner) { //matched combination - game won
        submitButtonEl.setAttribute("disabled",true);
        submitButtonEl.style.backgroundColor = "grey";
        revealButtonEl.setAttribute("disabled",true);
        revealButtonEl.style.backgroundColor = "grey"
        playButtonEl.removeAttribute("disabled");
        playButtonEl.style.backgroundColor = "blue"
        messageEl.innerText = " YOU HAVE WON! \n To continue press Play"
        return
    }
    else if (rowInPlay === (maxGuesses-1)) {   //the maximum number of tries has been reached - game lost
        submitButtonEl.setAttribute("disabled",true);
        submitButtonEl.style.backgroundColor = "grey";
        revealButtonEl.setAttribute("disabled",true);
        revealButtonEl.style.backgroundColor = "grey"
        playButtonEl.removeAttribute("disabled");
        playButtonEl.style.backgroundColor = "blue"
        messageEl.innerText = " Sorry...no more guesses! \n To continue press Play"
        return
    } 
    else { //try again - game still in play
        //move the border to the new rowInPlay and evaluate current guess
        allRowsEl[rowInPlay].style.border = ""   
        let feedback = addKeyPegsDiv(allRowsEl[rowInPlay]);
        setKeyPegs(feedback);

        //then advance rowInPlay
        rowGuess = [0,0,0,0]
        rowInPlay = rowInPlay + 1;
        allRowsEl[rowInPlay].style.border = "thick solid #0000FF"
        messageEl.innerText= "Your last guess was incorrect...\n do you want to try again?"
        for (let p=0; p<maxPegs;p++) {
            pegsRowEls[rowInPlay][p].addEventListener('click',handlePegClick);
        }        
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

function addKeyPegsDiv (rowEl) {
    const rowSquareEl = document.createElement("div");
    rowSquareEl.style.width = "60px"
    rowSquareEl.style.height = "60px"
    rowSquareEl.style.border = "thin solid #0000FF"
    rowSquareEl.style.display = "inline-block"
    rowSquareEl.style.margin = "10px 5px 0px 20px"
    rowSquareEl.style.display = "inline-block"
    rowEl.append(rowSquareEl)
    return rowSquareEl;
}

function setKeyPegs(rowKeyEl) {
    console
    for (let i=0; i<maxPegs; i++) {
        let keyPegEl = document.createElement("div");
        keyPegEl.className = "keyPeg"
        keyPegEl.style.height = "18px";
        keyPegEl.style.width =  "18px";
        keyPegEl.style.borderRadius = "50%";
        keyPegEl.style.display = "inline-block"
        keyPegEl.style.margin = "0px 5px 0px 5px";
        keyPegEl.style.border = "thin solid #0000FF"
        console.log (" Win : " + winningCombination[i] + " Guess: " + rowGuess[i])
        if (winningCombination[i] === rowGuess[i]) {
            keyPegEl.style.backgroundColor = "green"
        } else {keyPegEl.style.backgroundColor = "red"}
        console.log(keyPegEl)
        rowKeyEl.appendChild(keyPegEl);
    }
}