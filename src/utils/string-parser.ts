export class StringParser {
  public static ToGroupedNumberArrays(
    input: string,
    numberSeparator: string,
    groupSeparator: string,
    ignoreEverythingBeforePerLine?: string,
  ): number[][][] {
    const result: number[][][] = StringParser.ToStringArray(input).reduce(
      (acc: number[][][], line: string) => {
        if (ignoreEverythingBeforePerLine) {
          line = line.split(ignoreEverythingBeforePerLine)[1];
        }

        const lineGroups = line.split(groupSeparator);

        const parsedGroups: number[][] = lineGroups.reduce(
          (groupAcc: number[][], group: string) => {
            const parsedGroup: number[] = group
              .split(numberSeparator)
              .filter((n) => n !== undefined && n !== null && n !== '')
              .map((n) => parseInt(n));

            groupAcc.push(parsedGroup);
            return groupAcc;
          },
          [],
        );

        acc.push(parsedGroups);
        return acc;
      },
      [],
    );

    return result;
  }

  public static ToStringArray(input: string): string[] {
    return input.split(/\r?\n/);
  }

  public static ToDataBlock(input: string): string[] {
    return input.split(/\r?\n\r?\n/);
  }

  public static To2dMatrix(input: string): string[][] {
    const result = StringParser.ToStringArray(input).reduce((acc: string[][], line) => {
      const charArray = line.split('');
      acc.push(charArray);
      return acc;
    }, []);

    return result;
  }
}
