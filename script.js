let playAgainButton = document.querySelector(".play-again");
let playerOneScore = document.querySelector(".player-1");
let playerTwoScore = document.querySelector(".player-2");
let trophyIcon = document.querySelector(".trophy");
let cells = document.querySelectorAll(".grid-cells");
let gameRunningFlag = false;
//Factory Function
function PlayerGenerator(sign, choices) {
  this.sign = sign;
  this.choices = choices;
}
let playerOne = new PlayerGenerator("O", []);
let playerTwo = new PlayerGenerator("X", []);

PlayerGenerator.prototype.checkForGameOver = function () {
  let winningSets = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
  let flag = 0;

  for (let winningArray of winningSets) {
    for (let winningElement of winningArray) {
      if (currentPlayer.choices.includes(winningElement)) {
        flag = 1;
        // console.log(
        //   `Yes ${winningElement} is present in ${currentPlayer.choices}`
        // );
      } else {
        flag = 0;
        // console.log(
        //   `No ${winningElement} is not present in ${currentPlayer.choices}`
        // );
        break;
      }
    }

    if (flag == 1) {
      //       console.log("yay found");
      return true;
      //       break;
    }
  }
  return false;
};

// so that game starts from O instead of X
let currentPlayer = playerOne;

function togglePlayerTurn() {
  if (currentPlayer == playerOne) {
	currentPlayer = playerTwo;
	playerTwoScore.classList.add("player-active");
	playerOneScore.classList.remove("player-active");
} else {
	currentPlayer = playerOne;
	playerOneScore.classList.add("player-active");
	playerTwoScore.classList.remove("player-active");
  }
}
function respectivePlayerSign() {
  if (currentPlayer == playerOne) return playerOne.sign;
  else if (currentPlayer == playerTwo) return playerTwo.sign;
}
function gameStartRituals() {

// clear grid
  for (const cell of cells) {
    cell.textContent = "";
  }

//   reset choices 
  playerOne.choices = [];
  playerTwo.choices = [];
  currentPlayer = playerOne;


// reset the color that represents player's turn

// player one reset 
  playerOneScore.classList.add("player-active");
  playerOneScore.classList.remove("player-winner");
  playerOneScore.classList.remove("player-draw");

// player two reset
  playerTwoScore.classList.remove("player-active");
  playerTwoScore.classList.remove("player-winner");
  playerTwoScore.classList.remove("player-draw");


// hide the playAgain button
  // playAgainButton.style.visibility = "hidden";

  gameRunningFlag = true;
}
function gameOverRituals() {
	console.log(currentPlayer.sign + " is the winner");
	// playAgainButton.style.visibility = "visible";
	gameRunningFlag = false;
	
	if (currentPlayer == playerOne) {
		console.log("Player 1 won the match");
		playerOneScore.classList.add("player-winner");
		playerTwoScore.classList.remove("player-active");
	}
	if (currentPlayer == playerTwo) {
		console.log("Player 2 won the match");
		playerTwoScore.classList.add("player-winner");
		playerOneScore.classList.remove("player-active");
	}
}
function gameDrawRituals() {
	console.log("The game is draw");
	// playAgainButton.style.visibility = "visible";

	playerOneScore.classList.add("player-draw");
	playerTwoScore.classList.add("player-draw");



	// gameOverRituals();
}
function isGridFull() {
	if (playerOne.choices.length + playerTwo.choices.length == 9) 
		return true;
	return false;
}


function gameRound() {
	gameStartRituals();

	// add event listener
	for (const cell of cells) {
		cell.addEventListener("click", function (e) {
			if (e.target.textContent == "" && gameRunningFlag) {
				// playAgainButton.style.visibility = "hidden";
				e.target.textContent = respectivePlayerSign();
				currentPlayer.choices.push(+e.target.getAttribute("data-cell"));
				console.clear();
        
        // game over check
				if (currentPlayer.checkForGameOver()) {
          gameOverRituals();
					return;
				}
        
        // draw check
				if (isGridFull()) {
          gameDrawRituals();
				};

        togglePlayerTurn();
			}
		});
	}
}

// Driver code

gameRound();
playAgainButton.addEventListener("click", () => {
  gameRound();
});
