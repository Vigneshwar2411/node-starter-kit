import * as helpers from 'app/utils/helpers';

describe('helpers', () => {
  describe('mergeIgnoringUndefined', () => {
    let A;
    let B;
    beforeEach(() => {
      A = { a: 1 };
      B = { b: 2 };
    });

    test('should combine the keys of the objects', () => {
      expect(helpers.mergeIgnoringUndefined(A, B)).toEqual({
        a: 1,
        b: 2,
      });
    });

    test('should prefer the second arg\'s key-value over the first arg\'s', () => {
      B.a = 3;
      expect(helpers.mergeIgnoringUndefined(A, B)).toEqual({
        a: 3,
        b: 2,
      });
    });

    test('should prefer the first arg\'s key-value when the second arg\'s value is undefined', () => {
      B.a = undefined;
      expect(helpers.mergeIgnoringUndefined(A, B)).toEqual({
        a: 1,
        b: 2,
      });
    });

    test('should merge recursively', () => {
      const C = { A };
      const D = { A: { b: 3 }, B };
      expect(helpers.mergeIgnoringUndefined(C, D)).toEqual({
        A: {
          a: 1,
          b: 3,
        },
        B: {
          b: 2,
        },
      });
    });
  });

  describe('parseJSON', () => {
    test('should parse the data', () => {
      expect(helpers.parseJSON('{"a":1}')).toEqual({ a: 1 });
    });

    test('should return an empty json', () => {
      expect(helpers.parseJSON('{"a"->"1"}')).toEqual({});
    });

    test('should return an empty json when data is undefined', () => {
      expect(helpers.parseJSON(undefined)).toEqual({});
    });
  });

  describe('isNotRootPath', () => {
    describe('Root paths', () => {
      test('return false for /myApp', () => {
        expect(helpers.isNotRootPath({ originalUrl: '/myApp' })).toBeFalsy();
      });
    });

    describe('Non-Root paths', () => {
      test('return true for non-root', () => {
        expect(helpers.isNotRootPath({ originalUrl: '/random/path' })).toBeTruthy();
      });
    });
  });
});
