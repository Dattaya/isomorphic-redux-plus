import React, { PropTypes } from 'react';
// Force it to at least have the global styles
import 'styled/global';
import styleSheet from 'styled-components/lib/models/StyleSheet'

export default function Html({ children, state }) {
  const view = { __html: children };
  const appState = { __html: `window.__PRELOADED_STATE__=${JSON.stringify(state)};` };
  const appStyle = {
    __html: styleSheet.rules().map(rule => rule.cssText).join('\n')
  }
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Redux Demo</title>
        <script dangerouslySetInnerHTML={appState} />
        <style dangerouslySetInnerHTML={appStyle} />
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={view} />
        <script src="/dist/bundle.js" />
      </body>
    </html>
  );
}

Html.propTypes = {
  children: PropTypes.string.isRequired,
  state: PropTypes.any.isRequired,
};
