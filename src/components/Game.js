import Player from "./Player"
import { displayGameBoard, changeMode } from "./render/ShipPlacement"
import { startGame } from "./render/StartGame";


export default function Game() {
    const player1 = new Player('player')
    player1.placeShipsRandomly();
    displayGameBoard(player1.gameBoard);
    changeMode.add(player1.gameBoard);

    const player2 = new Player('computer')
    player2.placeShipsRandomly();


    startGame(player1, player2);  
};






