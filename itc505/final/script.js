const LAYOUT_SIZE = 5;
let layout = [];
let gameLayout = document.getElementById('layout');

const initializelayout = () => {
  for (let i = 0; i < LAYOUT_SIZE; i++) {
    layout[i] = Array.from({ length: LAYOUT_SIZE }, () => false);
  }
};

const renderlayout = () => {
  gameLayout.innerHTML = '';
  for (let i = 0; i < LAYOUT_SIZE; i++) {
    for (let j = 0; j < LAYOUT_SIZE; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.style.backgroundColor = layout[i][j] ? '#000' : '#ddd';
      cell.addEventListener('click', toggleLights);
      gameLayout.appendChild(cell);
    }
  }
};

const toggleLights = (event) => {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);

  if (checkWin()) {
    window.alert("Congrats You Won The Game!");
  }

  renderlayout();
  handleWin();
};

const toggleCell = (row, col) => {
  if (row >= 0 && row < LAYOUT_SIZE && col >= 0 && col < LAYOUT_SIZE) {
    layout[row][col] = !layout[row][col];
  }
};

const randomizelayout = () => {
  for (let i = 0; i < LAYOUT_SIZE * LAYOUT_SIZE; i++) {
    const row = Math.floor(Math.random() * LAYOUT_SIZE);
    const col = Math.floor(Math.random() * LAYOUT_SIZE);
    toggleLights({ target: { dataset: { row, col } } });
  }
};

const checkWin = () => {
  for (let i = 0; i < LAYOUT_SIZE; i++) {
    for (let j = 0; j < LAYOUT_SIZE; j++) {
      if (!layout[i][j]) {
        return false;
      }
    }
  }
  return true;
};

const startGame = () => {
  initializelayout();
  renderlayout();
  randomizelayout();
};

const handleWin = () => {
  if (checkWin()) {
    window.alert('Congrats You Won The Game!');
  }
};

window.onload = () => {
  startGame();
};

const refreshPage = () => {
  window.location.reload();
};

document.getElementById('refreshButton').addEventListener('click', refreshPage);

let interval;
let seconds = 0;
let displayTimming = document.createElement('div');
displayTimming.id = 'timer';
document.body.appendChild(displayTimming);

const startTimer = () => {
  interval = setInterval(updateTimer, 1000);
};

const updateTimer = () => {
  seconds++;
  displayTimming.textContent = `Time: ${seconds} seconds`;
};

const stopTimer = () => {
  clearInterval(interval);
};

const restartGame = () => {
  stopTimer();
  seconds = 0;
  startTimer();
  startGame();
};

document.getElementById('newButton').addEventListener('click', restartGame);

startGame();
startTimer();
