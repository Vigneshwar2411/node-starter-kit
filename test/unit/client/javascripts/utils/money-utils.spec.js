import * as moneyUtils from 'client/javascripts/utils/money-utils';

describe('Money Utils', () => {
  describe('formatDollar', () => {
    const { formatDollar } = moneyUtils;
    test('should return formatted data without decimal', () => {
      expect(formatDollar(123)).toStrictEqual('$123');
    });

    test('should return formatted data with decimal', () => {
      expect(formatDollar(123.12)).toStrictEqual('$123.12');
    });

    test('should return - for NaN', () => {
      expect(formatDollar()).toStrictEqual('\u2014');
    });

    test('should return empty string for NaN for input fields', () => {
      expect(formatDollar(undefined, true)).toStrictEqual('');
    });

    test('should return - for 0', () => {
      expect(formatDollar(0)).toStrictEqual('\u2014');
    });

    test('should return $0 for 0 value in input field', () => {
      expect(formatDollar(0, true)).toStrictEqual('$0');
    });

    test('should return formatted data for negative value', () => {
      expect(formatDollar(-123)).toStrictEqual('$(123.00)');
    });
  });
});
