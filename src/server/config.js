import commonConfig from 'config';

const LOW_PORT = 49152;
const PORT_RANGE = 65536 - LOW_PORT;

const port = (process.env.NODE_ENV === 'test')
  ? Math.floor((Math.random() * PORT_RANGE) + LOW_PORT)
  : 3000;

export default {
  ...commonConfig, ...{
    port,
    session: {
      name: 'ssid',
      secret: 'duck quack',
    },
    host: 'localhost',
  },
};
