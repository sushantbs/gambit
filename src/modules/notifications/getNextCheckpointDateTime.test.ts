import {Monthday, Weekday} from '../dateTime/types';
import {Checkpoint, CheckpointFrequency} from '../goals/types';
import {getNextCheckpointDateTime} from './getNextCheckpointDateTime';

describe('getNextCheckpointDateTime', () => {
  describe('when the frequency is daily', () => {
    it('later today', () => {
      const fromDate = new Date('2023-10-01T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [],
        frequency: CheckpointFrequency.Daily,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(1); // Today
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });

    it('tomorrow', () => {
      const fromDate = new Date('2023-10-01T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 9,
        minutes: 30,
        days: [],
        frequency: CheckpointFrequency.Daily,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(2); // Today
      expect(nextCheckpoint.getHours()).toBe(9);
      expect(nextCheckpoint.getMinutes()).toBe(30);
    });
  });

  describe('when the frequency is weekly', () => {
    it('later this week', () => {
      const fromDate = new Date('2023-10-01T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Weekday.Wednesday],
        frequency: CheckpointFrequency.Weekly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(4); // This week
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });

    it('later this week with multiple days', () => {
      const fromDate = new Date('2023-10-02T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Weekday.Monday, Weekday.Wednesday],
        frequency: CheckpointFrequency.Weekly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(2); // This week
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });

    it('next week', () => {
      const fromDate = new Date('2023-10-05T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Weekday.Wednesday],
        frequency: CheckpointFrequency.Weekly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(11); // This week
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });
  });

  describe('when the frequency is monthly', () => {
    it('later this month', () => {
      const fromDate = new Date('2023-10-01T10:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Monthday.Eleven],
        frequency: CheckpointFrequency.Monthly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(11);
      expect(nextCheckpoint.getMonth()).toBe(9);
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });
    it('later this month with multiple days', () => {
      const fromDate = new Date('2023-10-07T18:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Monthday.Seven, Monthday.Seventeen, Monthday.TwentySeven],
        frequency: CheckpointFrequency.Monthly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(17);
      expect(nextCheckpoint.getMonth()).toBe(9);
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });
    it('next month', () => {
      const fromDate = new Date('2023-10-27T18:00:00');
      const checkpoint: Checkpoint = {
        hours: 17,
        minutes: 0,
        days: [Monthday.Seven, Monthday.Seventeen, Monthday.TwentySeven],
        frequency: CheckpointFrequency.Monthly,
      };

      const nextCheckpoint = getNextCheckpointDateTime(fromDate, checkpoint);

      expect(nextCheckpoint.getDate()).toBe(7);
      expect(nextCheckpoint.getMonth()).toBe(10);
      expect(nextCheckpoint.getHours()).toBe(17);
      expect(nextCheckpoint.getMinutes()).toBe(0);
    });
  });
});
