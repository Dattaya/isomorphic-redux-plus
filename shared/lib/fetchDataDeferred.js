import React, { Component, PropTypes } from 'react';
import hoistStatics from 'hoist-non-react-statics';

const { shape, func } = PropTypes;
/**
 * Should always be a top level (outermost) decorator because
 * on the server all static `needs` properties are collected
 * to pass them to fetchComponentData.
 *
 * @param needs
 * @returns {Function}
 */
export default (needs) => {
  return WrappedComponent => {
    class FetchDataDecorator extends Component {
      static WrappedComponent = WrappedComponent;
      static needs = needs;

      static propTypes = {
        params: PropTypes.object.isRequired
      };

      static contextTypes = {
        store: shape({
          dispatch: func.isRequired
        })
      };

      componentDidMount() {
        const { dispatch } = this.context.store;

        const promises = needs.map(need => dispatch(need(this.props.params)));

        Promise.all(promises);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistStatics(FetchDataDecorator, WrappedComponent)
  };
}
