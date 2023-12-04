import { Day } from '../day';
import { ImportParser } from '../utils/import-parser';

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const scratchcards = ImportParser.ToGroupedNumberArrays(input, ' ', '|', ':');

    const winningNumberTotals = scratchcards.reduce((acc: number[], scratchcard: number[][]) => {
      const winningNumbers = scratchcard[0];
      const ourNumbers = scratchcard[1];

      const ourWinningNumbers = ourNumbers.filter((n) => winningNumbers.includes(n));

      if (ourWinningNumbers.length > 0) {
        acc.push(Math.pow(2, ourWinningNumbers.length - 1));
      }

      return acc;
    }, []);

    const result = winningNumberTotals.reduce((acc, total) => (acc += total), 0);
    return result.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day4();
