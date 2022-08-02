import { delay } from 'redux-saga';
import {
  takeEvery, takeLatest, select, call, put,
} from 'redux-saga/effects';
import { getLogs } from '../utils/redux-selectors';
import { FLUSH_LOG_QUEUE, START_LOG_FLUSHER, SEND_LOG_TO_SERVER } from '../actions/types';
import { removeAllLogsFromQueue, flushLogQueue as flushLogQueueAction } from '../actions';
import { logAll, logError } from '../api/logs';
import L from '../utils/localization';
import config from '../config';

export const startLogFlusher = function* () {
  while (true) {
    yield call(delay, config.logFlushWaitTime);
    yield put(flushLogQueueAction());
  }
};

export const flushLogQueue = function* () {
  const logs = yield select(getLogs);

  if (logs.length > 0) {
    yield put(removeAllLogsFromQueue());
    try {
      yield call(logAll, logs);
    } catch (error) {
      try {
        yield call(logError, L.t('Errors.logger.failedToReachLogServer', { error: error.message }));
      } catch (err) {} // eslint-disable-line no-empty
    }
  }
};

export const sendLogToServer = function* (action) {
  try {
    yield call(logError, action.options);
  } catch (err) {} // eslint-disable-line no-empty
};

/* istanbul ignore next */
export default function* logsSaga() {
  /* istanbul ignore next */
  yield takeEvery(FLUSH_LOG_QUEUE, flushLogQueue);
  /* istanbul ignore next */
  yield takeEvery(SEND_LOG_TO_SERVER, sendLogToServer);
  /* istanbul ignore next */
  yield takeLatest(START_LOG_FLUSHER, startLogFlusher);
}
