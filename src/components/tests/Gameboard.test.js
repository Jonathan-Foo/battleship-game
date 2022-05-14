import Gameboard from "../Gameboard";


test.skip('gameboard testing', () => {
    const testGameBoard =  new Gameboard();

    //receive attack - create fake gameboard, attack an empty square and a occupied square to test the ressult
    testGameBoard.gameboardArr = [['O', 'B', 'B', 'B', 'B', 'O', '', '', '', ''],
                                ['O', 'O', 'O', 'O', 'O', 'O', '', '', '', ''],
                                ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                ['', '', 'O', 'A', 'O', 'O', 'D', 'D', 'D', 'O'],
                                ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                ['', '', 'O', 'O', 'O', 'O', 'O', 'O', 'O', ''],
                                ['O', 'O', 'O', 'O', 'O', 'O', 'E', 'E', 'O', ''],
                                ['O', 'C', 'C', 'C', 'O', 'O', 'O', 'O', 'O', '']]

    const testShipA = testGameBoard.shipsArr[0];
    testShipA.setOrietation('vertical');
    testShipA.setHeadCoord({x: 3, y: 2});

    const testShipB = testGameBoard.shipsArr[1];
    testShipB.setOrietation('horizontal');
    testShipB.setHeadCoord({x: 1, y: 0});
    
    const testShipC = testGameBoard.shipsArr[2];
    testShipC.setOrietation('horizontal');
    testShipC.setHeadCoord({x: 1, y: 9});

    const testShipD = testGameBoard.shipsArr[3];
    testShipD.setOrietation('horizontal');
    testShipD.setHeadCoord({x: 6, y: 3});

    const testShipE = testGameBoard.shipsArr[4];
    testShipE.setOrietation('horizontal');
    testShipE.setHeadCoord({x: 6, y: 8});



    

    // expect(testShipD.shipBodyCoords).toEqual({x: 3, y: 2});

    

    testGameBoard.receiveAttack({x: 3, y: 2})
    testGameBoard.receiveAttack({x: 3, y: 3})
    testGameBoard.receiveAttack({x: 3, y: 4})
    testGameBoard.receiveAttack({x: 3, y: 5})
    testGameBoard.receiveAttack({x: 3, y: 6})
    
    testGameBoard.receiveAttack({x: 1, y: 0})
    testGameBoard.receiveAttack({x: 2, y: 0})
    testGameBoard.receiveAttack({x: 3, y: 0})
    testGameBoard.receiveAttack({x: 4, y: 0})

    testGameBoard.receiveAttack({x: 1, y: 9})
    testGameBoard.receiveAttack({x: 2, y: 9})
    testGameBoard.receiveAttack({x: 3, y: 9})
    
    testGameBoard.receiveAttack({x: 6, y: 3})
    testGameBoard.receiveAttack({x: 7, y: 3})
    testGameBoard.receiveAttack({x: 8, y: 3})

    testGameBoard.receiveAttack({x: 6, y: 8})
    testGameBoard.receiveAttack({x: 7, y: 8})
    testGameBoard.receiveAttack({x: 8, y: 8})
   
    expect(testGameBoard.allShipSunkCheck()).toEqual(true)
    
    // expect(testGameBoard.gameboardArr).toEqual([['M', 'X', 'X', 'X', 'X', 'M', '', '', '', ''],
    //                                             ['M', 'M', 'M', 'M', 'M', 'M', '', '', '', ''],
    //                                             ['', '', 'M', 'X', 'M', 'M', 'M', 'M', 'M', 'M'],
    //                                             ['', '', 'M', 'X', 'M', 'M', 'X', 'X', 'X', 'M'],
    //                                             ['', '', 'M', 'X', 'M', 'M', 'M', 'M', 'M', 'M'],
    //                                             ['', '', 'M', 'X', 'M', '', '', '', '', ''],
    //                                             ['', '', 'M', 'X', 'M', '', '', '', '', ''],
    //                                             ['', '', 'M', 'M', 'M', 'M', 'M', 'M', 'M', ''],
    //                                             ['M', 'M', 'M', 'M', 'M', 'M', 'X', 'X', 'M', ''],
    //                                             ['M', 'X', 'X', 'X', 'M', 'M', 'M', 'M', 'M', '']])

    // expect(testShipA.isSunk()).toEqual(true)

    //attack all occupied spacea of a ship, check if surrounding becomes 'M' indicate sunken funcitino works

    //
  
})
