export default function injected(type, payload, meta = {}) {
  return { type, payload, meta: { ...meta, inject: true } };
}
