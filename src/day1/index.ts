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
    const numberMapping = [
      { number: '1', text: 'one' },
      { number: '2', text: 'two' },
      { number: '3', text: 'three' },
      { number: '4', text: 'four' },
      { number: '5', text: 'five' },
      { number: '6', text: 'six' },
      { number: '7', text: 'seven' },
      { number: '8', text: 'eight' },
      { number: '9', text: 'nine' },
    ];
    const lines = ImportParser.ToStringArray(input);

    const result = lines.reduce((acc: number, line: string) => {
      let firstAndLast = '';
      let numberFound = false;
      while (!numberFound) {
        numberMapping.forEach(({ number, text }) => {
          if (!numberFound && line.startsWith(text)) {
            numberFound = true;
            firstAndLast = firstAndLast + number;
          }
        });

        if (!numberFound) {
          const nextChar = line[0];
          if (!isNaN(parseInt(nextChar))) {
            numberFound = true;
            firstAndLast = firstAndLast + nextChar;
          } else {
            line = line.slice(1);
          }
        }
      }

      numberFound = false;
      while (!numberFound) {
        numberMapping.forEach(({ number, text }) => {
          if (!numberFound && line.endsWith(text)) {
            numberFound = true;
            firstAndLast = firstAndLast + number;
          }
        });

        if (!numberFound) {
          const nextChar = line[line.length - 1];
          if (!isNaN(parseInt(nextChar))) {
            numberFound = true;
            firstAndLast = firstAndLast + nextChar;
          }

          line = line.slice(0, line.length - 1);
        }
      }

      return acc + parseInt(firstAndLast);
    }, 0);

    return result.toString();
  }
}

export default new Day1();
