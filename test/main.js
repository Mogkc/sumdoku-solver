const assert = require('chai').assert;
const SumdokuBoard = require('../main');

describe("test script", () => {
    it("should run", () => {
        assert.isTrue(true);
    });
});

describe("SumdokuBoard", () => {
    it("Should accept an array", () => {
        const input = [1,2,3,4,5,6,7,8,9]
        assert.equal(input, new SumdokuBoard(input).board);
    });
});