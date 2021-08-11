import { sum } from './numbers';

describe('numbers', () => {
  it('should sums correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
