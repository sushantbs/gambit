import {Monthday} from './types';

export const getMonthdayDateValue = (monthday: Monthday): number => {
  switch (monthday) {
    case Monthday.One:
      return 1;
    case Monthday.Two:
      return 2;
    case Monthday.Three:
      return 3;
    case Monthday.Four:
      return 4;
    case Monthday.Five:
      return 5;
    case Monthday.Six:
      return 6;
    case Monthday.Seven:
      return 7;
    case Monthday.Eight:
      return 8;
    case Monthday.Nine:
      return 9;
    case Monthday.Ten:
      return 10;
    case Monthday.Eleven:
      return 11;
    case Monthday.Twelve:
      return 12;
    case Monthday.Thirteen:
      return 13;
    case Monthday.Fourteen:
      return 14;
    case Monthday.Fifteen:
      return 15;
    case Monthday.Sixteen:
      return 16;
    case Monthday.Seventeen:
      return 17;
    case Monthday.Eighteen:
      return 18;
    case Monthday.Nineteen:
      return 19;
    case Monthday.Twenty:
      return 20;
    case Monthday.TwentyOne:
      return 21;
    case Monthday.TwentyTwo:
      return 22;
    case Monthday.TwentyThree:
      return 23;
    case Monthday.TwentyFour:
      return 24;
    case Monthday.TwentyFive:
      return 25;
    case Monthday.TwentySix:
      return 26;
    case Monthday.TwentySeven:
      return 27;
    case Monthday.TwentyEight:
      return 28;
    case Monthday.TwentyNine:
      return 29;
    case Monthday.Thirty:
      return 30;
  }
};
