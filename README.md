# String-Range
![example workflow name](https://github.com/erizvi/Range/workflows/build_nodejs_ci/badge.svg)

A Range Class that supports parsing and sorting

Ranges can be one of the following:
  ```
   (1) Distinct: (a) -----><-----><-----><-----><-----
 
   (2) Overlapping: (a) <----->            (b)       <----->
                           <----->               <----->
                               <----->         <----->
   
   (3) Encompassing: (a) <---------->       (b)     <-->
                           <------>               <------>
                             <-->               <---------->
  
   (4) Left Aligned: <----->
                     <-------->
                     <----------->
  
   (5) Right Aligned:   <----->
                      <------->
                    <--------->
   ```     
   If range1 and range2 are two Distinct ranges then if range2[max] > range1[max] then
   range 2 is greater than range1.
  
   If range1 and range2 are two Overlapping ranges then, regardless of if they are
   like 2.a or 2.b (b/c 2.b can be transformed into 2.a), if range2[max] > range1[max]
   range2 is greater than range1.
  
   If range1 and range2 are two Encompassing ranges then if range2[max] > range1[max] then
   range2 is greater than range1.
  
   If range1 is a range with min and max while range2 is a range with only min or max then
   if range2[min] or range2[max] >= range1[max] then range2 is greater than range1
  
  
   If two ranges are Left Aligned then the normal rules of checking range2[max] > range1[max]
   will suffice. If the ranges are Right Aligned, then we need to compare the span of the 
   two ranges. A span of a range is its max-min. if range2[span] > range1[span] then
   range2 is greater than range1
  
   valid range string formats examples:
  
   <$10M; < $10M; $10M - $50M, $10M-$50M; $10m - $50m;
   .01 - .10; 2.5-5.0; 
  
   Decimals are supported and only positive numbers are supported
 
 ### Installation
 ```
 npm install @erizvi/string-range 
 ```

 ### Usage

```javascript
let priceRanges = [
  '$1m - $b',
  '$50 - $500',
  '$1000 - $1m',
  '$10 - $50',
  '$500 - $1k'
];

let sortedPriceRanges = priceRange.sort(Range.compareTo);

  // '$10 - $50'
  // '$50 - $500'
  // '$500 - $1k'
  // '$1000 - $1m'
  // '$1m - $b'
```

```javascript

import { Range } from '@erizvi/string-range';

let priceRanges = [
    '$1m - $1b',
    '$50 - $500',
    '$1000 - $1m',
    '$10 - $50',
    '$500 - $1k'
];

console.log('Original ranges:\r\n');
priceRanges.forEach(element => {
    console.log(element);
});

let sortedPriceRanges = priceRanges.sort(Range.compareTo);

  
console.log('Sorted ranges using static Range.compareTo:\r\n');
sortedPriceRanges.forEach(element => {
    console.log(element);
});

priceRanges = [
    '$1m - $1b',
    '$50 - $500',
    '$1000 - $1m',
    '$10 - $50',
    '$500 - $1k'
];

priceRanges.sort((a,b) => {

    //let res = Range.compareTo(a,b);
    let r1 = new Range(a);
    let r2 = new Range(b);
    let res = r1.compareTo(r2);
    return res;

});

console.log('Sorted ranges using instance range.compareTo :\r\n');
priceRanges.forEach(element => {
    console.log(element);
});
```

```javascript
// span based comparison

priceRanges = [
    '< $10',
    '$1m - $1b',
    '$50 - $500',
    '> $1B',
    '$1000 - $1m',
    'N/A',
    '$10 - $50',
    'No Results',
    '$250M - $1B',
    '$500 - $1k'
];

priceRanges.sort((a,b) => {

    let r1 = new Range(a);
    let r2 = new Range(b);
    if(a==='> $1B'){ console.log(r1.max + " " + r1.min)}
    let res = r1.compareToWithOverrideOrderMaps(r2,{"N/A":1,"No Results":2},RANGE_COMPARATOR_OPTIONS.EMPTY_RANGE_BEFORE | RANGE_COMPARATOR_OPTIONS.MODE_SPAN);
    
    return res;

});

console.log('Sorted ranges using instance range.compareTo with RANGE_COMPARATOR_OPTIONS :\r\n');
priceRanges.forEach(element => {
    console.log(element);
});
```
  
###### TODO
Build CommonJS, AMD, UMD module

Currently to debug the tests/test.ts file, you need to remove
"type": "module" from package.json file. This needs to be fixed
so that we can debug the ts code as well as package it as es module
via the "type": "module" config. 