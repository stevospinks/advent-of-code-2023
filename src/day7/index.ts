import { Day } from '../day';
import { StringParser } from '../utils/string-parser';

interface CardData {
  card: number;
  count: number;
}

interface HandData {
  hand: number[];
  handType: HandType;
  bid: number;
}

enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

class Day7 extends Day {
  constructor() {
    super(7);
  }

  solveForPartOne(input: string): string {
    const data: HandData[] = StringParser.ToStringArray(input).map((l) => {
      const handData = l.split(' ');

      const hand = handData[0].split('').map((c) => {
        switch (c) {
          case 'A':
            return 14;
          case 'K':
            return 13;
          case 'Q':
            return 12;
          case 'J':
            return 11;
          case 'T':
            return 10;
          default:
            return parseInt(c);
        }
      });

      const cardsInHand = hand
        .reduce((acc: CardData[], c, i, arr) => {
          const uhEntry = acc.find((uh) => uh.card === c);
          if (uhEntry) {
            uhEntry.count++;
          } else {
            acc.push({ card: c, count: 1 });
          }
          return acc;
        }, [])
        .sort((a, b) => b.count - a.count);

      let handType: HandType;
      switch (cardsInHand.length) {
        case 1:
          handType = HandType.FiveOfAKind;
          break;
        case 2:
          handType =
            cardsInHand[0].count === 4 ? HandType.FourOfAKind : (handType = HandType.FullHouse);
          break;
        case 3:
          handType =
            cardsInHand[0].count === 3 ? HandType.ThreeOfAKind : (handType = HandType.TwoPair);
          break;
        case 4:
          handType = HandType.OnePair;
          break;
        case 5:
        default:
          handType = HandType.HighCard;
          break;
      }

      const bid = parseInt(handData[1]);

      return { hand, handType, bid };
    });

    data.sort((a, b) => {
      if (a.handType === b.handType) {
        for (let i = 0; i < a.hand.length; i++) {
          const cardA = a.hand[i];
          const cardB = b.hand[i];
          if (cardA !== cardB) {
            return cardA - cardB;
          }
        }
      } else {
        return a.handType - b.handType;
      }
      return 0;
    });

    const result = data.reduce((acc: number, hand: HandData, i: number) => {
      acc += hand.bid * (i + 1);
      return acc;
    }, 0);

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    return input;
  }
}

export default new Day7();
