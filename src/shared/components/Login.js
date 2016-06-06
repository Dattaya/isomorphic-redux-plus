import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

import * as authActions from 'redux/auth/actions';

@connect(state => ({ auth: state.auth }), authActions)
export default class Login extends React.Component {
  static propTypes = {
    login:  PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth:   PropTypes.shape({
      user:      PropTypes.string,
      loggingIn: PropTypes.bool,
      error:     PropTypes.bool,
    }),
  };

  componentDidUpdate() {
    if (this.props.auth.error) {
      this.refs.login.focus();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const login = this.refs.login;
    const pass = this.refs.pass;
    this.props.login(login.value, pass.value);

    login.value = pass.value = '';
  };

  render() {
    const { auth, logout } = this.props;
    const { user, error, loggingIn } = auth;

    const errorStyle = {
      color:      'red',
      marginLeft: '5px',
    };
    return (
      <div>
        {!user &&
          <form>
            <fieldset disabled={loggingIn}>
              <input type="text" placeholder="User name" ref="login" />
              <input type="password" placeholder="Password" ref="pass" />
              <input type="submit" value="Send" onClick={this.handleSubmit} />
              {error &&
                <span style={errorStyle}>Wrong user name or password.</span>
              }
            </fieldset>
          </form>
        }
        {user &&
          <div>Hello, {user}!
            <button onClick={() => logout()}>Logout</button>
          </div>
        }
      </div>
    );
  }
}
