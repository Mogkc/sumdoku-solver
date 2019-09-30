class InvalidInputError extends Error {}

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if(!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
    }
    get(row, col) {
        if(row < 0 || col < 0 || this.size-1 < row || this.size-1 < col)
            throw new InvalidInputError("Offboard get request");
        return this.board[(this.size * row) + col];
    }
    row(row) {
        return this.board.slice(row * this.size, (row + 1) * this.size);
    }
    col(col) {
        const column = [];
        for(let i = 0; i < this.size; i++) {
            column.push(this.board[i * this.size + col]);
        }
        return column;
    }
}

module.exports['SumdokuBoard'] = SumdokuBoard;
module.exports['InvalidInputError'] = InvalidInputError;