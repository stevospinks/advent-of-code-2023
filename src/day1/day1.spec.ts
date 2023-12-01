import day1 from './index';

const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

describe('On Day 1', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day1.solveForPartOne(example)).toBe('142');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day1.solveForPartTwo(example)).toBe('hello');
  });
});
