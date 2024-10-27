import { Gameboard } from './Gameboard';

export const Player = ((playerName) => {
  let name = playerName;
  const gameboard = Gameboard();
  const guessboard = [];

  for (let i = 0; i < 10; i++) {
    guessboard[i] = [];
    for (let j = 0; j < 10; j++) {
      guessboard[i].push(0);
    }
  }

  const setName = (newName) => { name = newName };

  const getName = () => name;

  const populateShip = (id, x, y, length, orientation) => {
    gameboard.placeShip(id, x, y, length, orientation);
  }

  const resetBoards = () => {
    gameboard.resetBoard();
    for (let i = 0; i < 10; i++) {
      guessboard[i] = [];
      for (let j = 0; j < 10; j++) {
        guessboard[i].push(0);
      }
    }
  }

  const getGameboard = () => gameboard;

  const getGuessboard = () => guessboard;

  const attack = (enemy, x, y) => {
    const enemyBoard = enemy.getGameboard();
    const result = enemyBoard.receiveAttack(x, y);
    if (result === null) {
      console.log('already hit this spot, try again');
    } else if (result === false) {
      console.log('attack missed');
      guessboard[x][y] = 'miss';
      return false;
    } else if (result === true) {
      console.log('successful hit');
      guessboard[x][y] = 'hit';
    }
    return true;
  }

  const checkWinCondition = (enemy) => {
    return enemy.getGameboard().allShipsSunk();
  }

  return {
    setName,
    getName,
    attack,
    getGameboard,
    getGuessboard,
    populateShip,
    checkWinCondition,
    resetBoards
  }
});