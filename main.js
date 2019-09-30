class InvalidInputError extends Error {}

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if(!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
    }
    _notInSize(val) { 
        return val < 0 || this.size-1 < val;
    }
    _flatten(row, col) {
        if(this._notInSize(row) || this._notInSize(col))
            throw new InvalidInputError("Offboard get/set request");
        else return (this.size * row) + col;
    }
    get(row, col) {
        return this.board[this._flatten(row, col)];
    }
    set(row, col, val) {
        this.board[this._flatten(row, col)] = val;
    }
    row(row) {
        if(this._notInSize(row))
            throw new InvalidInputError("Offboard row request");
        return this.board.slice(row * this.size, (row + 1) * this.size);
    }
    col(col) {
        if(this._notInSize(col))
            throw new InvalidInputError("Offboard col request");
        const column = [];
        for(let i = 0; i < this.size; i++) {
            column.push(this.board[i * this.size + col]);
        }
        return column;
    }
}

module.exports['SumdokuBoard'] = SumdokuBoard;
module.exports['InvalidInputError'] = InvalidInputError;