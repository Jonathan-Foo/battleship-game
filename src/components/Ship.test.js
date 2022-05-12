import Ship from "./Ship";


test.skip('orientation of Ship changes using changeOrientation function', () => {
    //arrange, act, assert
    const testShip = new Ship(3, 'C');
    testShip.setHeadCoord({x: 2, y: 1});

    expect(testShip.shipBodyCoords).toEqual('C'); 
    // expect(testShip.headCoord).toEqual({x: 2, y: 1}); 
})