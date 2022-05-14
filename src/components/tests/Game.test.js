import Game from "../Game";

test.skip('test Game component', () => {
    const testGame = Game();

    expect(testGame.gameloop()).toEqual([]);
})