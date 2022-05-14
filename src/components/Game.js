import Player from "./Player"
import { displayGameBoard } from "./DOM Interaction/Render"

export default function Game() {
    const player1 = new Player('player')
    player1.placeShipsRandomly();
    displayGameBoard(player1.gameBoard.gameboardArr);

    const player2 = new Player('computer')
    player2.placeShipsRandomly();


    // const gameloop = () => {
    //     player1.attack(player2)
    //     if (!player2.gameBoard.allShipSunkCheck()) {
    //         player2.attack(player1);
    //         if (!player1.gameBoard.allShipSunkCheck()) {
    //             gameloop();
    //         } else {
    //             return gameOver(player2);     
    //         }
    //     } else {
    //         return gameOver(player1); 
    //     }
    // }
    

    const gameOver = (player) => {
        const name = player.name
        console.log(`${name} won`)
        return `${name} won`
        // other animation likes like the player move area declaring that one of the players have won and
        // create a play again button, which just restars the browser and disable both boards
    }
    

    return {
        player1,
        player2
    }

};






