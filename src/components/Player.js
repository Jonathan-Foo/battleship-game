import Gameboard from "./Gameboard"

const Player = (name) => {
    const gameBoard = Gameboard();
    //Placing ships randomly
    gameBoard.placeShips();

    //Function for players to initiate and attack on opponent
    const attack = (opponent) => {
        const attackCoord = createRandomCoord()
        if (opponent.gameBoard.gameboardArr[attackCoord.x][attackCoord.y] !== 'M' || opponent.gameBoard.gameboardArr[attackCoord.x][attackCoord.y] !== 'X' ) {
            opponent.gameBoard.receiveAttack(attackCoord);
        }  else {
            attack();
        }
    }

    const createRandomCoord = () => {
        function randomInt(max) {
            return Math.floor(Math.random() * (max + 1));
        }
        const x = randomInt(10);
        const y = randomInt(10); 
        return {x, y};
    } 



    return { name, attack, gameBoard }
}

export default Player;