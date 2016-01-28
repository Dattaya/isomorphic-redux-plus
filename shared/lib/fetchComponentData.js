/**
 *
 * @param store
 * @param components
 * @param params
 * @param queries
 * @param deferred Does not mean that all of the data will be deferred, only fetchDataDeferred. Do we need a better name like `holdUntilAllDataIsLoaded`?
 * @returns {Promise}
 */
export default function fetchComponentData(store, components, params, queries, deferred) {
  const deferredData = () => Promise.all(getDataDeps(components, true).map(fetchDataDeferred =>
    fetchDataDeferred(store.state, store.dispatch, params, queries)
      // for deferred data we don't want to exit Promise.all if something goes wrong in a component.
      .catch(()=> {})
  ));

  return Promise.all(getDataDeps(components).map((fetchData) => fetchData(store.state, store.dispatch, params, queries)))
    .then(() => {
      if (!deferred) {
        // wait until everything is loaded
        return deferredData();
      }
      deferredData();
    });
}

function getDataDeps(components, deferred = false) {
  const methodName = deferred ? 'fetchDataDeferred' : 'fetchData';

  return components
    .filter((component) => component && component[methodName])
    .map((component) => component[methodName]);
}
