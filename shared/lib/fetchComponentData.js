export default function fetchComponentData(store, components, params, queries) {
  const needs = components.reduce((prev, current) => {
    if (current && current.fetchData) {
      prev.push(current.fetchData);
    }
    return prev;
  }, []);
  const promises = needs.map(need => need(store.state, store.dispatch, params, queries));

  return Promise.all(promises);
}
