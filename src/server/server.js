import express                     from 'express';
import bodyParser                  from 'body-parser';
import session                     from 'express-session';
import axios                       from 'axios';
import React                       from 'react';
import { renderToString }         from 'react-dom/server';
import { RouterContext, match }    from 'react-router';
import { Provider }                from 'react-redux';
import path                        from 'path';
import favicon                     from 'serve-favicon';

import fetchComponentData          from 'lib/fetchComponentData';
import configureStore              from 'redux/configureStore';
import { selectPageStatus }        from 'redux/reducers/StatusReducer';
import injectStoreAndGetRoutes     from 'routes';
import apiRouter                   from './api';
import config                      from './config';

Object.assign = require('object-assign');

const app = express();

if (__DEVELOPMENT__) { // eslint-disable-line no-undef
  require('../../webpack/webpack.dev').default(app); // eslint-disable-line global-require
}

app.use(favicon(path.join(__dirname, '..', '..', 'static', 'favicon.ico')));

app.use(express.static(path.join(__dirname, '..', '..', 'static'), { maxAge: '7 days' }));

app.use(session({
  secret:            config.session.secret,
  name:              config.session.name,
  resave:            false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(config.apiBaseUrl, apiRouter);

function getStatus(state, routes) {
  return selectPageStatus(state) || routes.reduce((prev, curr) => curr.status || prev, 200);
}

app.use((req, res) => {
  res.contentType('text/html');

  const client = axios.create();
  client.interceptors.request.use((axiosConfig) => {
    if (axiosConfig.url[0] === '/') {
      // eslint-disable-next-line no-param-reassign
      axiosConfig.url = `http://${config.host}:${config.port}${config.apiBaseUrl}${axiosConfig.url}`;
      // eslint-disable-next-line no-param-reassign
      axiosConfig.headers = req.headers;
    }

    return axiosConfig;
  });

  const store = configureStore(client);
  const routes = injectStoreAndGetRoutes(store);

  // eslint-disable-next-line consistent-return
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <link rel="shortcut icon" href="/favicon.ico">

          <title>Redux Demo</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/dist/bundle.js"></script>
        </body>
      </html>
      `;

      res.status(getStatus(initialState, renderProps.routes)).end(html);
    }

    fetchComponentData(store, renderProps.components, renderProps.params)
      .then(renderView)
      .catch(error => {
        console.error(error.stack);
        res.sendStatus(500);
      });
  });
});

export default app;
