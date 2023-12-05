import { Day } from '../day';
import { ImportParser } from '../utils/import-parser';

interface Mapping {
  sourceStart: number;
  sourceEnd: number;
  sourceModifier: number;
}

class Day5 extends Day {
  constructor() {
    super(5);
  }

  parseToMap(mapInput: string): Mapping[] {
    const mapData: number[][] = ImportParser.ToStringArray(mapInput.split(':')[1])
      .filter((l) => l !== '')
      .map((l) => l.split(' ').map((d) => parseInt(d)));
    const map = mapData.reduce((acc: Mapping[], mapping) => {
      const destStart = mapping[0];
      const sourceStart = mapping[1];
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
    const data: string[] = ImportParser.ToDataBlock(input);
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
      let result = seed;
      result = this.getMappedValue(seedToSoilMap, result);
      result = this.getMappedValue(soilToFertilizerMap, result);
      result = this.getMappedValue(fertilizerToWaterMap, result);
      result = this.getMappedValue(waterToLightMap, result);
      result = this.getMappedValue(lightToTemperatureMap, result);
      result = this.getMappedValue(temperatureToHumidityMap, result);
      result = this.getMappedValue(humidityToLocationMap, result);

      if (acc === -1 || result < acc) {
        return result;
      }

      return acc;
    }, -1);

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const data: string[] = ImportParser.ToDataBlock(input);
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

    const result = seeds.reduce((acc: number, seed: number, index: number, arr: number[]) => {
      if (index % 2 === 1) {
        // Odd indexes specify a count, skip them
        return acc;
      }
      let count = arr[index + 1];

      while (count > 0) {
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

        seed++;
        count--;
      }
      return acc;
    }, -1);

    return result.toString();
  }
}

export default new Day5();
