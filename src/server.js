import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import axios from 'axios';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import path from 'path';
import favicon from 'serve-favicon';

import configureStore from 'configureStore';
import { getPageStatus } from 'status/selectors';
import injectStoreAndGetRoutes from 'routes';
import apiRouter from '../api';
import config from './config';
import Html from './html';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';


const app = express();

app.use(favicon(path.join(__dirname, '../static/favicon.ico')));

app.use(express.static(path.join(__dirname, '../static'), { maxAge: '7 days' }));

app.use(session({
  secret: config.session.secret,
  name: config.session.name,
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(config.apiBaseUrl, apiRouter);

function getStatus(state, routes) {
  return getPageStatus(state) || routes.reduce((prev, curr) => curr.status || prev, 200);
}

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
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

  const store = configureStore({ client });
  const routes = injectStoreAndGetRoutes(store);

  // eslint-disable-next-line consistent-return
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return res.status(500).end('Internal server error');
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return res.status(404).end('Not found');
    }

    loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
      const view = renderToString(
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
      );
      const state = store.getState();

      const html = renderToStaticMarkup(
        <Html
          state={state}
          assets={webpackIsomorphicTools.assets()}
        >{view}</Html>
      );

      res.status(getStatus(state, renderProps.routes)).end(html);
    }).catch((error) => {
      console.error(error.stack); // eslint-disable-line no-console
      res.sendStatus(500);
    });
  });
});

export default app;
