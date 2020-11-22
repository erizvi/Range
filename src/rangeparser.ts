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

import { Range } from './range';

export class RangeParser {

    public static parse(inStr: string, 
        options: RangeParserOptions = { 
            decimalSymbol: '.',
            thousandsSeparator: ','
        }): Range {

        const spaceAndSeparatorRe = new RegExp(`[\\s${options.thousandsSeparator}]`,'g');
        const strippedString = inStr.replace(spaceAndSeparatorRe,'');
        const numericRe = new RegExp(`(\\d*\\${options.decimalSymbol}.?\\d+[kmbt]?)`,'ig');

        
        let minmax = [...this.__matchAll(numericRe, strippedString)].map((res) => this.__expandNumber(res[1]));
        
        if(minmax.length===1){
            return new Range([minmax[0], minmax[0]]);
        } else if (minmax.length===2){
            return new Range([minmax[0], minmax[1]]);
        } else {
            return new Range([]);
        }
    }

    private static __matchAll(regexp, str) {
        if (str.matchAll) {
            return str.matchAll(regexp);
        }
        let output = [];
        let match;
        while ((match = regexp.exec(str)) !== null) {
            output.push(match);
        }
        return output;
    }

    private static __expandNumber(numStr) {
        let num, exp;
        [num, exp] = /(\d+)([kmbt]?)/ig.exec(numStr.toLowerCase()).slice(1);
        return ({ 'k': 1000, 'm': 1000000, 'b': 1000000000, 't': 1000000000000 })[exp] * num;
    }

}

export type RangeParserOptions = {
    decimalSymbol?:  string
    thousandsSeparator?: string
}