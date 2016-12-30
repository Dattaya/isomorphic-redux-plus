const fs = require('fs');

function getBabelLoaderQuery() {
  const babelrc = fs.readFileSync('./.babelrc');
  let babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    /* eslint-disable no-console */
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
    /* eslint-enable */
  }


  const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

  // merge global and dev-only plugins
  let combinedPlugins = babelrcObject.plugins || [];
  combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

  const babelLoaderQuery = Object.assign(
    {},
    babelrcObjectDevelopment,
    babelrcObject,
    { plugins: combinedPlugins }
  );

  delete babelLoaderQuery.env;

  // Since we use .babelrc for client and server,
  // and we don't want HMR enabled on the server, we have to add
  // the babel plugin react-transform-hmr manually here.

  // make sure react-transform is enabled
  babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
  let reactTransform = babelLoaderQuery.plugins
    .find((p) => Array.isArray(p) && p[0] === 'react-transform');

  if (!reactTransform) {
    reactTransform = ['react-transform', { transforms: [] }];
    babelLoaderQuery.plugins.push(reactTransform);
  }

  if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] });
  }

  // make sure react-transform-hmr is enabled
  reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module'],
  });

  return JSON.stringify(babelLoaderQuery);
}

module.exports = getBabelLoaderQuery();
