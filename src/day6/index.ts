import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

class Day6 extends Day {
  constructor() {
    super(6);
  }

  canBeatRecord(chargeTime: number, raceLength: number, recordDistance: number): boolean {
    return chargeTime * (raceLength - chargeTime) > recordDistance;
  }

  solveForPartOne(input: string): string {
    const data = StringParser.ToStringArray(input).map((l) => l.split(':')[1]);
    const raceTimes: number[] = data[0]
      .split(' ')
      .filter((t) => t !== '' && t !== ' ')
      .map((t) => parseInt(t));
    const raceDistances: number[] = data[1]
      .split(' ')
      .filter((t) => t !== '' && t !== ' ')
      .map((t) => parseInt(t));

    const results: number[] = [];
    for (let index = 0; index < raceTimes.length; index++) {
      const raceTime = raceTimes[index];
      const raceDistance = raceDistances[index];

      let firstWinAt = -1;
      let time = -1;
      while (firstWinAt === -1 && time <= raceTime) {
        time++;
        if (this.canBeatRecord(time, raceTime, raceDistance)) {
          firstWinAt = time;
        }
      }

      let lastWinAt = -1;
      time = raceTime + 1;
      while (lastWinAt === -1 && time >= 0) {
        time--;
        if (this.canBeatRecord(time, raceTime, raceDistance)) {
          lastWinAt = time;
        }
      }

      results.push(lastWinAt - (firstWinAt - 1));
    }

    const result = results.reduce((acc, r) => acc * r, 1);
    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const data = StringParser.ToStringArray(input).map((l) => l.split(':')[1]);
    const raceTime: number = parseInt(data[0].replace(/ /g, ''));
    const raceDistance: number = parseInt(data[1].replace(/ /g, ''));

    let firstWinAt = -1;
    let time = -1;
    while (firstWinAt === -1 && time <= raceTime) {
      time++;
      if (this.canBeatRecord(time, raceTime, raceDistance)) {
        firstWinAt = time;
      }
    }

    let lastWinAt = -1;
    time = raceTime + 1;
    while (lastWinAt === -1 && time >= 0) {
      time--;
      if (this.canBeatRecord(time, raceTime, raceDistance)) {
        lastWinAt = time;
      }
    }

    const result = lastWinAt - (firstWinAt - 1);
    return result.toString();
  }
}

export default new Day6();
