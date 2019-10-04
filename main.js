const SumdokuBoard = require('./models/SumdokuBoard')
const Group = require('./models/Group')
const InvalidInputError = require('./models/InvalidInputError')

module.exports["solver"] = function (boardState, changed) {
    if(!(boardState instanceof SumdokuBoard && changed instanceof Set))
        throw new InvalidInputError("Takes a board and a set of changed locations");
    const iterator = changed[Symbol.iterator](), changesPrepped = [];
    let next = iterator.next();
    while(changesPrepped.length < 1 && !next.done) {
        changesPrepped.concat(updateLocationsThatShareGroup(boardstate, next.value));
        next = iterator.next();
    }
    return boardState.set(...changesPrepped);
}

function updateLocationsThatShareGroup(boardState, location) {

}

module.exports["updateLocationsThatShareGroup"] = updateLocationsThatShareGroup;