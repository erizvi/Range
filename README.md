# String-Range
![example workflow name](https://github.com/erizvi/Range/workflows/build_nodejs_ci/badge.svg)

A Range Class that supports parsing and sorting

Ranges can be one of the following:
  
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
 
