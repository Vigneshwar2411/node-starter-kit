import { getTimeElapsed } from 'app/utils/date-utils';

describe('Date Utils', () => {
  describe('getElapsedTime', () => {
    test('calculates time elapsed in ms', () => {
      const startDate = new Date('2018-02-02T12:00:00.000Z');
      const endDate = new Date('2018-02-02T12:00:01.001Z');
      expect(getTimeElapsed(startDate, endDate)).toEqual(1001);
    });
  });
});
