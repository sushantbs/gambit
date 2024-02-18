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
  time: [number, number];
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

type GoalMeasurement = {
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
      checkpointInfo: {
        frequency: CheckpointFrequency;
        time: [number, number];
      };
    },
  ][];
  healthScore: number;
  suggestions: GoalSuggestion[];
};
