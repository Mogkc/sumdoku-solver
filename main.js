class SumdokuBoard {
    constructor(array) {
        this.board = array;
        this.size = Math.sqrt(this.board.length);
    }
}

module.exports['SumdokuBoard'] = SumdokuBoard;