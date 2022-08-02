import {
  ADD_LOG_TO_QUEUE,
  REMOVE_ALL_LOGS_FROM_QUEUE,
  FLUSH_LOG_QUEUE,
  START_LOG_FLUSHER,
  SEND_LOG_TO_SERVER,
} from './types';

export const removeAllLogsFromQueue = () => ({ type: REMOVE_ALL_LOGS_FROM_QUEUE });

export const flushLogQueue = () => ({ type: FLUSH_LOG_QUEUE });

export const startLogFlusher = () => ({ type: START_LOG_FLUSHER });

export const logger = {
  error: options => ({
    type: SEND_LOG_TO_SERVER,
    options,
    logLevel: 'error',
  }),
  info: options => ({
    type: ADD_LOG_TO_QUEUE,
    options,
    logLevel: 'info',
  }),
};
