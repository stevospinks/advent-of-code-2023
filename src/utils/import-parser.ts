export class ImportParser {
  public static ToNumberArrays(input: string): number[][] {
    const result: number[][] = [];

    let group: number[] = [];
    input.split(/\r?\n/).forEach((n) => {
      if (n === '') {
        result.push(group);
        group = [];
        return;
      }

      group.push(Number.parseInt(n));
    });

    return result;
  }
}
