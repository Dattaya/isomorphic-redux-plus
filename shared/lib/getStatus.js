export default function getStatus(routes, resultsFromPromiseAll) {
  return depthFirstTraversal(routes) || depthFirstTraversal(resultsFromPromiseAll) || 200;
}

function depthFirstTraversal(arr) {
  for (var val of arr) {
    if (Array.isArray(val)) {
      const result = depthFirstTraversal(val);
      if (result) {
        return result;
      }
    } else if (val !== null && typeof val === 'object' && val.status) {
      return val.status;
    }
  }
  return null;
}
