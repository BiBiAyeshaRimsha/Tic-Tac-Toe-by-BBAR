const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const aiCheckbox = document.getElementById('aiCheckbox');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Reset game
resetBtn.addEventListener('click', resetGame);

// Handle click event
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    updateBoard(index, currentPlayer);
    checkWinner();

    if (aiCheckbox.checked && currentPlayer === 'X' && gameActive) {
        currentPlayer = 'O';
        makeAIMove();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Update board and UI
function updateBoard(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

// Check for winner or draw
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] === board[b] && board[b] === board[c] && board[a] !== '') {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = `It's a draw!`;
        gameActive = false;
    }
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => (cell.textContent = ''));
}

// Simple AI that picks random empty cell
function makeAIMove() {
    let availableMoves = board.map((val, idx) => (val === '' ? idx : null)).filter(val => val !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    updateBoard(move, 'O');
    checkWinner();
    currentPlayer = 'X';
}
