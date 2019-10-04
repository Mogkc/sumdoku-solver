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
                try {
                    new SumdokuBoard(new Array(2));
                    assert.isTrue(false, "Didn't throw InvalidInputError");
                } catch (e) {
                    if (e instanceof InvalidInputError)
                        assert.isTrue(true);
                    else throw e;
                }
            });
            it("should optionally accept groups", () => {
                assert.deepEqual([], new SumdokuBoard(Array(0)).groups);
                assert.equal("Groups", new SumdokuBoard(Array(0), "Groups").groups);
            });
        });
        describe("get", () => {
            const board = new SumdokuBoard(oneThroughNine);
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
        });
        // Commented out set, in obj so my IDE will collapse it
        {
            /*
            describe("set", () => {
                const board = new SumdokuBoard(oneThroughNine.map(e => e));
                const setTo = 9;
                it("should set contents by row and column", () => {
                    board.set(0, 0, setTo);
                    assert.equal(setTo, board.get(0, 0));
                });
                it("should reject attempts to grab off-board information", () => {
                    // Invalid row, negative
                    try {
                        board.set(-1, 0, setTo);
                        assert.isTrue(false, "Didn't throw InvalidInputError");
                    } catch (e) {
                        if (e instanceof InvalidInputError)
                            assert.isTrue(true);
                        else throw e;
                    }
                    // Invalid col, between size and length of array
                    try {
                        board.set(0, 4, setTo);
                        assert.isTrue(false, "Didn't throw InvalidInputError");
                    } catch (e) {
                        if (e instanceof InvalidInputError)
                            assert.isTrue(true);
                        else throw e;
                    }
                });
            });
            */
        }
        describe("iteration", () => {
            const board = new SumdokuBoard(oneThroughNine);
            it("should be iterable by row", () => {
                let place = 4;
                for(let [x, y] of board.row(1)) {
                    assert.equal(board.get(x, y), place++);
                }
                for(let [x, y] of board.row(2)) {
                    assert.equal(board.get(x, y), place++);
                }
            });
            it("should be iterable by column", () => {
                let place = 2 - board.size; // So the first check will be against 2
                for(let [x, y] of board.col(1)) {
                    assert.equal(board.get(x, y), place = place + board.size);
                }
            });
            it("should reject iteration over nonexistant rows or columns", () => {
                // Row
                try {
                    board.row(-1);
                    assert.isTrue(false, "Didn't throw InvalidInputError");
                } catch (e) {
                    if (e instanceof InvalidInputError)
                        try {
                            board.row(4);
                            assert.isTrue(false, "Didn't throw InvalidInputError");
                        } catch (e) {
                            if (e instanceof InvalidInputError)
                                assert.isTrue(true);
                            else throw e;
                        }
                    else throw e;
                }
                // Column
                try {
                    board.col(-1);
                    assert.isTrue(false, "Didn't throw InvalidInputError");
                } catch (e) {
                    if (e instanceof InvalidInputError)
                        try {
                            board.col(4);
                            assert.isTrue(false, "Didn't throw InvalidInputError");
                        } catch (e) {
                            if (e instanceof InvalidInputError)
                                assert.isTrue(true);
                            else throw e;
                        }
                    else throw e;
                }
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
                    assert.deepEqual(oneThroughNine, board.get(x, y));
                }
                // Arbitrarily chosen col
                for(let [x, y] of board.col(8)) {
                    assert.deepEqual(oneThroughNine, board.get(x, y));
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
                    try {
                        assert.deepEqual(threeByThree[index], location);
                        index++;
                    } catch (e) {
                        console.log(firstGroup);
                        throw e;
                    }
                }
            });
        });
    });
}
