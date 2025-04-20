const boardttt = document.getElementById('board');
const messagettt = document.getElementById('message');
let board = [];
let currentPlayer = 'X';
let gameOver = false;

function startGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
  messagettt.textContent = "Player X's turn";
}

function renderBoard() {
  boardttt.innerHTML = '';
  board.forEach((cell, index) => {
    const cellEl = document.createElement('div');
    cellEl.classList.add('cell');
    cellEl.textContent = cell;
    cellEl.addEventListener('click', () => handleMove(index));
    boardttt.appendChild(cellEl);
  });
}

function handleMove(index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  const winnerInfo = winner();
  if (winnerInfo) {
    gameOver = true;
    highlightWinningCells(winnerInfo.indices);
    messagettt.textContent = Player ${winnerInfo.player} wins!;
    return;
  }

  if (board.every(cell => cell)) {
    gameOver = true;
    messagettt.textContent = "Draw!";
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  messagettt.textContent = Player ${currentPlayer}'s turn;
}

function winner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (const [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], indices: [a, b, c] };
    }
  }
  return null;
}

function highlightWinningCells(indices) {
  const cells = document.querySelectorAll('.cell');
  indices.forEach(i => cells[i].classList.add('winning'));
}

startGame();