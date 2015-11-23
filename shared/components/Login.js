import React, { PropTypes }   from 'react';
import { connect }            from 'react-redux';

import * as AuthActions       from 'actions/AuthActions';

@connect(state => ({user: state.auth.get('user'), errorMessage: state.auth.get('errorMessage')}), AuthActions)
export default class Login extends React.Component {
  static propTypes = {
    login:        PropTypes.func.isRequired,
    logout:       PropTypes.func.isRequired,
    user:         PropTypes.string,
    errorMessage: PropTypes.string
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let login = this.refs.login;
    let pass = this.refs.pass;
    this.props.login(login.value, pass.value);

    login.value = pass.value = '';
  };

  componentDidUpdate() {
    if (this.props.errorMessage) {
      this.refs.login.focus();
    }
  }

  render() {
    const {user, logout, errorMessage} = this.props;
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
          {errorMessage &&
            <span style={errorStyle}>{errorMessage}</span>
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
