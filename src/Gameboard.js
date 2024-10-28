import { Ship } from './Ship.js';

export const Gameboard = (() => {
  const board = [];
  const ships = {};

  for (let i = 0; i < 10; i++) {
    board[i] = [];
    for (let j = 0; j < 10; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  const resetBoard = () => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];
      for (let j = 0; j < 10; j++) {
        board[i].push(0);
      }
    }
    for (const prop of Object.getOwnPropertyNames(ships)) {
      delete ships[prop];
    }
  }
  
  const placeShip = (id, x, y, length, orientation) => {
    const ship = Ship(id, length);
    ships[id] = ship;

    if (x + length > 10 ||  y + length > 10) {
      return false;
    }

    if (orientation === 'horizontal') {
      for (let i = y; i < y + length; i++) {
        if (board[x][i] !== 0) {
          return false;
        }
      }

      for (let i = y; i < y + length; i++) {
        board[x][i] = id;
      }
    } else if (orientation === 'vertical') {
      for (let i = x; i < x + length; i++) {
        if (board[x][i] !== 0) {
          return false;
        }
      }

      for (let i = x; i < x + length; i++) {
        board[i][y] = id;
      }
    }
  }

  const getShipByID = (id) => ships[id];

  const receiveAttack = (x, y) => {
    console.log('receiving attack at', x, y);
    if (x === null || y === null) {
      return;
    }

    if (board[x][y] === 'hit' || board[x][y] === 'miss') {
      // make this throw an error instead
      return null;
    }

    if (board[x][y] === 0) {
      board[x][y] = 'miss';
      return false;
    }

    const shipID = board[x][y];
    const ship = getShipByID(shipID);
    ship.hit();
    // ship.printHits();
    board[x][y] = 'hit';
    return true;
  }

  const allShipsSunk = () => {
    return Object.values(ships).every((ship) => ship.isSunk());
  }

  return {
    getBoard,
    resetBoard,
    placeShip,
    receiveAttack,
    allShipsSunk
  }
});