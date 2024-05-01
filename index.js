let cellElements = document.querySelectorAll(".cell");

function createGameboard() {
  let board = [];

  // Maps positions to board coordinates
  const boardMap = {
    0: [0, 0],
    1: [0, 1],
    2: [0, 2],
    3: [1, 0],
    4: [1, 1],
    5: [1, 2],
    6: [2, 0],
    7: [2, 1],
    8: [2, 2],
  };

  const winConditions = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  let count = 0;

  // create board of size 3
  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(".");
    }
  }

  const placeToken = (position, token) => {
    let coordinates = boardMap[position];
    let row = coordinates[0];
    let column = coordinates[1];
    board[row][column] = token;
  };

  const isValidPlacement = (position) => {
    let coordinates = boardMap[position];
    let row = coordinates[0];
    let column = coordinates[1];
    return board[row][column] == ".";
  };

  const isWin = (lastPosition, token) => {
    lastPosition = parseInt(lastPosition);
    let hasWon = false;
    let i = 0;

    // iterate through win conditions until end of winConditions or player has won
    while (i < winConditions.length && !hasWon) {
      let winCondition = winConditions[i];
      if (winCondition.includes(lastPosition)) {
        // go through each position to check if it has activePlayer's token
        hasWon = winCondition.every((position) => {
          let coordinates = boardMap[position];
          let row = coordinates[0];
          let column = coordinates[1];
          return board[row][column] == token;
        });
      }
      i += 1;
    }
    return hasWon;
  };

  const clear = () => {
    board = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(".");
      }
      board.push(row);
    }
  };

  const getGameboard = () => {
    return board;
  };

  return { isWin, getGameboard, placeToken, isValidPlacement, clear };
}

// Player object
// Win count
// Either X or O
function createPlayer(name, token) {
  let points = 0;

  const getName = () => {
    return name;
  };

  const getToken = () => {
    return token;
  };

  const addPoint = () => {
    points += 1;
  };

  const getPoint = () => {
    return points;
  };

  return { getName, getToken, addPoint, getPoint };
}

// Object to control flow of the game <- Singleton
// Who's turn is it?
// Total games played
// First to n games wins
function createGameController() {
  let playerOne;
  let playerTwo;
  let activePlayer;
  let board = createGameboard();

  const createPlayers = (name, token) => {
    playerOne = createPlayer("Player One", "X");
    let computerToken = playerOne.getToken() == "O" ? "X" : "O";
    playerTwo = createPlayer("CPU", computerToken);
    activePlayer = playerOne.getToken() == "X" ? playerOne : playerTwo;
  };

  // enables CPU to choose a random position
  const getRandomPosition = () => {
    let randomPosition = Math.floor(Math.random() * 9);
    return randomPosition;
  };

  // playRound; get user input
  const playRound = (desiredPosition) => {
    let position = desiredPosition;

    // 1. Check if position is valid
    // if activePlayer is playerTwo, choose for them
    if (activePlayer == playerTwo) {
      position = getRandomPosition();
      while (!board.isValidPlacement(position)) {
        // logging if position is invalid
        console.log("Invalid position: ", position);
        position = getRandomPosition();
      }
      // logging if position is valid
      console.log("Valid position: ", position);
    } else if (activePlayer == playerOne) {
      if (!board.isValidPlacement(position)) return;
    }

    // 2. Update position in board
    board.placeToken(position, activePlayer.getToken());

    // 3. Check if win
    if (board.isWin(position, activePlayer.getToken())) {
      console.log(activePlayer.getName(), " wins!!!");
      activePlayer.addPoint();
      activePlayer = playerOne.getToken() == "X" ? playerOne : playerTwo;
      board.clear();
      return;
    } else {
      console.log("No win yet~~~");
    }

    // 4. Switch activePlayer
    activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    if (activePlayer == playerTwo) {
      playRound();
    }
  };

  return { playRound, createPlayers };
}

let game = createGameController();
game.createPlayers();

cellElements.forEach((cell) => {
  cell.onclick = function () {
    let position = parseInt(cell.dataset.position);
    game.playRound(position);
  };
});
