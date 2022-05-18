import Gameboard from "./Gameboard"

class Player{ 
    constructor(name) {
        this.name = name;
        this.gameBoard = new Gameboard();
    }

    placeShipsRandomly() {
        this.gameBoard.placeShips();
    }
    // 

    //Function for players to initiate and attack on opponent
    randomAttack(opponent) {
        const attackCoord = this.createRandomCoord();
        if (opponent.gameBoard.gameboardArr[attackCoord.y][attackCoord.x] !== 'M' || opponent.gameBoard.gameboardArr[attackCoord.y][attackCoord.x] !== 'X' ) {
            opponent.gameBoard.receiveAttack(attackCoord);
        }  else {
            this.attack(opponent);
        }
    }

    targettedAttack(coord, opponent) {
        const attackCoord = coord
        opponent.gameBoard.receiveAttack(attackCoord);

    }

    createRandomCoord() {
        function randomInt() {
            return Math.floor(Math.random() * 10);
        }
        const x = randomInt();
        const y = randomInt();

        return {x, y};
    } 

}

export default Player;