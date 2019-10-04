const InvalidInputError = require('./InvalidInputError');
const Group = require('./Group');

class SumdokuBoard {
    constructor(array, groups) {
        this.board = array.map(e => e);
        this.size = Math.sqrt(this.board.length);
        if (!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
        // Set up the basic groups all sudoku games share
        this.groups = groups || [];
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
    const allPossible = [], possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let row = 1; row <= 9; row++) {
        for (let col = 1; col <= 9; col++) {
            allPossible.push(possibilities);
        }
    }
    const blankBoard = new SumdokuBoard(allPossible);
    // Add the 3x3 box groupings
    const locations = new Array(9);
    
    // By moving the upperleft corner
    for(let x = 0; x < 9; x += 3) {
        for(let y = 0; y < 9; y += 3) {
            // and filling in below and right
            for(let row = 0; row < 3; row++) {
                for(let col = 0; col < 3; col++) {
                    locations[row*3 + col] = [x+row, y+col];
                }
            }
            blankBoard.groups.push(new Group(locations, undefined, possibilities, undefined, true));
        }
    }
    return blankBoard;
}

module.exports = SumdokuBoard;