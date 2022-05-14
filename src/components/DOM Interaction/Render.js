import Gameboard from "../Gameboard";

// Display the ships on Player's Gameboard
const displayGameBoard = (gameBoardArr) => {
    gameBoardArr.forEach((array, yIndex) => {
        array.forEach((point, xIndex) => {
            if (point === '' || point === 'O') {
                return
            } else {
                let targetDiv = document.querySelector(`.player > [data-coords="{x: ${xIndex}, y: ${yIndex}}"]`);
                targetDiv.classList.add('occupied');
            }
        })
    })
}

// change orientation and position of player ships, event listener only added after ship is already in change mode
const changeOrientation = (ship, gameBoard) => {
    const shipHead = document.querySelector(`.player > [data-coords="{x: ${ship.headCoord.x}, y: ${ship.headCoord.y}}"]`); 
    ship.changeOrientation();

    if (!gameBoard.canBePlace(ship)) {
        ship.changeOrientation();
        return 
    } else {
        gameBoard.insertCharactersToGBArr(ship)
        // remove 'changing' and head class from the original divs 
        return displayGameBoard(gameBoard.gameBoardArr);
    }

}

const colorChange = (ship, gameBoard) => {
    ship.shipBodyCoords.forEach(coord => {
        let targetDiv = document.querySelector(`.player > [data-coords="{x: ${coord.x}, y: ${coord.y}}"]`);
        targetDiv.classList.remove('occupied')
        targetDiv.classList.add('changing');
    })
    const shipHead = document.querySelector(`.player > [data-coords="{x: ${ship.headCoord.x}, y: ${ship.headCoord.y}}"]`); 
    shipHead.classList.add('head')
    displayGameBoard(gameBoard.gameBoardArr);
}

const hoverHeadCoordChange = (ship, gameBoard) => {
    const allPlayerGameBoardDivsArr = [...document.querySelectorAll('.player > div')]
    allPlayerGameBoardDivsArr.forEach(square => square.addEventListener('mouseover', (e) => {
        ship.setHeadCoord(e.target.dataset.coords);
        displayEligible(ship, gameBoard);
    }))

}

const displayEligible = (ship, gameBoard) => {
    allPlayerGameBoardDivsArr.forEach(square => {
        if (!square.classList.contains('eligible')) return;
        square.classList.remove('eligible')
    });

    if (!gameBoard.canBePlace(ship)) {
        return
    } else { 
        ship.shipBodyCoords.forEach(coord => {
            let targetDiv = document.querySelector(`.player > [data-coords="{x: ${coord.x}, y: ${coord.y}}"]`);
            targetDiv.classList.add('eligible');
        })
        displayGameBoard(gameBoard.gameBoardArr);
    }
}



// click event listener function for the changing phase before start button is clicked
const initiateChangeMode = (ship, gameBoard) => {
    colorChange(ship);
    hoverHeadCoordChange(ship, gameBoard);

}

const disableChangeMode = () => {

}


export { displayGameBoard };