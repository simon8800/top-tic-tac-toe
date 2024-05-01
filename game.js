function createGameboard() {
  // create 3x3 board
  let board = [];

  function clearBoard() {
    board = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(".");
      }
      board.push(row);
    }
  }

  clearBoard();

  // board position to coordinate mapping
  const BOARD_MAP = {
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

  // positions to win game
  const WIN_CONDITIONS = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  // keep track of how many positions are filled
  let count = 0;

  const isValidPlacement(desiredPosition) {
    if (typeof desiredPosition != 'number') {
      throw new Error("Position must be a number");
    }
    
    let coordinates = BOARD_MAP[desiredPosition];
    return board[coordinates[0]][coordinates[1]] == '.';
  }

  const placeToken(desiredPosition, playerToken) {
    if (typeof desiredPosition != 'number') {
      throw new Error("Position must be a number");
    }
    
    let coordinates = BOARD_MAP[desiredPosition];
    board[coordinates[0]][coordinates[1]] = playerToken;
  }

  return { isValidPlacement, placeToken };
}

function createPlayer(playerName, playerToken) {
  let name = playerName;
  let token = playerToken;
  let score = 0;

  const getName = () => {
    return name;
  };

  const getToken = () => {
    return token;
  };

  const getScore = () => {
    return score;
  };

  const scorePoint = () => {
    score += 1;
  };

  return { getName, getToken, getScore, scorePoint };
}

function createGame() {
  let playerOne = createPlayer("Player One", "X");
  let cpu = createPlayer("CPU", "O");
  let board = createGameboard();
  let activePlayer = playerOne;

  // enables CPU to choose a random position
  function getRandomPosition() {
    let randomPosition = Math.floor(Math.random() * 9);
    return randomPosition;
  }

  const playRound = (desiredPosition) => {
    let positon;
    // if playerOne, check if desiredPosition is valid, if not then return
    if (activePlayer == playerOne) {
      position = parseInt(desiredPosition);

    }
    // if cpu, generate random desiredPosition until valid
  };

  return { playRound };
}
