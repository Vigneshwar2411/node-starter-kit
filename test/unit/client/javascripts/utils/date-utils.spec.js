import * as dateUtils from 'client/javascripts/utils/date-utils';

describe('Date Util', () => {
  describe('now', () => {
    test('should return current date', () => {
      expect(dateUtils.now().getDate()).toEqual(new Date().getDate());
    });
  });
});
