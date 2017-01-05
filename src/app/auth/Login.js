import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector as select } from 'reselect';
import { compose } from 'redux';

import LoginForm from './LoginForm';
import UserInfo from './UserInfo';
import * as authActions from './actions';
import {
  selectUser,
  selectLoggingIn,
  selectError,
} from './selectors';

const wrapped = compose(
  connect(select({
    user: selectUser,
    loggingIn: selectLoggingIn,
    error: selectError,
  }), authActions),
);

// eslint-disable-next-line react/prefer-stateless-function
export class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.string,
    loggingIn: PropTypes.bool,
    error: PropTypes.bool,
  };

  render() {
    const {
      user,
      loggingIn,
      error,
      login,
      logout,
    } = this.props;

    return (user
      ? <UserInfo logout={logout} user={user} />
      : <LoginForm loggingIn={!!loggingIn} error={!!error} login={login} />
    );
  }
}

export default wrapped(Login);
