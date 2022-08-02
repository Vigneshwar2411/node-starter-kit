import { delay } from 'redux-saga';
import { logAll, logError } from 'client/javascripts/api/logs';
import { call, put } from 'redux-saga/effects';
import { startLogFlusher, flushLogQueue, sendLogToServer } from 'client/javascripts/sagas/logs-saga';
import {
  removeAllLogsFromQueue,
  flushLogQueue as flushLogQueueAction,
} from 'client/javascripts/actions';
import L from 'client/javascripts/utils/localization';
import config from 'client/javascripts/config';

describe('Logs Saga', () => {
  let sagaFlush;
  const logsQueue = [1, 2, 3];

  beforeEach(() => {
    sagaFlush = flushLogQueue();
  });

  describe('flushLogQueue', () => {
    test('should remove all logs from the queue and send them to the server', () => {
      sagaFlush.next();

      expect(sagaFlush.next(logsQueue).value).toEqual(put(removeAllLogsFromQueue()));
      expect(sagaFlush.next().value).toEqual(call(logAll, logsQueue));
    });

    test('should not call the server if there are no logs to flush', () => {
      sagaFlush.next();
      sagaFlush.next([]);

      expect(sagaFlush.next().value).not.toEqual(put(removeAllLogsFromQueue()));
      expect(sagaFlush.next().value).not.toEqual(call(logAll, logsQueue));
    });

    test('should call logError when logAll api call fails', () => {
      const error = {
        message: 'API call failed.',
      };

      sagaFlush.next();
      sagaFlush.next(logsQueue);

      expect(sagaFlush.next().value).toEqual(call(logAll, logsQueue));
      expect(sagaFlush.throw(error).value).toEqual(call(logError, L.t('Errors.logger.failedToReachLogServer', { error: error.message })));
    });
  });

  describe('sendLogToServer', () => {
    test('should send logs to server without wait time', () => {
      const action = { message: 'xyz' };
      const sagaSendToServer = sendLogToServer(action);

      expect(sagaSendToServer.next().value).toEqual(call(logError, action.mesaage));
    });
  });
});

describe('startLogFlusher', () => {
  test('should continuously flush the log queue', () => {
    const delayLength = config.logFlushWaitTime;
    const generator = startLogFlusher();

    expect(generator.next().value).toEqual(call(delay, delayLength));
    expect(generator.next().value).toEqual(put(flushLogQueueAction()));
    expect(generator.next().value).toEqual(call(delay, delayLength));
    expect(generator.next().value).toEqual(put(flushLogQueueAction()));
    expect(generator.next().value).toEqual(call(delay, delayLength));
    expect(generator.next().value).toEqual(put(flushLogQueueAction()));
  });
});
