import { Gameboard } from './Gameboard';

export const Player = ((playerName) => {
  const name = playerName;
  const gameboard = Gameboard();
  const guessesHit = [];
  const guessesMiss = [];

  const getGameboard = () => gameboard;

  const attack = (enemy, x, y) => {
    const enemyBoard = enemy.getGameboard();
    enemyBoard.receiveAttack(x, y);
  }

  return {
    attack,
    getGameboard,
  }
});