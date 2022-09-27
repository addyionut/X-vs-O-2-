const buttons = document.getElementById("buttons");
const nextPlayer = document.getElementById("playersTurnInfo");
const infoText = document.getElementById("textInfo");
const gameReset = document.getElementById("resetGame");
const btns = document.querySelectorAll("button");
let buttonsClicked = 0;
let currentPlayer = "X";
infoText.innerHTML = ` It's ${currentPlayer}'s turn`;
let grid = [["", "", ""], 
	    ["", "", ""], 
	    ["", "", ""]];

function playersTurn(player) {
	if (player === "X") {
		player = "O";
		return player;
	} else {
		player = "X";
		return player;
	}
}

function buttonClicked(id) {
	let id1 = id[0];
	let id2 = id[id.length - 1];
	const currentButton = document.getElementById(id);
	currentButton.innerHTML = currentPlayer;
	currentButton.disabled = true;
	grid[id1][id2] = currentPlayer;
	currentPlayer = playersTurn(currentPlayer);
	infoText.innerHTML = ` It's ${currentPlayer}'s turn`;
	++buttonsClicked;
	checkStatus();
}

function checkStatus() {
	for (let i = 0, j = 0; i < 3; ++i) {
		if (i === 0 && grid[i][i] !== "") {
			if ((grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) || 
			    (grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j])) {
				infoText.innerHTML = `${grid[i][i]} wins!`;
				gameOver();	
				return;		
			}
		} else if (i === 1 && grid[i][i] !== "") {
			if ((grid[i - 1][i - 1] === grid[i][i] && grid[i][i] === grid[i + 1][i + 1]) || 
			    (grid[i - 1][j + 2] === grid[i][j + 1] && grid[i][j + 1] === grid[i + 1][j]) || 
			    (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) || 
			    (grid[j][i] === grid[j + 1][i] && grid[j + 1][i] === grid[j + 2][i])) {
				infoText.innerHTML = `${grid[i][i]} wins!`;
				gameOver();
				return;
			}
		} else if (i === 2 && grid[i][i] !== "") {
			if ((grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2]) || 
			    (grid[j][i] === grid[j + 1][i] && grid[j + 1][i] === grid[j + 2][i])) {
				infoText.innerHTML = `${grid[i][i]} wins!`;
				gameOver();
				return;
			}
		}
	}
	if (buttonsClicked === 9) {
		infoText.innerHTML = "It's a draw!";
		gameOver();
	}
}

function gameOver() {
	btns.forEach(button => button.disabled = true);
	gameReset.hidden = false;
}

function resetGame() {
	buttonsClicked = 0;
	currentPlayer = "X";
	infoText.innerHTML = ` It's ${currentPlayer}'s turn`;
	btns.forEach(button => button.innerHTML = "");
	btns.forEach(button => button.disabled = false);
	grid = [["", "", ""], 
		["", "", ""], 
		["", "", ""]];
	gameReset.hidden = true;
}
