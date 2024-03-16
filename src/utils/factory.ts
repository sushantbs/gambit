import {
  CheckpointFrequency,
  Goal,
  GoalMeasurement,
  MeasurementType,
  YesNoValue,
} from '../modules/goals/types';
import {DateTime, Duration} from 'luxon';

const generateMeasurement = (
  referenceDateTime: DateTime,
  distanceFromReferenceInDays: number,
  measurement: YesNoValue,
): GoalMeasurement => {
  return {
    id: `measurement-${distanceFromReferenceInDays}`,
    measurementType: MeasurementType.Boolean,
    timestamp: referenceDateTime
      .minus(Duration.fromObject({day: distanceFromReferenceInDays}))
      .toMillis(),
    value: measurement,
    createdOn: referenceDateTime
      .minus(
        Duration.fromObject({
          day: distanceFromReferenceInDays - 1,
          hours: 23,
          minutes: 30,
        }),
      )
      .toMillis(),
    updatedOn: referenceDateTime
      .minus(
        Duration.fromObject({
          day: distanceFromReferenceInDays - 1,
          hours: 23,
          minutes: 30,
        }),
      )
      .toMillis(),
    notificationId: `notification-${distanceFromReferenceInDays}`,
  };
};

export const generateGoalItem = (): Goal => {
  const now = DateTime.now();
  const oneMonth = Duration.fromObject({
    month: 1,
  });
  const oneMonthAgoDate = now.minus(oneMonth);

  const oneDay = Duration.fromObject({
    day: 1,
  });
  const yesterday = now.minus(oneDay);

  const nextFivePM =
    now.get('hour') > 17
      ? now.plus(
          Duration.fromObject({day: 1}).set({hour: 17, minute: 0, second: 0}),
        )
      : now.set({hour: 17, minute: 0, second: 0});

  const sampleGoal: Goal = {
    id: 'sample-goal',
    title: 'Sample Goal',
    description:
      'This is a sample goal that I just want to add some details for',
    createdOn: oneMonthAgoDate.toMillis(),
    updatedOn: yesterday.toMillis(),
    scheduledNotifications: [
      {
        id: 'next-notification-1',
        timestamp: nextFivePM.toMillis(),
      },
      {
        id: 'next-notification-2',
        timestamp: nextFivePM.plus(Duration.fromObject({day: 1})).toMillis(),
      },
    ],
    measurements: [
      generateMeasurement(nextFivePM, 1, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 2, YesNoValue.No),
      generateMeasurement(nextFivePM, 3, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 4, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 5, YesNoValue.No),
      generateMeasurement(nextFivePM, 6, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 7, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 8, YesNoValue.No),
      generateMeasurement(nextFivePM, 9, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 10, YesNoValue.No),
      generateMeasurement(nextFivePM, 11, YesNoValue.No),
      generateMeasurement(nextFivePM, 12, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 13, YesNoValue.No),
      generateMeasurement(nextFivePM, 14, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 15, YesNoValue.Yes),
      generateMeasurement(nextFivePM, 16, YesNoValue.No),
      generateMeasurement(nextFivePM, 17, YesNoValue.No),
      generateMeasurement(nextFivePM, 18, YesNoValue.Yes),
    ],
    checkinStructure: [
      [
        'default',
        {
          measurementType: MeasurementType.Boolean,
          checkpointInfo: {
            frequency: CheckpointFrequency.Daily,
            days: undefined,
            hours: 17,
            minutes: 0,
          },
        },
      ],
    ],
    healthScore: 3.5,
    suggestions: [],
  };

  return sampleGoal;
};
