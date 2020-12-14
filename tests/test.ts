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
  
  describe('range1.compareToWithOverrideOrderMaps', function() {

    let customMap = {
        'N/A': 2,
        'More than $500': 1
    };
    it(`when comparing Range: 'N/A' with Range: 'More than $500' should result in a positive number.`, function() {
        const r1 = new Range('N/A');
        const r2 = new Range('More than $500');
        const expected = 1;
        const r1LessThanr2 = r1.compareToWithOverrideOrderMaps(r2,customMap);

        if(expected < 0){
            expect(r1LessThanr2).toBeLessThan(0);
        }else if(expected > 0){
            expect(r1LessThanr2).toBeGreaterThan(0);
        }

    });

    it(`when comparing Range: 'More than $500' with Range: 'N/A' should result in a negative number.`, function() {
        const r1 = new Range('More than $500');
        const r2 = new Range('N/A');
        const expected = -1;
        const r1LessThanr2 = r1.compareToWithOverrideOrderMaps(r2,customMap);

        if(expected < 0){
            expect(r1LessThanr2).toBeLessThan(0);
        }else if(expected > 0){
            expect(r1LessThanr2).toBeGreaterThan(0);
        }

    });

    
  });
