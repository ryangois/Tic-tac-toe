// Define X and O symbols and winning sequences
let X_SYMBOL = "X";
let O_SYMBOL = "O";

//Define CSS classes for X and O symbols
const X_CLASS = "x-symbol";
const O_CLASS = "o-symbol";

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
    
    // Create element with player's symbol and apply styling
    const symbol = document.createElement("span");
    symbol.textContent = currentPlayer;
    symbol.classList.add(currentPlayer === X_SYMBOL ? X_CLASS : O_CLASS);
    cell.appendChild(symbol);

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
    const boardGame = document.getElementById("board");
    boardGame.scrollIntoView();
    message.textContent = "";
}

// Check if current player has won the game
function checkForWin() {
    for (const sequence of WINNING_SEQUENCES) {
        const [a, b, c] = sequence;
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            // Highlight winning sequence
            const winningSequence = "#d47e28"
            cells[a].style.backgroundColor = winningSequence;
            cells[b].style.backgroundColor = winningSequence;
            cells[c].style.backgroundColor = winningSequence;

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
        message.textContent = `Congratulations! ${currentPlayer} Wins!`;
    } else {
        message.textContent = "It's a Tie!";
    }
      message.scrollIntoView()
}
