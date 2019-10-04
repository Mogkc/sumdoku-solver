const assert = require('chai').assert;
const testSumdokuBoard = require("./testSumdokuBoard");
const testGroup = require("./testGroup");

testSumdokuBoard(assert);
testGroup(assert);

const solver = require("../main");
const SumdokuBoard = require("../models/SumdokuBoard")

describe("solver", () => {
    it("should take and return SumdokuBoards", () => {
        assert.isTrue(solver(SumdokuBoard.newBoard()) instanceof SumdokuBoard);
    });
});