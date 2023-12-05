import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

class Day3 extends Day {
  private readonly symbolRegEx = /[^a-zA-Z0-9.]/;

  constructor() {
    super(3);
  }

  checkRegexInColumn(rowMiddle: number, col: number, data: string[][], regEx: RegExp): boolean {
    const textToTest =
      (rowMiddle > 0 ? data[rowMiddle - 1][col] : '') +
      data[rowMiddle][col] +
      (rowMiddle < data.length - 1 ? data[rowMiddle + 1][col] : '');
    return regEx.test(textToTest);
  }

  checkRegexInRow(row: number, colMiddle: number, data: string[][], regEx: RegExp): boolean {
    const textToTest =
      (colMiddle > 0 ? data[row][colMiddle - 1] : '') +
      data[row][colMiddle] +
      (colMiddle < data.length - 1 ? data[row][colMiddle + 1] : '');
    return regEx.test(textToTest);
  }

  findNumberInLine(line: string[], startIndex: number, direction: 'l' | 'r'): number {
    let index = startIndex;
    let num = '';
    while (index >= 0 && index <= line.length && !isNaN(parseInt(line[index]))) {
      num = direction === 'l' ? line[index] + num : num + line[index];
      index = direction === 'l' ? index - 1 : index + 1;
    }

    return parseInt(num);
  }

  findStartOfNumber(line: string[], startIndex: number): number {
    let index = startIndex;
    let foundEnd = false;
    while (!foundEnd || (index >= 0 && index <= line.length && !isNaN(parseInt(line[index])))) {
      foundEnd = !isNaN(parseInt(line[index]));
      index -= 1;
    }
    return index + 1;
  }

  solveForPartOne(input: string): string {
    const data = StringParser.To2dMatrix(input);
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
            hasSymbol = this.checkRegexInColumn(i, j - 1, data, this.symbolRegEx);
          }

          if (!hasSymbol) {
            // Check for symbols in this column
            hasSymbol = this.checkRegexInColumn(i, j, data, this.symbolRegEx);
          }

          partNumber = `${partNumber}${char}`;
        }

        const partNumberAtEndOfLine = digitFound && j === line.length - 1;
        if (partNumberAtEndOfLine || (!digitFound && partNumber !== '')) {
          if (!hasSymbol && !partNumberAtEndOfLine) {
            // End of part number, check for symbols in this column (to the right of the part number)
            hasSymbol = this.checkRegexInColumn(i, j, data, this.symbolRegEx);
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
    const digitRegEx = /[0-9]/;
    const separatedNumberRegEx = /^[0-9][^a-zA-Z0-9*][0-9]$/;
    const numbersAroundGearRegEx = /^[0-9]\*[0-9]$/;
    const data = StringParser.To2dMatrix(input);
    const gearLocations: {
      col: number;
      partOneRow: number;
      PartTwoRow: number;
    }[] = [];

    for (let row = 0; row < data.length; row++) {
      const line = data[row];
      for (let col = 0; col < line.length; col++) {
        const char = line[col];
        const gearFound = char === '*';

        if (gearFound) {
          const partRowNumbers: number[] = [];
          if (row > 0 && this.checkRegexInRow(row - 1, col, data, digitRegEx)) {
            partRowNumbers.push(row - 1);

            if (this.checkRegexInRow(row - 1, col, data, separatedNumberRegEx)) {
              partRowNumbers.push(row - 1);
            }
          }
          if (this.checkRegexInRow(row, col, data, digitRegEx)) {
            partRowNumbers.push(row);

            if (this.checkRegexInRow(row, col, data, numbersAroundGearRegEx)) {
              partRowNumbers.push(row);
            }
          }
          if (row < line.length && this.checkRegexInRow(row + 1, col, data, digitRegEx)) {
            partRowNumbers.push(row + 1);

            if (this.checkRegexInRow(row + 1, col, data, separatedNumberRegEx)) {
              partRowNumbers.push(row + 1);
            }
          }
          if (partRowNumbers.length === 2) {
            gearLocations.push({
              col: col,
              partOneRow: partRowNumbers[0],
              PartTwoRow: partRowNumbers[1],
            });
          }
        }
      }
    }

    const result = gearLocations.reduce(
      (acc, { col, partOneRow: partRowNumOne, PartTwoRow: partRowNumTwo }) => {
        const partOneLine = data[partRowNumOne];
        const partTwoLine = data[partRowNumTwo];
        let partOne = 0;
        let partTwo = 0;

        if (partRowNumOne === partRowNumTwo) {
          partOne = this.findNumberInLine(partOneLine, col - 1, 'l');
          partTwo = this.findNumberInLine(partTwoLine, col + 1, 'r');
        } else {
          const partOneStartIndex = this.findStartOfNumber(
            partOneLine,
            col + 1 <= partOneLine.length ? col + 1 : col,
          );
          partOne = this.findNumberInLine(partOneLine, partOneStartIndex, 'r');
          const partTwoStartIndex = this.findStartOfNumber(
            partTwoLine,
            col + 1 <= partTwoLine.length ? col + 1 : col,
          );
          partTwo = this.findNumberInLine(partTwoLine, partTwoStartIndex, 'r');
        }

        return acc + partOne * partTwo;
      },
      0,
    );

    return result.toString();
  }
}

export default new Day3();
