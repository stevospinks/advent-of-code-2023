import fs from 'fs';

abstract class Day {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  async partOne(): Promise<string> {
    const content = await fs.promises.readFile(`./inputs/day${this.id}/part1.txt`);
    const result = this.solveForPartOne(content.toString());
    return result;
  }

  abstract solveForPartOne(input: string): string;

  async partTwo(): Promise<string> {
    let content: Buffer | undefined;
    try {
      content = await fs.promises.readFile(`./inputs/day${this.id}/part2.txt`);
    } catch (error: any) {
      if ((error.code = 'ENOENT')) {
        content = await fs.promises.readFile(`./inputs/day${this.id}/part1.txt`);
      } else {
        throw error;
      }
    }
    const result = this.solveForPartTwo(content.toString());
    return result;
  }

  abstract solveForPartTwo(input: string): string;
}

export { Day };
