import React, { PropTypes } from 'react';
import { Link, IndexLink }  from 'react-router';

import { Login }            from 'components';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div id="main-view">
        <IndexLink to="/">About</IndexLink>
        {' '}
        <Link to="/todos">Todos</Link>
        <hr />
        <Login />
        <hr />
        {this.props.children}
      </div>
    );
  }
}
