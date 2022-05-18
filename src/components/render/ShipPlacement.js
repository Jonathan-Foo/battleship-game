// Display the ships on Player's Gameboard
const shipSquaresArr = (gameBoard) => {
    const gameBoardArr = gameBoard.gameboardArr
    let result = [];
    gameBoardArr.forEach((array, yIndex) => {
        array.forEach((point, xIndex) => {
            if (point === '' || point === 'O') {
                return
            } else {
                let targetDiv = document.querySelector(`.player > [data-x="${xIndex}"][data-y="${yIndex}"]`);
                result.push(targetDiv); 
            }
        })
    })
    return result;
}

const displayGameBoard = (gameBoard) => {
    shipSquaresArr(gameBoard).forEach(square => square.classList.add('occupied'))
}

// General Functions 
const changingClass = {
    add: (ship, gameBoard) => {
        ship.shipBodyCoords.forEach(coord => {
            let targetDiv = document.querySelector(`.player > [data-x="${coord.x}"][data-y="${coord.y}"]`);
            targetDiv.classList.remove('occupied')
            targetDiv.classList.add('changing');
        })
        const shipHead = document.querySelector(`.player > [data-x="${ship.headCoord.x}"][data-y="${ship.headCoord.y}"]`); 
        shipHead.classList.add('head')
        displayGameBoard(gameBoard);
    },

    remove: (gameBoard) => {
        const allPlayerGameBoardDivsArr = [...document.querySelectorAll('.player > div')]
        allPlayerGameBoardDivsArr.forEach(square => {
            if (!square.classList.contains('changing')) {
                return;
            } else if (square.classList.contains('head')) {
                square.classList.remove('head');
                square.classList.remove('changing');    
            }
            square.classList.remove('changing');
        });
        displayGameBoard(gameBoard);
    }
    
}

// Handles adding or removing the 'eligible' class from divs
const eligibleClass = {
    add: (ship, gameBoard) => {
        
        ship.shipBodyCoords.forEach(coord => {
           
            let targetDiv = document.querySelector(`.player > [data-x="${coord.x}"][data-y="${coord.y}"]`);
            targetDiv.classList.add('eligible');
        })
        displayGameBoard(gameBoard);
    },

    remove: (gameBoard) => {
        const allPlayerGameBoardDivsArr = [...document.querySelectorAll('.player > div')]
        allPlayerGameBoardDivsArr.forEach(square => {
            if (!square.classList.contains('eligible')) return;
            square.classList.remove('eligible')
        });
        displayGameBoard(gameBoard)
    }

}

const confirmChange = (originalHeadCoord, boolean, ship, gameBoard) => {

    if (!boolean) ship.setHeadCoord(originalHeadCoord);

    const allPlayerGameBoardDivsArr = [...document.querySelectorAll('.player > div')]
    allPlayerGameBoardDivsArr.forEach(square => square.replaceWith(square.cloneNode(true)))
    gameBoard.insertCharactersToGBArr(ship);
    changingClass.remove(gameBoard);
    eligibleClass.remove(gameBoard);
    changeMode.add(gameBoard)     
} 

const shipHeadOnClick = (originalHeadCoord, boolean , ship, gameBoard) => {

    const shipHead = document.querySelector(`.player > [data-x="${ship.headCoord.x}"][data-y="${ship.headCoord.y}"]`); 

    const add = () => {shipHead.addEventListener('click', () => confirmChange(originalHeadCoord, boolean, ship, gameBoard))}

    return { add }
} 

// Throwing errors can't read ship.headCoord

// START Ship Head Functions
const orientationMouseOverHandler = (originalHeadCoord, ship, gameBoard) => {
    ship.changeOrientation();
    ship.setHeadCoord(originalHeadCoord);
   

    if (!gameBoard.canBePlace(ship)) {
        ship.changeOrientation();
        ship.setHeadCoord(originalHeadCoord);
        shipHeadOnClick(originalHeadCoord, true, ship, gameBoard).add() 
    } else {
        eligibleClass.add(ship, gameBoard)
        shipHeadOnClick(originalHeadCoord, true, ship, gameBoard).add()
    }
}

const orientationMouseOutHandler = (originalHeadCoord, originalOrientation, ship, gameBoard) => {
    if (ship.orientation !== originalOrientation) ship.changeOrientation();
    eligibleClass.remove(gameBoard);
}



const changeOrientationListener = (originalHeadCoord, ship, gameBoard) => {    
    const shipHead = document.querySelector(`.player > [data-x="${ship.headCoord.x}"][data-y="${ship.headCoord.y}"]`); 
    let originalOrientation = ship.orientation
    
    
    const add = () => {
        shipHead.addEventListener('mouseover', () => orientationMouseOverHandler(originalHeadCoord, ship, gameBoard));
        shipHead.addEventListener('mouseout',  () => orientationMouseOutHandler(originalHeadCoord, originalOrientation, ship, gameBoard));
    } 

    return { add }
}


// END Ship Head Functions

// Function to determine whether a new position for a ship is eligible 
const eligibilityCheck = (originalHeadCoord, ship, gameBoard) => {

    if (!gameBoard.canBePlace(ship)) {
        shipHeadOnClick(originalHeadCoord, false, ship, gameBoard).add()
        return
    } else { 
        eligibleClass.add(ship, gameBoard);
    shipHeadOnClick(originalHeadCoord, true, ship, gameBoard).add();
    }
}


// When in change mode every div on the board will the change the headCoord of the ship
const setHeadCoordMouseOverHandler = (e, originalHeadCoord, ship, gameBoard) => {
    const xIndex = e.target.dataset.x;
    const yIndex = e.target.dataset.y;
    const coords = {x: xIndex, y: yIndex};
    ship.setHeadCoord(coords);
    eligibilityCheck(originalHeadCoord, ship, gameBoard);
}

const setHeadCoordMouseOutHandler = (ship, gameBoard) => {
    eligibleClass.remove(gameBoard)
   
}

const hoverSetsHeadCoordListener  = (originalHeadCoord, ship, gameBoard) => {
    const allPlayerGameBoardDivsArr = [...document.querySelectorAll('.player > div')]

    const add = () => {
        allPlayerGameBoardDivsArr.forEach(square => square.addEventListener('mouseover', (e) => setHeadCoordMouseOverHandler(e, originalHeadCoord, ship, gameBoard)))
        allPlayerGameBoardDivsArr.forEach(square => square.addEventListener('mouseout', () => setHeadCoordMouseOutHandler(ship, gameBoard)))
    }

    return { add }
}


//remove ship from gameboard.gameBoarAr
const removeFromArr = (ship, gameBoard) => {
    ship.shipBodyCoords.forEach(coord => gameBoard.gameboardArr[coord.y][coord.x] = '')
    ship.adjacentCoords.forEach(coord => gameBoard.gameboardArr[coord.y][coord.x] = '')
}

const refreshShipPlacement = (nonTargetShipsArr, gameBoard) => {
    return nonTargetShipsArr.forEach(ship => gameBoard.insertCharactersToGBArr(ship)); 
}


// click event listener function for the changing phase before start button is clicked
const initiateChangeMode = (e, gameBoard) => {
    const xIndex = e.target.dataset.x;
    const yIndex = e.target.dataset.y;
    const coords = {x: xIndex, y: yIndex};
    const ship = gameBoard.targetedShip(coords);
    const notTargetShips = gameBoard.notTargetedShips(coords)
    const originalHeadCoord = ship.headCoord;

    shipSquaresArr(gameBoard).forEach(square => square.replaceWith(square.cloneNode(true)));
    removeFromArr(ship, gameBoard);
    refreshShipPlacement(notTargetShips, gameBoard)
    changingClass.add(ship, gameBoard);
    changeOrientationListener(originalHeadCoord, ship, gameBoard).add(); 
    hoverSetsHeadCoordListener(originalHeadCoord, ship, gameBoard).add();
    
    
}

const changeMode = {
  add: (gameBoard) => {
    shipSquaresArr(gameBoard).forEach(square => square.addEventListener('click', (e) => initiateChangeMode(e, gameBoard)))
  }
}


export { displayGameBoard, changeMode, shipSquaresArr };