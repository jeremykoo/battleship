import { Player } from "./Player";

export const GameController = () => {
  const player = Player('Player');
  const computer = Player('Computer');
  let activePlayer = player;

  const addPlayerShip = (id, x, y, length, orientation) => {
    player.populateShip(id, x, y, length, orientation);
  }

  const addComputerShips = () => {
    const ships = [
      // [id, x, y, length, orientation]
      ['carrier', 0, 0, 5, 'horizontal'],
      ['battleship', 1, 2, 4, 'vertical'],
      ['destroyer', 4, 6, 3, 'vertical'],
      ['submarine', 8, 1, 2, 'horizontal'],
    ]
    ships.forEach((ship) => {
      computer.populateShip(...ship);
    });
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
        console.log(`all ships sunk, ${activePlayer.getName()} wins!`);
        return activePlayer.getName();
      }
      if (result === false) {
        switchPlayerTurn();
        while (computerTurn() === true) {}
        if (activePlayer.checkWinCondition(player)) {
          console.log(`all ships sunk, ${activePlayer.getName()} wins!`);
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