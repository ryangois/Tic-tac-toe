// Define X and O symbols and winning sequences
let X_SYMBOL = "❌";
let O_SYMBOL = "⭕️";
// let X_SYMBOL = "X";
// let O_SYMBOL = "O";

const xImage = new Image();
const oImage = new Image();
xImage.src = "path/to/oImage.png";
oImage.src = "path/to/oImage.png";

// Once the images are loaded, set the X and O symbols to use the images
xImage.onload = function () {
    X_SYMBOL = xImage;
};
oImage.onload = function () {
    O_SYMBOL = oImage;
};

const WINNING_SEQUENCES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //horizontal wins

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //vertical wins

    [0, 4, 8],
    [2, 4, 6], //diagonal wins
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = X_SYMBOL;
let gameEnded = false;

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleResetButtonClick);

// Handle cell click event
function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.id);

    // If cell is already marked or game has ended, do nothing
    if (board[index] !== "" || gameEnded) {
        return;
    }

    // Mark cell with current player's symbol
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for result
    const win = checkForWin();
    const tie = checkForTie();
    if (win || tie) {
        endGame(win);
    } else {
        // Switch to other player
        currentPlayer = currentPlayer === X_SYMBOL ? O_SYMBOL : X_SYMBOL;
    }
}

function handleResetButtonClick() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = X_SYMBOL;
    gameEnded = false;

    // Reset UI
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "";
    });
    message.textContent = "";
}

// Check if current player has won the game
function checkForWin() {
    for (const sequence of WINNING_SEQUENCES) {
        const [a, b, c] = sequence;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            // Highlight winning sequence
            cells[a].style.backgroundColor = "yellow";
            cells[b].style.backgroundColor = "yellow";
            cells[c].style.backgroundColor = "yellow";

            return true;
        }
    }
    return false;
}

// Check if game has ended in a tie
function checkForTie() {
    for (const symbol of board) {
        if (symbol === "") {
            return false;
        }
    }
    return true;
}

// End the game and display the message
function endGame(win) {
    gameEnded = true;
    if (win) {
        message.textContent = `Congratulations! ${currentPlayer} wins!`;
    } else {
        message.textContent = "It's a tie!";
    }
}
