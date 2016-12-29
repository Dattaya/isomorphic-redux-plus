const { url_loader_parser } = require('webpack-isomorphic-tools/plugin');
// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: url_loader_parser,
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot',
      ],
      parser: url_loader_parser,
    },
    svg: {
      extension: 'svg',
      parser: url_loader_parser,
    },
  },
};
