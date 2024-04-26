// Gameboard object
// Board layout
// Get board 
// Track win condition
function createGameboard() {
  let board = []
  let size = 3;

  // create board of size 3
  for (let i = 0; i < 3; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      row.push('.');
    }
    board.push(row);
  }

  const win = (lastPosition) => {
    // write code to check board for winners after each placement? 
    // We check the starting from player's placement
    return true;
  }

  const printGameboard = () => {
    return board;
  }

  return {board, win, printGameboard};
}

// Player object
// Win count
// Either X or O
function createPlayer(name) {
  let token = ''

  const getName = () => {
    return name;
  }

  const setToken = () => {
    token = 'o'
  }

  const getToken = () => {
    return token;
  }

  return {getName, setToken, getToken}
}


// Object to control flow of the game <- Singleton
// Who's turn is it?
// Total games played
// First to n games wins
const game = (function createGame() {
  return {}
})