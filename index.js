// Gameboard object
// Board layout
// Get board 
// Track win condition
function createGameboard() {
  let board = []
  let size = 3;

  const boardMap = {
    0: [0,0],
    1: [0,1],
    2: [0,2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2]
  }

  // create board of size 3
  for (let i = 0; i < 3; i++) {
    let row = []
    for (let j = 0; j < 3; j++) {
      row.push('.');
    }
    board.push(row);
  }

  const placeToken = (position) => {

  }

  const validPlacement = (position) => {
    let valid = true;

    return valid;
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
function createPlayer(name, token) {
  let points = 0;

  const getName = () => {
    return name;
  }

  const getToken = () => {
    return token;
  }

  const addPoint = () => {
    points += 1;
  }

  const getPoint = () => {
    return points;
  }

  return {getName, getToken, addPoint, getPoint}
}


// Object to control flow of the game <- Singleton
// Who's turn is it?
// Total games played
// First to n games wins
const gameController = (function createGameController() {
  let playerOne;
  let playerTwo;
  let activePlayer;
  // get token choice
  const createPlayers = (name, token) => {
    playerOne = createPlayer(name, token);
    let computerToken = token == 'O' ? 'X' : 'O';
    playerTwo = createPlayer('CPU', computerToken);
    activePlayer = playerOne.getToken == 'X' ? playerOne : playerTwo;
  }
  
  let board = createBoard();

  // playRound; get user input
  const playRound = (position) => {
    // if activePlayer is playerTwo, choose for them
    if (activePlayer == playerTwo) {
      
    }
  }
  
  return {}
})