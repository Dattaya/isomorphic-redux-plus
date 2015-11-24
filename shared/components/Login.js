import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';

import * as AuthActions       from 'actions/AuthActions';

@connect(state => ({user: state.auth.get('user'), error: state.auth.get('error')}), AuthActions)
export default class Login extends React.Component {
  static propTypes = {
    login:  PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user:   PropTypes.string,
    error:  PropTypes.bool
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let login = this.refs.login;
    let pass = this.refs.pass;
    this.props.login(login.value, pass.value);

    login.value = pass.value = '';
  };

  componentDidUpdate() {
    if (this.props.error) {
      this.refs.login.focus();
    }
  }

  render() {
    const {user, logout, error} = this.props;
    const errorStyle = {
      'color':      'red',
      'marginLeft': '5px'
    };
    return (
      <div>
        {!user &&
        <form>
          <input type="text" placeholder="User name" ref="login" />
          <input type="password" placeholder="Password" ref="pass" />
          <input type="submit" value="Send" onClick={this.handleSubmit} />
          {error &&
            <span style={errorStyle}>Wrong user name or password.</span>
          }
        </form>
        }
        {user &&
        <div>Hello, {user}! <button onClick={() => logout()}>Logout</button></div>
        }
      </div>
    );
  }
}
