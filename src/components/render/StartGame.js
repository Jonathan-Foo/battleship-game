import { shipSquaresArr } from "./ShipPlacement";

//FUNCTIONS TO RUN AFTER EVERY PLAYER"S TURN 
const turn = (player, opponent) => {
    const playerName = player.name
    const playerGameBoard = player.gameBoard.gameboardArr
    const opponentName = opponent.name

    const playerShipsArr = player.gameBoard.shipsArr


    const updateComputerBoard = (point, xIndex, yIndex) => {
        switch(point) {
            case 'M':
                let missDiv = document.querySelector(`.computer > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                missDiv.classList.add('miss');
                break;
            case 'X':
                let hitDiv = document.querySelector(`.computer > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                hitDiv.classList.add('hit');
                break;
            default:
                break;
        }
    }

    const updatePlayerBoard = (point, xIndex, yIndex) => {
        switch(point) {
            case '':
                break;
            case 'O':
                break;
            case 'M':
                let missDiv = document.querySelector(`.player > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                missDiv.classList.add('miss');
                break;
            case 'X':
                let hitDiv = document.querySelector(`.player > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                hitDiv.classList.remove('occupied')
                hitDiv.classList.add('hit');
                break;
            default:
                let targetDiv = document.querySelector(`.player > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                targetDiv.classList.add('occupied');
                break;
        }
    }


    const updateBoardDisplay = () => {
        playerGameBoard.forEach((array, yIndex) => {
            array.forEach((point, xIndex) => {
                if (playerName === 'computer') {
                    updateComputerBoard(point, xIndex, yIndex);
                } else {
                    updatePlayerBoard(point, xIndex, yIndex);
                }
            })
        })
    }


    const displayPlayerTurn = () => {
        const capitalizeName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
        const instruction = document.querySelector('.instruction > p');
        instruction.textContent = `${capitalizeName}'s Turn`;
    }

    const disableBoard = () => {
        const gameBoard = document.getElementById(`${playerName}-table`)
        gameBoard.classList.add('disabled');
    }

    const enableBoard = () => {
        const gameBoard = document.getElementById(`${opponentName}-table`)
        if (!gameBoard.classList.contains('disabled')) return;
        gameBoard.classList.remove('disabled');
    }


    const refreshShipContainerDisplay = () => {
        const shipContainerSunkDisplay = (index, name) => {
            const allShipWrappers = [...document.querySelectorAll(`.ship-wrapper.${name}`)];
        
            allShipWrappers[index].classList.add('sunk');
        }
        
        playerShipsArr.forEach((ship, index) => {
            if (!ship.isSunk()) return;            
            shipContainerSunkDisplay(index, playerName);

        })
    }


    updateBoardDisplay()
    displayPlayerTurn()
    disableBoard()
    enableBoard()
    refreshShipContainerDisplay()
}

// start button function
const cloneStartBtn = () => {
    const startBtn = document.getElementById('start-btn');
    startBtn.replaceWith(startBtn.cloneNode(true))
}

const gameOver = (player) => {
    const playerName = player.name
    const capitalizeName = playerName.charAt(0).toUpperCase() + playerName.slice(1);
    const instruction = document.querySelector('.instruction > p');
    instruction.textContent = `${capitalizeName} Won!`;
    
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => window.location.reload());

    const allComputerGameBoardDivsArr = [...document.querySelectorAll('.computer > div')] 
    allComputerGameBoardDivsArr.forEach(square => square.replaceWith(square.cloneNode(true)))
}

const gameLoop = (player, computer) => {
    if (!computer.gameBoard.allShipSunkCheck()) {
        turn(computer, player)
        setTimeout(() => {
            computer.randomAttack(player)
            turn(computer, player)
            if (!player.gameBoard.allShipSunkCheck()) {
                turn(player, computer)
            } else {
                turn(player, computer)
                return gameOver(computer);     
            }
        }, 1500);
    } else {
        turn(computer, player)
        return gameOver(player); 
    }
}


const playerAttack = (e, player, computer) => {
    const xIndex = e.target.dataset.x;
    const yIndex = e.target.dataset.y;
    const attackCoord = {x: xIndex, y: yIndex};
    if (computer.gameBoard.gameboardArr[yIndex][xIndex] === 'M' || computer.gameBoard.gameboardArr[yIndex][xIndex] === 'X') {
        return
    } else {
        player.targettedAttack(attackCoord, computer)
        gameLoop(player, computer)
    }
}



const addComputerBoardListeners = (player, computer) => {
    const allComputerGameBoardDivsArr = [...document.querySelectorAll('.computer > div')] 
    
    allComputerGameBoardDivsArr.forEach(square => square.addEventListener('click', (e) => playerAttack(e, player, computer)))
}


const removePlayerBoardListeners = (gameBoard) => {
    shipSquaresArr(gameBoard).forEach(square => square.replaceWith(square.cloneNode(true)));
}

const initialize = (player, opponent) => {
    turn(player, opponent);
    cloneStartBtn();
    removePlayerBoardListeners(player.gameBoard);
    addComputerBoardListeners(player, opponent);
}


const startGame = (player, opponent) => {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => initialize(player, opponent));
}



export { startGame } 