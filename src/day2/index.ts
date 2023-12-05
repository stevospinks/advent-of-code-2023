import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

interface Game {
  id: number;
  rounds: Round[];
}

interface Round {
  red: number;
  green: number;
  blue: number;
}

class Day2 extends Day {
  private readonly MAX_RED_CUBES = 12;
  private readonly MAX_GREEN_CUBES = 13;
  private readonly MAX_BLUE_CUBES = 14;

  constructor() {
    super(2);
  }

  parseInput(gameData: string[]): Game[] {
    return gameData.map((g) => {
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
  }

  solveForPartOne(input: string): string {
    const gameData = StringParser.ToStringArray(input);
    const games: Game[] = this.parseInput(gameData);

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
    const gameData = StringParser.ToStringArray(input);
    const games: Game[] = this.parseInput(gameData);

    const maxRounds: Round[] = games.map((g) => {
      return g.rounds.reduce(
        (maxRound, r) => {
          maxRound.red = maxRound.red < r.red ? r.red : maxRound.red;
          maxRound.green = maxRound.green < r.green ? r.green : maxRound.green;
          maxRound.blue = maxRound.blue < r.blue ? r.blue : maxRound.blue;
          return maxRound;
        },
        { red: 0, green: 0, blue: 0 },
      );
    });

    const powerSum = maxRounds.reduce((acc, r) => {
      const power = r.red * r.green * r.blue;
      return acc + power;
    }, 0);

    return powerSum.toString();
  }
}

export default new Day2();
