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

      const uniqueCardsInHand: CardData[] = hand
        .reduce((acc: CardData[], c, i, arr) => {
          const cardData = acc.find((cd) => cd.card === c);
          if (cardData) {
            cardData.count++;
          } else {
            acc.push({ card: c, count: 1 });
          }
          return acc;
        }, [])
        .sort((a, b) => b.count - a.count);

      let handType: HandType;
      switch (uniqueCardsInHand.length) {
        case 1:
          handType = HandType.FiveOfAKind;
          break;
        case 2:
          handType = uniqueCardsInHand[0].count === 4 ? HandType.FourOfAKind : HandType.FullHouse;
          break;
        case 3:
          handType = uniqueCardsInHand[0].count === 3 ? HandType.ThreeOfAKind : HandType.TwoPair;
          break;
        case 4:
          handType = HandType.OnePair;
          break;
        case 5:
          handType = HandType.HighCard;
          break;
        default:
          throw 'Unexpected uniqueCardsInHand.length';
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
      throw 'Sorting error';
    });

    const result = data.reduce((acc: number, hand: HandData, i: number) => {
      acc += hand.bid * (i + 1);
      return acc;
    }, 0);

    return result.toString();
  }

  solveForPartTwo(input: string): string {
    const data: HandData[] = StringParser.ToStringArray(input).map((l) => {
      const handData = l.split(' ');

      const hand = handData[0].split('').map((c) => {
        switch (c) {
          case 'A':
            return 13;
          case 'K':
            return 12;
          case 'Q':
            return 11;
          case 'J':
            return 1;
          case 'T':
            return 10;
          default:
            return parseInt(c);
        }
      });

      const uniqueCardsInHand: CardData[] = hand
        .reduce((acc: CardData[], c, i, arr) => {
          const cardData = acc.find((cd) => cd.card === c);
          if (cardData) {
            cardData.count++;
          } else {
            acc.push({ card: c, count: 1 });
          }
          return acc;
        }, [])
        .sort((a, b) => b.count - a.count);

      const joker = uniqueCardsInHand.find((c) => c.card === 1) ?? { card: 1, count: 0 };
      let handType: HandType;
      switch (uniqueCardsInHand.length - (joker.count > 0 ? 1 : 0)) {
        case 0: // all jokers
          handType = HandType.FiveOfAKind;
          break;
        case 1: // or 2 with a joker
          handType = HandType.FiveOfAKind;
          break;
        case 2: // or 3 with a joker
          const mostFrequentCard2 =
            uniqueCardsInHand[0].card === 1
              ? uniqueCardsInHand[1].count + joker.count
              : uniqueCardsInHand[0].count + joker.count;
          handType = mostFrequentCard2 === 4 ? HandType.FourOfAKind : HandType.FullHouse;
          break;
        case 3: // or 4 with a joker
          const mostFrequentCard3 =
            uniqueCardsInHand[0].card === 1
              ? uniqueCardsInHand[1].count + joker.count
              : uniqueCardsInHand[0].count + joker.count;
          handType = mostFrequentCard3 === 3 ? HandType.ThreeOfAKind : HandType.TwoPair;
          break;
        case 4: // or 5 with a joker
          handType = HandType.OnePair;
          break;
        case 5: // cannot have a joker
          handType = HandType.HighCard;
          break;
        default:
          throw 'Unexpected uniqueCardsInHand.length';
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
      throw 'Sorting error';
    });

    const result = data.reduce((acc: number, hand: HandData, i: number) => {
      acc += hand.bid * (i + 1);
      return acc;
    }, 0);

    return result.toString();
  }
}

export default new Day7();
