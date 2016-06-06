import React, { PropTypes } from 'react';
import { Link, IndexLink }  from 'react-router';

import { Login, ErrorHandler } from 'components';
import { rendered }            from 'lib/fetchData';

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };

  componentDidMount() {
    rendered();
  }

  render() {
    return (
      <div id="main-view">
        <IndexLink to="/">About</IndexLink>
        {' '}
        <Link to="/todos">Todos</Link>
        <hr />
        <Login />
        <hr />
        <ErrorHandler>
          {this.props.children}
        </ErrorHandler>
      </div>
    );
  }
}
