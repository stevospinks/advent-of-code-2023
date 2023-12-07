import day7 from './index';

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe('On Day 7', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day7.solveForPartOne(example)).toBe('6440');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day7.solveForPartTwo(example)).toBe('hello');
  });
});
