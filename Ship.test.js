import Ship from "./Ship";


test.skip('testing if shipFullCoord is correct', () => {
    expect(Ship(3, 'C').adjacentCoords).toEqual([[2, 1], [3, 1], [4, 1]]); 
})