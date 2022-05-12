import Player from "./Player"

export default function Game() {
    const player1 = Player('Player 1')
    const player2 = Player('Computer')

    const gameOverCheck = () => {
        if (player1.gameBoard.allShipSunkCheck) {
            return gameOver(player1)
        } else if (player2.gameBoard.allShipSunkCheck) {
            return gameOver(player2)
        } else {
            return
        }
    }

    const gameloop = () => {
        // player1.attack(player2)
        // if (!player2.gameBoard.allShipSunkCheck) {
        //     player2.attack(player1);
        //     if (!player1.gameBoard.allShipSunkCheck) {
        //         gameloop();
        //     } else {
        //         return gameOver(player2);     
        //     }
        // } else {
        //     return gameOver(player1); 
        // }
        
        player1.attack(player2);
        gameOverCheck();
        player2.attack(player1);
        gameOverCheck();
        return gameloop();

    }
    

    return {
        gameloop,
    }

};



const gameOver = (player) => {
  const name = player.name

  console.log(`${name} won`)
  // other animation likes like the player move area declaring that one of the players have won and
  // create a play again button, which just restars the browser and disable both boards
}