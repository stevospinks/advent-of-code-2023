import { Day } from '../day';
import { StringParser } from '../utils/import-parser';

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const scratchcards = StringParser.ToGroupedNumberArrays(input, ' ', '|', ':');

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
    const scratchcards = StringParser.ToGroupedNumberArrays(input, ' ', '|', ':');

    const duplicatedScratchcardCounts = scratchcards.reduce(
      (acc: number[], scratchcard: number[][], index) => {
        const winningNumbers = scratchcard[0];
        const ourNumbers = scratchcard[1];
        const copiesOfThisCard = acc[index];

        let ourWinningNumbersCount = ourNumbers.filter((n) => winningNumbers.includes(n)).length;
        while (ourWinningNumbersCount > 0) {
          acc[index + ourWinningNumbersCount] += 1 * copiesOfThisCard;
          ourWinningNumbersCount--;
        }

        return acc;
      },
      new Array(scratchcards.length).fill(1),
    );

    const result = duplicatedScratchcardCounts.reduce((acc, total) => (acc += total), 0);
    return result.toString();
  }
}

export default new Day4();
