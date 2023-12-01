export class ImportParser {
  public static ToNumberArrays(input: string): number[][] {
    const result: number[][] = [];

    let group: number[] = [];
    ImportParser.ToStringArray(input).forEach((n) => {
      if (n === '') {
        result.push(group);
        group = [];
        return;
      }

      group.push(Number.parseInt(n));
    });

    return result;
  }

  public static ToStringArray(input: string): string[] {
    return input.split(/\r?\n/);
  }
}
