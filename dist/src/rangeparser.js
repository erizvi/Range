"use strict";
/**
 *  Ranges can be one of the following:
 *
 *  (1) Distinct: (a) -----><-----><-----><-----><-----
 *
 *  (2) Overlapping: (a) <----->            (b)       <----->
 *                          <----->               <----->
 *                              <----->         <----->
 *
 *  (3) Encompassing: (a) <---------->       (b)     <-->
 *                          <------>               <------>
 *                            <-->               <---------->
 *
 *  (4) Left Aligned: <----->
 *                    <-------->
 *                    <----------->
 *
 *  (5) Right Aligned:   <----->
 *                     <------->
 *                   <--------->
 *
 *  If range1 and range2 are two Distinct ranges then if range2[max] > range1[max] then
 *  range 2 is greater than range1.
 *
 *  If range1 and range2 are two Overlapping ranges then, regardless of if they are
 *  like 2.a or 2.b (b/c 2.b can be transformed into 2.a), if range2[max] > range1[max]
 *  range2 is greater than range1.
 *
 *  If range1 and range2 are two Encompassing ranges then if range2[max] > range1[max] then
 *  range2 is greater than range1.
 *
 *  If range1 is a range with min and max while range2 is a range with only min or max then
 *  if range2[min] or range2[max] >= range1[max] then range2 is greater than range1
 *
 *
 *  If two ranges are Left Aligned then the normal rules of checking range2[max] > range1[max]
 *  will suffice. If the ranges are Right Aligned, then we need to compare the span of the
 *  two ranges. A span of a range is its max-min. if range2[span] > range1[span] then
 *  range2 is greater than range1
 *
 *  valid range string formats examples:
 *
 *  <$10M; < $10M; $10M - $50M, $10M-$50M; $10m - $50m;
 *  .01 - .10; 2.5-5.0;
 *
 *  Decimals are supported and only positive numbers are supported
 */
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeParser = void 0;
var range_1 = require("./range");
var RangeParser = /** @class */ (function () {
    function RangeParser() {
    }
    RangeParser.parse = function (inStr, options) {
        var _this = this;
        if (options === void 0) { options = {
            decimalSymbol: '.',
            thousandsSeparator: ','
        }; }
        var spaceAndSeparatorRe = new RegExp("[\\s" + options.thousandsSeparator + "]", 'g');
        var strippedString = inStr.replace(spaceAndSeparatorRe, '');
        var numericRe = new RegExp("(\\d*\\" + options.decimalSymbol + "?\\d+[kmbt]?)", 'ig');
        //const numericRe = /(\d*\.?\d+[kmbt]?)/ig;
        var result = this.__matchAll(numericRe, strippedString);
        var minmax = __spreadArrays(result).map(function (res) { return _this.__expandNumber(res[1]); });
        if (minmax.length === 1) {
            return new range_1.Range([minmax[0], minmax[0]]);
        }
        else if (minmax.length === 2) {
            return new range_1.Range([minmax[0], minmax[1]]);
        }
        else {
            return new range_1.Range([]);
        }
    };
    RangeParser.__matchAll = function (regexp, str) {
        var output = [];
        if (str.matchAll) {
            for (var _i = 0, _a = str.matchAll(regexp); _i < _a.length; _i++) {
                var item = _a[_i];
                output.push(item);
            }
        }
        var match;
        while ((match = regexp.exec(str)) !== null) {
            output.push(match);
        }
        return output;
    };
    RangeParser.__expandNumber = function (numStr) {
        var _a;
        var num, exp;
        _a = /(\d+)([kmbt]?)/ig.exec(numStr.toLowerCase()).slice(1), num = _a[0], exp = _a[1];
        return ({ 'k': 1000, 'm': 1000000, 'b': 1000000000, 't': 1000000000000, '': 1 })[exp] * num;
    };
    return RangeParser;
}());
exports.RangeParser = RangeParser;
//# sourceMappingURL=rangeparser.js.map