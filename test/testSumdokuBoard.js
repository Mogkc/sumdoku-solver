const SumdokuBoard = require('../models/SumdokuBoard');
const InvalidInputError = require('../models/InvalidInputError');

module.exports = assert => {
    describe("SumdokuBoard", () => {
        const oneThroughNine = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9
        ];
        describe("constructor", () => {
            it("should accept an array", () => {
                assert.deepEqual(oneThroughNine, new SumdokuBoard(oneThroughNine).board);
            });
            it("should have a size equal to the square root of its array", () => {
                assert.equal(Math.sqrt(oneThroughNine.length), new SumdokuBoard(oneThroughNine).size);
            });
            it("should reject non-square boards", () => {
                assert.throws(() => new SumdokuBoard(new Array(2)), InvalidInputError);
            });
            it("should optionally accept groups", () => {
                assert.deepEqual([], new SumdokuBoard(Array(0)).groups);
                assert.equal("Groups", new SumdokuBoard(Array(0), "Groups").groups);
            });
        });
        describe("get", () => {
            const board = new SumdokuBoard(oneThroughNine);
            it("should get contents by location [row, column]", () => {
                assert.equal(1, board.get([0, 0]));
                assert.equal(9, board.get([2, 2]));
            });
            it("should reject attempts to grab off-board information", () => {
                // Invalid row, negative
                assert.throws(() => board.get([-1, 0]), InvalidInputError);
                // Invalid col, between size and length of array
                assert.throws(() => board.get([0, 4]), InvalidInputError);
            });
        });
        describe("set", () => {
            const board = new SumdokuBoard(oneThroughNine);
            const setTo = 9;
            it("should return a new board without changing the original", () => {
                assert.equal(board.get([2, 1]), 8);
                const afterSet = board.set([2, 1], setTo);
                assert.isTrue(afterSet instanceof SumdokuBoard, "Didn't return a SumdokuBoard");
                assert.isTrue(board != afterSet);
                assert.equal(board.get([2, 1]), 8);
            });
            /*
            it("should take one or more location-value pairs", () => {
                board.set([0, 0], setTo);
                assert.equal(setTo, board.get([0, 0]));
                // Or more
                board.set([0, 1], setTo, [1, 0], setTo)
            });
            it("should reject attempts to grab off-board information", () => {
                // Invalid row, negative
                assert.throws(() => board.set([-1, 0]), InvalidInputError);
                // Invalid col, between size and length of array
                assert.throws(() => board.set([0, 4]), InvalidInputError);
            });
            */
        });
        describe("iteration", () => {
            const board = new SumdokuBoard(oneThroughNine);
            it("should be iterable by row", () => {
                let place = 4;
                for(let [x, y] of board.row(1)) {
                    assert.equal(board.get([x, y]), place++);
                }
                for(let [x, y] of board.row(2)) {
                    assert.equal(board.get([x, y]), place++);
                }
            });
            it("should be iterable by column", () => {
                let place = 2 - board.size; // So the first check will be against 2
                for(let [x, y] of board.col(1)) {
                    assert.equal(board.get([x, y]), place = place + board.size);
                }
            });
            it("should reject iteration over nonexistant rows or columns", () => {
                // Row
                assert.throws(() => board.row(-1), InvalidInputError);
                assert.throws(() => board.row(4), InvalidInputError);
                // Column
                assert.throws(() => board.col(-1), InvalidInputError);
                assert.throws(() => board.col(4), InvalidInputError);
            });
        });
        describe("newBoard", () => {
            const board = SumdokuBoard.newBoard();
            it("should be a 9x9", () => {
                assert.equal(9, board.size);
            });
            it("should hold all possibilities in each location", () => {
                // Arbitrarily chosen row
                for(let [x, y] of board.row(6)) {
                    assert.deepEqual(oneThroughNine, board.get([x, y]));
                }
                // Arbitrarily chosen col
                for(let [x, y] of board.col(8)) {
                    assert.deepEqual(oneThroughNine, board.get([x, y]));
                }
            });
            it("should have strict groups for each 3x3", () => {
                const threeByThree = [
                    [0,0], [0,1], [0,2],
                    [1,0], [1,1], [1,2],
                    [2,0], [2,1], [2,2]
                ];
                // 9 row groups, 9 column groups, 9 box groups
                assert.equal(9*3, board.groups.length);
                // Index of +rows+columns+0
                const firstGroup = board.groups[9 + 9];
                let index = 0;
                for(let location of firstGroup) {
                    assert.deepEqual(threeByThree[index], location);
                    index++;
                }
            });
        });
    });
}
