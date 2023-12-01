import { Day } from '../day';
import { ImportParser } from '../utils/import-parser';

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const lines = ImportParser.ToStringArray(input);

    const result = lines.reduce((acc: number, line: string) => {
      const allNumbers = line.replace(/[^0-9]+/g, '');
      const firstAndLast = parseInt(`${allNumbers[0]}${allNumbers[allNumbers.length - 1]}`);
      return acc + firstAndLast;
    }, 0);

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day1();
