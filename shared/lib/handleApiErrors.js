import React, { Component } from 'react';

import {
  NotFound,
  InternalServerError
}                     from 'components';

/**
 * Only components that are connected to `Route`s can be decorated with `handleApiErrors`.
 *
 * @returns {handleApiErrors}
 */
export default function handleApiErrors() {
  return function wrap(WrappedComponent) {
    class HandleApiErrors extends Component {
      static contextTypes = {
        status: React.PropTypes.number
      };

      render() {
        switch (this.context.status) {
          case 404:
            return <NotFound />;

          case 500:
            return <InternalServerError />;

          default:
            return <WrappedComponent {...this.props} />;
        }
      }
    }

    return HandleApiErrors;
  };
}
