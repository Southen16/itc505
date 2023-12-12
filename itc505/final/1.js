const GRID_SIZE = 5;
let grid = [];
let gameGrid = document.getElementById('grid');

function initializeGrid() {
  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = false; // All lights start as "off" (false)
    }
  }
}

function renderGrid() {
  gameGrid.innerHTML = '';
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.style.backgroundColor = grid[i][j] ? '#000' : '#ddd';
      cell.addEventListener('click', toggleLights);
      gameGrid.appendChild(cell);
    }
  }
}

function toggleLights(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  
  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);
  if(checkWin())
  {
    window.alert("You win!");
  }
  renderGrid();
  handleWin(); // Check for win after toggling lights
}

function toggleCell(row, col) {
  if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
    grid[row][col] = !grid[row][col];
  }
}

function randomizeGrid() {
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);
    toggleLights({ target: { dataset: { row, col } } });
  }
}

function checkWin() {
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++)
     {
      console.log(grid[i][j]);
      if (grid[i][j]==false) 
      {
        return false; // If any light is on, game not won
      }
    }
  }
  return true; // All lights are off - game won
}

function startGame() {
  initializeGrid();
  renderGrid();
  randomizeGrid();
}

function handleWin() {
  if (checkWin()) {
    window.alert('You win!');
  }
}

window.onload = function () {
  startGame();
};

function refreshPage() {
  window.location.reload();
}

document.getElementById('newButton').addEventListener('click', refreshPage);


// 

let timerInterval;
let seconds = 0;
let timerDisplay = document.createElement('div');
timerDisplay.id = 'timer';
document.body.appendChild(timerDisplay);

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds++;
  timerDisplay.textContent = `Time: ${seconds} seconds`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Function to restart the game
function restartGame() {
  stopTimer(); // Stop the timer when restarting the game
  seconds = 0; // Reset timer
  startTimer(); // Start the timer again
  startGame(); // Restart the game
}

// Event listener for the restart button
document.getElementById('newButton').addEventListener('click', restartGame);

// Call startGame() to initialize the game initially
startGame();
startTimer(); // Start the timer initially
