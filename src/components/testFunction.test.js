import forTest from "./testFunctions";

test.skip('testing if object is returned', () => {
    expect(forTest()).toEqual({x: 1, y: 2});
})
