import MockAdapter from 'axios-mock-adapter';
import createApi from 'helpers/apiClient';

import { transformResponse, transformRequest } from 'helpers/apiClient';


describe('Api Configuration', () => {
  const testApiBaseUrl = 'testApiBaseUrl';
  const testHeader = { header: 'HEADER' };
  let client;
  let mock;

  beforeEach(() => {
    client = createApi(testApiBaseUrl, { headers: testHeader });
    mock = new MockAdapter(client);
    mock.onGet(/.*/).reply((conf) => ([200, conf]));
  });

  afterEach(() => {
    mock.restore();
  });

  describe('when a url not begining with "/" is called', () => {
    const endpoint = Math.random().toString(36).substr(7);
    let headers;
    let url;

    beforeEach(() => client.get(endpoint).then((res) => {
      headers = res.data.headers;
      url = res.data.url;
    }));

    it('should pass the unaltered url through', () => {
      expect(url).to.equal(endpoint);
    });

    it('should not modify request headers', () => {
      expect(headers).to.not.have.property('header');
    });
  });

  describe('when a url begining with "/" is called', () => {
    const endpoint = '/endpoint';
    let headers;
    let url;

    beforeEach(() => client.get(endpoint).then((res) => {
      headers = res.data.headers;
      url = res.data.url;
    }));

    it('should prepend the configured base url', () =>
      expect(url).to.equal(testApiBaseUrl + endpoint)
    );

    it('should attach the configured headers to the request', () =>
      expect(headers).to.have.property('header', 'HEADER')
    );
  });
});
