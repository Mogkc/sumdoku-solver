const InvalidInputError = require("./InvalidInputError");

function isLocations(input) {
    if(!input) return false;
    if(typeof input[Symbol.iterator] !== "function") return false;
    for(let elem of input) {
        if(elem.length != 2) return false;
        if(!Number.isInteger(elem[0]) || !Number.isInteger(elem[0]))
            return false;
    }
    return true;
}

class Group {
    constructor(locations, sum) {
        if(!isLocations(locations)) throw new InvalidInputError("Requires Locations");
        this.locations = locations;
        this.sum = Number.isInteger(sum) ? sum : undefined;
    }
}

module.exports["Group"] = Group;