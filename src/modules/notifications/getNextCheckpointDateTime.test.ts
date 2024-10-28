import {Checkpoint, CheckpointFrequency} from '../goals/types';
import {getNextCheckpointDateTime} from './getNextCheckpointDateTime';

describe('getNextCheckpointDateTime', () => {
  it('should calculate the next checkpoint date for daily frequency', () => {
    const fromDate = new Date('2023-10-01T10:00:00');
    const checkpoint: Checkpoint = {
      hours: 9,
      minutes: 0,
      days: [],
      frequency: CheckpointFrequency.Daily,
    };

    const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

    expect(nextCheckpoint.getDate()).toBe(2); // Next day
    expect(nextCheckpoint.getHours()).toBe(9);
    expect(nextCheckpoint.getMinutes()).toBe(0);
  });
});
