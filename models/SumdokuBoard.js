const InvalidInputError = require('./InvalidInputError');

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if (!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
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
        return this.board.slice(row * this.size, (row + 1) * this.size);
    }
    col(col) {
        if (this._notInSize(col))
            throw new InvalidInputError("Offboard col request");
        const column = [];
        for (let i = 0; i < this.size; i++) {
            column.push(this.board[i * this.size + col]);
        }
        return column;
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