import Gameboard from "./Gameboard";


test('gameboard testing', () => {
    const testGameBoard =  new Gameboard();
    const testShip = testGameBoard.shipsArr[0];
    // testGameBoard.placeShipsRandomly(testShip)
    testGameBoard.placeShips();
    // expect(testGameBoard.gameboardArr).toEqual([])
    expect(testGameBoard.gameboardArr.length).toEqual([])
  
})
