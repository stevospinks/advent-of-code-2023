import day6 from './index';

const example = `Time:      7  15   30
Distance:  9  40  200`;

describe('On Day 6', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day6.solveForPartOne(example)).toBe('288');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day6.solveForPartTwo(example)).toBe('hello');
  });
});
