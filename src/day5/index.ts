import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

interface Mapping {
  sourceStart: number;
  sourceEnd: number;
  sourceModifier: number;
}

interface SeedRange {
  min: number;
  max: number;
}

class Day5 extends Day {
  constructor() {
    super(5);
  }

  parseToMap(mapInput: string, inverse: boolean = false): Mapping[] {
    const mapData: number[][] = StringParser.ToStringArray(mapInput.split(':')[1])
      .filter((l) => l !== '')
      .map((l) => l.split(' ').map((d) => parseInt(d)));
    const map = mapData.reduce((acc: Mapping[], mapping) => {
      const destStart = inverse ? mapping[1] : mapping[0];
      const sourceStart = inverse ? mapping[0] : mapping[1];
      let count = mapping[2];

      acc.push({
        sourceModifier: destStart - sourceStart,
        sourceStart: sourceStart,
        sourceEnd: sourceStart + count - 1,
      });
      return acc;
    }, []);

    return map;
  }

  getMappedValue(maps: Mapping[], source: number): number {
    const map = maps.find((m) => source >= m.sourceStart && source <= m.sourceEnd);
    return map === undefined ? source : source + map.sourceModifier;
  }

  solveForPartOne(input: string): string {
    const data: string[] = StringParser.ToDataBlock(input);
    const seeds: number[] = data[0]
      .split(': ')[1]
      .split(' ')
      .map((d) => parseInt(d));
    const seedToSoilMap = this.parseToMap(data[1]);
    const soilToFertilizerMap = this.parseToMap(data[2]);
    const fertilizerToWaterMap = this.parseToMap(data[3]);
    const waterToLightMap = this.parseToMap(data[4]);
    const lightToTemperatureMap = this.parseToMap(data[5]);
    const temperatureToHumidityMap = this.parseToMap(data[6]);
    const humidityToLocationMap = this.parseToMap(data[7]);

    const result = seeds.reduce((acc: number, seed: number) => {
      const soil = this.getMappedValue(seedToSoilMap, seed);
      const fertilizer = this.getMappedValue(soilToFertilizerMap, soil);
      const water = this.getMappedValue(fertilizerToWaterMap, fertilizer);
      const light = this.getMappedValue(waterToLightMap, water);
      const temperature = this.getMappedValue(lightToTemperatureMap, light);
      const humidity = this.getMappedValue(temperatureToHumidityMap, temperature);
      const location = this.getMappedValue(humidityToLocationMap, humidity);

      if (acc === -1 || location < acc) {
        acc = location;
      }

      return acc;
    }, -1);

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const data: string[] = StringParser.ToDataBlock(input);
    const seedRanges: SeedRange[] = data[0]
      .split(': ')[1]
      .split(' ')
      .map((d) => parseInt(d))
      .reduce((acc: SeedRange[], seed, index, arr) => {
        if (index % 2 === 1) {
          // Odd indexes specify a count, skip them
          return acc;
        }
        let count = arr[index + 1];
        acc.push({ min: seed, max: seed + count });
        return acc;
      }, [])
      .sort((s1, s2) => s1.min - s2.min);

    const soilToSeedMap = this.parseToMap(data[1], true);
    const fertilizerToSoilMap = this.parseToMap(data[2], true);
    const waterToFertilizerMap = this.parseToMap(data[3], true);
    const lightToWaterMap = this.parseToMap(data[4], true);
    const temperatureToLightMap = this.parseToMap(data[5], true);
    const humidityToTemperatureMap = this.parseToMap(data[6], true);
    const locationToHumidityMap = this.parseToMap(data[7], true);

    let location = 0;
    let result = -1;
    while (result === -1) {
      const humidity = this.getMappedValue(locationToHumidityMap, location);
      const temperature = this.getMappedValue(humidityToTemperatureMap, humidity);
      const light = this.getMappedValue(temperatureToLightMap, temperature);
      const water = this.getMappedValue(lightToWaterMap, light);
      const fertilizer = this.getMappedValue(waterToFertilizerMap, water);
      const soil = this.getMappedValue(fertilizerToSoilMap, fertilizer);
      const seed = this.getMappedValue(soilToSeedMap, soil);

      for (let i = 0; i < seedRanges.length; i++) {
        const seedRange = seedRanges[i];
        if (seed < seedRange.min) {
          continue;
        }
        if (seed < seedRange.max) {
          result = location;
          break;
        }
      }

      location++;
    }

    return result.toString();
  }
}

export default new Day5();
