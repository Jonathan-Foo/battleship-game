import Player from "../Player";

test.skip('testing Player class', () => {
    const testPlayer1 = new Player()
    const testPlayer2 = new Player()
    testPlayer1.gameBoard.gameboardArr = [['O', 'B', 'B', 'B', 'B', 'O', '', '', '', ''],
                                        ['O', 'O', 'O', 'O', 'O', 'O', '', '', '', ''],
                                        ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                        ['', '', 'O', 'A', 'O', 'O', 'D', 'D', 'D', 'O'],
                                        ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                        ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                        ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                        ['', '', 'O', 'O', 'O', 'O', 'O', 'O', 'O', ''],
                                        ['O', 'O', 'O', 'O', 'O', 'O', 'E', 'E', 'O', ''],
                                        ['O', 'C', 'C', 'C', 'O', 'O', 'O', 'O', 'O', '']]
                                
    testPlayer2.gameBoard.gameboardArr = [['O', 'B', 'B', 'B', 'B', 'O', '', '', '', ''],
                                        ['O', 'O', 'O', 'O', 'O', 'O', '', '', '', ''],
                                        ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                        ['', '', 'O', 'A', 'O', 'O', 'D', 'D', 'D', 'O'],
                                        ['', '', 'O', 'A', 'O', 'O', 'O', 'O', 'O', 'O'],
                                        ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                        ['', '', 'O', 'A', 'O', '', '', '', '', ''],
                                        ['', '', 'O', 'O', 'O', 'O', 'O', 'O', 'O', ''],
                                        ['O', 'O', 'O', 'O', 'O', 'O', 'E', 'E', 'O', ''],
                                        ['O', 'C', 'C', 'C', 'O', 'O', 'O', 'O', 'O', '']]                           

    
    testPlayer1.attack(testPlayer2)                                     
    
    
    expect(testPlayer2.gameBoard.gameboardArr).toEqual([])



})