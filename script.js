let cells = document.querySelectorAll(".grid-cells");

//Factory Function
function PlayerGenerator(sign, choices) {
  this.sign = sign;
  this.choices = choices;
}
let playerOne = new PlayerGenerator("O", []);
let playerTwo = new PlayerGenerator("X", []);

PlayerGenerator.prototype.checkForGameOver = function () {
  let winningSets = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 8], [3, 5, 7] ];
  let flag = 0;

  for (let winningArray of winningSets) {

    for (let winningElement of winningArray) {


      if (latestPlayer.choices.includes(winningElement)) {
        flag = 1;
        console.log(
          `Yes ${winningElement} is present in ${latestPlayer.choices}`
        );
      } 
      
 
      else {
        flag = 0;
        console.log(
          `No ${winningElement} is not present in ${latestPlayer.choices}`
        );
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
let latestPlayer = playerTwo;

function togglePlayerTurn() {
  if (latestPlayer == playerOne) latestPlayer = playerTwo;
  else latestPlayer = playerOne;
}
function respectivePlayerSign() {
  if (latestPlayer == playerOne) return playerTwo.sign;
  else if (latestPlayer == playerTwo) return playerOne.sign;
}

function gameRound () {
	for (const cell of cells) {
	  cell.addEventListener("click", function (e) {
	    if (e.target.textContent == "") {
	      e.target.textContent = respectivePlayerSign();
	      togglePlayerTurn();
	      latestPlayer.choices.push(+e.target.getAttribute("data-cell"));
	      console.clear();
	      if(latestPlayer.checkForGameOver()){
		      console.log(latestPlayer.sign + " is a winner");
		      return;
	      };
	    }
	  });
	}
}
gameRound();

