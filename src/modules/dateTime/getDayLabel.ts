import {Weekday} from './types';

export const getDayLabel = (weekday: Weekday): string => {
  switch (weekday) {
    case Weekday.Sunday:
      return 'Su';
    case Weekday.Monday:
      return 'M';
    case Weekday.Tuesday:
      return 'T';
    case Weekday.Wednesday:
      return 'W';
    case Weekday.Thursday:
      return 'Th';
    case Weekday.Friday:
      return 'F';
    case Weekday.Saturday:
      return 'S';
  }
};
