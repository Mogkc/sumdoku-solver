const assert = require('chai').assert;
const solver = require("../main").solver;
const updateLocationsThatShareGroup = require("../main").updateLocationsThatShareGroup;
const SumdokuBoard = require("../models/SumdokuBoard")

// An easy sudoku puzzle I found on https://grid.websudoku.com/?level=1&set_id=5275292021
const location_value_pairs = require("./data/easy_board.json");

describe("solver", () => {
    const changed = new Set(location_value_pairs.filter(e => e.length == 2));
    const solvable = SumdokuBoard.newBoard().set(...location_value_pairs);
    describe("main function", () => {
        it("should take a SumdokuBoard and a set, then return a SumdokuBoard", () => {
            assert.isTrue(solver(solvable, new Set()) instanceof SumdokuBoard);
        });
        it("should reduce the total number of possibilities", () => {
            function countPossibilities(board) {
                return board.reduce((sum, curr) => sum + curr.length, 0);
            }
            const solvablePossibilities = countPossibilities(solvable.board),
                solverPossibilities = countPossibilities(solver(solvable, changed).board);
            assert.isBelow(solverPossibilities, solvablePossibilities);
        });
        describe("updateLocationsThatShareGroup", () => {
            it("takes a board state and a location, returns a list of changes", () => {
                const changes = updateLocationsThatShareGroup(solvable, location_value_pairs[0]);
                assert.doesNotThrow(() => SumdokuBoard.newBoard().set(...changes));
            });
        });
    });
});
