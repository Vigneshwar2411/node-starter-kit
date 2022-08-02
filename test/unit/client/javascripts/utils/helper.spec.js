import * as helpers from 'client/javascripts/utils/helpers';
import config from 'client/javascripts/config';

describe('Helper', () => {
  describe('renderIf', () => {
    test('should return null on condition false', () => {
      expect(helpers.renderIf(() => false, () => 'hi')).toEqual(null);
    });

    test('should return success block on condition true', () => {
      expect(helpers.renderIf(() => true, () => 'hi')).toEqual('hi');
    });

    test('should return null default', () => {
      expect(helpers.renderIf(() => null, () => 'hi')).toEqual(null);
    });
  });

  describe('isNonProd', () => {
    test('should return false when environment is production', () => {
      config.env = jest.fn().mockReturnValue('production')();
      expect(helpers.isNonProd()).toBeFalsy();
    });

    test('should return false when environment is unknown', () => {
      config.env = jest.fn().mockReturnValue('undefined')();
      expect(helpers.isNonProd()).toBeFalsy();
    });

    test('should return true when environment is dev', () => {
      config.env = jest.fn().mockReturnValue('dev')();
      expect(helpers.isNonProd()).toBeTruthy();
    });
  });

  describe('isLocal', () => {
    test('should return false when environment is production', () => {
      config.env = jest.fn().mockReturnValue('production')();
      expect(helpers.isLocal()).toBeFalsy();
    });

    test('should return false when environment is unknown', () => {
      config.env = jest.fn().mockReturnValue('undefined')();
      expect(helpers.isLocal()).toBeFalsy();
    });

    test('should return false when environment is dev', () => {
      config.env = jest.fn().mockReturnValue('dev')();
      expect(helpers.isLocal()).toBeFalsy();
    });

    test('should return true when environment is local', () => {
      config.env = jest.fn().mockReturnValue('local')();
      expect(helpers.isLocal()).toBeTruthy();
    });
  });

  describe('classNamesWithModifiers', () => {
    const { classnamesWithModifier } = helpers;

    test('should return base class when no modifiers', () => {
      expect(classnamesWithModifier('base-class')).toStrictEqual('base-class');
    });

    test('should return base class with modifiers', () => {
      expect(classnamesWithModifier('base', 'modOne', 'modTwo')).toStrictEqual('base base--modOne base--modTwo');
    });

    test('should return base class with truthy modifiers', () => {
      expect(classnamesWithModifier('base', null, 'modTwo')).toStrictEqual('base base--modTwo');
    });
  });

  describe('exists', () => {
    const { exists } = helpers;

    test('should return true', () => {
      expect(exists('true')).toBeTruthy();
    });

    test('should return false for null', () => {
      expect(exists(null)).toBeFalsy();
    });

    test('should return false for undefined', () => {
      expect(exists()).toBeFalsy();
    });
  });
});
