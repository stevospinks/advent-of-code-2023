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

      group.push(parseInt(n));
    });

    return result;
  }

  public static ToStringArray(input: string): string[] {
    return input.split(/\r?\n/);
  }

  public static To2dMatrix(input: string): string[][] {
    const result = ImportParser.ToStringArray(input).reduce((acc: string[][], line) => {
      const charArray = line.split('');
      acc.push(charArray);
      return acc;
    }, []);

    return result;
  }
}
