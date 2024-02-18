import {GoalsApi} from './GoalsApi';
import uuid from 'react-native-uuid';
import {MeasurementType, MeasurementValue} from './types';

export const saveBooleanGoalProgress = async (
  goalId: string,
  timestamp: number,
  measuredValue: MeasurementValue,
): Promise<void> => {
  const goalsApi = new GoalsApi();
  const goal = await goalsApi.getGoal(goalId);

  const now = new Date().getTime();
  goalsApi.updateGoal({
    ...goal,
    measurements: [
      ...goal.measurements,
      {
        id: uuid.v4().toString(),
        timestamp,
        createdOn: now,
        updatedOn: now,
        value: measuredValue,
        measurementType: MeasurementType.Boolean,
      },
    ],
  });
};
