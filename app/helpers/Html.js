import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import styleSheet from 'styled-components/lib/models/StyleSheet';

export default function Html({ assets, children, state }) {
  const view = { __html: children };
  const head = Helmet.rewind();
  const appStyle = { __html: styleSheet.rules().map((rule) => rule.cssText).join('\n') };
  const appState = { __html: `window.__PRELOADED_STATE__=${JSON.stringify(state)};` };
  return (
    <html>
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style dangerouslySetInnerHTML={appStyle} />
      </head>
      <body>
        <div id="react-view" dangerouslySetInnerHTML={view} />
        <script dangerouslySetInnerHTML={appState} />
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  );
}

Html.propTypes = {
  children: PropTypes.string.isRequired,
  state: PropTypes.any.isRequired,
  assets: PropTypes.object.isRequired,
};
