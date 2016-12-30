import MockAdapter from 'axios-mock-adapter';
import createApi from 'helpers/apiClient';
import config from 'config';

/* eslint-disable no-underscore-dangle*/
function toggleClientEnv(to) {
  if (window) {
    window.__CLIENT__ = to;
  } else if (global) {
    global.__CLIENT__ = to;
  }
}

function attachMock(axiosInstance) {
  const mock = new MockAdapter(axiosInstance);
  mock.onGet(/.*/).reply((conf) => ([200, conf]));
  return mock;
}

describe('Api Configuration', () => {
  let client;
  let mock;

  function passThroughTest() {
    describe('when a url not begining with "/" is called', () => {
      it('should pass the unaltered url through', () => {
        const endpoint = Math.random().toString(36).substr(7);
        return client.get(endpoint).then((res) => {
          expect(res.data.url).to.equal(endpoint);
        });
      });
    });
  }

  describe('on the client', () => {
    beforeEach(() => {
      toggleClientEnv(true);
      client = createApi();
      mock = attachMock(client);
    });

    afterEach(() => {
      mock.restore();
    });

    describe('when a url begining with "/" is called', () => {
      it('should route to the api\'s base url', () => {
        const endpoint = '/endpoint';
        return client.get(endpoint).then((res) => {
          expect(res.data.url).to.equal(config.apiBaseUrl + endpoint);
        });
      });
    });

    passThroughTest();
  });

  describe('on the server', () => {
    beforeEach(() => {
      toggleClientEnv(false);
      client = createApi({ headers: { header: 'HEADER' } });
      mock = attachMock(client);
    });

    afterEach(() => {
      mock.restore();
    });

    describe('when a url begining with "/" is called', () => {
      const endpoint = '/endpoint';
      let headers;
      let url;

      beforeEach(() => client.get(endpoint).then((res) => {
        headers = res.data.headers;
        url = res.data.url;
      }));

      it('should route to the api\'s base url', () =>
        expect(url).to.equal(
          `http://${config.host}:${config.port}${config.apiBaseUrl}${endpoint}`
        )
      );

      it('should attach the configured headers to the request', () =>
        expect(headers).to.have.property('header', 'HEADER')
      );
    });

    passThroughTest();
  });
});
