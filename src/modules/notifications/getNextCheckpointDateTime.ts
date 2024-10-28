import {Monthday, Weekday} from '../dateTime/types';
import {getWeekdayDateValue} from '../dateTime/getWeekdayDateValue';
import {Checkpoint, CheckpointFrequency} from '../goals/types';
import {getMonthdayDateValue} from '../dateTime/getMonthdayDateValue';
import {getMonthLength} from '../dateTime/getMonthLength';

const testNotifications: boolean = false;

export function getNextCheckpointDateTime(
  fromDate: Date,
  checkpoint: Checkpoint,
): Date {
  const {hours, minutes, days, frequency} = checkpoint;

  const fromHour = fromDate.getHours();
  const fromMinutes = fromDate.getMinutes();
  const fromDayOfMonth = fromDate.getDate();
  const fromDayOfWeek = fromDate.getDay();
  const fromDateTimestamp = fromDate.getTime();

  if (testNotifications) {
    const checkpointDate = new Date(fromDateTimestamp);
    checkpointDate.setSeconds(checkpointDate.getSeconds() + 30);
    return checkpointDate;
  }

  if (frequency === CheckpointFrequency.Weekly) {
    if (!days || !days.length) {
      throw new Error('No days of the week found!');
    }

    const sortedDateDayTimestamps = days
      .map(a => {
        const checkpointDate = new Date(fromDateTimestamp);
        const checkpointDayOfWeek = getWeekdayDateValue(a as Weekday);

        checkpointDate.setDate(
          fromDayOfMonth + (checkpointDayOfWeek - fromDayOfWeek),
        );
        checkpointDate.setHours(hours);
        checkpointDate.setMinutes(minutes);

        return checkpointDate.getTime();
      })
      .sort((a, b) => a - b);

    const firstCheckpointOfNextWeek =
      getWeekdayDateValue(days[0] as Weekday) + 7;
    const checkpointDate = new Date(fromDateTimestamp);

    checkpointDate.setDate(
      fromDayOfMonth + (firstCheckpointOfNextWeek - fromDayOfWeek),
    );
    checkpointDate.setHours(hours);
    checkpointDate.setMinutes(minutes);

    sortedDateDayTimestamps.push(checkpointDate.getTime());

    const nextTimestamp =
      sortedDateDayTimestamps.find(
        checkpointTimestamp => checkpointTimestamp > fromDateTimestamp,
      ) ?? 0;

    return new Date(nextTimestamp);
  } else if (frequency === CheckpointFrequency.Monthly) {
    if (!days || !days.length) {
      throw new Error('No days of the month found!');
    }

    const sortedDateDayTimestamps = days
      .map(a => {
        const checkpointDate = new Date(fromDateTimestamp);
        const checkpointDayOfMonth = getMonthdayDateValue(a as Monthday);

        checkpointDate.setDate(checkpointDayOfMonth);
        checkpointDate.setHours(hours);
        checkpointDate.setMinutes(minutes);

        return checkpointDate.getTime();
      })
      .sort((a, b) => a - b);

    const firstCheckpointOfNextMonth =
      getMonthdayDateValue(days[0] as Monthday) + getMonthLength(fromDate);
    const checkpointDate = new Date(fromDateTimestamp);

    checkpointDate.setDate(firstCheckpointOfNextMonth);
    checkpointDate.setHours(hours);
    checkpointDate.setMinutes(minutes);

    sortedDateDayTimestamps.push(checkpointDate.getTime());

    const nextTimestamp =
      sortedDateDayTimestamps.find(
        checkpointTimestamp => checkpointTimestamp > fromDateTimestamp,
      ) ?? 0;

    return new Date(nextTimestamp);
  }

  // checkpoint frequency -> daily
  const checkpointDate = new Date(fromDateTimestamp);
  if (fromHour > hours || (fromHour === hours && fromMinutes >= minutes)) {
    checkpointDate.setDate(fromDayOfMonth + 1);
    checkpointDate.setHours(hours);
    checkpointDate.setMinutes(minutes);
  }
  return checkpointDate;
}
