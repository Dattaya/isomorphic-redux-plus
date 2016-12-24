export default function fetchComponentData({ dispatch, state }, components, params) {
  return Promise.all(components
    .filter((component) => component && component.fetchData)
    .map((component) => component.fetchData(state, dispatch, params)));
}
