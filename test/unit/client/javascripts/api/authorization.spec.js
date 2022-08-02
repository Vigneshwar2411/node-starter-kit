import http from 'client/javascripts/api/http';
import { getAuth } from 'client/javascripts/api/authorization';

jest.mock('../../../../../src/client/javascripts/api/http');

describe('api/authorization', () => {
  beforeEach(() => {
    http.get.mockClear();
  });

  test('should return authorization info', () => {
    http.get.mockResolvedValue({
      status: 200,
      data: {
        name: 'John Doe',
      },
    });

    return getAuth().then((data) => {
      expect(http.get).toHaveBeenCalledWith('/api/me');
      expect(data.name).toStrictEqual('John Doe');
    });
  });
});
