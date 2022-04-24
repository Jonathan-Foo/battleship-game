import forTest from "./testFunctions";

test('testing if object is returned', () => {
    expect(forTest()).toEqual({x: 1, y: 2});
})
