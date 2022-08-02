import * as actions from 'client/javascripts/actions/logger';

describe('actions/logger', () => {
  test('removeAllLogsFromQueue action', () => {
    expect(actions.removeAllLogsFromQueue([])).toStrictEqual({
      type: 'remove_all_logs_from_queue',
    });
  });

  test('flushLogQueue action', () => {
    expect(actions.flushLogQueue()).toStrictEqual({
      type: 'flush_log_queue',
    });
  });

  test('startLogFlusher action', () => {
    expect(actions.startLogFlusher([])).toStrictEqual({
      type: 'start_log_flusher',
    });
  });

  test('logger error action', () => {
    expect(actions.logger.error({})).toStrictEqual({
      type: 'send_log_to_server',
      options: {},
      logLevel: 'error',
    });
  });

  test('logger info action', () => {
    expect(actions.logger.info({})).toStrictEqual({
      type: 'add_log_to_queue',
      options: {},
      logLevel: 'info',
    });
  });
});
