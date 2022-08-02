import logsQueueReducer from 'client/javascripts/reducers/logs-queue-reducer';
import { logger, removeAllLogsFromQueue } from 'client/javascripts/actions';

describe('Logs Queue Reducer', () => {
  let state;

  describe('ADD_LOG_TO_QUEUE', () => {
    beforeEach(() => {
      state = [];
    });

    test('should update the state with the log details', () => {
      expect(logsQueueReducer(state, logger.info({ option: 'option' }))).toMatchObject([
        {
          option: 'option',
          logLevel: 'info',
        },
      ]);
    });
  });

  describe('REMOVE_ALL_LOGS_FROM_QUEUE', () => {
    beforeEach(() => {
      state = [{
        logLevel: 'info',
      }];
    });

    test('should update the state with empty array', () => {
      expect(logsQueueReducer(state, removeAllLogsFromQueue())).toStrictEqual([]);
    });
  });

  describe('Without Initial State', () => {
    test('should update the state with empty array', () => {
      expect(logsQueueReducer(undefined, removeAllLogsFromQueue())).toStrictEqual([]);
    });
  });

  describe('Default State', () => {
    test('should update the state with empty array', () => {
      expect(logsQueueReducer(undefined, { type: undefined })).toStrictEqual([]);
    });
  });
});
