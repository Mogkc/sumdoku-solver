const SumdokuBoard = require('./models/SumdokuBoard')
const InvalidInputError = require('./models/InvalidInputError')

module.exports["solver"] = function (boardState, changed) {
    if(!(boardState instanceof SumdokuBoard && changed instanceof Set))
        throw new InvalidInputError("Takes a board and a set of changed locations");
    const iterator = changed[Symbol.iterator]()
    let next = iterator.next(), changesPrepped = [];
    while(changesPrepped.length < 1 && !next.done) {
        changesPrepped = changesPrepped.concat(propogateChange(boardState, next.value));
        changed.delete(next.value);
        next = iterator.next();
    }
    return boardState.set(...changesPrepped);
}

function propogateChange(boardState, location) {
    const groupsIn = boardState.groups.filter(e => e.has(location));
    let value = boardState.get(location);
    // To start with, we're only going to make changes
    // based off of 100% sure locations
    if(value.length == 1)
        return removeValueFromGroups(boardState, groupsIn, value[0]);
}

function removeValueFromGroups(boardState, groups, toRemove) {
    const proposedChanges = [];
    for(let group of groups) {
        for(let point of group) {
            const value = boardState.get(point);
            if(value.length == 1 || value.indexOf(toRemove) == -1)
                continue;
            proposedChanges.push(point);
            proposedChanges.push(value.filter(n => n != toRemove));
        }
    }
    return proposedChanges;
}

module.exports["updateLocationsThatShareGroup"] = propogateChange;
