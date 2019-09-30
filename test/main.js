const assert = require('chai').assert;
const SumdokuBoard = require('../main').SumdokuBoard;

describe("test script", () => {
    it("should run", () => {
        assert.isTrue(true);
    });
});

describe("SumdokuBoard", () => {
    const input = [1,2,3,4,5,6,7,8,9];
    it("should accept an array", () => {
        assert.equal(input, new SumdokuBoard(input).board);
    });
    it("should have a size equal to the square root of its array", () => {
        assert.equal(Math.sqrt(input.length), new SumdokuBoard(input).size);
    });
});