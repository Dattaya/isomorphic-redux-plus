import React, {PropTypes}    from 'react';
import {connect}             from 'react-redux';

import {ErrorPage}         from 'components';
import {selectPageStatus}  from 'redux/reducers/PageStatusReducer1';

@connect((state, props) => ({
    status: selectPageStatus(state),
  }),
)
export default class ErrorHandler extends React.Component {
  render() {
    const status = this.props.status;

    if (status === null || status === undefined) {
      return this.props.children;
    }

    switch (status) {
      case 0:
        return <ErrorPage status={0} title="Couldn't load the page" message="Couldn't load the page.
               Maybe you have a problem with Internet connection. Please try again later." />;
      case 503:
        return <ErrorPage status={503} title="Server problem"
                          message="Server problem. Please visit the site later." />;
      default:
        return <ErrorPage />;
    }
  }
}
