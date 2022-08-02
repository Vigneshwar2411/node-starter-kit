/* eslint-disable camelcase */
import nock from 'nock';
import * as httpClient from 'app/api/helpers/client';
import config from 'app/config';

const url = 'http://localhost:1234';

describe('HTTP Client', () => {
  describe('GET', () => {
    describe('success cases', () => {
      beforeEach(() => {
        nock(url)
          .get('/success')
          .reply(200, { test_config: 'test_client' });
      });

      test('should return camelized keys as response if the response in JSON', () => (
        httpClient.get(`${url}/success`)
          .then((response) => {
            expect(response).toEqual({ testConfig: 'test_client' });
          })
      ));

      test('should return the response with the specified responseType', () => {
        const options = {
          responseType: 'application/json;',
        };
        return httpClient.get(`${url}/success`, options)
          .then((response) => {
            expect(response).toEqual({ testConfig: 'test_client' });
          });
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        nock(url)
          .get('/failure')
          .reply(404);
      });

      test('should return error if url is empty', () => {
        expect(() => httpClient.get('')).toThrowError('ValidationError');
      });

      test('should return error if options is not valid', () => {
        const options = {
          headers: '',
        };
        return httpClient.get(`${url}/failure`, options)
          .catch((err) => {
            expect(err).toBeDefined();
          });
      });

      test('should return error if external server responds with an error', () => {
        const options = {};
        return httpClient.get(`${url}/failure`, options)
          .catch((err) => {
            expect(err).toBeDefined();
          });
      });
    });
  });

  describe('POST', () => {
    describe('success cases', () => {
      beforeEach(() => {
        const decamelizedBody = {
          loan_guid: 'abcd',
          document_name: 'hello_doc.pdf',
        };

        nock(url)
          .post('/success', decamelizedBody)
          .reply(200, { test_config: 'test_client_decamelized_keys' });
      });

      test('should decamelize keys in body before sending the request and camelize keys as response if response is in JSON', () => {
        const body = {
          loanGuid: 'abcd',
          documentName: 'hello_doc.pdf',
        };

        return httpClient.post(`${url}/success`, body, {})
          .then((response) => {
            expect(response).toEqual({ testConfig: 'test_client_decamelized_keys' });
          });
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        nock(url)
          .post('/failure', {})
          .reply(404);
      });

      test('should return error if url is empty', () => {
        expect(() => httpClient.post('')).toThrowError('ValidationError');
      });

      test('should return error if external server responds with an error', () => httpClient.post(`${url}/failure`)
        .catch((err) => {
          expect(err).toBeDefined();
        }));
    });
  });

  describe('PATCH', () => {
    describe('success cases', () => {
      beforeEach(() => {
        const decamelizedBody = {
          loan_guid: 'abcd',
          document_name: 'hello_doc.pdf',
        };

        nock(url)
          .patch('/patch-success', decamelizedBody)
          .reply(200, { test_config: 'test_config_value' });
      });

      test('should decamelize keys in body before sending the request and camelize keys as response if response is in JSON', () => {
        const body = {
          loanGuid: 'abcd',
          documentName: 'hello_doc.pdf',
        };

        return httpClient.patch(`${url}/patch-success`, body, {})
          .then((response) => {
            expect(response).toEqual({ testConfig: 'test_config_value' });
          });
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        nock(url)
          .patch('/patch-failure', {})
          .reply(404);
      });

      test('should return error if url is empty', () => {
        expect(() => httpClient.patch('')).toThrowError('ValidationError');
      });

      test('should return error if external server responds with an error', () => httpClient.patch(`${url}/patch-failure`)
        .catch((err) => {
          expect(err).toBeDefined();
        }));
    });
  });

  describe('PUT', () => {
    describe('success cases', () => {
      beforeEach(() => {
        const decamelizedBody = {
          loan_guid: 'abcd',
          document_name: 'hello_doc.pdf',
        };

        nock(url)
          .put('/put-success', decamelizedBody)
          .reply(200, { test_config: 'test_config_value' });
      });

      test('should decamelize keys in body before sending the request and camelize keys as response if response is in JSON', () => {
        const body = {
          loanGuid: 'abcd',
          documentName: 'hello_doc.pdf',
        };

        return httpClient.put(`${url}/put-success`, body, {})
          .then((response) => {
            expect(response).toEqual({ testConfig: 'test_config_value' });
          });
      });
    });

    describe('Failure cases', () => {
      beforeEach(() => {
        nock(url)
          .put('/put-failure', {})
          .reply(404);
      });

      test('should return error if url is empty', () => {
        expect(() => httpClient.put('')).toThrowError('ValidationError');
      });

      test('should return error if external server responds with an error', () => httpClient.put(`${url}/put-failure`)
        .catch((err) => {
          expect(err).toBeDefined();
        }));
    });
  });

  describe('getHeaders', () => {
    it('adds Content-Type to the header', () => {
      const headers = httpClient.getHeaders();
      expect(headers['content-type']).toEqual('application/json');
    });

    it('adds Cookie to the header when present', () => {
      const headers = httpClient.getHeaders({
        Cookie: '1234567890',
      });

      expect(headers.Cookie).toEqual('1234567890');
    });

    it('appends the provided headers', () => {
      const headers = httpClient.getHeaders({
        SampleHeader: 'HowAreYou?',
      });

      expect(headers.SampleHeader).toEqual('HowAreYou?');
    });
  });

  describe('Interceptors', () => {
    config.fakeEndPoint.url = `${url}/fake-service-failure`;
    config.fakeEndPoint.method = 'get';
    beforeEach(() => {
      nock(url)
        .get('/fake-service-success')
        .reply(200, { test_config: 'test_client' });
    });

    test('should return error if the fakeEndPoint matches the request URL and method', () => (
      httpClient.get(`${url}/fake-service-failure`, {})
        .catch((err) => {
          expect(err).toBeDefined();
        })
    ));

    test('should return response if the fakeEndPoint does not matches the request URL and method', () => (
      httpClient.get(`${url}/fake-service-success`)
        .then((response) => {
          expect(response).toEqual({ testConfig: 'test_client' });
        })
    ));
  });

  describe('Error handling', () => {
    beforeEach(() => {
      nock(url)
        .post('/failure', {})
        .reply(404);
    });

    test('should redact config from error', () => {
      const body = {
        loanGuid: 'abcd',
        documentName: 'hello_doc.pdf',
      };
      return httpClient.post(`${url}/success`, {}, body)
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err.config).not.toBeDefined();
        });
    });

    test('should include the method and url in the error message', () => {
      const body = {
        loanGuid: 'abcd',
        documentName: 'hello_doc.pdf',
      };

      return httpClient.post(`${url}/success`, {}, body)
        .catch((err) => {
          expect(err.message).toContain(`POST ${url}/success`);
        });
    });
  });

  describe('Response Error Messages', () => {
    beforeEach(() => {
      nock(url)
        .get('/failure', {})
        .reply(500, { err: 'Error' });
    });

    test('should redact config from error', () => (
      httpClient.get(`${url}/failure`)
        .catch((err) => {
          expect(err).toBeDefined();
          expect(err.config).toBeUndefined();
        })
    ));
  });

  describe('createApiLogMetadata', () => {
    test('should redact information from the request and responses', () => {
      const customUrl = 'some/url';
      const requestData = { key: 3 };
      const responseData = { key: 4 };

      const requestDetails = {
        data: requestData,
        customUrl,
        params: {},
      };

      const responseDetails = {
        data: responseData,
      };

      expect(httpClient.createApiLogMetadata(requestDetails, responseDetails).requestBody).toEqual('{ key: 3 }');
      expect(httpClient.createApiLogMetadata(requestDetails, responseDetails).responseBody).toEqual('{ key: 4 }');
    });
  });

  describe('createApiLogMessage', () => {
    test('should return request method and url from the request details if method is present', () => {
      const requestDetails = {
        method: 'get',
        url: 'sample/data',
      };
      const responseDetails = `${requestDetails.method.toUpperCase()} ${requestDetails.url}`;
      expect(httpClient.createApiLogMessage(requestDetails)).toEqual(responseDetails);
    });

    test('should return url from the request details if method is not present', () => {
      const requestDetails = {
        url: 'sample/data',
      };
      const responseDetails = ` ${requestDetails.url}`;
      expect(httpClient.createApiLogMessage(requestDetails)).toEqual(responseDetails);
    });
  });
});
