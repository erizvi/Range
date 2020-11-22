import { Range } from '../src/range';

describe('calculate', function() {
    it('add', function() {
        const r1 = new Range([10,20]);
        const r2 = new Range([5,25]);
        const r1LessThanr2 = r1.compareTo(r2);
        expect(r1LessThanr2).toBeLessThan(0);
    });
  });