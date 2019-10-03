const InvalidInputError = require('./InvalidInputError');
const Group = require('./Group').Group;

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if (!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
        // Set up the basic groups all sudoku games share
        this.groups = [];
        this.possibilities = [];
        for(let register = 0; register < this.size; register++) {
            this.possibilities.push(register);
            const row = [], column = [];
            for(let  range = 0; range < this.size; range++) {
                row.push([register, range]);
                column.push([range, register]);
            }
            this.groups.push(new Group(row, 45, this.possibilities, undefined, true));
            this.groups.push(new Group(column, 45, this.possibilities, undefined, true));
        }
    }
    _notInSize(val) {
        return val < 0 || this.size - 1 < val;
    }
    _flatten(row, col) {
        if (this._notInSize(row) || this._notInSize(col))
            throw new InvalidInputError("Offboard get/set request");
        else return (this.size * row) + col;
    }
    get(row, col) {
        return this.board[this._flatten(row, col)];
    }
    /*
    set(row, col, val) {
        this.board[this._flatten(row, col)] = val;
    }
    */
    row(row) {
        if (this._notInSize(row))
            throw new InvalidInputError("Offboard row request");
        return this.groups[2 * row];
    }
    col(col) {
        if (this._notInSize(col))
            throw new InvalidInputError("Offboard col request");
        return this.groups[1 + 2 * col];
    }
}

SumdokuBoard.newBoard = function () {
    const allPossible = [];
    for (let row = 1; row <= 9; row++) {
        for (let col = 1; col <= 9; col++) {
            let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            allPossible.push(possibilities);
        }
    }
    return new SumdokuBoard(allPossible);
}

module.exports = SumdokuBoard;