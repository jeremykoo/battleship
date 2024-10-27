import './styles.css';
import { Player } from './Player.js';
import { ScreenController } from './ScreenController.js';
import { GameController } from './GameController.js';


// const game = GameController();
// game.initialize();
// game.playRound(0,0);
// game.playRound(8,8);
// game.playRound(0,1);
// game.playRound(1,2);
// game.playRound(0,2);
// game.playRound(3,3);
// game.playRound(0,3);

const dom = ScreenController();
dom.pregame();
// dom.renderBoard(game.player.getGameboard().getBoard());
// dom.renderBoard(game.player.getGuessboard());
