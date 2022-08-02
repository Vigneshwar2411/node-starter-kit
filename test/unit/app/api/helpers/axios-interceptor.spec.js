import axios from 'axios';
import nock from 'nock';
import { addResponseTime } from 'app/api/helpers/axios-interceptor';
import DateUtils from 'app/utils/date-utils';

jest.mock('../../../../../src/app/utils/date-utils.js');

describe('Axios Interceptors', () => {
  describe('addResponseTime', () => {
    const BASE_URL = 'http://localhost:9999';
    const ENDPOINT = '/';
    let http;

    beforeEach(() => {
      nock(BASE_URL)
        .get(ENDPOINT)
        .reply(200, { data: 'hello igor!' });

      http = axios.create({ baseURL: BASE_URL });
      addResponseTime(http);
      DateUtils.now.mockClear();
      DateUtils.getTimeElapsed.mockClear();
    });

    test('add start time to the request', () => {
      const date = new Date();
      DateUtils.now.mockReturnValue(date);

      return http.get(ENDPOINT).then((res) => {
        expect(res.config.startTime).toStrictEqual(date.getTime());
      });
    });

    test('add time taken to the response metadata', () => {
      const startDate = new Date('2018-02-02T12:00:00.000Z');
      const endDate = new Date('2018-02-02T12:00:02.010Z');
      DateUtils.now
        .mockReturnValueOnce(startDate)
        .mockReturnValueOnce(endDate);

      DateUtils.getTimeElapsed.mockReturnValue(2010);

      return http.get(ENDPOINT).then((res) => {
        expect(res.timeTaken).toEqual(2010);
        expect(DateUtils.getTimeElapsed).toHaveBeenCalledWith(startDate, endDate);
      });
    });
  });
});
