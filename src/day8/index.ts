import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

interface Node {
  l: string;
  r: string;
}

enum Direction {
  Right,
  Left,
}

class Day8 extends Day {
  constructor() {
    super(8);
  }

  solveForPartOne(input: string): string {
    const dataBlocks: string[] = StringParser.ToDataBlock(input);
    const directionOrder: Direction[] = dataBlocks[0]
      .split('')
      .map((d) => (d === 'R' ? Direction.Right : Direction.Left));
    const nodeMap: Map<string, Node> = StringParser.ToStringArray(dataBlocks[1]).reduce(
      (acc, dir) => {
        const dirData = dir.split(' = ');
        const directions = dirData[1].split(', ').map((d) => d.replace('(', '').replace(')', ''));
        acc.set(dirData[0], { l: directions[0], r: directions[1] });
        return acc;
      },
      new Map<string, Node>(),
    );

    let count = 0;
    let nextLocation = 'AAA';
    while (nextLocation !== 'ZZZ') {
      const index = count % directionOrder.length;
      const direction = directionOrder[index];

      const node = nodeMap.get(nextLocation);
      if (!node) {
        throw `Location not found! ${nextLocation}`;
      }
      nextLocation = direction === Direction.Left ? node.l : node.r;
      count++;
    }

    return count.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day8();
