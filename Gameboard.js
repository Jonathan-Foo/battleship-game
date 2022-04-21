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

   const receiveAttack = (x, y) => {
       if (gameboardArr[x][y] === '' || gameboardArr[x][y] === 'O') {
        gameboardArr[x][y] = 'M'
       } else {
        // function that tell a specific ship that it has been hit           
        gameboardArr[x][y] = 'X'
       }
   }

   //Ships
    const shipA = Ship(5, A);
    const shipB = Ship(4, B);
    const shipC = Ship(3, C);
    const shipD = Ship(3, D);
    const shipE = Ship(2, E);

    const shipArr = [shipA, shipB, shipC, shipD, shipE];


    function allShipSunkCheck() {
        return shipArr.every(ship => ship.isSunk()); 
    }

    
        




   return {receiveAttack, allShipSunkCheck}
}

