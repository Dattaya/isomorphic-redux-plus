import React, { Component, PropTypes } from 'react';
import hoistStatics                    from 'hoist-non-react-statics';

/**
 * Should always be a top level (outermost) decorator because
 * all `fetchData`/`fetchDataDeferred` properties are collected in `lib/fetchComponentData`.
 *
 * @param fetchData
 * @param fetchDataDeferred
 * @returns {Function}
 */
export default (fetchData, fetchDataDeferred) => {
  return WrappedComponent => {
    class FetchDataDecorator extends Component {
      static WrappedComponent = WrappedComponent;
      static fetchData = fetchData;
      static fetchDataDeferred = fetchDataDeferred;

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(FetchDataDecorator, WrappedComponent)
  };
}
