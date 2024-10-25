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
    ships = {};
  }
  
  const placeShip = (id, x, y, length, orientation) => {
    const ship = Ship(id, length);
    ships[id] = ship;

    if (orientation === 'horizontal') {
      for (let i = y; i < y + length; i++) {
        board[x][i] = id;
      }
    } else if (orientation === 'vertical') {
      for (let i = x; i < x + length; i++) {
        board[i][y] = id;
      }
    }
  }

  const getShipByID = (id) => ships[id];

  const receiveAttack = (x, y) => {
    console.log('receiving attack at', x, y);
    if (board[x][y] === 'hit') {
      console.log('already hit this spot, try again');
      // make this throw an error instead
      return null;
    }

    if (board[x][y] === 0) {
      console.log('attack missed');
      board[x][y] = 'miss';
      return false;
    }

    console.log('successful hit');
    const shipID = board[x][y];
    const ship = getShipByID(shipID);
    ship.hit();
    ship.printHits();
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