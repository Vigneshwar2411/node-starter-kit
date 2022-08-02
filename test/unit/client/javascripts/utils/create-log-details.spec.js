import { createLogDetails } from 'client/javascripts/utils/create-log-details';

describe('createLogDetails', () => {
  test('When error object is passed it returns the corresponding response', () => {
    const error = {
      message: 'test',
      name: 'testerror',
      stack: 'stack trace',
      errorRemaining: 'nil',
    };

    const expectedLogger = {
      type: 'type',
      where: 'where',
      stack: 'stack trace',
      componentStack: undefined,
      message: 'test',
      errName: 'testerror',
      error: { errorRemaining: 'nil' },
    };

    expect(createLogDetails('where', 'type', error, 'info')).toEqual(expectedLogger);
  });

  test('When error object is not passed it returns the corresponding response', () => {
    const info = {
      message: 'test',
      infoRemaining: 'remaining',
    };

    const expectedLogger = {
      type: 'type',
      where: 'where',
      message: 'test',
      info: { infoRemaining: 'remaining' },
    };

    expect(createLogDetails('where', 'type', undefined, info)).toEqual(expectedLogger);
  });
});
