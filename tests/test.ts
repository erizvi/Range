import { Range } from '../src/range';
import data from '../tests/data.json';

const positiveNegative = (n) => n>=0 ? "a positive number" : "a negative number";


describe('Range.compareTo', function() {

    data.cases.forEach(testCase => {
        it(`when comparing Range: ${testCase[0]} with Range: ${testCase[1]} should result in ${positiveNegative(testCase[2])}.`, function() {
            const r1 = new Range(<string>testCase[0]);
            const r2 = new Range(<string>testCase[1]);
            const r1LessThanr2 = r1.compareTo(r2);
            expect(r1LessThanr2)[({
                "-1": "toBeLessThan",
                "1": "toBeGreaterThan"
            })[`${testCase[2]}`]](0);
        });
    });

    
  });

  