import React from 'react';

export default function Html({ children, state }) {
  const view = { __html: children };
  const appState = { __html: `window.__PRELOADED_STATE__=${JSON.stringify(state)};` }
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Redux Demo</title>
        <script dangerouslySetInnerHTML={appState} />
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={view} />
        <script src="/dist/bundle.js" />
      </body>
    </html>
  );
}
