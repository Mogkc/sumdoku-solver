const SumdokuBoard = require('./models/SumdokuBoard')
const InvalidInputError = require('./models/InvalidInputError')

module.exports["solver"] = function (boardState, changed) {
    if(!(boardState instanceof SumdokuBoard && changed instanceof Set))
        throw new InvalidInputError("Takes a board and a set of changed locations");
    const iterator = changed[Symbol.iterator]()
    let next = iterator.next(), changesPrepped = [];
    while(changesPrepped.length < 1 && !next.done) {
        changesPrepped = changesPrepped.concat(updateLocationsThatShareGroup(boardState, next.value));
        next = iterator.next();
    }
    return boardState.set(...changesPrepped);
}

function updateLocationsThatShareGroup(boardState, location) {
    const groupsIn = boardState.groups.filter(e => e.has(location));
    let value = boardState.get(location);
    // To start with, we're only going to make changes
    // based off of 100% sure locations
    if(value.length > 1)
        return [];
    value = value[0];
    const proposedChanges = [];
    for(let group of groupsIn) {
        for(let point of group) {
            if(point[0] == location[0] && point[1] == location[1]) {
                continue;
            }
            const valueAt = boardState.get(point);
            if(valueAt.indexOf(value) == -1)
                continue;
            // Here we get to remove the value from the point
            proposedChanges.push(point);
            proposedChanges.push(valueAt.filter(n => n != value));
        }
    }
    return proposedChanges;
}

module.exports["updateLocationsThatShareGroup"] = updateLocationsThatShareGroup;
