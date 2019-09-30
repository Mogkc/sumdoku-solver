const assert = require('chai').assert;
const SumdokuBoard = require('../main').SumdokuBoard;
const InvalidInputError = require('../main').InvalidInputError;

describe("test script", () => {
    it("should run", () => {
        assert.isTrue(true);
    });
});

describe("SumdokuBoard", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    describe("constructor", () => {
        it("should accept an array", () => {
            assert.equal(input, new SumdokuBoard(input).board);
        });
        it("should have a size equal to the square root of its array", () => {
            assert.equal(Math.sqrt(input.length), new SumdokuBoard(input).size);
        });
        it("should reject non-square boards", () => {
            try {
                new SumdokuBoard(new Array(2));
                assert.isTrue(false, "Didn't throw InvalidInputError");
            } catch (e) {
                if (e instanceof InvalidInputError)
                    assert.isTrue(true);
                else throw e;
            }
        });
    });
    describe("get", () => {
        const board = new SumdokuBoard(input);
        it("should get contents by row and column", () => {
            assert.equal(1, board.get(0, 0));
            assert.equal(9, board.get(2, 2));
        });
        it("should reject attempts to grab off-board information", () => {
            // Invalid row, negative
            try {
                board.get(-1, 0);
                assert.isTrue(false, "Didn't throw InvalidInputError");
            } catch (e) {
                if (e instanceof InvalidInputError)
                    assert.isTrue(true);
                else throw e;
            }
            // Invalid col, between size and length of array
            try {
                board.get(0, 4);
                assert.isTrue(false, "Didn't throw InvalidInputError");
            } catch (e) {
                if (e instanceof InvalidInputError)
                    assert.isTrue(true);
                else throw e;
            }
        });
        /* Put on hold as it builds upon other things not yet built
        it("should be iterable by row", () => {
            const iterator = new SumdokuBoard(input).row(1)[Symbol.iterator]();
        });
        */
    });
});