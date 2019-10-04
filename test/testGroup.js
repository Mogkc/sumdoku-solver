const Group = require("../models/Group");
const InvalidInputError = require('../models/InvalidInputError');


module.exports = function (assert) {
    describe("Group", () => {
        describe("constuctor", () => {
            const locations = [
                [0, 0],
                [0, 1],
                [1, 1]
            ];
            it("should always contain locations", () => {
                assert.deepEqual(locations, new Group(locations).locations);
                assert.throws(() => new Group(), InvalidInputError);
            });
            it("should optionally accept sum", () => {
                const sum = 7;
                assert.equal(sum, new Group(locations, sum).sum);
            });
            it("should optionally accept array of numbers to include", () => {
                const include = [7];
                assert.deepEqual(include, new Group(locations, undefined, include).includes);
                assert.deepEqual([].length, new Group(locations).includes.length);
                // Using less input validation
            });
            it("should optionally accept array of numbers to exclude", () => {
                const exclude = [5];
                assert.deepEqual(
                    exclude,
                    new Group(locations, undefined, undefined, exclude).excludes
                );
                assert.equal([].length, new Group(locations).excludes.length);
                // Using less input validation
            });
            it("should optionally accept strict boolean", () => {
                assert.equal(false, new Group(locations).strict);
                const u = undefined;
                assert.isTrue(new Group(locations, u, u, u, true).strict);
            });
            it("should reject overlap between includes and excludes", () => {
                const include = [4, 5], exclude = [5];
                assert.throws(
                    () => new Group(locations, undefined, include, exclude),
                    InvalidInputError
                );
            });
            it("should reject sums less than the sum of included numbers", () => {
                const sum = 4, include = [2, 3];
                assert.throws(() => new Group(locations, sum, include), InvalidInputError);
            });
        });
        describe("iteration", () => {
            it("should iterate over locations", () => {
                const l1 = [0, 0], l2 = [1, 1], l3 = [2, 2],
                    iterator = new Group([l1, l2, l3])[Symbol.iterator]();
                assert.deepEqual(l1, iterator.next().value);
                assert.deepEqual(l2, iterator.next().value);
                assert.deepEqual(l3, iterator.next().value);
            });
        });
    });
}