const InvalidInputError = require("./InvalidInputError");

function isLocations(input) {
    if (!input) return false;
    if (typeof input[Symbol.iterator] !== "function") return false;
    for (let elem of input) {
        if (elem.length != 2) return false;
        if (!Number.isInteger(elem[0]) || !Number.isInteger(elem[0]))
            return false;
    }
    return true;
}

function checkForContradictions(include, exclude, sum) {
    for (let required of include) {
        for (let notAllowed of exclude) {
            if (required === notAllowed)
                throw new InvalidInputError("A number is both required and not allowed");
        }
    }
    if(sum) {
        if(sum < include.reduce((acc, curr) => acc + curr, 0))
            throw new InvalidInputError("Goes over sum");
    }
}

class Group {
    constructor(locations, sum, include, exclude) {
        if (!isLocations(locations)) throw new InvalidInputError("Requires Locations");
        this.locations = locations;
        if (Number.isInteger(sum))
            this.sum = sum;
        this.includes = include ? include : [];
        this.excludes = exclude ? exclude : [];
        checkForContradictions(this.includes, this.excludes, sum);
    }
    [Symbol.iterator] = function* () {
        for(let point of this.locations) {
            yield point;
        }
    }
}

module.exports["Group"] = Group;