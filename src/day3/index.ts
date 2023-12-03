import { Day } from '../day';
import { ImportParser } from '../utils/import-parser';

class Day3 extends Day {
  private readonly symbolRegEx = /[^a-zA-Z0-9.]/;

  constructor() {
    super(3);
  }

  checkForSymbolsInColumn(row: number, col: number, data: string[][]): boolean {
    return this.symbolRegEx.test(
      (row > 0 ? data[row - 1][col] : '') +
        data[row][col] +
        (row < data.length - 1 ? data[row + 1][col] : ''),
    );
  }

  solveForPartOne(input: string): string {
    const data = ImportParser.To2dMatrix(input);
    const partNumbers: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const line = data[i];
      let partNumber = '';
      let hasSymbol = false;

      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        const digitFound = !isNaN(parseInt(char));
        if (digitFound) {
          // Partial part number found
          if (partNumber === '' && j > 0) {
            // New part number check for symbols in the column to the left
            hasSymbol = this.checkForSymbolsInColumn(i, j - 1, data);
          }

          if (!hasSymbol) {
            // Check for symbols in this column
            hasSymbol = this.checkForSymbolsInColumn(i, j, data);
          }

          partNumber = `${partNumber}${char}`;
        }

        const partNumberAtEndOfLine = digitFound && j === line.length - 1;
        if (partNumberAtEndOfLine || (!digitFound && partNumber !== '')) {
          if (!hasSymbol && !partNumberAtEndOfLine) {
            // End of part number, check for symbols in this column (to the right of the part number)
            hasSymbol = this.checkForSymbolsInColumn(i, j, data);
          }

          if (hasSymbol) {
            partNumbers.push(parseInt(partNumber));
          }

          hasSymbol = false;
          partNumber = '';
        }
      }
    }

    const sum = partNumbers.reduce((acc, partNumber) => {
      return acc + partNumber;
    }, 0);

    return sum.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day3();
