import './styles.css';
import { Player } from './Player.js';

const content = document.querySelector('.content');
content.textContent = 'hello world';


const player = Player('player');
const computer = Player('computer');

computer.getGameboard().placeShip('carrier', 0, 0, 4, 'horizontal');

player.attack(computer, 0, 2);
console.log(computer.getGameboard().getBoard());
player.attack(computer, 0, 2);
console.log(computer.getGameboard().getBoard());
player.attack(computer, 9, 9);
console.log(computer.getGameboard().getBoard());