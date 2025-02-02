import {Monthday, Weekday} from '../dateTime/types';

export type ScheduledNotification = {
  id: string;
  timestamp: number;
};

export enum GoalSuggestionState {
  Accepted,
  NotAccepted,
  Unknown,
}

export enum MeasurementType {
  Boolean,
  Scale,
  NotSet,
}

export enum YesNoValue {
  Yes,
  No,
  Skip,
}

export type MeasurementValue = YesNoValue;

export enum CheckpointFrequency {
  Daily,
  Weekly,
  Monthly,
  NotSet,
}

export type Checkpoint = {
  frequency: CheckpointFrequency;
  days: Weekday[] | Monthday[] | undefined;
  hours: number;
  minutes: number;
};

type GoalSuggestion = {
  id: string;
  title: string;
  description: string;
  accepted: GoalSuggestionState;
};

// type CheckinRecord = {
//   measuredValue: number | null;
//   timestamp: number;
//   checkinTime: number;
// };

export type GoalMeasurement = {
  id: string;
  measurementType: MeasurementType;
  timestamp: number;
  value: MeasurementValue;
  createdOn: number;
  updatedOn: number;
  notificationId?: string;
  // nextCheckinAt: number;
  // checkinHistory: CheckinRecord[];
};

export type Goal = {
  isDummy?: boolean;
  id: string;
  title: string;
  description: string;
  createdOn: number;
  updatedOn: number;
  scheduledNotifications: ScheduledNotification[];
  measurements: GoalMeasurement[];
  checkinStructure: [
    string,
    {
      measurementType: MeasurementType;
      checkpointInfo: Checkpoint;
    },
  ][];
  healthScore: number;
  suggestions: GoalSuggestion[];
};
