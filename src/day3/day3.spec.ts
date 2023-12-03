import day3 from './index';

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe('On Day 3', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day3.solveForPartOne(example)).toBe('4361');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day3.solveForPartTwo(example)).toBe('hello');
  });
});
