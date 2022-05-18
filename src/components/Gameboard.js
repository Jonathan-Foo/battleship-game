import Ship from './Ship'

class Gameboard {
    constructor() {
        this.gameboardArr = [['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],
                            ['', '', '', '', '', '', '', '', '', ''],]

        // this.shipsArr = [new Ship(5, 'A'), new Ship(4, 'B'), new Ship(3, 'C'), new Ship(3, 'D'), new Ship(2, 'E')];
        this.shipsArr = [new Ship(2, 'E'), new Ship(3, 'D'), new Ship(3, 'C'), new Ship(4, 'B'),  new Ship(5, 'A')];
        
    }

    // ATTACK FUNCTION - PASSED TEST
    receiveAttack = (coord) => {
        if (this.gameboardArr[coord.y][coord.x] === 'M' || this.gameboardArr[coord.y][coord.x] === 'X') {
            return;
        } else if (this.gameboardArr[coord.y][coord.x] === '' || this.gameboardArr[coord.y][coord.x] === 'O') {
            this.gameboardArr[coord.y][coord.x] = 'M'
        } else {
        this.successfulHit(coord);
        }
        // displayBoard() function to refresh the display
    }

    // Attack function - how gameboard responds when a players clicks a square
    sunken(ship) {
        ship.adjacentCoords.forEach(coord => this.gameboardArr[coord.y][coord.x] = 'M')
    }

    successfulHit(obj) {
        const targetSymbol = this.gameboardArr[obj.y][obj.x];
        const targetShip = this.shipsArr.find(ship => ship.character === targetSymbol);
        this.gameboardArr[obj.y][obj.x] = 'X'
        targetShip.hit();
        if (!targetShip.isSunk()) {
            return
        } else {
            this.sunken(targetShip);
        }
    } 
    

    targetedShip = (coords) => {
        const targetSymbol = this.gameboardArr[coords.y][coords.x];
        const targetShip = this.shipsArr.find(ship => ship.character === targetSymbol);

        return targetShip;
    } 

    notTargetedShips = (coords) => {
        const targetSymbol = this.gameboardArr[coords.y][coords.x];
        return this.shipsArr.filter(ship => ship.character !== targetSymbol);
    }


    
    allShipSunkCheck = () => {
        return this.shipsArr.every(ship => ship.isSunk()); 
    }

    // PLACING SHIPS RANDOMLY - PASSED 
    randomCoords(length, orientation) { 
        let x = randomInt();
        let y = randomInt();
        
        function randomInt() {
            return Math.floor(Math.random() * 10);
        }

        if (orientation === 'horizontal' && x + length <= 9) {
            return {x, y};
        } else if (orientation === 'vertical' && y + length <= 9) {
            return {x, y};
        } else {
            return this.randomCoords(length, orientation)
        }
    }

    placeShipsRandomly = (ship) => { 
        // Orienation needs to set before headCoord
        ship.randomOrientation(); 
        const length = ship.length
        const orientation = ship.orientation
        ship.setHeadCoord(this.randomCoords(length, orientation))
       
        if (this.canBePlace(ship)) {
            this.insertCharactersToGBArr(ship);
        } else {
            return this.placeShipsRandomly(ship);
        }
   
    }    

    insertCharactersToGBArr = (ship) => {
        ship.shipBodyCoords.forEach( point => this.gameboardArr[point.y][point.x] = ship.character);
        ship.adjacentCoords.forEach( point => {this.gameboardArr[point.y][point.x] = 'O'});
    }

    canBePlace = (ship) => {
        if (ship.shipBodyCoords.some(point => point.x > 9 || point.y > 9)) {
            return false 
        } else {
            return ship.shipBodyCoords.every(point => this.gameboardArr[point.y][point.x] === ''); 	
        }
        
    }

    placeShips = () => {
        if (!this.gameboardArr.every(array => array.every(point =>  point === ''))) return; 
        this.shipsArr.forEach(ship => this.placeShipsRandomly(ship));
        
    
    }

    

}


export default Gameboard;