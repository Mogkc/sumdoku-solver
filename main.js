class InvalidInputError extends Error {}

class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
        if(!Number.isInteger(this.size))
            throw new InvalidInputError("Not a square board");
    }
    get(row, col) {
        return this.board[(this.size * row) + col];
    }
    /* On hold until get(row, col) created
    row(row) {
        return {
            [Symbol.iterator]() {
                return new RowIterator(this, row);
            }
        }
    }
    */
}

/*
class RowIterator {
    constructor(SumdokuBoard, row) {
        this.row = row;
        this.index = 0;
        this.board = SumdokuBoard;
    }
    next() {
        if(this.index == this.board.size)
            return { done: true }
        let value = this.board.get(row, index); // board.get not created yet!
    }
}
*/

module.exports['SumdokuBoard'] = SumdokuBoard;
module.exports['InvalidInputError'] = InvalidInputError;