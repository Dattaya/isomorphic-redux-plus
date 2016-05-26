import React, { Component, PropTypes } from 'react';
import hoistStatics                    from 'hoist-non-react-statics';

const { shape, func, object } = PropTypes;
let initialRender = true;

export function rendered() {
  initialRender = false;
}

/**
 * Should always be a top level (outermost) decorator because
 * on the server all static `needs` properties are collected
 * to pass them to fetchComponentData.
 *
 * @param fetch
 * @returns {Function}
 * @author Tim Dorr, see https://gist.github.com/timdorr/3ffe30e3c4e116019bc3
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

      componentDidMount() {
        if (initialRender) {
          return;
        }
        const { getState, dispatch } = this.context.store;

        fetch(getState(), dispatch, this.props.params);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(FetchDataDecorator, WrappedComponent)
  };
}
