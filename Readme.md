# Mastermind 

Mastermind is two players game where one is designated as a codemaker and the other as codebraker. The objective of the game is for the codebraker to guess the color combination of the sequence of colors that have been disposed by the codemaker. The codebraker guess must match that of the codebraker both in colors and sequence.

In this implementation of the game the codemaker is by default the computer. There are four pegs and each peg can be set to one of six colors. For each guess, the codemaker provides feedback in the squared window. A Green dot indicates that the guess is good both in colors and position. A Red dot indicates that the guess for that peg is wrong.

![Mastermind](https://imgur.com/gallery/hX0Bl9f)


The feedback square is laid out along with the corresponding guess. The upper left-hand corner of the square corresponding to the peg in position one, and the bottom right-hand corner corresponding to position four.

The game allows a maximum of twelve guesses. The player (in this case always the codebraker) can play again where a new combination of pegs shall be set by the codemaker.

## Installation

There is no installation required. The game has been tested with Chrome and is accessible from this link 
https://enricoxs01.github.io/Mastermind/.



## Usage

**Play** is the button to play a new game from scratch.

**Submit** is the button to submit a guess. Incomplete guesses are accepted even though by default they will be wrong.

**Reveal** allows the codebraker to view the secret code established by the codemaker. The game ends immediately when the code is revealed.


## Contributing

Anyone can make any changes to the code via pull request at ....

## License
There is not specific license usage for this game