class InvalidInputError extends Error {}

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if(!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
    }
    notInSize(val) { 
        return val < 0 || this.size-1 < val;
    }
    get(row, col) {
        if(this.notInSize(row) || this.notInSize(col))
            throw new InvalidInputError("Offboard get request");
        return this.board[(this.size * row) + col];
    }
    row(row) {
        if(this.notInSize(row))
            throw new InvalidInputError("Offboard row request");
        return this.board.slice(row * this.size, (row + 1) * this.size);
    }
    col(col) {
        if(this.notInSize(col))
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