import React, { PropTypes }    from 'react';
import { connect }             from 'react-redux';

import { ErrorPage }         from 'components';
import { getPageStatus }     from 'redux/status/selectors';

@connect((state) => ({
  status: getPageStatus(state),
}),
)
export default class ErrorHandler extends React.Component {
  static propTypes = {
    status:   PropTypes.number,
    children: PropTypes.any,
  };

  render() {
    const status = this.props.status;

    if (status === null || status === undefined) {
      return this.props.children;
    }

    switch (status) {
      case 0:
        return (
          <ErrorPage
            status={0}
            title="Couldn't load the page"
            message="Couldn't load the page. Maybe you have a problem with the Internet connection.
                     Please try again later."
          />
        );
      case 503:
        return (
          <ErrorPage
            status={503}
            title="Server problem"
            message="Server problem. Please try again later."
          />
        );
      default:
        return <ErrorPage />;
    }
  }
}
