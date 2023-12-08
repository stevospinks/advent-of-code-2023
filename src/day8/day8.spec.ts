import day8 from './index';

const example1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const example2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

describe('On Day 8', () => {
  it(`part 1 solves for the example input`, () => {
    expect(day8.solveForPartOne(example1)).toBe('2');
    expect(day8.solveForPartOne(example2)).toBe('6');
  });

  xit(`part 2 solves for the example input`, () => {
    expect(day8.solveForPartTwo(example1)).toBe('hello');
    expect(day8.solveForPartTwo(example2)).toBe('hello');
  });
});
