const LONG_MONTHS = [0, 2, 4, 6, 7, 9, 11];
const SHORT_MONTHS = [3, 5, 8, 10];

export function getMonthLength(date: Date): number {
  const month = date.getMonth();
  if (LONG_MONTHS.includes(month)) {
    return 31;
  }

  if (SHORT_MONTHS.includes(month)) {
    return 30;
  }

  if (date.getFullYear() % 4) {
    return 28;
  }

  return 29;
}
