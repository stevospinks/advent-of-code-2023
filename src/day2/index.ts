import { Day } from '../day';
import { ImportParser } from '../utils/import-parser';

interface Game {
  id: number;
  rounds: Round[];
}

interface Round {
  red: number;
  blue: number;
  green: number;
}

class Day2 extends Day {
  private readonly MAX_RED_CUBES = 12;
  private readonly MAX_GREEN_CUBES = 13;
  private readonly MAX_BLUE_CUBES = 14;

  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const gameData = ImportParser.ToStringArray(input);
    const games: Game[] = gameData.map((g) => {
      const idSplit = g.split(': ');
      const id = parseInt(idSplit[0].split(' ')[1]);

      const roundData = idSplit[1].split('; ');
      const rounds: Round[] = roundData.map((r) => {
        const round: Round = { red: 0, green: 0, blue: 0 };

        const cubeGroupData = r.split(', ');

        for (let i = 0; i < cubeGroupData.length; i++) {
          const cubeGroup = cubeGroupData[i].split(' ');
          switch (cubeGroup[1]) {
            case 'red':
              round.red = parseInt(cubeGroup[0]);
              break;
            case 'green':
              round.green = parseInt(cubeGroup[0]);
              break;
            case 'blue':
              round.blue = parseInt(cubeGroup[0]);
              break;
            default:
              break;
          }
        }

        return round;
      });

      return { id: id, rounds: rounds };
    });

    const possibleGames = games.filter((g) =>
      g.rounds.every(
        (r) =>
          r.red <= this.MAX_RED_CUBES &&
          r.green <= this.MAX_GREEN_CUBES &&
          r.blue <= this.MAX_BLUE_CUBES,
      ),
    );

    const idSum = possibleGames.reduce((acc, game) => {
      return acc + game.id;
    }, 0);

    return idSum.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day2();
