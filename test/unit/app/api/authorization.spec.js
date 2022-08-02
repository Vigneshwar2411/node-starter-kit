import client from 'app/api/helpers/client';
import { getUserDetails } from 'app/api/authorization';

jest.mock('../../../../src/app/api/helpers/client.js');

describe('Azure Authorization', () => {
  describe('Success Cases', () => {
    beforeEach(() => {
      client.get.mockResolvedValue({
        data: {},
      });
    });

    test('should get true if user belongs to specified group', async () => {
      const user = await getUserDetails({ user: { accessToken: '12345' } });
      expect(user).toStrictEqual({ data: {} });
    });
  });

  describe('Failure Cases', () => {
    beforeEach(() => {
      client.get.mockRejectedValue(500);
    });

    test('should catch error when API fails', async () => {
      try {
        await getUserDetails({ user: { accessToken: '12345' } });
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
  });
});
