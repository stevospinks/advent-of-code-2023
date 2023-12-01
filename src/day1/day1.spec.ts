import day1 from './index';

const example1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const example2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe('On Day 1', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day1.solveForPartOne(example1)).toBe('142');
  });

  it(`part 2 solves for the example input`, () => {
    expect(day1.solveForPartTwo(example2)).toBe('281');
  });
});
