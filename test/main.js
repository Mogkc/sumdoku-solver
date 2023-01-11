const assert = require('chai').assert;
const solver = require("../main").solver;
const updateLocationsThatShareGroup = require("../main").updateLocationsThatShareGroup;
const SumdokuBoard = require("../models/SumdokuBoard")

describe("solver", () => {
    // This is an easy sudoku puzzle I found on https://grid.websudoku.com/?level=1&set_id=5275292021
    // Trick to save hands: type the numbers as ` 000 000` etc., then find ` (\d)(\d)(\d)` 
    // and replace `\n[ $1, $2], $3` to put in that nice format.
    // The space is at the beginning to avoid capturing from the url above
    const location_value_pairs = [
        [0, 2], [9],
        [0, 7], [2],
        [0, 8], [6],
        [1, 2], [2],
        [1, 4], [8],
        [1, 6], [1],
        [1, 8], [9],
        [2, 0], [6],
        [2, 1], [1],
        [2, 3], [7],
        [2, 4], [2],
        [3, 0], [8],
        [3, 1], [7],
        [3, 3], [5],
        [3, 4], [4],
        [3, 5], [2],
        [4, 2], [4],
        [4, 3], [8],
        [4, 5], [1],
        [4, 6], [5],
        [5, 3], [9],
        [5, 4], [7],
        [5, 5], [3],
        [5, 7], [4],
        [5, 8], [1],
        [6, 4], [5],
        [6, 5], [4],
        [6, 7], [9],
        [6, 8], [3],
        [7, 0], [9],
        [7, 2], [7],
        [7, 4], [1],
        [7, 6], [6],
        [8, 1], [2],
        [8, 2], [3],
        [8, 6], [4]
    ]
    // Keep all the changed locations
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
