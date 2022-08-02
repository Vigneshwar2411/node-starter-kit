/* eslint-disable global-require */
const winston = require('winston');

describe('Logger', () => {
  const SESSION_ID = 'sessionid';
  const APPLICATION_ID = 'applicationId';
  const SUBJECT = 'subject';

  let context;
  let logger;
  let winstonMock;

  beforeAll(() => {
    context = {
      sessionId: SESSION_ID,
      applicationId: APPLICATION_ID,
      subject: SUBJECT,
    };

    winstonMock = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    winston.Logger = jest.fn();
    winston.Logger.mockImplementation(() => winstonMock);
    logger = () => require('../../../../src/app/utils/logger');
  });

  describe('logger.info', () => {
    test('should log a basic message', () => {
      logger().info('The message');
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {});
    });

    test('should log a basic message as info with the required metadata', () => {
      logger().info('The message', {}, context);
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
      });
    });

    test('should log a basic message as info with the required metadata when a context field is set after the creation of the logger', () => {
      const ALT_APPLICATION_ID = 'some other id';
      const loggerInstance = logger();
      context.applicationId = ALT_APPLICATION_ID;

      loggerInstance.info('The message', {}, context);
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: ALT_APPLICATION_ID,
        subject: SUBJECT,
      });
      context.applicationId = APPLICATION_ID;
    });

    test('should log additional meta data', () => {
      const EXTRA_FIELD = 'new field!';
      const additionalMetaData = {
        extraField: EXTRA_FIELD,
      };
      logger().info('The message', additionalMetaData, context);
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
        extraField: EXTRA_FIELD,
      });
    });
  });

  describe('logger.warn', () => {
    test('should log a basic message as warn with the required metadata', () => {
      logger().warn('The message', {}, context);
      expect(winstonMock.warn).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
      });
    });
  });

  describe('logger.error', () => {
    test('should log a basic message as error with the required metadata', () => {
      logger().error('The message', {}, context);
      expect(winstonMock.error).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
      });
    });

    test('should add stackTrace to metaData if it exists', () => {
      const STACK_TRACE = 'stack trace';
      const metaData = {
        error: {
          stack: STACK_TRACE,
        },
      };
      logger().error('The message', metaData, context);
      expect(winstonMock.error).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
        error: {
          stack: STACK_TRACE,
        },
        stackTrace: STACK_TRACE,
      });
    });

    test('should not break if error.stack does not exist', () => {
      const metaData = {
        error: {
        },
      };
      logger().error('The message', metaData, context);
      expect(winstonMock.error).toHaveBeenCalledWith('The message', {
        sessionId: SESSION_ID,
        applicationId: APPLICATION_ID,
        subject: SUBJECT,
        error: {},
      });
    });
  });

  describe('logger.log', () => {
    test('should log depending upon the log level', () => {
      logger().log('info', 'The message');
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {});

      logger().log('warn', 'The message');
      expect(winstonMock.warn).toHaveBeenCalledWith('The message', {});

      logger().log('error', 'The message', {});
      expect(winstonMock.error).toHaveBeenCalledWith('The message', {});
    });

    test('should default log info', () => {
      logger().log('XXX', 'The message');
      expect(winstonMock.info).toHaveBeenCalledWith('The message', {});
    });
  });
});
