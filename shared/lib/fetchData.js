import React, { Component, PropTypes } from 'react';
import hoistStatics                    from 'hoist-non-react-statics';

const { shape, func, object } = PropTypes;

/**
 * Should always be a top level (outermost) decorator because
 * on the server and on the client all `fetchData` properties are collected
 * to pass them to fetchComponentData.
 *
 * @param fetch
 * @returns {Function}
 */
export default (fetch) => {
  return WrappedComponent => {
    class FetchDataDecorator extends Component {
      static WrappedComponent = WrappedComponent;
      static fetchData = fetch;

      static propTypes = {
        params: object
      };

      static contextTypes = {
        store: shape({
          dispatch: func.isRequired,
          getState: func.isRequired
        })
      };

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(FetchDataDecorator, WrappedComponent)
  };
}
