let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkGameStatus();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkGameStatus() {
    if (checkWin()) {
        displayResult(`${currentPlayer} wins!`);
        gameActive = false;
    } else if (checkDraw()) {
        displayResult('It\'s a draw!');
        gameActive = false;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
    });
}

function checkDraw() {
    return !gameBoard.includes('') && !checkWin();
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    const resultElement = document.getElementById('result');
    resultElement.textContent = '';
}
