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
import { RangeParser } from './rangeparser'; // .js extension added to support node. This works fine in typescript

export class Range{
    
    min: number;
    max: number;
    span: number;
    isEmpty: boolean;
    rawString: string;

    constructor(minmax: string | [number|null, number|null] | number[]){

        this.isEmpty = false;
        this.rawString = '';

        if(typeof minmax === 'string'){
            this.rawString = minmax;
            const rng = RangeParser.parse(minmax);
            minmax = [rng.min, rng.max];
            this.isEmpty = rng.isEmpty;
        } else if(Array.isArray(minmax) && minmax.length===0){
            minmax = [null, null];
            this.isEmpty = true;
        }

        this.min = <number>minmax[0];
        this.max = <number>minmax[1];
        this.span = this.max - this.min;
        
    }

    public compareTo(another: Range,
        option: RANGE_COMPARATOR_OPTIONS = RANGE_COMPARATOR_OPTIONS.EMPTY_RANGE_AFTER): number | undefined{
        if(!this.isEmpty && !another.isEmpty){
            let diff = this.max - another.max;
            if(diff === 0){
                diff = this.span - another.span;
            }
            return diff;
        }

        if(option === RANGE_COMPARATOR_OPTIONS.EMPTY_RANGE_AFTER){
            if(this.isEmpty){
                return 1;
            }
            if(another.isEmpty){
                return -1;
            }
        } else if(option === RANGE_COMPARATOR_OPTIONS.EMTPY_RANGE_BEFORE){
            if(this.isEmpty){
                return -1;
            }
            if(another.isEmpty){
                return 1;
            }
        }
    }

    public compareToWithOverrideOrderMaps(another: Range,
        orderMap: OrderMap,
        option: RANGE_COMPARATOR_OPTIONS = RANGE_COMPARATOR_OPTIONS.EMPTY_RANGE_AFTER): number | undefined{
        
            let m1 = orderMap[this.rawString];
            let m2 = orderMap[another.rawString];
        
            if(typeof m1 === 'number' && typeof m2 === 'number'){
                return m1-m2;
            } else {
                return this.compareTo(another);
            }
    }

    public static compareTo(range1: string | Range, range2: string | Range){
        if(typeof range1 === 'string'){
            range1 = new Range(range1);
        }
        if(typeof range2 === 'string'){
            range2 = new Range(range2);
        }

        return range1.compareTo(range2);
    }
}

export enum RANGE_COMPARATOR_OPTIONS {
    EMTPY_RANGE_BEFORE = 1,
    EMPTY_RANGE_AFTER = 2
}

export type OrderMap = {
    [key:string]: number
}