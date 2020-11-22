"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var range_1 = require("../src/range");
describe('calculate', function () {
    it('add', function () {
        var r1 = new range_1.Range([10, 20]);
        var r2 = new range_1.Range([5, 25]);
        var r1LessThanr2 = r1.compareTo(r2);
        expect(r1LessThanr2).toBeLessThan(0);
    });
});
//# sourceMappingURL=test.js.map