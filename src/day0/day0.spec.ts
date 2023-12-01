import day0 from './index';

const example = `hello`;

describe('On Day 0', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day0.solveForPartOne(example)).toBe('hello');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day0.solveForPartTwo(example)).toBe('hello');
  });
});
