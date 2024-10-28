import { Player } from "./Player";

export const GameController = () => {
  const player = Player('Player');
  const computer = Player('Computer');
  let activePlayer = player;

  const addPlayerShip = (id, x, y, length, orientation) => {
    return player.populateShip(id, x, y, length, orientation);
  }

  const addComputerShips = () => {
    const ships = [
      // [id, x, y, length, orientation]
      ['carrier', 5],
      ['battleship', 4],
      ['destroyer', 3],
      ['submarine', 2],
    ]
    ships.forEach((ship) => {
      let randomX = getRandomNumber(10);
      let randomY = getRandomNumber(10);
      let randomO = getRandomNumber(2);
      let randomOrientation;
      if (randomO === 0) {
        randomOrientation = 'horizontal';
      } else {
        randomOrientation = 'vertical';
      }
      console.log('computer ship', ship[0], randomX, randomY, randomOrientation);
      
      while (computer.populateShip(ship[0], randomX, randomY, ship[1], randomOrientation) === false) {
        randomX = getRandomNumber(10);
        randomY = getRandomNumber(10);
        randomO = getRandomNumber(2);
        randomOrientation;
        if (randomO === 0) {
          randomOrientation = 'horizontal';
        } else {
          randomOrientation = 'vertical';
        }
      };
    });
    console.log(computer.getGameboard().getBoard());
  }

  const getActivePlayer = () => activePlayer;

  const getOpposingPlayer = () => computer;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player ? computer : player;
  }

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
  }

  const computerTurn = () => {
    const randomX = getRandomNumber(10);
    const randomY = getRandomNumber(10);
    console.log('computer hitting', randomX, randomY);
    return computer.attack(player, randomX, randomY);
  }

  const playRound = (x, y) => {
    let result;
    if (activePlayer === player) {
      result = player.attack(computer, x, y);
      if (activePlayer.checkWinCondition(computer)) {
        // console.log(`all ships sunk, ${activePlayer.getName()} wins!`);
        return activePlayer.getName();
      }
      if (result === false) {
        switchPlayerTurn();
        while (computerTurn() === true) {}
        if (activePlayer.checkWinCondition(player)) {
          // console.log(`all ships sunk, ${activePlayer.getName()} wins!`);
          return activePlayer.getName();
        }
        switchPlayerTurn();
      }
    }
  }

  const resetGame = () => {
    player.resetBoards();
    computer.resetBoards();
    activePlayer = player;
  }

  return {
    player,
    computer,
    playRound,
    getActivePlayer,
    getOpposingPlayer,
    addPlayerShip,
    addComputerShips,
    resetGame
  }
}