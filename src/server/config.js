import commonConfig from 'config';

export default {
  ...commonConfig, ...{
    session: {
      name:   'ssid',
      secret: 'duck quack',
    },
    host: 'localhost',
    port: 3000,
  },
};
