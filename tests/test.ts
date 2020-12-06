import { Range } from '../src/module';
import  data from './data.json';

const positiveNegative = (n:number) => n>=0 ? "a positive number" : "a negative number";


describe('range1.compareTo', function() {

    data.cases.forEach(testCase => {
        it(`when comparing Range: ${testCase[0]} with Range: ${testCase[1]} should result in ${positiveNegative(<number>testCase[2])}.`, function() {
            const r1 = new Range(<string>testCase[0]);
            const r2 = new Range(<string>testCase[1]);
            const expected = <number>testCase[2];
            const r1LessThanr2 = r1.compareTo(r2);
            if(expected < 0){
                expect(r1LessThanr2).toBeLessThan(0);
            }else if(expected > 0){
                expect(r1LessThanr2).toBeGreaterThan(0);
            }
        });
    });

    
  });

  describe('Range.compareTo', function() {

    data.cases.forEach(testCase => {
        it(`when comparing Range: ${testCase[0]} with Range: ${testCase[1]} should result in ${positiveNegative(<number>testCase[2])}.`, function() {
            const r1 = <string>testCase[0];
            const r2 = <string>testCase[1];
            const expected = <number>testCase[2];
            const r1LessThanr2 = Range.compareTo(r1, r2);

            if(expected < 0){
                expect(r1LessThanr2).toBeLessThan(0);
            }else if(expected > 0){
                expect(r1LessThanr2).toBeGreaterThan(0);
            }

        });
    });

    
  });
  