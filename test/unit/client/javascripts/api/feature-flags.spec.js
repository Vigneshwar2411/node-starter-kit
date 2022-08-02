import http from 'client/javascripts/api/http';
import { getFeatureFlags, getAllFeatureFlags } from 'client/javascripts/api/feature-flags';

jest.mock('../../../../../src/client/javascripts/api/http');

describe('api/feature-flags', () => {
  beforeEach(() => {
    http.get.mockClear();
  });

  test('should return current env feature flags', () => {
    http.get.mockResolvedValue({
      status: 200,
      data: {
        sessionTimeout: false,
      },
    });

    return getFeatureFlags().then((data) => {
      expect(http.get).toHaveBeenCalledWith('/feature_flags');
      expect(data.sessionTimeout).toEqual(false);
    });
  });

  test('should return current env all feature flags', () => {
    http.get.mockResolvedValue({
      status: 200,
      data: {
        sessionTimeout: false,
      },
    });

    return getAllFeatureFlags().then((data) => {
      expect(http.get).toHaveBeenCalledWith('/feature_flags', { params: { all: true } });
      expect(data.sessionTimeout).toEqual(false);
    });
  });
});
