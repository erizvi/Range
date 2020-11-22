"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = require("../src/range");
var data_json_1 = __importDefault(require("../tests/data.json"));
var positiveNegative = function (n) { return n >= 0 ? "a positive number" : "a negative number"; };
describe('Range.compareTo', function () {
    data_json_1.default.cases.forEach(function (testCase) {
        it("when comparing Range: " + testCase[0] + " with Range: " + testCase[1] + " should result in " + positiveNegative(testCase[2]) + ".", function () {
            var r1 = new range_1.Range(testCase[0]);
            var r2 = new range_1.Range(testCase[1]);
            var r1LessThanr2 = r1.compareTo(r2);
            expect(r1LessThanr2)[({
                "-1": "toBeLessThan",
                "1": "toBeGreaterThan"
            })["" + testCase[2]]](0);
        });
    });
});
//# sourceMappingURL=test.js.map