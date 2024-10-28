import { GameController } from "./GameController";

const content = document.querySelector('.content');
const instructions = document.querySelector('.instructions');

export const ScreenController = () => {
  const game = GameController();
  let piecesOrientation = 'horizontal';

  const shipMap = {
    'carrier' : 5,
    'battleship' : 4,
    'destroyer' : 3,
    'submarine' : 2
  }

  let shipList = ['carrier', 'battleship', 'destroyer', 'submarine'];

  const pregame = () => {
    content.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('intro');
    const intro = document.createElement('div');
    intro.textContent = 'What is your name?';
    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Player');
    const startBtn = document.createElement('button');
    startBtn.textContent = 'Start';
    container.appendChild(intro);
    container.appendChild(nameInput);
    container.appendChild(startBtn);
    content.appendChild(container);

    startBtn.addEventListener('click', () => {
      const playerName = document.querySelector('input').value;
      game.player.setName(playerName === '' ? 'Player' : playerName);
      selectionScreen();
    });
  }

  const selectionScreen = () => {
    content.innerHTML = '';
    instructions.textContent = `Place your ships on the board, ${game.player.getName()}!`;
    renderBoard(game.player.getGameboard().getBoard());
    renderPieces();
  }

  const playScreen = () => {
    content.innerHTML = '';
    instructions.textContent = `${game.getActivePlayer().getName()}'s turn!`;
    const myBoard = renderBoard(game.player.getGameboard().getBoard());
    const myGuesses = renderBoard(game.player.getGuessboard());
    
    myGuesses.addEventListener('click', (event) => {
      const x = event.target.dataset.row;
      const y = event.target.dataset.col;
      const currentPlayer = game.getActivePlayer();
      const opponent = game.getOpposingPlayer();
      const winner = game.playRound(x, y);

      playScreen();
      if (winner) {
        displayModal(winner);
        return;
      }
    })
  }

  const displayModal = (winner) => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';

    const para = document.querySelector('.modal-content > p');
    para.textContent = `${winner} wins!`;

    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      game.resetGame();
      shipList = ['carrier', 'battleship', 'destroyer', 'submarine'];
      instructions.textContent = 'Welcome!';
      pregame();
    });
  }

  const placeComputerPieces = () => {
    game.addComputerShips();
  }

  const renderPieces = () => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    const rotateBtn = document.createElement('button');
    rotateBtn.classList.add('rotate-button');
    rotateBtn.textContent = 'Rotate';

    const piecesContainer = document.createElement('div');
    piecesContainer.classList.add('pieces-container');
    if (piecesOrientation === 'horizontal') {
      piecesContainer.style.flexDirection = 'column';
    } else {
      piecesContainer.style.flexDirection = 'row';
    }

    shipList.forEach((name) => {
      const ship = createPiece(name);
      piecesContainer.appendChild(ship);
    })

    rotateBtn.addEventListener('click', () => {
      if (piecesOrientation === 'horizontal') {
        const piecesWrapper = document.querySelector('.pieces-container');
        piecesWrapper.style.flexDirection = 'row';
        const allPieces = document.querySelectorAll('.piece');
        allPieces.forEach((piece) => {
          piece.style.flexDirection = 'column';
        });
        piecesOrientation = 'vertical';
      } else if (piecesOrientation === 'vertical') {
        const piecesWrapper = document.querySelector('.pieces-container');
        piecesWrapper.style.flexDirection = 'column';
        const allPieces = document.querySelectorAll('.piece');
        allPieces.forEach((piece) => {
          piece.style.flexDirection = 'row';
        });
        piecesOrientation = 'horizontal';
      }
    });

    wrapper.appendChild(rotateBtn);
    wrapper.appendChild(piecesContainer);

    content.appendChild(wrapper);
  }

  const createPiece = (shipType) => {
    const piece = document.createElement('div');
    if (piecesOrientation === 'horizontal') {
      piece.style.flexDirection = 'row';
    } else {
      piece.style.flexDirection = 'column';
    }

    piece.id = shipType;
    piece.classList.add('piece');
    piece.setAttribute('draggable', 'true');
    for (let i = 0; i < shipMap[shipType]; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      piece.appendChild(square);
    }

    // drag and drop functionality
    piece.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', piece.id);
      event.dataTransfer.effectAllowed = 'move';
    });

    return piece;
  }

  const renderBoard = (board) => {
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('board');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const boardCell = document.createElement('div');
        const text = board[i][j];
        boardCell.classList.add('cell');
        boardCell.dataset.row = i;
        boardCell.dataset.col = j;
        // boardCell.textContent = text;
  
        if (text === 0) {
          boardCell.style.backgroundColor = 'white';
        } else if (text === 'hit') {
          boardCell.style.backgroundColor = 'red';
        } else if (text === 'miss') {
          boardCell.style.backgroundColor = 'green';
        } else {
          boardCell.style.backgroundColor = 'yellow';
        }

        // drop zone
        boardCell.addEventListener('dragover', (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        });

        boardCell.addEventListener('drop', (event) => {
          event.preventDefault();
          const pieceID = event.dataTransfer.getData('text/plain');
          console.log(pieceID, 'dropped successfully on', i, j);
          const place = game.addPlayerShip(pieceID, i, j, shipMap[pieceID], piecesOrientation);
          if (place === false) {
            return;
          }
          const index = shipList.indexOf(pieceID);
          if (index !== -1) {
            shipList.splice(index, 1);
          }
          selectionScreen();

          if (shipList.length === 0) {
            placeComputerPieces();
            playScreen();
          }
        });

        boardCell.addEventListener('dragenter', () => {
          boardCell.classList.add('drag-over');
        });

        boardCell.addEventListener('dragleave', () => {
          boardCell.classList.remove('drag-over');
        });

        boardDiv.appendChild(boardCell);
      }
    }
    content.appendChild(boardDiv);
    return boardDiv;
  }

  return {
    renderBoard,
    pregame,
  }
}
