/* eslint-disable no-template-curly-in-string */
/* eslint-disable global-require */
import * as Content from '../../../../../src/client/javascripts/static_content';


describe('localization', () => {
  describe('t', () => {
    let Locale;

    const setStaticContent = (content) => {
      // eslint-disable-next-line
            Content.Test = jest.fn().mockReturnValue(content)();
      Locale = require('../../../../../src/client/javascripts/utils/localization').default;
    };

    test('should get some static content', () => {
      setStaticContent({
        field: 'some text',
      });
      expect(Locale.t('Test.field')).toEqual('some text');
    });

    test('should return null when static content cannot be found', () => {
      setStaticContent({
      });

      expect(Locale.t('Test.field')).toBeNull();
    });

    test('should interpolate values into template variables', () => {
      setStaticContent({
        field: 'string ${v1} with template values ${v2}',
      });

      expect(Locale.t('Test.field', {
        v1: 2,
        v2: 'hello',
      })).toEqual('string 2 with template values hello');
    });
  });
});
