import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import UserInfo from './UserInfo';
import * as authActions from './actions';

@connect((state) => ({ auth: state.auth }), authActions)
// eslint-disable-next-line react/prefer-stateless-function
export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      user: PropTypes.string,
      loggingIn: PropTypes.bool,
      error: PropTypes.bool,
    }),
  };

  render() {
    const { auth, login, logout } = this.props;
    const { user, error, loggingIn } = auth;

    if (user) {
      return (
        <UserInfo logout={logout} user={user} />
      );
    }
    return (
      <LoginForm loggingIn={!!loggingIn} error={!!error} login={login} />
    );
  }
}
