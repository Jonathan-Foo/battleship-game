import Ship from "./Ship"


export default function Gameboard() {
    const gameboardArr = [['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],
                        ['', '', '', '', '', '', '', '', '', '', ''],]

    const receiveAttack = (coord) => {
        if (gameboardArr[coord.x][coord.y] === 'M' || gameboardArr[coord.x][coord.y] === 'X') {
            return;
        } else if (gameboardArr[coord.x][coord.y] === '' || gameboardArr[coord.x][coord.y] === 'O') {
            gameboardArr[coord.x][coord.y] = 'M'
        } else {
        successfulHit(coord);
        }
        // displayBoard() function to refresh the display
    }

   //Ships
    const shipA = Ship(5, 'A');
    const shipB = Ship(4, 'B');
    const shipC = Ship(3, 'C');
    const shipD = Ship(3, 'D');
    const shipE = Ship(2, 'E');

    const shipsArr = [shipA, shipB, shipC, shipD, shipE];


    function allShipSunkCheck() {
        return shipsArr.every(ship => ship.isSunk()); 
    }

    
   return {receiveAttack, allShipSunkCheck, gameboardArr}
}




// PLACING SHIPS RANDOMLY 
// Function that generates random x and y coordinates
function randomCoords() {
    function randomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    const x = randomInt(10);
    const y = randomInt(10); 
    
    return {x, y};
}

function placeShipsRandomly(ship) {
    ship.setHeadCoord(randomCoords())
    if (ship.canBePlace()) {
        ship.shipBodyCoord.forEach(point => 
            gameboardArr[point.x][point.y] = ship.character 
            )
        ship.adjacentCoords.forEach(point => 
            gameboardArr[point.x][point.y] = ship.adjSymbol 
            )   
    } else {
        placeShipsRandomly(ship)
    }
}


// Attack function - how gameboard responds when a players clicks a square
function successfulHit(obj) {
    const targetSymbol = gameboardArr[obj.x][obj.y];
    const targetShip = shipsArr.find(ship => ship.character === targetSymbol);
    targetShip.hit();
    if (!targetShip.isSunk()) {
        return
    } else {
        sunken(targetShip);
    }
    gameboardArr[obj.x][obj.y] = 'X'
} 


function sunken(ship) {
    const adjCoords = ship.adjacentCoords;
    adjCoords.forEach(coord => gameboardArr[coord.x][coord.y] = 'M')
}