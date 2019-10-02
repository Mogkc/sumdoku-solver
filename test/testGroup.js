const Group = require("../models/Group").Group;
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
                assert.equal(locations, new Group(locations).locations);
                try {
                    new Group();
                    assert.isTrue(false, "Didn't reject invalid input");
                } catch (e) {
                    if(e instanceof InvalidInputError) {
                        assert.isTrue(true);
                    } else throw e;
                }
            });
            it("should should optionally accept sum", () => {
                const sum = 7;
                assert.equal(sum, new Group(locations, sum).sum);
            });
        });
    });
}