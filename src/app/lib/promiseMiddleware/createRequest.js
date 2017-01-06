import injected from './injected';

export default function createRequest(type, config, meta) {
  return injected(
    type,
    ({ client }) => client(config),
    meta,
  );
}
