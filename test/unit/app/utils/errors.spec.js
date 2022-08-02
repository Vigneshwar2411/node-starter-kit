import {
  badRequest, unAuthorized, forbidden,
} from 'app/utils/errors';

describe('errors', () => {
  describe('badRequest', () => {
    test('should return 400 status', () => {
      expect(badRequest('sorry').status).toEqual(400);
    });

    test('should return proper message', () => {
      expect(badRequest('sorry').message).toEqual('sorry');
    });
  });

  describe('unAuthorized', () => {
    test('should return 401 status', () => {
      expect(unAuthorized('Invalid Login').status).toEqual(401);
    });

    test('should return proper message', () => {
      expect(unAuthorized('Invalid Login').message).toEqual('Invalid Login');
    });

    test('should return default message', () => {
      expect(unAuthorized().message).toEqual('Not Authorized');
    });
  });

  describe('forbidden', () => {
    test('should return 403 status', () => {
      expect(forbidden('Invalid Login').status).toEqual(403);
    });

    test('should return proper message', () => {
      expect(forbidden().message).toEqual('Forbidden');
    });
  });
});
