function createGameboard() {
  let board = [];
  // Count of how many positions are filled
  let count = 0;

  function clear() {
    board = [];
    count = 0;
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(".");
      }
      board.push(row);
    }
  }
  // Start with clear board
  clear();

  // Board position to coordinate mapping
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

  // Positions to win game
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

  const isValidPlacement = (desiredPosition) => {
    if (typeof desiredPosition != "number") {
      throw new Error("Position must be a number");
    }

    let coordinates = BOARD_MAP[desiredPosition];
    return board[coordinates[0]][coordinates[1]] == ".";
  };

  const placeToken = (desiredPosition, playerToken) => {
    if (typeof desiredPosition != "number") {
      throw new Error("Position must be a number");
    }

    let coordinates = BOARD_MAP[desiredPosition];
    board[coordinates[0]][coordinates[1]] = playerToken;
    count += 1;
    return;
  };

  const getCount = () => {
    return count;
  };

  // Determine if win, tie, or neither
  const isWon = (lastPosition, token) => {
    if (typeof lastPosition != "number") {
      throw new Error("Position must be a number");
    }

    let hasWon = false;

    let i = 0;
    // Go through win conditions until end of WIN_CONDITIONS or player has won
    while (i < WIN_CONDITIONS.length && !hasWon) {
      let winCondition = WIN_CONDITIONS[i];
      if (winCondition.includes(lastPosition)) {
        // Go through each position to check if it has activePlayer's token
        hasWon = winCondition.every((position) => {
          let coordinates = BOARD_MAP[position];
          return board[coordinates[0]][coordinates[1]] == token;
        });
      }
      i += 1;
    }
    return hasWon;
  };

  return { isValidPlacement, placeToken, isWon, clear, getCount };
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

function createGameController() {
  let playerOne = createPlayer("Player One", "X");
  let playerTwo = createPlayer("Player Two", "O");
  let gameBoard = createGameboard();
  let activePlayer = playerOne;

  // enables CPU to choose a random position
  function getRandomPosition() {
    let randomPosition = Math.floor(Math.random() * 9);
    return randomPosition;
  }

  // changeActivePlayer
  function changeActivePlayer() {
    activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    return;
  }

  const playRound = (desiredPosition) => {
    let position = desiredPosition;
    let token = activePlayer.getToken();
    let activePlayerName = activePlayer.getName();
    // If position is not valid, return
    if (!gameBoard.isValidPlacement(position)) return;

    let results = { token, activePlayerName };
    // Place token at desired position
    gameBoard.placeToken(position, token);

    // Check if game is won
    if (gameBoard.isWon(position, token)) {
      // If won, activePlayer scores a point
      activePlayer.scorePoint();
      // Clear gameBoard
      gameBoard.clear();
      // Make activePlayer -> playerOne
      activePlayer = playerOne;
      results.result = "win";
      return results;
    } else if (gameBoard.getCount() >= 9) {
      gameBoard.clear();
      results.result = "tie";
      return results;
    } else {
      changeActivePlayer();
      results.result = "continue";
      return results;
    }
  };

  const restart = () => {
    activePlayer = playerOne;
    gameBoard.clear();
  };

  return {
    playerOne,
    playerTwo,
    activePlayer,
    playRound,
    restart,
  };
}

const gameDisplay = function createGameDisplay() {
  let cellElements = document.querySelectorAll(".cell");
  let gameController = createGameController();
  let currentPlayer = document.querySelector(".player-name");
  let restartButton = document.querySelector(".new-game");
  let playerOneScore = document.querySelector(".player-one-score");
  let playerTwoScore = document.querySelector(".player-two-score");
  currentPlayer.textContent = `It's ${gameController.activePlayer.getName()}'s Turn!`;

  function disableCells() {
    cellElements.forEach((cell) => {
      cell.classList.add("no-click");
    });
  }

  function enableCells() {
    cellElements.forEach((cell) => {
      cell.classList.remove("no-click");
    });
  }

  function updateScore() {
    playerOneScore.textContent = `Player One: ${gameController.playerOne.getScore()}`;
    playerTwoScore.textContent = `Player Two: ${gameController.playerTwo.getScore()}`;
  }

  function updatePlayerTurn(playerName) {
    currentPlayer.textContent = `It's ${playerName}'s Turn!`;
  }

  cellElements.forEach((cell) => {
    cell.onclick = function (e) {
      let position = parseInt(cell.dataset.position);
      results = gameController.playRound(position);
      if (results) {
        switch (results.result) {
          case "win":
            cell.children[0].textContent = results.token;
            updateScore();
            disableCells();
            currentPlayer.textContent = `${results.activePlayerName} wins!!!`;
            break;
          case "tie":
            cell.children[0].textContent = results.token;
            currentPlayer.textContent = "It's a tie!!!";
            disableCells();
            break;
          case "continue":
            cell.children[0].textContent = results.token;
            updatePlayerTurn(results.activePlayerName);
            break;
          default:
            break;
        }
      }
    };
  });

  restartButton.onclick = function () {
    gameController.restart();
    updatePlayerTurn(gameController.activePlayer.getName());
    cellElements.forEach((cell) => {
      cell.children[0].textContent = "";
    });
    enableCells();
  };
};

gameDisplay();
